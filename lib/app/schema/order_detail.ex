defmodule App.Schema.OrderDetail do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :order, :product]}
  @schema_prefix :customer
  schema "order_detail" do
    field :bill_code, :string
    field :product_name, :string
    field :quantity, :string
    field :selling_price, :float
    # field :product_id, :id
    # field :order_id, :id
    belongs_to :order, App.Schema.Order
    belongs_to :product, App.Schema.Product

    timestamps()
  end

  @doc false
  def changeset(order__detail, attrs) do
    order__detail
    |> cast(attrs, [:bill_code, :selling_price, :quantity, :product_name, :order_id, :product_id])
    |> validate_required([:bill_code, :selling_price, :quantity, :product_name, :order_id, :product_id])
    |> unique_constraint(:bill_code)
  end
end
