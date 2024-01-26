defmodule App.Schema.Product do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :brand, :order]}

  @schema_prefix :customer
  schema "products" do
    field :code, :string
    field :name, :string
    field :selling_price, :float
    # field :brand_id, :id
    belongs_to :brand, App.Schema.Brand
    has_many :order, App.Schema.Order

    timestamps()
  end

  @default_fields [:code, :name, :selling_price, :brand_id]
  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, @default_fields)
    |> validate_required(@default_fields)
    |> unique_constraint(:code)
  end
end
