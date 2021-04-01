const confirmContact = document.getElementById("confirmContact");
const confirmProducts = document.getElementById("confirmProducts");
let confirmMessage = [];

//Appel du tableau contact dans le localStorage
let validationContact = localStorage.getItem("contact");
validationContact = JSON.parse(validationContact);
console.log(validationContact);

//Appel du tableau products dans le localStorage
let validationProducts = localStorage.getItem("products");
validationProducts = JSON.parse(validationProducts);
console.log(validationProducts);

confirmContact.innerHTML = `
    <p class="text-center mt-5">Merci ${validationContact.firstName} pour votre commande</p>
    <p class="text-center mt-3">Voici un récapitulatif de votre commande :</p>
    <div  class="cardBasket mt-5">
        <img src="${
            validationProducts.imageUrl
        }" witdh="120" height="80" alt="photo du produit" class="mb-3">
        <p class="my-auto">${validationProducts.name}</p>
        <p class="my-auto">Couleur : ${validationProducts.option}</p>
        <p class="my-auto totalArticle">
            Prix : ${validationProducts.quantity * validationProducts.price}
        </p>
    </div>
`