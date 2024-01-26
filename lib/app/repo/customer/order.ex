defmodule App.Repo.Order do
  @moduledoc """
    The order repository relative with orders database
  """
  import Ecto.Query, warn: false

  alias App.Repo
  alias App.Schema.Order, as: OrderSchema
  # alias App.Schema.Customer, as: CustomerSchema
  alias App.Schema.OrderDetail, as: OrderDetailSchema
  # alias AppWeb.Utils.Functional, as: UtilsFunc

  @filter_association ["full_name", "phone"]

  @query from(
    i in OrderSchema,
    preload: [:customer, :order_detail]
  )

  @doc """
    Get all orders from db
  """
  def get_all(params) do
    with {:ok, %AppWeb.Utils.Paginator{} = data} <- AppWeb.Utils.Paginator.new(params) do
      # define schema
      total_entries = Repo.aggregate(@query, :count, :id)
      offset = data.size * (data.page - 1)
      # add offset and limit for query schema
      entries = from(
        i in @query,
        limit: ^data.size,
        offset: ^offset,
      ) |> Repo.all()
      # return schema
      %{
        entries: entries,
        page: data.page,
        size: data.size,
        total_entries: total_entries,
        total_pages: Float.ceil(total_entries / data.size) |> round()
      }
    end
  end

  @doc """
    Insert order
  """
  def create_order(params) do
    with %{ "data_order" => data_order, "data_order_detail" => data_order_detail } <- params do
      # processing date order
      data_order_proc = AppWeb.Utils.Datetime.format_time_insert_db(data_order)
      data_order_changeset = %OrderSchema{} |> OrderSchema.changeset(data_order_proc)

      ##########
      Ecto.Multi.new()
      |> Ecto.Multi.insert(:order, data_order_changeset)
      |> Ecto.Multi.run(:order_detail, fn _repo, %{order: order} ->
        # processing date order detail
        data_order_detail_proc = Enum.reduce(data_order_detail, [], fn item, order_detail ->
          data = item
            |> Map.put("order_id", order.id)
            |> AppWeb.Utils.Datetime.format_time_insert_db()

          order_detail ++ [data]
        end)
        IO.inspect(data_order_detail_proc)
        # {:ok, _order_detail} = Repo.insert_all(OrderDetailSchema, data_order_detail_proc)
        {:ok, _order_detail} = create_order_detail(data_order_detail_proc)
      end)
      |> Repo.transaction()
      |> case do
        {:ok, result} ->
          {:ok, result}
        {:error, error} ->
          Repo.rollback(error)
      end
    end
  end

  @doc """
    Insert all order detail
  """
  def create_order_detail(params) do
    Enum.map(params, fn item ->
      OrderDetailSchema.changeset(%OrderDetailSchema{}, item)
    end)
    |> Enum.with_index()
    |> Enum.reduce(Ecto.Multi.new(), fn ({changeset, index}, multi) ->
      Ecto.Multi.insert(multi, Integer.to_string(index), changeset)
    end)
    |> Repo.transaction
  end

  @doc """
    Filter orders with params
  """
  def filter(params) do
    with {:ok, %AppWeb.Utils.Paginator{} = data} <- AppWeb.Utils.Paginator.new(params) do
      # define schema
      total_entries = Repo.aggregate(@query, :count, :id)
      _offset = data.size * (data.page - 1)
      # add offset and limit for query schema
      entries = Enum.reduce(params, @query, fn {key, val}, queryable ->
        key_atom = String.to_existing_atom(key)
        cond do
          key in @filter_association -> where(queryable, ^dynamic([m, c], field(c, ^key_atom) == ^val))
          key == "inserted_at" ->
            # split data
            [from, to] = String.split(val, ",")
            # convert string to time
            {:ok, date_from, _offset} = DateTime.from_iso8601(from)
            {:ok, date_to, _offset} = DateTime.from_iso8601(to)
            # return
            where(queryable, ^dynamic([m], fragment(
              "? BETWEEN ? AND ?",
              m.inserted_at,
              ^Timex.to_datetime(date_from, "Asia/Ho_Chi_Minh"),
              ^Timex.to_datetime(date_to, "Asia/Ho_Chi_Minh")
            )))
          key == "total_price" ->
            [from, to] = String.split(val, ",")
            where(queryable, ^dynamic([m], fragment(
              "? BETWEEN ? AND ?", m.total_price, ^String.to_integer(from), ^String.to_integer(to)
            )))
          true -> where(queryable, ^dynamic([m], field(m, ^key_atom) == ^val))
        end
      end) |> Repo.all()
      # return schema
      %{
        entries: entries,
        page: data.page,
        size: data.size,
        total_entries: total_entries,
        total_pages: Float.ceil(total_entries / data.size) |> round()
      }
    end
  end

  @doc """
    Get order by id
  """
  def get_by_id(id) do
    from(
      i in @query,
      preload: [:customer, :order_detail],
      where: i.id == ^id
    )
    |> Repo.one()
  end
end
