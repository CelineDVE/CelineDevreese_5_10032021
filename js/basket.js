const elementsInBasket = document.getElementById("elementsInBasket");
let productsInBasket = [];

//Appel du tableau dans le localStorage
let productsCart = localStorage.getItem("products");
productsCart = JSON.parse(productsCart);

if (productsCart === null) {
  elementsInBasket.innerHTML = ` 
      <div class="nullBasket text-size font-weight-bold">
          <p>Le panier est vide</p>
      </div>
    `;
} else {
  for (i = 0; i < productsCart.length; i++) {
    productsInBasket =
      productsInBasket +
      `
        <article  class="cardBasket mt-5">
              <img src="${
                productsCart[i].imageUrl
              }" witdh="120" height="80" alt="photo du produit" class="mb-3">
              <p class="my-auto">${productsCart[i].name}</p>
              <p class="my-auto">Couleur : ${productsCart[i].option}</p>
              <div id="quantity" class="my-auto">
                <span class="ml-1 mr-1">${productsCart[i].quantity}</span>
              </div>
              <p class="my-auto totalArticle">
                Prix : ${priceWithCommas(
                  productsCart[i].quantity * productsCart[i].price
                )}
              </p>
              <i id="remove" class="fas fa-trash-alt my-auto"></i>
        </article>
      `
    ;
  }
  
  if (i === productsCart.length) {
    elementsInBasket.innerHTML = productsInBasket;
  };

  //Supprimer 1 article à la fois du panier
  let removeElement = document.querySelectorAll("#remove");

  for (let j = 0; j < removeElement.length; j++) {
    removeElement[j].addEventListener("click", (event) => {
      event.preventDefault();
      let deleteElement = productsCart.splice(j, 1);
      localStorage.clear(deleteElement);
      window.location.reload();
      console.log("deleteElement");

    });
  }
  //**********************//


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
};

//Montant total du panier 
const totalPriceHtml = document.getElementById("totalPrice");
let totalPriceArray = [];


for (let k = 0; k < productsCart.length; k++) {
    let priceBasket = productsCart[k].price;
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
};
//******************************************//

// Formulaire 
const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    }
    
  localStorage.setItem("contact", JSON.stringify(contact));

  let products = [];
    productsCart.forEach(product => {
    products.push(product.id);
  });

  const data = {
    contact: contact,
    products,
  }; 

  //Récupérer l'orderId
  const urlOrder = `http://localhost:3000/api/teddies/order`;
  const myInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch (urlOrder, myInit)
    .then(response => response.json())
    .then(order => {
      localStorage.removeItem("data");
      localStorage.setItem("orderId", order.orderId);
      window.location.href = "validation.html";
    })
});

// Garder les éléments dans le formulaire
const dataContact = localStorage.getItem("contact");
const dataContactLS = JSON.parse(dataContact);

document.getElementById("firstName").value = dataContactLS.firstName;
document.getElementById("lastName").value = dataContactLS.lastName;
document.getElementById("address").value = dataContactLS.address;
document.getElementById("city").value = dataContactLS.city;
document.getElementById("email").value = dataContactLS.email;
//******************************************//







