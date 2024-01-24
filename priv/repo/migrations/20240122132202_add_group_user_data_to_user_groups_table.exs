defmodule App.Repo.Migrations.AddGroupUserDataToUserGroupsTable do
  use Ecto.Migration

  def change do
    execute "INSERT INTO auth.user_groups (title, roles, inserted_at, updated_at) VALUES ('admin', '{}', NOW(), NOW())"
    execute "INSERT INTO auth.user_groups (title, roles, inserted_at, updated_at) VALUES ('user', '{}', NOW(), NOW())"
  end
end
