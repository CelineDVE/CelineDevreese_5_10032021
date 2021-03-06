const elementsInBasket = document.getElementById("elementsInBasket");
let productsInBasket = [];

//Appel du tableau dans le localStorage
let productsCart = JSON.parse(localStorage.getItem("products"));

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
          <p class="my-auto">${productsCart[i].option}</p>
          <div id="quantity" class="my-auto">
            <span class="ml-1 mr-1">${productsCart[i].quantity}</span>
          </div>
          <p class="my-auto totalArticle">${
            productsCart[i].price / 100
          },00 €</p>
        </article>
      `;
  }
  
  if (i === productsCart.length) {
    elementsInBasket.innerHTML = productsInBasket;
  };

  // Pour supprimer tous les articles du panier en 1 clic
  //HTML du bouton
  const btnRemoveAll = 
    `
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

if (productsCart) {
  for (let k = 0; k < productsCart.length; k++) {
      let priceBasket = productsCart[k].price;
      totalPriceArray.push(priceBasket);
  }
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


// Formulaire 
const submitBtn = document.getElementById("submit");
const input = document.querySelectorAll(".form-control");

// Fonction pour récupérer les éléments du form, préparer les éléments et les envoyer au serveur
function sentOrder() {
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  localStorage.setItem("contact", JSON.stringify(contact));

  let products = [];
  productsCart.forEach((product) => {
  products.push(product.id);
  });

  let data = {
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

  fetch(urlOrder, myInit)
    .then((response) => response.json())
    .then((order) => {
      localStorage.removeItem("data");
      localStorage.setItem("orderId", order.orderId);
      window.location.href = "validation.html";
    });
};
//*********** Fin de la fonction ************//

//Vérification du formulaire

//Appel de la fonction au clique du bouton après vérification du formulaire
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let
    firstName = document.getElementById("firstName").value,
    lastName = document.getElementById("lastName").value,
    address = document.getElementById("address").value,
    city = document.getElementById("city").value,
    email =  document.getElementById("email").value;

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  if (firstName == "" || lastName == "" || address == "" || city == "" || email == "") {
    alert("Merci de remplir tous les champs du formulaire")
  } else if(validateEmail(email)==false){
    alert("Adresse email incorrecte");
  }else {
    sentOrder();
  }
});


// Garder les éléments dans le formulaire
const dataContact = localStorage.getItem("contact");
const dataContactLS = JSON.parse(dataContact);

if (dataContact) {
  document.getElementById("firstName").value = dataContactLS.firstName;
  document.getElementById("lastName").value = dataContactLS.lastName;
  document.getElementById("address").value = dataContactLS.address;
  document.getElementById("city").value = dataContactLS.city;
  document.getElementById("email").value = dataContactLS.email;
}
//******************************************//