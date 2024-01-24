defmodule AppWeb.Api.OrderController do
  @moduledoc """
    The API orders Controller
  """
  use AppWeb, :controller

  alias App.Repo.Order, as: OrderRepo
  alias App.Schema.Order, as: OrderSchema
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
end
