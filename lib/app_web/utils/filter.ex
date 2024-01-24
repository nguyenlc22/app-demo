# defmodule AppWeb.Utils.Filter do
#   @moduledoc """
#     The functional utils filter
#   """

#   @doc """
#     Filter with field columns
#   """
#   @filter %{
#     title_eq: "Implementing Search Filters with Ecto Queries",
#     summary_eq: nil,
#     status_in: [:published, :draft],
#     author_first_name_eq: nil,
#     author_last_name_eq: nil
#   }

#   def filter(query, _field_name, _operator, nil), do: query

#   def filter(query, field_name, :eq, value) do
#     where(query, [record], @field(record, ^field_name) == ^value)
#   end

#   def filter(query, field_name, :in, values) do
#     where(query, [record], @field(record, ^field_name) in ^values)
#   end

#   @doc """
#     Filter with assoc
#   """
#   def assoc_filter(query, _assoc, _field, _operator, nil), do: query

#   def assoc_filter(query, assoc, field, :eq, value) do
#     query
#     |> left_join_once(assoc)
#     |> where([record, {^assoc, s}], field(s, ^field) == ^value)
#   end

#   def left_join_once(query, assoc) do
#     if has_named_binding?(query, assoc) do
#       query
#     else
#       join(query, :left, [record], s in assoc(record, ^assoc), as: ^assoc)
#     end
#   end
# end
