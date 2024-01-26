defmodule AppWeb.Utils.Paginator do
  @moduledoc """
    Utils.Paginator
  """
  # import Ecto.Query, only: [from: 2]

  @default_values %{page: 1, size: 20}
  def default_values, do: @default_values

  @default_types %{
    page: :integer,
    size: :integer
  }
  def default_types, do: @default_types

  defstruct Map.to_list(@default_values)

  def __changeset__, do: @default_types

  def validate(changeset) do
    changeset
    |> Ecto.Changeset.validate_number(:page, greater_than_or_equal_to: 1)
    |> Ecto.Changeset.validate_number(:size, greater_than_or_equal_to: 1)
  end

  def changeset(model, params \\ %{}) do
    model
    |> Ecto.Changeset.cast(params, Map.keys(@default_values))
    |> validate()
  end

  def cast(params \\ %{}) do
    changeset(%__MODULE__{}, params) |> validate()
  end

  def new(params) do
    changesetz = changeset(%__MODULE__{}, params)
    AppWeb.Utils.Validator.check_and_apply_changes(changesetz)
  end
end
