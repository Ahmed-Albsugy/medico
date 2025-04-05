import { db, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

async function displayFavorites() {
    let container = document.getElementById("favoritesContainer");
    container.innerHTML = ""; 

    let querySnapshot = await getDocs(collection(db, "favorites"));

    querySnapshot.forEach((doc) => {
        let product = doc.data();

        let productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                </div>
                <button class="remove-favorite" onclick="removeFromFavorites('${doc.id}')">Remove</button>
            </div>
        `;

        container.innerHTML += productHTML;
    });
}

async function removeFromFavorites(productId) {
    let productRef = doc(db, "favorites", productId);

    try {
        await deleteDoc(productRef);
        alert("Removed from favorites!");
        displayFavorites(); 
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
}

displayFavorites();
