const resultImage = document.getElementById("imgProduct");

let teddies;

const fetchTeddies = async () => {
  teddies = await fetch("http://localhost:3000/api/teddies").then((res) =>
    res.json()
  );
};

const showTeddies = async () => {
  await fetchTeddies();

  resultImage.innerHTML = teddies
    .map(
      (teddy) =>
        `
            <div class="col-12 col-lg-6" >
              <div class="card mb-3">
                  <img class="card-img-top"src="${teddy.imageUrl}"></img>
              </div>
            </div>
          `
    )
    .join("");
};

showTeddies();


let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    console.log(this);
    if (this.readyState == 4 && this.status == 200) {
        resultImage.innerHTML = JSON.stringify(this.response);
    }
}

request.open("GET", "http://localhost:3000/api/teddies/" + id);
request.responseType = "json";
request.send();

//Récupérer la chaîne de caractère de l'id dans l'URL
const stringUrlId = window.location.search;
console.log(stringUrlId);

//Suppression du point d'interrogation pour ne garder que l'id
const id = stringUrlId.slice(1);
console.log(id);

const resultImage = document.getElementById("imgProduct");

//Appel AJAX pour récupérer les informations sur les produits dans l'API.
let request = new XMLHttpRequest();

request.onreadystatechange = function () {
  console.log(this);
  if (this.readyState == 4 && this.status == 200) {
    resultImage.innerHTML = JSON.stringify(this.response);
  }
};

request.open("GET", "http://localhost:3000/api/teddies/" + id); //ajout de l'id pour cibler les informations de chaque peluche.
request.responseType = "json";
request.send();


const idProduct = fetch(url)
  .then((response) => response.text())
  .then(console.log);