// convert number to vnd
const format_money_vnd = (data) => {
  const config = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 8
  }
  const formated = new Intl.NumberFormat('vi-VN', config).format(data)
  return formated
}

export { format_money_vnd }
