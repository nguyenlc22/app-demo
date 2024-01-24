defmodule App.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, prefix: :auth) do
      add :username, :string
      add :email, :string
      add :password, :string
      add :phone, :string

      timestamps()
    end

    create unique_index(:users, [:email], prefix: :auth)
  end
end
