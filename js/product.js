const resultProductId = document.getElementById("resultProduct");
const selectColors = document.getElementById("selectColors");
const idName = document.getElementById("name");
const addBasket = document.getElementById("addBasket");

//Récupérer la chaîne de caractère de l'id dans l'URL
const stringUrlId = window.location.search;

//Suppression du point d'interrogation pour ne garder que l'id
const id = stringUrlId.slice(1);

//Ajout de l'id à l'URL
const urlId = `http://localhost:3000/api/teddies/${id}`;

//Appel fetch de l'API avec l'id dans l'url pour sélectionner 1 seul produit
fetch(urlId)
    .then(response => response.json()) 
    .then(data => {
// HTML des éléments avec le lien vers l'API
        resultProductId.innerHTML = ` 
                <div class="col-12 text-center">
                    <h2 class="mt-3">${data.name}</h2>
                </div>
                <div class="col-12">
                <div class="card mt-3">
                    <img class="card-img-top"src="${data.imageUrl}"></img>
                </div>
                </div>
                <div class="col-12 my-auto">
                    <div class card">
                        <div class="card-body text-center mt-3">
                            <p class="card-text">${data.description}</p>
                            <p class="price text-size font-weight-bold mt-5">
                            ${priceWithCommas(data.price)} €</p>
                        </div>
                    </div>
                </div>
            `;
// Ajout du nom de la peluche pour le choix de la couleur
        idName.innerHTML = `${data.name}`;

// Construction des options pour la liste déroulante
        let option;
        Object.entries(data.colors).forEach(color => {
            option = document.createElement("option");
            option.text = color[1];
            option.value = color[0];
            selectColors.add(option);
        });
// Ajout des éléments sur le produit au clic "Ajouter au panier"        
        addBasket.addEventListener("click", (event) => {
            event.preventDefault();
            const valOption = selectColors.options[selectColors.selectedIndex].text; //Pour afficher la couleur choisit
            let elementsProduct = {
                imageUrl : data.imageUrl,
                id : data._id,
                name : data.name,
                option : valOption,
                quantity : 1,
                price : data.price,
            }
// Envoi des éléments dans le localStorage 
            let elementsInStorage = JSON.parse(localStorage.getItem("products")); //Convertir en format JSON les éléments dans le local storage
            for (let i = 0; i < elementsInStorage.length; i++) {
              if (
                elementsInStorage[i]._id == elementsProduct._id &&
                elementsInStorage[i].colors == elementsProduct.colors
              ) {
                elementsInStorage[i].quantity += elementsProduct.quantity;
              } else {
                elementsInStorage.push(elementsProduct);
                break;
              }
            }
        });
    })
;

//Pour mettre une virgule dans le prix à la dizaine
function priceWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}



