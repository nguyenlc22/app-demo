defmodule AppWeb.Utils.Validator do
  def check_and_apply_changes(form_changesets) when is_list(form_changesets) do
    Enum.reduce(form_changesets, {:ok, []}, fn
      form_changeset, {:ok, data} ->
        if form_changeset.valid? do
          changes = form_changeset |> Ecto.Changeset.apply_changes()
          {:ok, [changes | data]}
        else
          {:error, :validation_failed, form_changeset}
        end

      _form_changeset, acc ->
        acc
    end)
  end

  def check_and_apply_changes(form_changeset) do
    if form_changeset.valid? do
      changes = form_changeset |> Ecto.Changeset.apply_changes()

      {:ok, changes}
    else
      {:error, :validation_failed, form_changeset}
    end
  end

  def get_validation_error_message(%{} = error, object, parent_key \\ nil) do
    first_error_field =
      Enum.find(error, fn
        {_key, [_ | _] = _errors} ->
          true

        _ ->
          false
      end)

    case first_error_field do
      {key, errors} ->
        current_key =
          [parent_key, Atom.to_string(key)]
          |> Enum.filter(& &1)
          |> Enum.join(" -> ")

        if is_binary(List.first(errors)) do
          "#{object} #{current_key} #{List.first(errors)}"
        else
          get_validation_error_message(List.first(errors), object, current_key)
        end

      _ ->
        ""
    end
  end

  def get_list_budget_validation_error_message(%{} = error, _object, _parent_key \\ nil) do
    {_, cleaned_data} = error |> Map.pop(:remaining_budget)
    {_, error} = cleaned_data |> Map.pop(:group_brand_id)

    Enum.map_join(error, " ", fn {key, val} ->
      "#{String.capitalize("#{key}")} format #{val}. <br/>"
    end)
  end

  def get_budget_validation_error_message(%{} = error, _object, parent_key \\ nil) do
    first_error_field =
      Enum.find(error, fn
        {_key, [_ | _] = _errors} ->
          true

        _ ->
          false
      end)

    case first_error_field do
      {key, errors} ->
        current_key =
          [parent_key, Atom.to_string(key)]
          |> Enum.filter(& &1)
          |> Enum.join(" -> ")

        if is_binary(List.first(errors)) && "#{List.first(errors)}" == "is invalid" do
          "#{String.capitalize(current_key)} format #{List.first(errors)}"
        else
          "#{List.first(errors)}"
        end

      _ ->
        ""
    end
  end

  def is_phone_number(phone) when is_binary(phone) do
    String.match?(phone, ~r/^(0)+((\d{9})|(\d{10}))$/)
  end

  def is_phone_number(_), do: false
end
