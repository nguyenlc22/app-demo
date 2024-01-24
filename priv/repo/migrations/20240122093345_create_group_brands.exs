defmodule App.Repo.Migrations.CreateGroupBrands do
  use Ecto.Migration

  def change do
    create table(:group_brands, prefix: :customer) do
      add :name, :string

      timestamps()
    end
  end
end
