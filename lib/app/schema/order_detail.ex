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

  @default_fields [:bill_code, :selling_price, :quantity, :product_name, :order_id, :product_id]
  @doc false
  def changeset(order_detail, attrs) do
    order_detail
    |> cast(attrs, @default_fields)
    |> validate_required(@default_fields)
    |> unique_constraint(:bill_code)
  end
end
