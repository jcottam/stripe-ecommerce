const HelperUtils = {
  install: function(Vue) {
    const currencyFormatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    Vue.prototype.formatDollar = function(amount) {
      if (typeof amount !== "number" || Number.isNaN(amount)) return "";
      return currencyFormatter.format(amount / 100);
    };
  }
};

export default HelperUtils;
