defmodule AppWeb.Api.OrderController do
  @moduledoc """
    The API orders Controller
  """
  use AppWeb, :controller

  alias App.Repo.Order, as: OrderRepo
  # alias App.Schema.Order, as: OrderSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL ORDER
  """
  def get_all(conn, params) do
    res = OrderRepo.get_all(params)
    json(conn, %{
      status: "Success",
      data: %{ EC: 200, EM: "", DT: res }
    })
  end

  @doc """
    - CREATE ORDER
      1. Insert order to database
      2. Get id order and add order id to order details
      3. Insert order detail to database with id order is geted
  """
  def create_order(conn, params) do
    with %{ "data_order" => data_order, "data_order_detail" => data_order_detail } <- params,
      {:ok, data_order_proc} <- proc_data_order(data_order),
      {:ok, %{id: order_id} = _order} <- OrderRepo.create_order(data_order_proc),
      {:ok, order_detail_proc} <- UtilsFunc.op(:proc_order_detail, proc_data_order_detail(data_order_detail, order_id)),
      {:ok, _order_response} <- OrderRepo.create_order_detail(order_detail_proc) do
        json(conn, %{
          status: "Success",
          data: %{ EC: 200, EM: "Create order success", DT: %{} }
        })
    else
      {:proc_order_detail, _error} -> json(conn, %{
        status: "Error",
        data: %{ EC: 400, EM: "Something wrong from data!", DT: %{}}
      })
      _ -> json(conn, %{
        status: "Error",
        data: %{ EC: 500, EM: "Internal server error!", DT: %{}}
      })
    end
  end

  def proc_data_order(data) do
    data_proc = data
      |> Map.put("inserted_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))
      |> Map.put("updated_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))
    {:ok, data_proc}
  end

  def proc_data_order_detail(data, order_id) do
    order_proc = Enum.reduce(data, [], fn item, order_detail ->
      data = item
        |> Map.put("order_id", order_id)
        |> Map.put("inserted_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))
        |> Map.put("updated_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))

      order_detail ++ [data]
    end)

    {:ok, order_proc}
  end

  @doc """
    - FILTER ORDERS WITH PARAMS
  """
  def filter(conn, params) do
    res = OrderRepo.filter(params)
    json(conn, %{
      status: "Success",
      data: %{ EC: 200, EM: "Filter orders success", DT: res}
    })
  end

  @doc """
    - GET ORDER BY ID
  """
  def get_by_id(conn, params) do
    with %{"id" => id} <- params,
      res <- OrderRepo.get_by_id(id) do
        products_proc = Enum.reduce(res, [], fn ele, result ->
          result ++ [Map.get(ele, "product")]
        end)
        {_, order_detail} = Map.pop(List.first(res), "product")
        json(conn, %{
          status: "Success",
          data: %{ EC: 200, EM: "Get order by id success", DT: Map.put(order_detail, "products", products_proc)}
        })
    end
  end

  @doc """
    - GET PRODUCTS IN ORDER WITH ID
  """
  def get_products_by_order_id(conn, params) do
    with %{"id" => id} <- params,
      res <- OrderRepo.get_by_id(id) do
        products_pro = Enum.reduce(res, [], fn ele, result ->
          result ++ [Map.get(ele, "product")]
        end)
        json(conn, %{
          status: "Success",
          data: %{ EC: 200, EM: "Get products with order id success", DT: %{"products" => products_pro}}
        })
    end
  end
end
