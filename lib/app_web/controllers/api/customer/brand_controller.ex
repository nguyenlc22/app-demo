defmodule AppWeb.Api.BrandController do
  @moduledoc """
    The API brands Controller
  """
  use AppWeb, :controller

  alias App.Repo.Brand, as: BrandRepo
  alias App.Schema.Brand, as: BrandSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL PRODUCTS
  """
  def get_all(conn, params) do
    res = BrandRepo.get_all(params)
    json(conn, %{
      status: "Success",
      data: %{ EC: 200, EM: "", DT: res}
    })
  end
end
