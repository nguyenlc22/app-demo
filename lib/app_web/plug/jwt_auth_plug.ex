defmodule AppWeb.JWTAuthPlug do
  @moduledoc """
    The pipelines JWT Auth Plug
  """
  import Plug.Conn
  use AppWeb, :controller

  alias App.Repo.User, as: UserRepo
  alias App.Schema.User, as: UserSchema
  # alias AppWeb.Utils.Token, as: AuthToken
  alias AppWeb.Utils.Functional, as: UtilsFunc

  def init(opts), do: opts

  def call(conn, _) do
    bearer = get_req_header(conn, "authorization") |> List.first()

    if bearer == nil do
      json(conn, %{
        status: "Error",
        data: %{ EC: 401, EM: "Please provide access token!", DT: %{}}
      })
    else
      token = bearer |> String.split(" ") |> List.last()

      with {:ok, %{"user_id" => user_id}} <- UtilsFunc.op(:verify_token, UtilsFunc.verify_token(token)),
        %UserSchema{} = user <- UserRepo.get_user_by_id(user_id) do
        conn |> assign(:current_user, user)
      else
        {:verify_token, _reason} ->
          json(conn, %{
            status: "Error",
            data: %{ EC: 401, EM: "Token is expired!", DT: %{}}
          })
        _ ->
          json(conn, %{
            status: "Error",
            data: %{ EC: 500, EM: "Internal server error!", DT: %{}}
          })
      end
    end
  end
end
