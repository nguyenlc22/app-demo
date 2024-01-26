defmodule AppWeb.Api.RouterCustomer do
  use Phoenix.Router

  # customers
  get "/", AppWeb.Api.CustomerController, :get_all
  get "/filter-partial", AppWeb.Api.CustomerController, :filter_partial_string

  # products
  get "/products", AppWeb.Api.ProductController, :get_all
  post "/products", AppWeb.Api.ProductController, :create_product
  get "/products/filter", AppWeb.Api.ProductController, :filter

  # brands
  get "/brands", AppWeb.Api.BrandController, :get_all

  # orders
  get "/orders", AppWeb.Api.OrderController, :get_all
  post "/orders", AppWeb.Api.OrderController, :create_order
  get "/orders/filter", AppWeb.Api.OrderController, :filter
  get "/orders/:id", AppWeb.Api.OrderController, :get_by_id
  get "/orders/:id/products", AppWeb.Api.OrderController, :get_products_by_order_id
end
