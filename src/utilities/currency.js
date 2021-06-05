const formatCurrency = (value, currency) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
  }).format(value);

export default formatCurrency;
