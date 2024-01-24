defmodule App.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products, prefix: :customer) do
      add :code, :string
      add :name, :string
      add :selling_price, :float
      add :brand_id, references(:brands, on_delete: :nothing), default: nil

      timestamps()
    end

    create unique_index(:products, [:code], prefix: :customer)
    create index(:products, [:brand_id], prefix: :customer)
  end
end
