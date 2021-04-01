const confirmContact = document.getElementById("confirmContact");
const confirmProducts = document.getElementById("confirmProducts");

confirmContact.innerHTML = `
    <p class="text-center mt-5">Merci ${JSON.parse(localStorage.getItem("contact")).firstName} pour votre commande <strong>n°${localStorage.getItem("orderId")}</strong></p>
    <p class="text-center mt-3">Voici un récapitulatif de votre commande :</p>`

confirmProducts.innerHTML = `
<ul>
    <li>${JSON.parse(localStorage.getItem("products")).name}</li>
    <li></li>
    <li></li>
</ul>
`



        