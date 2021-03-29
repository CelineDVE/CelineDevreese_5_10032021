for (let i = 0; i < products.length; i++) {
  elementsInBasket.innerHTML = `
        <img src="" alt="">
            <p>${products.name}</p>
            <p>option</p>
            <p>price</p>
            <i class="fas fa-trash-alt"></i>
        `;
}

const elementsInBasket = document.getElementById("elementInBasket");

//Appel du tableau dans le localStorage
let products = localStorage.getItem("product");
products = JSON.parse(products);
console.log(products);

if (products === null) {
  console.log("Vous n'avez pas sélectionné de produit");
} else {
  console.log("Voici vos produits");
}

for (let i = 0; i < products.length; i++) {
  document.write(products[i].name);
}

for (let j = 0; j < removeElement.length; j++) {
  removeElement[j].addEventListener("click", (event) => {
    event.preventDefault();
    let removeElementId = products[j].id;
    console.log(removeElementId);
  });
}



// BASKET 





let carts = document.querySelectorAll(".add-cart");

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".navBasket span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".navBasket span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".navBasket span").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  console.log("Inside of SetItems function");
  console.log("My Product is", product);
}

onLoadCartNumbers(); 


//Supprimer 1 artcile à la fois du panier
let removeElement = document.querySelectorAll("#remove");
console.log(removeElement);

for (let j = 0; j < removeElement.length; j++) {
  removeElement[j].addEventListener("click", (event) => {
    event.preventDefault();
    let deleteElement = products.splice(j, 1);
    window.location.reload();
    console.log(deleteElement);
    localStorage.clear();
    window.location.reload();
  });
}
//**********************//


//Garder les valeurs dans le formulaire 
const dataFormLocalStorage = localStorage.getItem("form");
const dataFormInLocalStorage = JSON.parse(dataFormLocalStorage);

document.getElementById("firstName").value = dataFormInLocalStorage.firstName;
document.getElementById("lastName").value = dataFormInLocalStorage.lastName;
document.getElementById("address").value = dataFormInLocalStorage.address;
document.getElementById("city").value = dataFormInLocalStorage.city;
document.getElementById("email").value = dataFormInLocalStorage.email;
//*****************************************//``


for (let i = 0; i < panier.length; i++) {
  if (panier[i].id == produit.id && panier[i].color == produit.color) {
    panier[i].quantite += produit.quantite;
  } else {
    panier.push(produit);
    break;
  }
}
//Fonction ajout du produit dans le panier 
 for (let i = 0; i < data.length; i++) {
   if (data[i].id == products.id && data[i].colors == products.colors) {
     data[i].quantity += products.quantity;
   } else {
     elementsInStorage.push(products);
     break;
   }
 }

 //Supprimer 1 article à la fois du panier
  let removeElement = document.querySelectorAll("#remove");
  console.log(removeElement);

  for (let j = 0; j < removeElement.length; j++) {
    removeElement[j].addEventListener("click", (event) => {
      event.preventDefault();
      let deleteElement = products.splice(j, 1);
      window.location.reload();
      console.log(deleteElement);
      localStorage.clear();
      window.location.reload();
    });
  }
  //**********************//

  //Fonction ajout du produit dans le panier 
            const addToBasket = () => {
                elementsInStorage.push(elementsProduct);
                localStorage.setItem("products", JSON.stringify(elementsInStorage)); 
            }
//Produits dans le localStorage, appel de la fonction
            if (elementsInStorage) {
                addToBasket();
            } else {
                elementsInStorage = [];
                addToBasket();
            }   