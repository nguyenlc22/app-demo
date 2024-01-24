defmodule App.Repo.Migrations.CreateOrders do
  use Ecto.Migration

  def change do
    create table(:orders, prefix: :customer) do
      add :code, :string
      add :address, :string
      add :total_price, :float
      add :customer_id, references(:customers, on_delete: :nothing), default: nil

      timestamps()
    end

    # create unique_index(:orders, [:code], prefix: :customer)
    # create index(:orders, [:customer_id], prefix: :customer)
  end
end
