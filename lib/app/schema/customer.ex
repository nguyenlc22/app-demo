defmodule App.Schema.Customer do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :order]}

  @schema_prefix :customer
  schema "customers" do
    field :address, :string
    field :birth, :string
    field :full_name, :string
    field :phone, :string
    has_many :order, App.Schema.Order

    timestamps()
  end

  @default_fields [:full_name, :address, :phone, :birth]
  @doc false
  def changeset(customer, attrs) do
    customer
    |> cast(attrs, @default_fields)
    |> validate_required(@default_fields)
  end
end
