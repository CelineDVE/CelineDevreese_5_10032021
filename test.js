function initBasket() {
  var basket = localStorage.getItem("basket");
  if (basket != null) {
    return JSON.parse(basket);
  } else {
    return [];
  }
}

function addToBasket(product) {
  var basket = initBasket();
  var product = basket.find((product) => product.id == id);
  if ()
  basket.push(product);
  saveBasket(basket);
}

function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
