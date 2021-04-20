const confirmContact = document.getElementById("confirmContact");
const confirmProducts = document.getElementById("confirmProducts");
let recap = [];

//Appel du tableau dans le localStorage
let productsCart = JSON.parse(localStorage.getItem("products"));

if (productsCart == null) {
    confirmProducts.innerHTML = `<p class="mt-5">Votre commande n'est pas valide</p>`;
} else {
    for (m=0; m < productsCart.length; m++) {
        confirmContact.innerHTML = `
            <p class="mt-5 text-size">Merci ${JSON.parse(localStorage.getItem("contact")).firstName} pour votre commande <strong>n°${localStorage.getItem("orderId")}.</strong></p>
            <p class="text-left ml-5 mt-5">Voici un récapitulatif de votre commande :</p>`;
        recap =
          recap +
          `
        <article  class="cardBasket mt-5">
          <img src="${
            productsCart[m].imageUrl
          }" witdh="120" height="80" alt="photo du produit" class="mb-3">
          <p class="my-auto">${productsCart[m].name}</p>
          <p class="my-auto">${productsCart[m].option}</p>
          <div id="quantity" class="my-auto">
            <span class="ml-1 mr-1">${productsCart[m].quantity}</span>
          </div>
          <p class="my-auto totalArticle">${productsCart[m].price / 100},00 €</p>
        </article>`
    }
    if (m === productsCart.length) {
    confirmProducts.innerHTML = recap;
    } 
};

//Montant total du panier 
const recapTotalPrice = document.getElementById("recapTotalPrice");
let totalPriceArray = [];

for (let n = 0; n < productsCart.length; n++) {
  let priceBasket = productsCart[n].price;
  totalPriceArray.push(priceBasket);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceArray.reduce(reducer,0);
const priceHTML =  `
  <div id="totalPrice" class="text-right mt-5 mr-5 font-weight-bold">
    Montant total de la commande : ${totalPrice / 100},00 €
  </div>
  `;

recapTotalPrice.insertAdjacentHTML("beforeend", priceHTML);
//**********************//

//Supprimer les éléments du LocalStorage, fin de la commande
function clearLocalStorage() {
	localStorage.clear();
}
clearLocalStorage();