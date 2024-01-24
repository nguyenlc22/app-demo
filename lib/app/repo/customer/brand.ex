defmodule App.Repo.Brand do
  @moduledoc """
    The brand repository relative with products database
  """
  import Ecto.Query, warn: false

  alias App.Repo
  alias App.Schema.Brand, as: BrandSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    Get all products from db
  """
  def get_all(params) do
    with {:ok, %AppWeb.Utils.Paginator{} = data} <- AppWeb.Utils.Paginator.new(params) do
      # define schema
      query = from(
        i in BrandSchema,
        preload: :group_brand
      )

      total_entries = Repo.aggregate(query, :count, :id)
      offset = data.size * (data.page - 1)
      # add offset and limit for query schema
      entries = from(
        i in query,
        limit: ^data.size,
        offset: ^offset
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
