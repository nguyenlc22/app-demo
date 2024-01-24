defmodule App.Repo.Migrations.AddCustomersDataToCustomersTable do
  use Ecto.Migration

  def change do
    execute "INSERT INTO customer.customers (full_name, address, phone, birth, inserted_at, updated_at) VALUES ('Cao Lê Nguyên', 'Hồ Chí Minh', '0369360057', '22/06/1999', NOW(), NOW())"
    execute "INSERT INTO customer.customers (full_name, address, phone, birth, inserted_at, updated_at) VALUES ('Nguyễn Văn A', 'An Giang', '0369999999', '1/1/2024', NOW(), NOW())"
    execute "INSERT INTO customer.customers (full_name, address, phone, birth, inserted_at, updated_at) VALUES ('Trần Văn B', 'Hà Nội', '0444444444', '22/01/2000', NOW(), NOW())"
  end
end
