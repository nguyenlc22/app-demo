defmodule AppWeb.Utils.Datetime do
  @moduledoc """
    The functional utils datetime
  """

  def format_time_insert_db(data) do
    data
    |> Map.put("inserted_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))
    |> Map.put("updated_at", Calendar.DateTime.now!("Asia/Ho_Chi_Minh"))
  end
end
