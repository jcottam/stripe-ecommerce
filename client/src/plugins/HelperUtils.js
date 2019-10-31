const HelperUtils = {
  install: function(Vue) {
    Vue.prototype.formatDollar = function(amount) {
      if (typeof amount !== "number") return "";
      return "$" + (amount / 100).toFixed(2);
    };
  }
};

export default HelperUtils;
