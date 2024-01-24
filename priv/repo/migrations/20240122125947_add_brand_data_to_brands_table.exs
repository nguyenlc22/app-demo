defmodule App.Repo.Migrations.AddBrandDataToBrandsTable do
  use Ecto.Migration

  def change do
    execute "INSERT INTO customer.brands (name, group_brand_id, inserted_at, updated_at) VALUES ('brand_a', 1, NOW(), NOW())"
    execute "INSERT INTO customer.brands (name, group_brand_id, inserted_at, updated_at) VALUES ('brand_b', 2, NOW(), NOW())"
    execute "INSERT INTO customer.brands (name, group_brand_id, inserted_at, updated_at) VALUES ('brand_c', 3, NOW(), NOW())"
  end
end
