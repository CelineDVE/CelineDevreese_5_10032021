const resultsCard = document.getElementById('resultsCard');

let teddies;

// Appel de l'API via fetch
const fetchTeddies = async() => {
    teddies = await fetch("http://localhost:3000/api/teddies")
    .then((res) => res.json());
};

const showTeddies = async() => {
    await fetchTeddies();
    //HTML des éléments des produits
    resultsCard.innerHTML = teddies
      .map(
        (teddy) =>
          `
            <div class="col-12 col-lg-6" >
              <aricle class="card mb-3">
                  <img class="card-img-top"src="${teddy.imageUrl}"></img>
                  <div class="card-body">
                      <h2 class="card-title">${teddy.name}</h2>
                      <p class="card-text">${teddy.description}</p>
                      <p class="text-right font-weight-bold mb-0">${priceWithCommas(
                        teddy.price
                      )} €</p>
                  </div>
                  <a href="produit.html?${teddy._id}" class="stretched-link" title="Cliquer pour voir le produit"></a>
              </article>
            </div>
          `
      )
      .join("");
};

showTeddies();

//Pour mettre une virgule dans le prix à la dizaine
function priceWithCommas(x){
    return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}