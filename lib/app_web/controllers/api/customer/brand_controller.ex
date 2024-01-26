defmodule AppWeb.Api.BrandController do
  @moduledoc """
    The API brands Controller
  """
  use AppWeb, :controller

  alias App.Repo.Brand, as: BrandRepo
  # alias App.Schema.Brand, as: BrandSchema
  # alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - GET ALL PRODUCTS
  """
  def get_all(conn, params) do
    with {:ok, res} <- {:ok, BrandRepo.get_all(params)} do
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
end
