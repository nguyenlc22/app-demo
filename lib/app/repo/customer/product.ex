defmodule App.Repo.Product do
  @moduledoc """
    The product repository relative with products database
  """
  import Ecto.Query, warn: false

  alias App.Repo
  alias App.Schema.Product, as: ProductSchema
  alias App.Schema.Brand, as: BrandSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @query from(
    i in ProductSchema,
    join: c in BrandSchema,
    on: c.id == i.brand_id,
    # where: c.id == i.brand_id,
    order_by: [desc: i.id],
    select: %{
      "id" => i.id,
      "code" => i.code,
      "name" => i.name,
      "selling_price" => i.selling_price,
      "brand_name" => c.name,
      "brand_id" => i.brand_id,
      "inserted_at" => i.inserted_at,
      "updated_at" => i.updated_at
    }
  )
  @doc """
    Get all products from db
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
    Get products with code
  """
  def get_product_with_code(%{"code" => code}) do
    from(
      u in ProductSchema,
      where: u.code == ^code
    ) |> Repo.one()
  end

  @doc """
    Create new product
  """
  def create_product(params) do
    %ProductSchema{}
    |> ProductSchema.changeset(params)
    |> Repo.insert()
  end

  @doc """
    Filter products with params
  """
  def filter(params) do
    with {:ok, %AppWeb.Utils.Paginator{} = data} <- AppWeb.Utils.Paginator.new(params) do
      # define schema
      total_entries = Repo.aggregate(@query, :count, :id)
      offset = data.size * (data.page - 1)
      # add offset and limit for query schema
      entries = Enum.reduce(params, @query, fn {key, val}, queryable ->
        key_atom = String.to_existing_atom(key)
        where(queryable, ^dynamic([m], field(m, ^key_atom) == ^val))
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
end
