

document.addEventListener("DOMContentLoaded", function () {
    // Change main product image when clicking on thumbnails
    const thumbnails = document.querySelectorAll(".product-thumbnails img");
    const mainImage = document.querySelector(".product-main-image");
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });

    // Quantity selector logic
    const quantityInput = document.querySelector(".quantity-selector input");
    const increaseBtn = document.querySelector(".quantity-selector button:last-of-type");
    const decreaseBtn = document.querySelector(".quantity-selector button:first-of-type");

    increaseBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 99) { // Set max limit to 99
            quantityInput.value = currentValue + 1;
        }
    });

    decreaseBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) { // Set min limit to 1
            quantityInput.value = currentValue - 1;
        }
    });

    // Wishlist (Favorite) button toggle
    const favoriteBtn = document.querySelector(".favorite");
    const favoriteIcon = favoriteBtn.querySelector("img");
    
    favoriteBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        if (this.classList.contains("active")) {
            favoriteIcon.style.filter = "invert(15%) sepia(91%) saturate(7497%) hue-rotate(358deg) brightness(103%) contrast(118%)"; // Turns icon red
        } else {
            favoriteIcon.style.filter = "";
        }
    });

    // Add to Cart functionality for related products
    const addToCartButtons = document.querySelectorAll(".related-products .product button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Product added to cart!");
        });
    });
});
