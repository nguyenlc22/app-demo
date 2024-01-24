defmodule App.Repo.Migrations.CreateBrands do
  use Ecto.Migration

  def change do
    create table(:brands, prefix: :customer) do
      add :name, :string
      add :group_brand_id, references(:group_brands, on_delete: :nothing), default: nil

      timestamps()
    end

    create index(:brands, [:group_brand_id], prefix: :customer)
  end
end
