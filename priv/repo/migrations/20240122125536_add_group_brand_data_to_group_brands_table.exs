defmodule App.Repo.Migrations.AddGroupBrandDataToGroupBrandsTable do
  use Ecto.Migration

  def change do
    execute "INSERT INTO customer.group_brands (name, inserted_at, updated_at) VALUES ('group_brand_a', NOW(), NOW())"
    execute "INSERT INTO customer.group_brands (name, inserted_at, updated_at) VALUES ('group_brand_b', NOW(), NOW())"
    execute "INSERT INTO customer.group_brands (name, inserted_at, updated_at) VALUES ('group_brand_c', NOW(), NOW())"
  end
end
