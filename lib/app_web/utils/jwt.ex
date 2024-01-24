defmodule AppWeb.Utils.Token do
  @moduledoc """
    The functional utils token
  """
  use Joken.Config
  alias Joken.Claim

  @impl true
  def token_config do
    default_claims(skip: [:iss])
    |> add_claim("iss", fn -> "Onpoint" end, &(&1 == "Onpoint"))
    |> add_claim("exp", fn -> Joken.current_time() + (1 * 60 * 60) end, fn val, _claims, ctx ->
      val > ctx.exp end)
  end
end
