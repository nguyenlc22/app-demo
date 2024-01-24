defmodule App.Schema.Brand do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :group_brand, :product]}

  @schema_prefix :customer
  schema "brands" do
    field :name, :string
    # field :group_brand_id, :id
    belongs_to :group_brand, App.Schema.GroupBrand
    has_many :product, App.Schema.Product

    timestamps()
  end

  @doc false
  def changeset(brand, attrs) do
    brand
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
