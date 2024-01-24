defmodule AppWeb.Api.CustomerController do
  @moduledoc """
    The API orders Controller
  """
  use AppWeb, :controller

  alias App.Repo.Customer, as: CustomerRepo
  alias App.Schema.Customer, as: CustomerSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL ORDER
  """
  def get_all(conn, params) do
    res = CustomerRepo.get_all(params)
    json(conn, %{
      status: "Success",
      data: %{ EC: 200, EM: "", DT: res }
    })
  end
end
