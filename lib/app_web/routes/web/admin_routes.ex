defmodule AppWeb.RouterAdmin do
  use Phoenix.Router

  # admin routes
  get "/dashboard", AppWeb.AdminController, :index
  get "/products", AppWeb.AdminController, :index
  get "/orders", AppWeb.AdminController, :index
  get "/customers", AppWeb.AdminController, :index
end
