
document.addEventListener("DOMContentLoaded", () => {
  const cartTable = document.querySelector(".cart-table tbody");
  const subtotalElement = document.querySelector(".cart-total p span");
  const totalElement = document.querySelector(".total span");
  const couponInput = document.querySelector(".coupon-container input");
  const applyCouponBtn = document.querySelector(".apply-btn");
  const returnBtn = document.querySelector(".return-btn");
  const checkoutBtn = document.querySelector(".checkout-btn");
  let discount = 0;

  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var total = 0;
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="product-info">
            <img src="${item.image}" alt="${item.name}">
                  <span>${item.name}</span>
            </td>
            <td>${item.price}</td>
            <td><input type="number" value="${item.qty}" min="1" max="99"></td>
            <td>$${item.price * item.qty}</td>
            <td><button class="remove-btn">Remove</button></td>
        `;
    // <td><button class="remove-btn">Remove</button></td>
    cartTable.appendChild(row);
    total += item.price * item.qty;

    row.querySelector(".remove-btn").addEventListener("click", () => {
      cart = cart.filter((cartItem) => cartItem.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      row.remove();
      updateCart();
    });
  });

  document.getElementById("cart-subtotal").textContent = "$" + total;
  document.getElementById("cart-total").textContent = "$" + total;

  function updateCart() {
    let subtotal = 0;

    cartTable.querySelectorAll("tr").forEach((row) => {
      const price = parseFloat(row.children[1].textContent.replace("$", ""));
      const quantity = row.querySelector("input").value;
      const subtotalCell = row.children[3];

      const rowSubtotal = price * quantity;
      subtotalCell.textContent = `$${rowSubtotal}`;
      subtotal += rowSubtotal;
    });

    window.total = subtotal - discount;
    subtotalElement.textContent = `$${subtotal}`;
    totalElement.textContent = `$${window.total}`;
  }

  cartTable.addEventListener("input", updateCart);

  applyCouponBtn.addEventListener("click", () => {
    if (couponInput.value === "DISCOUNT10") {
      discount = 100;
      alert("Coupon Applied: $100 Off");
    } else {
      discount = 0;
      alert("Invalid Coupon");
    }
    updateCart();
  });

 // document.querySelector(".update-btn").addEventListener("click", updateCart);

 // returnBtn.addEventListener("click", () => {
 //   window.location.href = "index.html";
 // });

 // document.getElementById("checkout-btn").addEventListener("click", checkout);
  //         function () {
  //       const isLoggedIn = false;

  //       if (!isLoggedIn) {
  //         window.location.href = "signin.html"; // صفحة تسجيل الدخول
  //       } else {
  //         window.location.href = "checkout.html"; // صفحة الدفع
  //       }
  //     }
  // );
 

  function isUserSignedIn() {

      return localStorage.getItem('userLoggedIn') === 'true'; 
  }
  
  document.getElementById('checkout-btn').addEventListener('click', function() {
      if (isUserSignedIn()) {
          window.location.href = 'checkout.html'; // توجيه لصفحة checkout
      } else {

 window.location.href = 'login-register.html';     
 }
  });

  
  function checkout() {
    const isLoggedIn = true;

    if (!isLoggedIn) {
    window.location.href = "signin.html"; 
    }
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      resetButtonState();
      return;
    }

    // Generate order data
    const orderId = "ORD-" + Date.now();
    const orderData = {
      orderId: orderId,
      items: cart,
      total: total,
      status: "pending",
      paymentMethod: "none",
      paymentStatus: "none",
      date: new Date().toISOString(),
    };

    // Save to Firebase
    window.db
      .ref("orders")
      .push(orderData)
      .then(() => {
        alert(`Order #${orderId} placed successfully!`);
        localStorage.clear();
        localStorage.removeItem("cart");
        window.location.replace("orders.html");
      })
      .catch((error) => {
        console.error("Error saving order:", error);
        alert("Error placing order. Please try again.");
      })
      .finally(() => {
        resetButtonState();
      });
  }
});
