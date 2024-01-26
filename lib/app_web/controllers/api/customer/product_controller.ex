defmodule AppWeb.Api.ProductController do
  @moduledoc """
    The API products Controller
  """
  use AppWeb, :controller

  alias App.Repo.Product, as: ProductRepo
  # alias App.Schema.Product, as: ProductSchema
  # alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL PRODUCTS
      1. Get products from database
      2. Processing data to return brand name
        2.1. Get entries products data
        2.2. Loop data to get name brand
        2.3. Return data
  """
  def get_all(conn, params) do
    with {:ok, res} <- {:ok, ProductRepo.get_all(params)} do
      json(conn, %{
        status: "Success",
        data: %{EC: 200, EM: "", DT: res}
      })
    else
      _ ->
        json(conn, %{
          status: "Error",
          data: %{EC: 400, EM: "Internal server error!", DT: %{}}
        })
    end
  end

  @doc """
    - CREATE NEW PRODUCT
  """
  def create_product(conn, params) do
    with params_at <-
           params
           |> AppWeb.Utils.Datetime.format_time_insert_db(),
         {:product_fetch, product_fetch} when not is_nil(product_fetch) <-
           {:product_fetch, is_nil(ProductRepo.get_product_with_code(params_at))},
         {:ok, product} <- ProductRepo.create_product(params_at) do
      json(conn, %{
        status: "Success",
        data: %{
          EC: 200,
          EM: "Add product success",
          DT: Map.put(params_at, :id, product.id)
        }
      })
    else
      {:product_fetch, true} ->
        json(conn, %{
          status: "Error",
          data: %{EC: 400, EM: "Product code is already!", DT: %{}}
        })

      {:error, %Ecto.Changeset{} = _changeset} ->
        json(conn, %{
          status: "Error",
          data: %{EC: 400, EM: "Something wrong from fields!", DT: %{}}
        })

      {:error, _message} ->
        json(conn, %{
          status: "Error",
          data: %{EC: 400, EM: "Internal server error!", DT: %{}}
        })
    end
  end

  @doc """
    - FILTER PRODUCTS WITH PARAMS
  """
  def filter(conn, params) do
    with {:ok, res} <- {:ok, ProductRepo.filter(params)} do
      json(conn, %{
        status: "Success",
        data: %{EC: 200, EM: "Filter product success", DT: res}
      })
    else
      _ ->
        json(conn, %{
          status: "Error",
          data: %{EC: 400, EM: "Internal server error!", DT: %{}}
        })
    end
  end
end
