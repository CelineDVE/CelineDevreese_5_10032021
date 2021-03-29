
const elementsInBasket = document.getElementById("elementsInBasket");
let productInBasket = [];

//Appel du tableau dans le localStorage
let products = localStorage.getItem("products");
products = JSON.parse(products);


if (products === null) {
  elementsInBasket.innerHTML = ` 
      <div class="nullBasket text-size font-weight-bold">
          <p>Le panier est vide</p>
      </div>
    `;
} else {
  for (i = 0; i < products.length; i++) {
    productInBasket =
      productInBasket +
      `
          <article  class="cardBasket mt-5">
                <img src="${
                  products[i].imageUrl
                }" witdh="120" height="80" alt="photo du produit" class="mb-3">
                <p class="my-auto">${products[i].name}</p>
                <p class="my-auto">Couleur : ${products[i].option}</p>
                <div id="quantity" class="my-auto">
                    <i class="fas fa-caret-square-left"></i>
                    <span class="ml-1 mr-1">${products[i].quantity}</span>
                    <i class="fas fa-caret-square-right"></i>
                </div>
                <p class="my-auto totalArticle">
                  Prix : ${priceWithCommas(
                    products[i].quantity * products[i].price
                  )}
                </p>
                <i id="remove" class="fas fa-trash-alt my-auto"></i>
            </article>
        `
    ;
  }
  if (i === products.length) {
    elementsInBasket.innerHTML = productInBasket;
  }

  

  // Pour supprimer tous les articles du panier en 1 clic
  //HTML du bouton
  const btnRemoveAll = `
      <button name="removeAll" type="submit" id="removeAll" class="btn ml-5 mt-5">
        Vider le panier
        <i class="fas fa-trash-alt my-auto ml-1"></i>
      </button>
      `;

  //injecter le HTML du bouton dans le HTML de la structure du panier
  elementsInBasket.insertAdjacentHTML("beforeend", btnRemoveAll);

  let removeAll = document.getElementById("removeAll");

  removeAll.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("products"); //supprime les éléments du localStorage
    window.location.href = "panier.html"; //recharge la page
  });
  //**********************//
}

//Montant total du panier 
const totalPriceHtml = document.getElementById("totalPrice");
let totalPriceArray = [];

for (let k = 0; k < products.length; k++) {
  let priceBasket = products[k].price;
  totalPriceArray.push(priceBasket);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceArray.reduce(reducer,0);
const priceHTML =  `
  <div id="totalPrice" class="text-right text-size mr-5 font-weight-bold">
    Montant total du panier : ${totalPrice / 100},00 €
  </div>
  `;

elementsInBasket.insertAdjacentHTML("beforeend", priceHTML);
//**********************//

//Pour mettre une virgule dans le prix à la dizaine
function priceWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}
// Formulaire 



