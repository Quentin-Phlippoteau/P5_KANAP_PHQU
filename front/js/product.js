let str = document.URL; // retourne l'URL du document en format textuel (json)
let url = new URL(str); // stocke une nouvelle url à partir de str
let params = new URLSearchParams(url.search); // stocke url "initial" + texte supplementaire (non défini)
let productId = params.get("id"); // récupérer l'id de l'article

fetch("http://localhost:3000/api/products/" + productId) // stock l'url + id de l'article
    .then(response => response.json())
    .catch((error) => { // Message d'erreur
        let articlesContainer = document.querySelector(".items");
        articlesContainer.innerHTML = "Nous n'avons pas réussi à afficher le produit";
        articlesContainer.style.textAlign = "center";
        articlesContainer.style.padding = "10px";
    })

    .then(function (resultatAPI) { // fonction qui retourne les données de l'API
        const oneArticle = resultatAPI; // resultat de l'API pour un produit
        // console.table(oneArticle) // Array des données de l'API

        let productImg = document.createElement("img"); // création dla balise img
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = oneArticle.imageUrl;
        productImg.alt = oneArticle.altTxt;

        let productTitle = document.querySelector("#title"); // modification du h1 et non création
        productTitle.innerHTML = oneArticle.name;

        let productPrice = document.querySelector("#price"); // modification du span p
        productPrice.innerHTML = oneArticle.price;

        let productDescription = document.querySelector("#description"); // modification de p
        productDescription.innerHTML = oneArticle.description;


        for (let color of oneArticle.colors) { // Boucle pour récuperer les valeurs for..of 
            const productColor = document.createElement("option"); // création d'un element "option"
            document.querySelector("#colors").appendChild(productColor); // ajout de l'element option
            productColor.value = color; // ajout de lattribut value avec la réponse colors (index)
            productColor.innerHTML = color; // retourne la valeur de la proprité colors
            // console.table(oneArticle.colors) // tableau des choix des couleurs (afficher dans la console)       
        }

        // Gestion du pannier

        const colors = document.querySelector("#colors");
        const quantity = document.querySelector("#quantity");
        const btnAddToCart = document.querySelector("#addToCart"); // stocker le bouton dans une variable JS
        
        btnAddToCart.addEventListener('click', (event) => {
            const selectColor = colors.value;
            // console.log(selectColor);

            const selectQuantity = quantity.value;
            // console.log(selectQuantity);

            if (selectQuantity == 0) { // condition successive
                alert("Veuillez choisir une quantité du produit");
            } else if (selectColor == "") { // pas d'action
                alert("Veuillez choisir une couleur");
            } else {
                let articleInCart = { // objet qui regroupe les propriétés
                    productName: oneArticle.name,
                    productId: oneArticle._id,
                    productColor: selectColor,
                    productQuantity: selectQuantity,
                    productPrice: oneArticle.price,
                    productImg: oneArticle.imageUrl,
                    productImg_alt: oneArticle.altTxt
                };
                console.table(articleInCart);

                //localStorage

                let productLocalStorage = JSON.parse(localStorage.getItem("product"));

                // selectionne les produits avec le meme id et color
                let newProduct = null;
                if (productLocalStorage != null) {
                    newProduct = productLocalStorage.find(
                        (element) =>
                            element.productId === oneArticle._id &&
                            element.productColor === selectColor
                    );
                }
                console.table(newProduct);
                console.log(productLocalStorage);
                console.log(selectQuantity)

                if (newProduct) { // si le panier contient déjà un produit identique
                    let addNumberOfProducts = Number(selectQuantity);
                    let CurrentQuantityOfProducts = Number(newProduct.productQuantity);
                    // nouvelle quantité du produit
                    newProduct.productQuantity = CurrentQuantityOfProducts + addNumberOfProducts;
                    // MAJ du panier
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    alert("la quantité de ce produit est maintenant de  : " + newProduct.productQuantity)

                } else if (productLocalStorage) { // Si le panier contient déjà au moins un produit different
                    productLocalStorage.push(articleInCart);
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    console.table(productLocalStorage);
                    alert(`votre commande de ${selectQuantity} ${oneArticle.name} en couleur ${selectColor} est ajouté au panier.`);

                } else { // si le panier est vide
                    productLocalStorage = [];
                    productLocalStorage.push(articleInCart);
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    alert(`votre commande de ${selectQuantity} ${oneArticle.name} en couleur ${selectColor} est ajouté au panier.`);
                }
            }


        });


    });
                  