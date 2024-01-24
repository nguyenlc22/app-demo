defmodule App.Schema.GroupBrand do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :brand]}
  @schema_prefix :customer
  schema "group_brands" do
    field :name, :string
    has_many :brand, App.Schema.Brand

    timestamps()
  end

  @doc false
  def changeset(group_brand, attrs) do
    group_brand
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
