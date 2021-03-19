

//Pour mettre une virgule dans le prix à la dizaine
function priceWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}