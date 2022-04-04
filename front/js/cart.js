 // Déclaration de la variable de la key "product" present dans le local Storage
 const productLocalStorage = JSON.parse(localStorage.getItem("product"));
//  console.table(productLocalStorage); // tous les produits présent dans le locageStorage

 let productBuy = [] ; // creation tableau vide
 let sectionItems = document.getElementById("cart__items"); // definir le parent
 let arrayPrice = [];  // déclarer un tableau Price et quantity avant la boucle for a puis retourner les données nécessaires
 let arrayQuantity = [];


 for(let product in productLocalStorage) { // 1 product parmis tous les products
     
    let productArticle = document.createElement("article");
        productArticle.classList.add("cart__item");
        productArticle.setAttribute("data-id", "{productLocalStorage[product].productId}"); // attribut ID
        productArticle.setAttribute("data-color", "{productLocalStorage[product].productColor}");

        productBuy.push(productLocalStorage[product].productId); // injecter la valeur ID
        // console.table(productBuy);


        productArticle.innerHTML = 
        `<div class="cart__item__img">
            <img src="${ productLocalStorage[product].productImg}" alt="${productLocalStorage[product].productImg_alt}">
            </div>
         <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h2>${productLocalStorage[product].productName} - ${productLocalStorage[product].productColor}</h2>
                <p>${productLocalStorage[product].productPrice} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage[product].productQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>`;
        sectionItems.appendChild(productArticle);


        changeQuantity()
        updateCart(product)
        
        

  
                  
        }

   // identifier les champs du formulaire 

   let firstName = document.querySelector("#firstName");
   let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

   let lastName = document.querySelector("#lastName");
   let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

   let address = document.querySelector("#address");
   let addressErrorMsg = document.querySelector("#addressErrorMsg");

   let city = document.querySelector("#city");
   let cityErrorMsg = document.querySelector("#cityErrorMsg");

   let email = document.querySelector("#email");
   let emailErrorMsg = document.querySelector("#emailErrorMsg");

 // METHODE POST // onglet network(reseau)

 let order = document.getElementById("order");

     order.addEventListener("click",(Event)=> {
         if(!firstName.value) { // si il y a rien d'écrit dans le input
             firstNameErrorMsg.innerHTML = "Veuillez renseigner le prénom" ;// alors afficher texte
         }if(!lastName.value) {
              lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom de famille" ;
         }if(!address.value) {
             addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse postale" ;
         }if(!city.value) {
             cityErrorMsg.innerHTML = "Veuillez renseigner votre ville" ;
         }if(!email.value) {          
             emailErrorMsg.innerHTML = "veuillez renseigner votre adresse mail" ;
         }else {                    
             // toutes les conditions ci-dessus sont validées alors methode creation d'un numero de commande (orderId)s

                 fetch("http://localhost:3000/api/products/order/", { // URL/order (voir documentation parametres des API)
                     method: "POST",
                     headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json",
                     },
                     // Objet JSON => STRING
                     body: JSON.stringify({
                        contact:{
                            firstName: firstName.value,
                            lastName: lastName.value,
                            address: address.value,
                            city: city.value,
                            email: email.value
                            }, 
                            products:productBuy 
                        })  
                    })
                    // identifie la réponse du serveur API
                    .then((response) => {
                        // mettre la reponse en 200 - accepter/true
                        if(response.ok){ ;
                           return response.json()
                        }
                        else{
                            console.log(response);
                           alert("Une Erreur c'est produite lors de la creation...");
                        }     
                    })

                  .then(responseAPI => { // Que faire avec cette réponse ? orderID
                    console.log("respondeAPI : "+responseAPI.orderId);
                    localStorage.clear();                  
                   location.href = `../html/confirmation.html?orderId=${responseAPI.orderId}`;
                
                    })
                    .catch((error) => {
                        alert (error.message);
                    });
                 
               }        
         }) ; 

         
deleteProduct()




    
    

// ****************** TOUTES LES FONCTIONS ******************************


 //Met à jour le panier quand un produit vient à être supprimé ou quand l'utilisateur change la quantité d'un produit
 function updateCart(product){

    arrayQuantity.push(parseInt(productLocalStorage[product].productQuantity));
    let totalQuantity = arrayQuantity.reduce(function(a,b){ // fonction addition toutes les quantités
        return a+b;
    });
    arrayPrice.push(parseInt(productLocalStorage[product].productQuantity)*parseInt(productLocalStorage[product].productPrice)); // fontion multiplication quantité x prix
    let totalPrice = arrayPrice.reduce(function(a,b){
        return a+b;
    })

    let totalArticles = document.querySelector("#totalQuantity");
    totalArticles.innerHTML = totalQuantity;

    let totalArticlesPrice = document.querySelector("#totalPrice");
    totalArticlesPrice.innerHTML = totalPrice;
}

