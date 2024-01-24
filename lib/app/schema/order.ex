defmodule App.Schema.Order do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :customers, :order_detail]}
  @schema_prefix :customer
  schema "orders" do
    field :address, :string
    field :code, :string
    field :total_price, :float
    # field :customer_id, :id
    belongs_to :customers, App.Schema.Customer
    has_many :order_detail, App.Schema.OrderDetail

    timestamps()
  end

  @doc false
  def changeset(order, attrs) do
    order
    |> cast(attrs, [:code, :address, :total_price])
    |> validate_required([:code, :address, :total_price])
    |> unique_constraint(:code)
  end
end
