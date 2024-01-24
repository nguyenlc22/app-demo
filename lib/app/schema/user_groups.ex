defmodule App.Schema.UserGroups do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :user]}
  @schema_prefix :auth
  schema "user_groups" do
    field :roles, :map
    field :title, :string
    has_many :user, App.Schema.User

    timestamps()
  end

  @doc false
  def changeset(user_groups, attrs) do
    user_groups
    |> cast(attrs, [:title, :roles])
    |> validate_required([:title, :roles])
  end
end