//Met à jour le panier quand on modifie la quantité
function changeQuantity() {
    // je cible la class de l'input
    let itemQuantity = document.querySelector(".itemQuantity");
    // je parcours toutes les champs "Quantity" de chaque produit
    for (let q = 0; q < itemQuantity.length; q++) {
        let changeQuantity = itemQuantity[q] ;
    // lorsque je change la value de l'input - la MAJ se fait automatiquement
        changeQuantity.addEventListener('change', (event) => {
            itemQuantity.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
            value="${event.target.value}">`;
        // quantité du produit devient le nouveau chiffre présent dans l'input
        productLocalStorage[q].productQuantity = Number(changeQuantity.value);
        //  converti OBJET => JSON
        localStorage.setItem("product", JSON.stringify(productLocalStorage));
        // MAJ avec la fonction UpdateCart
        updateCart(product)
        })
        
    }} ;



// CLEAR PANIER
   function clearCart(product){
    localStorage.clear();

    let cart = document.getElementById("cart__items");

    cart.removeChild(product);

    updateCart(product);

    window.location(reload);
  }

// Action : Supprimer le produit depuis le panier
  function deleteProduct() {
    let btn_delete = document.querySelectorAll(".deleteItem"); // recupérer TOUS les btn "supprimer"
    console.log(btn_delete);


    for (let i = 0; i < btn_delete.length; i++){ // iteration pour chaque btn_delete
    // // Ceci sera exécuté i fois
    // // À chaque éxécution, la variable "btn_delete" augmentera de 1
    // // Lorsque'elle sera arrivée à i, le boucle se terminera.
    let deleteOne = btn_delete[i] ;

    deleteOne.addEventListener("click" , (event) => { // action lors d'un click
    productLocalStorage.splice(i,1); // supprime le dernier element                 
    localStorage.setItem("product", JSON.stringify(productLocalStorage)); // converti un objet JS en texte lisible
    
    window.location.reload()                             
    })
    }
}
// validate e-mail
function validateEmail(email){
    let regex = /^[A-Za-z0-9_-]+@\w+\.[a-z]+$/;
    console.log(regex.test(email));
    return regex.test(email);
  }



// test ************************************

// test ************************************


// composition article

//article
// let productArticle = document.createElement("article");
// document.querySelector("#cart__items").appendChild(productArticle);
// productArticle.classList = "cart__item";
// productArticle.setAttribute("data-id", productLocalStorage[product].productId); // attribut ID
// productArticle.setAttribute("data-color", productLocalStorage[product].productColor);


//  console.log(productArticle.dataset); // récuperer id + color

// //  div image
// let cartItemImg = document.createElement("div");
// document.querySelector(".cart__item").appendChild(cartItemImg);
// cartItemImg.classList = "cart__item__img";

// // image
// let productImg = document.createElement("img");
// document.querySelector(".cart__item__img").appendChild(productImg);
// productImg.src = productLocalStorage[product].productImg;
// productImg.alt = productLocalStorage[product].productImg_alt;

// // div cart item
// let cartItemContent = document.createElement("div");
// document.querySelector(".cart__item").appendChild(cartItemContent);
// cartItemContent.classList = "cart__item__content";

// // cart item content description
// let cartItemContentDescription = document.createElement("div");
// document.querySelector(".cart__item__content").appendChild(cartItemContentDescription);
// cartItemContentDescription.classList = "cart__item__content__description";

// // title h2
// let productTitle = document.createElement("h2");
// document.querySelector(".cart__item__content__description").appendChild(productTitle);
// productTitle.innerHTML = productLocalStorage[product].productName;

// // p color
// let productColor = document.createElement("p");
// document.querySelector(".cart__item__content__description").appendChild(productColor);
// productColor.innerHTML = productLocalStorage[product].productColor;

// // p Price
// let productPrice = document.createElement("p");
// document.querySelector(".cart__item__content__description").appendChild(productPrice);
// productPrice.innerHTML = productLocalStorage[product].productPrice+` €`;

// // cart item content settings
// let cartItemContentSettings = document.createElement("div");
// document.querySelector(".cart__item__content").appendChild(cartItemContentSettings);
// cartItemContentSettings.classList = "cart__item__content__settings";

//  // cart item content settings quantity
//  let cartItemContentSettingsQuantity = document.createElement("div");
//  document.querySelector(".cart__item__content__settings").appendChild(cartItemContentSettingsQuantity);
//  cartItemContentSettingsQuantity.classList = "cart__item__content__settings__quantity";

// // p Quantity
// let nameQuantity = document.createElement("p");
// document.querySelector(".cart__item__content__settings__quantity").appendChild(nameQuantity);
// nameQuantity.innerHTML = `Quantité : `;                                 

// // input
// let productInput = document.createElement("input");
// document.querySelector(".cart__item__content__settings__quantity").appendChild(productInput);
// productInput.classList = "itemQuantity";
// // productInput.Name = "itemQuantity";
// productInput.setAttribute("type","number");
// productInput.setAttribute("min","1");
// productInput.setAttribute("max","100");
// productInput.value = productLocalStorage[product].productQuantity;

//  // div delete
//  let productSettingsDelete = document.createElement("div");
//  document.querySelector(".cart__item__content__settings").appendChild(productSettingsDelete);
//  productSettingsDelete.classList = "cart__item__content__settings__delete";
 
//  // p delete item
//  let deleteItem = document.createElement("p");
//  document.querySelector(".cart__item__content__settings__delete").appendChild(deleteItem);
//  deleteItem.classList = "deleteItem";
//  deleteItem.innerHTML = "Supprimer";