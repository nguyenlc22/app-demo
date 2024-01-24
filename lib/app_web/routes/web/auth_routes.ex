defmodule AppWeb.RouterAuth do
  use Phoenix.Router

  # auth routes
  get "/register", AppWeb.AuthController, :index
  get "/login", AppWeb.AuthController, :index
end
