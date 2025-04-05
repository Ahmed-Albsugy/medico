document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  var productData = null;

  fetch("../medical.json")
    .then((response) => response.json()) // Parse JSON
    .then((data) => {
      console.log(data);
      window.productData = data;
      const product = data.medicalProducts.find((item) => item.id == productId);
      this.getElementById("product-name").innerText = product.name;
      this.getElementById("product-image").src = product.imageUrl;
      this.getElementById("product-price").innerText = `$${product.price}`;
      this.getElementById("product-description").innerText =
        product.description;
      this.getElementById("product-buy-now").setAttribute(
        "data-id",
        product.id
      );
      this.getElementById("product-buy-now").setAttribute(
        "data-name",
        product.name
      );
      this.getElementById("product-buy-now").setAttribute(
        "data-price",
        product.price
      );
      this.getElementById("product-buy-now").setAttribute(
        "data-image",
        product.imageUrl
      );
      this.getElementById("product-buy-now").addEventListener(
        "click",
        addToCart
      );
      if (product.availability) {
        this.getElementById("product-avi").innerText = "In stock";
      } else {
        this.getElementById("product-avi").innerText = "Out of stock";
        this.getElementById("product-avi").style.color = "red";
      }

      const relatedProductsContainer = this.getElementById("related-products");
      var relatedProducts = data.medicalProducts.filter(
        (item) => item.category === product.category && item.id != productId
      );
      for (var i = 0; i <= relatedProducts.length; i++) {
        if (i > 3) break;
        const product = relatedProducts[i];
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3><a href="./product_details.html?id=${product.id}">${product.name}</a></h3>
                <p><a href="./product_details.html?id=${product.id}">$${product.price}</a></p>
                <button class="add-to-cart" 
                    data-name="${product.name}" 
                    data-id="${product.id}" 
                    data-price="${product.price}" 
                    data-image="${product.imageUrl}">Add to Cart</button>
            `;
        relatedProductsContainer.appendChild(productElement);
        productElement
          .querySelector(".add-to-cart")
          .addEventListener("click", addToCart);
      }
    }) // Use the JSON data
    .catch((error) => console.error("Error loading JSON:", error));

  // Change main product image when clicking on thumbnails
  const thumbnails = document.querySelectorAll(".product-thumbnails img");
  const mainImage = document.querySelector(".product-main-image");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mainImage.src = this.src;
    });
  });

  // Quantity selector logic
  const quantityInput = document.querySelector(".quantity-selector input");
  const increaseBtn = document.querySelector(
    ".quantity-selector button:last-of-type"
  );
  const decreaseBtn = document.querySelector(
    ".quantity-selector button:first-of-type"
  );

  increaseBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < 99) {
      // Set max limit to 99
      quantityInput.value = currentValue + 1;
    }
  });

  decreaseBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      // Set min limit to 1
      quantityInput.value = currentValue - 1;
    }
  });

  // Wishlist (Favorite) button toggle
  const favoriteBtn = document.querySelector(".favorite");
  const favoriteIcon = favoriteBtn.querySelector("img");

  favoriteBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      favoriteIcon.style.filter =
        "invert(15%) sepia(91%) saturate(7497%) hue-rotate(358deg) brightness(103%) contrast(118%)"; // Turns icon red
    } else {
      favoriteIcon.style.filter = "";
    }
  });

  function addToCart() {
    // let quantity = document.querySelector(".quantity-selector input").value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(
      (item) => item.id === this.getAttribute("data-id")
    );
    var quantity = 1; // Default quantity
    if (this.classList.contains("buy-now")) {
      quantity = document.getElementById("product-quantity").value || 1;
      console.log(quantity);
    }

    if (existingProduct) {
      existingProduct.qty = parseInt(existingProduct.qty) + parseInt(quantity); //parseInt(document.querySelector(".quantity-selector input").value);
      alert(this.getAttribute("data-name") + " qty incremented!");
    } else {
      cart.push({
        id: this.getAttribute("data-id"),
        name: this.getAttribute("data-name"),
        price: this.getAttribute("data-price"),
        image: this.getAttribute("data-image"),
        qty: quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
