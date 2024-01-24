defmodule App.Repo.Migrations.CreateOrderDetail do
  use Ecto.Migration

  def change do
    create table(:order_detail, prefix: :customer) do
      add :bill_code, :string
      add :selling_price, :float
      add :quantity, :string
      add :product_name, :string
      add :product_id, references(:products, on_delete: :nothing), default: nil
      add :order_id, references(:orders, on_delete: :nothing), default: nil

      timestamps()
    end

    create unique_index(:order_detail, [:bill_code], prefix: :customer)
    create index(:order_detail, [:product_id], prefix: :customer)
    create index(:order_detail, [:order_id, :product_id], prefix: :customer)
  end
end
