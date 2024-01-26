defmodule AppWeb.Api.OrderController do
  @moduledoc """
    The API orders Controller
  """
  use AppWeb, :controller

  alias App.Repo.Order, as: OrderRepo
  # alias App.Schema.Order, as: OrderSchema
  # alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL ORDER
  """
  def get_all(conn, params) do
    with {:ok, res} <- {:ok, OrderRepo.get_all(params)} do
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
    - CREATE ORDER
      1. Insert order to database
      2. Get id order and add order id to order details
      3. Insert order detail to database with id order is geted
  """
  def create_order(conn, params) do
    with {:ok, _data} <- OrderRepo.create_order(params) do
      json(conn, %{
        status: "Success",
        data: %{EC: 200, EM: "Create order success", DT: %{}}
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
    - FILTER ORDERS WITH PARAMS
  """
  def filter(conn, params) do
    with {:ok, res} <- {:ok, OrderRepo.filter(params)} do
      json(conn, %{
        status: "Success",
        data: %{EC: 200, EM: "Filter orders success", DT: res}
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
    - GET ORDER BY ID
  """
  def get_by_id(conn, params) do
    with %{"id" => id} <- params,
         {:ok, res} <- OrderRepo.get_by_id(id) do
      # IO.inspect(res)
      # products_proc = Enum.reduce(res, [], fn ele, result ->
      #   result ++ [Map.get(ele, "product")]
      # end)
      # {_, order_detail} = Map.pop(List.first(res), "product")
      json(conn, %{
        status: "Success",
        data: %{EC: 200, EM: "Get order by id success", DT: res}
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
