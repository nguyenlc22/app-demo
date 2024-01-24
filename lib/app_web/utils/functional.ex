defmodule AppWeb.Utils.Functional do
  @moduledoc """
    The functional utils
  """
  import Ecto.Changeset
  alias AppWeb.Utils.Token, as: AuthToken
  alias Joken.Config

  @signer Joken.Signer.create("HS256", "secret")

  # hash password
  def hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}}
        -> put_change(changeset, :password, Pbkdf2.hash_pwd_salt(password))
      _ -> changeset
    end
  end

  @doc """
    Generate token
  """
  def generate_token(extra_claims) do
    {:ok, token, _claims} = AuthToken.generate_and_sign(extra_claims, @signer)
  end

  def token_options(type) do
    case type do
      :access -> [token_type: "access", ttl: {2, :hour}]
      :reset -> [token_type: "reset", ttl: {1, :minute}]
      :admin -> [token_type: "admin", ttl: {90, :day}]
    end
  end

  @doc """
    Verify token
  """
  def verify_token(token) do
    case AuthToken.verify_and_validate(token, @signer, %{exp: Joken.current_time()}) do
      {:ok, claims} -> {:ok, claims}
      {:error, error} -> {:error, error}
    end
  end

  @doc """
    The helper function for with...do...else
  """
  @spec op(atom(), any(), :strict | :permissive) :: any()
  def op(label, thing, mode \\ :strict) do
    if mode == :permissive do
      opt_permissive(label, thing)
    else
      op_strict(label, thing)
    end
  end

  defp opt_permissive(label, err) when err in [:error, false, nil], do: {label, err}
  defp opt_permissive(label, {:error, _} = err), do: {label, err}
  defp opt_permissive(_label, val), do: val

  defp op_strict(_label, val) when val in [:ok, true], do: val
  defp op_strict(_label, {:ok, _} = success), do: success
  defp op_strict(label, other), do: {label, other}
end
