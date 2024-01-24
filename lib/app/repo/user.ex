defmodule App.Repo.User do
  @moduledoc """
    The User Repository relative with user database
  """
  import Ecto.Query, warn: false

  alias App.Repo
  alias App.Schema.User, as: UserSchema
  alias App.Schema.UserGroups, as: UserGroupsSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc
  alias AppWeb.Utils, as: Utils
  @doc """
    Get all users from db
  """
  def get_all(params) do
    with {:ok, %Utils.Paginator{} = data} <- Utils.Paginator.new(params) do
      # define schema
      query = from(
        i in UserSchema
      )

      total_entries = Repo.aggregate(query, :count, :id)
      offset = data.size * (data.page - 1)
      # add offset and limit for query schema
      entries = from(
        i in query,
        limit: ^data.size,
        offset: ^offset
      ) |> Repo.all()
      # return schema
      %{
        entries: entries,
        page: data.page,
        size: data.size,
        total_entries: total_entries,
        total_pages: Float.ceil(total_entries / data.size) |> round()
      }
    end
  end

  @doc """
    Get user by email from db
  """
  def get_user_by_email(%{"email" => email}) do
    from(
      u in UserSchema,
      where: u.email == ^email,
      join: user_group in UserGroupsSchema,
      on: user_group.id == u.user_group_id,
      preload: :user_group
    ) |> Repo.one()
  end

  @doc """
    Get user by id
  """
  def get_user_by_id(id) do
    from(
      u in UserSchema,
      where: u.id == ^id
    )
    |> Repo.one()
  end

  @doc """
    Create new user
  """
  def create_user(params) do
    %UserSchema{}
    |> UserSchema.changeset(params)
    |> UtilsFunc.hash_password
    |> Repo.insert()
  end
end
