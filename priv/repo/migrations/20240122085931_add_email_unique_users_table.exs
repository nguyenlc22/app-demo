defmodule App.Repo.Migrations.AddEmailUniqueUsersTable do
  use Ecto.Migration

  def change do
    # create unique_index(:users, [:email], prefix: :auth)
  end
end
