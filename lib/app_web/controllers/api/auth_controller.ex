defmodule AppWeb.Api.AuthController do
  @moduledoc """
    The API User Controller
  """
  use AppWeb, :controller

  alias App.Repo.User, as: UserRepo
  alias App.Schema.User, as: UserSchema
  alias AppWeb.Utils.Functional, as: UtilsFunc

  @doc """
    - REGISTER NEW ACCOUNT USER
      1. At time current for params (with 1 - admin role, 2 - user role)
      2. Get user with email from db for check user is exists
      3. Validate fields input params with changeset_register
      4. Hash password
      5. Insert user to databse
  """
  def register(conn, params) do
    with params_at <- params
        |> Map.put("user_group_id", 1)
        |> Map.put("inserted_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))
        |> Map.put("updated_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh")),
        user_fetch <- UserRepo.get_user_by_email(params_at) do
          cond do
            is_nil(user_fetch) ->
              case UserRepo.create_user(params_at) do
                {:ok, user} -> json(conn, %{
                  status: "Success",
                  data: %{ EC: 200, EM: "", DT: user}
                })
                {:error, %Ecto.Changeset{} = _changeset} -> json(conn, %{
                  status: "Error",
                  data: %{ EC: 400, EM: "Something wrong from fields!", DT: %{}}
                })
                _ -> json(conn, %{
                  status: "Error",
                  data: %{ EC: 500, EM: "Internal server error!", DT: %{}}
                })
              end
            true -> json(conn, %{
              status: "Error",
              data: %{ EC: 400, EM: "Email is already!", DT: %{}}
            })
          end
    end
  end

  @doc """
    - LOGIN WITH EMAIL AND PASSWORD
      1. Get user with email
      2. Verify password
      3. Generate token
  """
  def login_with_email(conn, %{"email" => _email, "password" => password} = params) do
    with %UserSchema{} = user_fetch <- UserRepo.get_user_by_email(params),
        true <- UtilsFunc.op(:verify_password, Pbkdf2.verify_pass(password, user_fetch.password)),
        {:ok, token, claims} <- UtilsFunc.generate_token(%{
          "user_id" => user_fetch.id,
          "email" => user_fetch.email
        }) do
        IO.inspect(claims)
        # response
        json(conn, %{
          status: "Success",
          data: %{ EC: 200, EM: "Login success", DT: %{ token: token}}
        })
    else
      {:verify_password, _error} -> json(conn, %{
        status: "Error",
        data: %{ EC: 400, EM: "Password is wrong!", DT: %{}}
      })
      _ -> json(conn, %{
        status: "Error",
        data: %{ EC: 500, EM: "Internal server error!", DT: %{}}
      })
    end
  end
end
