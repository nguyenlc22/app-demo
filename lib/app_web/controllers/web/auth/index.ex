defmodule AppWeb.AuthController do
  use AppWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html", props: Poison.encode!(%{data: %{token: "abc"}}))
  end
end
