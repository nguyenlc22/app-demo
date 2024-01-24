defmodule AppWeb.Api.RouterAuth do
  use Phoenix.Router

  # register
  post "/register", AppWeb.Api.AuthController, :register
  post "/login", AppWeb.Api.AuthController, :login_with_email
end
