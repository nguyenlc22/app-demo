defmodule App.Repo.Migrations.AddUniqueEmailCustomerIdIndexToOrdersTable do
  use Ecto.Migration

  def change do
    create unique_index(:orders, [:code], prefix: :customer)
    # create index(:orders, [:customer_id], prefix: :customer)
  end
end
