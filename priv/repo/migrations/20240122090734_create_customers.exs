defmodule App.Repo.Migrations.CreateCustomers do
  use Ecto.Migration

  def change do
    create table(:customers, prefix: :customer) do
      add :full_name, :string
      add :address, :string
      add :phone, :string
      add :birth, :string

      timestamps()
    end
  end
end
