defmodule App.Repo.Scripts.AddCustomerDataToCusotmerTable do
  @moduledoc """
    Add data to customer table
  """

  def perform do
    data = [
      %{
        full_name: "Nguyên Cao Leeee",
        address: "Phú Yên",
        phone: "0369360057",
        birth: "22/06/2000"
      }
    ]
    App.Repo.insert_all(App.Schema.Customer, data, on_conflict: :nothing)
  end
end

App.Repo.Scripts.AddCustomerDataToCusotmerTable.perform()
