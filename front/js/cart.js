 // Déclaration de la variable dans laquelle on met la key et les values dans le local Strorage
 const productLocalStorage = JSON.parse(localStorage.getItem("product"));
 console.table(productLocalStorage); // tous les produits présent dans le locageStorage


 let arrayPrice = [];
 let arrayQuantity = [];



 


 for(let product in productLocalStorage) { // 1 product parmis tous les products
     //article
     let productArticle = document.createElement("article");
     document.querySelector("#cart__items").appendChild(productArticle);
     productArticle.classList = "cart__item";
     productArticle.setAttribute("data-id", "{product.productId}"); // attribut ID
     productArticle.setAttribute("data-color", "{product.productColor}");

     console.log(productArticle);
     
     //  div image
     let cartItemImg = document.createElement("div");
     document.querySelector(".cart__item").appendChild(cartItemImg);
     cartItemImg.classList = "cart__item__img";

     // image
     let productImg = document.createElement("img");
     document.querySelector(".cart__item__img").appendChild(productImg);
     productImg.src = productLocalStorage[product].productImg;
     productImg.alt = productLocalStorage[product].productImg_alt;

     // div cart item
     let cartItemContent = document.createElement("div");
     document.querySelector(".cart__item").appendChild(cartItemContent);
     cartItemContent.classList = "cart__item__content";

     // cart item content description
     let cartItemContentDescription = document.createElement("div");
     document.querySelector(".cart__item__content").appendChild(cartItemContentDescription);
     cartItemContentDescription.classList = "cart__item__content__description";

     // title h2
     let productTitle = document.createElement("h2");
     document.querySelector(".cart__item__content__description").appendChild(productTitle);
     productTitle.innerHTML = productLocalStorage[product].productName;

     // p color
     let productColor = document.createElement("p");
     document.querySelector(".cart__item__content__description").appendChild(productColor);
     productColor.innerHTML = productLocalStorage[product].productColor;

     // p Price
     let productPrice = document.createElement("p");
     document.querySelector(".cart__item__content__description").appendChild(productPrice);
     productPrice.innerHTML = productLocalStorage[product].productPrice+` €`;

     // cart item content settings
     let cartItemContentSettings = document.createElement("div");
     document.querySelector(".cart__item__content").appendChild(cartItemContentSettings);
     cartItemContentSettings.classList = "cart__item__content__settings";

      // cart item content settings quantity
      let cartItemContentSettingsQuantity = document.createElement("div");
      document.querySelector(".cart__item__content__settings").appendChild(cartItemContentSettingsQuantity);
      cartItemContentSettingsQuantity.classList = "cart__item__content__settings__quantity";

     // p Quantity
     let nameQuantity = document.createElement("p");
     document.querySelector(".cart__item__content__settings__quantity").appendChild(nameQuantity);
     nameQuantity.innerHTML = `Quantité : `;                                 

     // input
     let productInput = document.createElement("input");
     document.querySelector(".cart__item__content__settings__quantity").appendChild(productInput);
     productInput.classList = "itemQuantity";
     // productInput.Name = "itemQuantity";
     productInput.setAttribute("type","number");
     productInput.setAttribute("min","1");
     productInput.setAttribute("max","100");
     productInput.value = productLocalStorage[product].productQuantity;

      // div delete
      let productSettingsDelete = document.createElement("div");
      document.querySelector(".cart__item__content__settings").appendChild(productSettingsDelete);
      productSettingsDelete.classList = "cart__item__content__settings__delete";
      
      // p delete item
      let deleteItem = document.createElement("p");
      document.querySelector(".cart__item__content__settings__delete").appendChild(deleteItem);
      deleteItem.classList = "deleteItem";
      deleteItem.innerHTML = "Supprimer";

    // Action : Supprimer le produit depuis le panier
        function deleteProduct() {
            const btn_delete = document.querySelector(".deleteItem"); // recupérer TOUS les btn "supprimer"
            console.log(btn_delete);
    
            for (let i = 0; i < btn_delete.length; i++){ // iteration pour chaque btn_delete
            // Ceci sera exécuté i fois
            // À chaque éxécution, la variable "btn_delete" augmentera de 1
            // Lorsque'elle sera arrivée à i, le boucle se terminera.
            btn_delete[i].addEventListener("click" , (event) => { // action lors d'un click
            event.preventDefault(); // annule l'effet par default (recharger la page)
            product.splice(i, 1); // supprime le dernier element                 
            localStorage.setItem("product", JSON.stringify(productLocalStorage)); // converti un objet JS en texte lisible
                
                            // Alerte produit supprimé et refresh
                            // alert("Ce produit a bien été supprimé du panier");
                            // location.reload(); // recharge la page
            })
                
        deleteProduct()       
 
            }
        }


   
     // déclarer un tableau Price et quantityvant la boucle for a puis retourner les données nécessaires

      arrayQuantity.push(parseInt(productLocalStorage[product].productQuantity));
      let totalQuantity = arrayQuantity.reduce(function(a,b){ // fonction addition toutes les quantités
          return a+b;
      });
      arrayPrice.push(parseInt(productLocalStorage[product].productQuantity)*parseInt(productLocalStorage[product].productPrice)); // fontion multiplication quantité x prix
      let totalPrice = arrayPrice.reduce(function(a,b){
          return a+b;
      })

          // Total article
     
      let totalArticle = document.querySelector("#totalQuantity");
      totalArticle.innerHTML = totalQuantity;

      // Total price
      let totalArticlePrice = document.querySelector("#totalPrice");
      totalArticlePrice.innerHTML = totalPrice; 

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


      const submit = document.querySelector("#order"); // btn commander regroupe les différents inputs

      submit.addEventListener("click",(Event)=> { // action click sur les différents inputs
          if(!firstName.value) { // si firstName est null
             firstNameErrorMsg.innerHTML = "Veuillez renseigner le prénom" ;// alors afficher texte "suivant"
          }if(!lastName.value) {
              lastNameErrorMsg.innerHTML = "Veuillez renseigner votre nom de famille" ;
          }if(!address.value) {
              addressErrorMsg.innerHTML = "Veuillez renseigner votre adresse postale" ;
          }if(!city.value) {
              cityErrorMsg.innerHTML = "Veuillez renseigner votre ville" ;
          }if(!email.value) {
              emailErrorMsg.innerHTML = "veuillez renseigner votre adresse mail" ;
          }else {

            window.location.href = "confirmation.html" ;                      
          } ;                                     
      })

      

 
    }
 