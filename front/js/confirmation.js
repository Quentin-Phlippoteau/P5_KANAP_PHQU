// URL ACTUELLE avec orderId
const queryString = window.location.search;
// selectionner le parametre qui est a été ajouté depuis l'adresse URL COMPLETE
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
if(urlParams.has("orderId")){
  console.log(orderId);
  // selectionner iD et modifier par le parametre à retourner.
  document.getElementById("orderId").innerText = urlParams.get("orderId");
}
