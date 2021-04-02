const confirmContact = document.getElementById("confirmContact");
const confirmProducts = document.getElementById("confirmProducts");
let recap = [];

//Appel du tableau dans le localStorage
let productsCart = localStorage.getItem("products");
productsCart = JSON.parse(productsCart);

if (productsCart == null) {
    confirmProducts.innerHTML = `<p class="mt-5">Votre commande n'est pas valide</p>`;
} else {
    for (m=0; m < productsCart.length; m++) {
        confirmContact.innerHTML = `
            <p class="mt-5 text-size">Merci ${JSON.parse(localStorage.getItem("contact")).firstName} pour votre commande <strong>n°${localStorage.getItem("orderId")}.</strong></p>
            <p class="text-left ml-5 mt-5">Voici un récapitulatif de votre commande :</p>`;
        recap = recap + `
            <ul id="recapProduct">
                <li>${productsCart[m].name}</li>
                <li>Couleur : ${productsCart[m].option}</li>
                <li>${productsCart[m].quantity}</li>
                <li>${productsCart[m].price / 100},00 €</li>
            </ul>`
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

function clearLocalStorage() {
	localStorage.clear();
}
clearLocalStorage();