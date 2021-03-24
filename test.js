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
    let deleteElement = products.splice(0, 1);
    //window.location.href = "panier.html";
    console.log(deleteElement);
  });
}
//**********************//