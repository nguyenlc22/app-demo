defmodule App.Schema.User do
  use Ecto.Schema
  import Ecto.Changeset

  # define ignore field password
  @derive {Jason.Encoder, except: [:__meta__, :password, :user_group]}

  @schema_prefix :auth
  schema "users" do
    field :email, :string
    field :password, :string
    field :phone, :string
    field :username, :string
    belongs_to :user_group, App.Schema.UserGroups

    timestamps()
  end

  @default_fields [:username, :email, :password, :phone, :inserted_at, :updated_at, :user_group_id]
  @default_fields_login [:email, :password]
  @default_fields_register [:username, :email, :password, :phone]

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, @default_fields)
    |> validate_required([:username, :email, :password, :phone])
    |> unique_constraint(:email)
    |> validate_length(:password, min: 2, max: 10)
    |> validate_confirmation(:password, message: "Password is not matching!")
    |> update_change(:email, fn email -> String.downcase(email) end)
    |> update_change(:username, &String.downcase(&1))
  end

  @doc """
    Validate fields login
  """
  def changeset_login(user, attrs) do
    user
    |> cast(attrs, @default_fields_login)
    |> validate_required([:email, :password])
  end

  @doc """
    Validate fields register
  """
  def changeset_register(user, attrs) do
    user
    |> cast(attrs, @default_fields_register)
    |> validate_required(@default_fields_register)
  end
end
