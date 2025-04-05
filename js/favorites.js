import { db, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

async function addToFavorites(element) {
    let productCard = element.closest(".product-card");
    let productId = productCard.getAttribute("data-id");
    let productName = productCard.querySelector("h3").innerText;
    let productPrice = productCard.querySelector("p").innerText;
    let productImage = productCard.querySelector("img").src;

    let productRef = doc(db, "favorites", productId);

    try {
        await setDoc(productRef, {
            name: productName,
            price: productPrice,
            image: productImage
        });
        element.style.color = "red";

        alert("Added to favorites!");
    } catch (error) {
        console.error("Error adding to favorites: ", error);
    }
}
