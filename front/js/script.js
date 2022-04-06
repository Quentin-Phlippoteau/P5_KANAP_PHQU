
// récupérer les données de l'API

fetch("http://localhost:3000/api/products")
.then(response => response.json()) // converti la réponse en objet => JSON
.catch((error) => { // Message d'erreur
    let articlesContainer = document.querySelector(".items");
    articlesContainer.innerHTML = "Nous n'avons pas réussi à afficher les produits";
    articlesContainer.style.textAlign="center";
    articlesContainer.style.padding="10px";

})

.then(function(resultatAPI){ // utiliser les données de l'API
    let articles = resultatAPI; // variable regroupant tous les données des articles
    console.log(articles); // resultats retournés dans la console (array)
    for(let article in articles) { // boucle pour retouner tous les différents element/items dispoible sur l'API
        let articleLink = document.createElement("a"); // création d'un element et la stocker dans une variable
        document.querySelector(".items").appendChild(articleLink); // Positionner le nouvel element dans le code
        articleLink.href = `product.html?id=${resultatAPI[article]._id}`; // personnaliser l'élément
        
        let newArticle = document.createElement("article");
        articleLink.appendChild(newArticle) ;

        let newImg = document.createElement("img");
        newArticle.appendChild(newImg);
        newImg.src = resultatAPI[article].imageUrl;
        newImg.alt = resultatAPI[article].altTxt;

        let articleTitle = document.createElement("h3");
        newArticle.appendChild(articleTitle);
        articleTitle.classList.add("productName");
        articleTitle.innerHTML = resultatAPI[article].name;

        let articleDescription = document.createElement("p");
        newArticle.appendChild(articleDescription);
        articleDescription.classList.add("productDescription");
        articleDescription.innerHTML = resultatAPI[article].description;









    }
})

