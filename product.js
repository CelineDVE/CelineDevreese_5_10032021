//Récupérer la chaîne de caractère de l'id dans l'URL
const stringUrlId = window.location.search;
console.log(stringUrlId);

//Suppression du point d'interrogation pour ne garder que l'id
const id = stringUrlId.slice(1);
console.log(id);

const urlId = `http://localhost:3000/api/teddies/${id}`;

console.log(urlId);

const resultProductId = document.getElementById("resultProduct");

fetch(urlId)
  .then(response => response.json())
  .then(data => {
    resultProductId.innerHTML = 
        `
            <div class="col-12 text-center">
                <h2 class="mt-3">${data.name}</h2>
            </div>
            <div class="col-12 col-lg-6">
              <div class="card mt-3">
                  <img class="card-img-top"src="${data.imageUrl}"></img>
              </div>
            </div>
            <div class="col-12 col-lg-6 my-auto">
                <div class card mt-3">
                    <div class="card-body text-center">
                        <p class="price text-size font-weight-bold ">${priceWithCommas(
                          data.price
                        )} €</p>
                        <p class="card-text">${data.description}</p>
                        <form>
                            Choisissez la couleur de ${data.name} : 
                            <select id="selectColors"></select>
                        </form>
                    </div>
                </div>
            </div>
        `;
    const selectColors = document.getElementById("selectColors");
    let option;
    Object.entries(data.colors).forEach(color => {
        option = document.createElement("option");
        option.text = color[1];
        option.value = color[0];
        selectColors.add(option);
    })
    })

function priceWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}