defmodule AppWeb.Api.RouterCustomer do
  use Phoenix.Router

  # customers
  get "/", AppWeb.Api.CustomerController, :get_all

  # products
  get "/products", AppWeb.Api.ProductController, :get_all
  post "/products", AppWeb.Api.ProductController, :create_product
  get "/products/filter", AppWeb.Api.ProductController, :filter

  # brands
  get "/brands", AppWeb.Api.BrandController, :get_all

  # orders
  get "/orders", AppWeb.Api.OrderController, :get_all
end
