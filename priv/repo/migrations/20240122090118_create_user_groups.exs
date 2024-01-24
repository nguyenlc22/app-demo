defmodule App.Repo.Migrations.CreateUserGroups do
  use Ecto.Migration

  def change do
    create table(:user_groups, prefix: :auth) do
      add :title, :string
      add :roles, :map

      timestamps()
    end
  end
end
