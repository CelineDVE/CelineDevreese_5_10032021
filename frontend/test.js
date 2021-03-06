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
const dataFormLocalStorage = localStorage.getItem("contact");
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


            for (let j = 0; j < elementsInStorage.length; j++) {
              if (
                elementsInStorage[j]._id == data._id &&
                elementsInStorage[j].colors == data.colors
              ) {
                elementsInStorage[j].quantity += data.quantity;
              } else {
                elementsInStorage.push(elementsProduct);
                break;
              }
            }

// Formulaire 

let contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  address: address.value,
  city: city.value,
  email: email.value
};


//Récupérer l'orderId
const urlOrder = `http://localhost:3000/api/teddies/order`;

const myInit = { 
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contact: contact,
      products: products
    })
  };

fetch (urlOrder, myInit)
  .then(response => response.json())
  .then(order => {
    localStorage.setItem("orderId", order.orderId);
  })


// Garder les éléments dans le formulaire
const dataContact = localStorage.getItem("contact");
const dataContactLS = JSON.parse(dataContact);

document.getElementById("firstName").value = dataContactLS.firstName;
document.getElementById("lastName").value = dataContactLS.lastName;
document.getElementById("address").value = dataContactLS.address;
document.getElementById("city").value = dataContactLS.city;
document.getElementById("email").value = dataContactLS.email;


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

  console.log(data);
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

if (dataContact) {
document.getElementById("firstName").value = dataContactLS.firstName;
document.getElementById("lastName").value = dataContactLS.lastName;
document.getElementById("address").value = dataContactLS.address;
document.getElementById("city").value = dataContactLS.city;
document.getElementById("email").value = dataContactLS.email;
}
//******************************************//


for (o=0; o < elementsProduct.lenght; o++) {
  if (elementsProduct[o]._id == elementsInStorage._id && elementsProduct[o].option == elementsInStorage.option) {
      elementsProduct[o].quantity += elementsInStorage.quantity;
  } else {
      elementsInStorage.push(elementsProduct);
      localStorage.setItem("products", JSON.stringify(elementsInStorage)); 
  }
}

fetch(urlOrder, myInit)
    .then(response => {
      if (response.ok) {
        response.json()
        .then((order) => {
          localStorage.removeItem("data");
          localStorage.setItem("orderId", order.orderId);
          window.location.href = "validation.html";
        });
      } else {
        alert ("Merci de remplir tous les champs du formulaire")
      }
    }) 

    for (p = 0; p < input.length; p++) {
      if (productsCart && input[p].checkValidity() === true) {
        submitBtn.addEventListener("click", (event) => {
          event.preventDefault();
          sentOrder();
        })
      }else {
        console.log("bad check");
      }
    }

     if (/^[a-z- A-Z]{3,30}$/.test(firstName)) {
      console.log("firstnameok");
   
    } else {
      console.log("firstnamebad");
      
    }

  function lastNameCheck (){
    if (/^[a-z A-Z]{3,30}$/.test(lastName)) {
    console.log("lastnameok");
    return true;
    } else {
      console.log("lastnamebad");
      return false;
    }
  };
  function addressCheck () {
    if (/^[0-9 a-z A-Z]{3,30}$/.test(address)) {
      console.log("addressok");
      return true;
    } else {
      console.log("addressbad");
      return false;
    }
  };
  function cityCheck() {
    if (/^[0-9 a-z A-Z]{3,30}$/.test(city)) {
    console.log("cityok");
    return true;
    } else {
      console.log("citybad");
      return false;
    }
  };
  function emailCheck () {
    if(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(email)) {
      console.log("emailok");
      return true;
    } else {
      console.log("emailbad");
      return false;
    }
  };