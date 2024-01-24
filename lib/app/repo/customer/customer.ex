defmodule App.Repo.Customer do
  @moduledoc """
    The customer repository relative with customers database
  """
  import Ecto.Query, warn: false

  alias App.Repo
  alias App.Schema.Customer, as: CustomerSchema
  alias App.Schema.Customer, as: CustomerSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @query from(
    i in CustomerSchema
  )

  @doc """
    Get all customers from db
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
end
