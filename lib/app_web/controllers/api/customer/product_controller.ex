defmodule AppWeb.Api.ProductController do
  @moduledoc """
    The API products Controller
  """
  use AppWeb, :controller

  alias App.Repo.Product, as: ProductRepo
  alias App.Schema.Product, as: ProductSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL PRODUCTS
      1. Get products from database
      2. Processing data to return brand name
        2.1. Get entries products data
        2.2. Loop data to get name brand
        2.3. Return data
  """
  def get_all(conn, params) do
    res = ProductRepo.get_all(params)
    json(conn, %{
      status: "Success",
      data: %{ EC: 200, EM: "", DT: res }
    })
  end

  @doc """
    - CREATE NEW PRODUCT
  """
  def create_product(conn, params) do
    with params_at <- params
      |> Map.put("inserted_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))
      |> Map.put("updated_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh")),
      product_fetch <- ProductRepo.get_product_with_code(params_at) do
        cond do
          is_nil(product_fetch) ->
            case ProductRepo.create_product(params_at) do
              {:ok, product} ->
                json(conn, %{
                  status: "Success",
                  data: %{ EC: 200, EM: "Add product success", DT: Map.put(params_at, :id, product.id)}
                })
              {:error, %Ecto.Changeset{} = changeset} ->
                IO.inspect(changeset)
                json(conn, %{
                  status: "Error",
                  data: %{ EC: 400, EM: "Something wrong from fields!", DT: %{}}
                })
              _ -> json(conn, %{
                status: "Error",
                data: %{ EC: 500, EM: "Internal server error!", DT: %{}}
              })
            end
          true -> json(conn, %{
            status: "Error",
            data: %{ EC: 400, EM: "Product code is already!", DT: %{}}
          })
        end
      end
  end

  @doc """
    - FILTER PRODUCTS WITH PARAMS
  """
  def filter(conn, params) do
    res = ProductRepo.filter(params)
    json(conn, %{
      status: "Success",
      data: %{ EC: 200, EM: "Filter product success", DT: res}
    })
  end
end
