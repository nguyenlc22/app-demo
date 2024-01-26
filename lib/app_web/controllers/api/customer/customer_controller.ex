defmodule AppWeb.Api.CustomerController do
  @moduledoc """
    The API orders Controller
  """
  use AppWeb, :controller

  alias App.Repo.Customer, as: CustomerRepo
  # alias App.Schema.Customer, as: CustomerSchema
  # alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL ORDER
  """
  def get_all(conn, params) do
    with {:ok, res} <- {:ok, CustomerRepo.get_all(params)} do
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
    - FILTER CUSTOMER WITH PARTIAL STRING
  """
  def filter_partial_string(conn, params) do
    with {:ok, res} <- {:ok, CustomerRepo.filter_partial_string(params)} do
      json(conn, %{
        status: "Success",
        data: %{EC: 200, EM: "Filter customer success", DT: res}
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
