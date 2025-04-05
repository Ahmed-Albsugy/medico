import {
  db,
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
} from "./firebase.js";
document.addEventListener("DOMContentLoaded", async () => {
  const cartTable = document.querySelector(".cart-table tbody");
  const subtotalElement = document.querySelector(".cart-total p span");
  const totalElement = document.querySelector(".total span");
  const couponInput = document.querySelector(".coupon-container input");
  const applyCouponBtn = document.querySelector(".apply-btn");
  const returnBtn = document.querySelector(".return-btn");
  const checkoutBtn = document.querySelector(".checkout-btn");
  let discount = 0;

  var cart = [];

  let docSnap = [];
  docSnap = await getDoc(doc(db, "users", "2omM5yP8bUOJ30LqOyL2UpS0BBy1"));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().cart);
    for (let i = 0; i < docSnap.data().cart.length; i++) {
      console.log(docSnap.data().cart[i]);
      await getDoc(doc(db, "products", docSnap.data().cart[i])).then((doc) => {
        if (doc.exists()) {
          const productData = doc.data();
          const cartItem = {
            id: doc.id,
            name: productData.name,
            price: productData.price,
            image: productData.imageUrl,
            qty: 1,
          };
          console.log(cartItem);
          cart.push(cartItem);
        } else {
          console.log("No such document!");
        }
      });
    }
  }
  var total = 0;
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="product-info">
            <img src="${item.image}" alt="${item.name}">
                  <span>${item.name}</span>
            </td>
            <td>${item.price}</td>
            <td><input type="number" value="1" id="product-quantity-${item.id}" min="1" max="99"></td>
            <td>$${item.price}</td>
            <td><button class="remove-btn">Remove</button></td>
        `;
    // <td><button class="remove-btn">Remove</button></td>
    cartTable.appendChild(row);
    total += item.price * item.qty;

    row.querySelector(".remove-btn").addEventListener("click", async () => {
      cart = cart.filter((cartItem) => cartItem.id !== item.id);
      row.remove();
      updateCart();
      try {
        const userRef = doc(db, "users", "2omM5yP8bUOJ30LqOyL2UpS0BBy1");
        const updatedCart = cart.map((cartItem) => cartItem.id);
        await updateDoc(userRef, { cart: updatedCart });
      } catch (error) {
        console.error("Error removing from Firebase:", error);
      }
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
    if (couponInput.value === "123") {
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
    return localStorage.getItem("userLoggedIn") === "true";
  }

  checkoutBtn.addEventListener("click", async function () {
    if (isUserSignedIn()) {
      for (let index = 0; index < cart.length; index++) {
        cart[index].qty = document.getElementById(
          "product-quantity-" + cart[index].id
        ).value;
      }
      let order = {
        items: cart,
        total: window.total || 0,
        date: new Date().toLocaleDateString(),
        status: "pending",
        paymentMethod: "none",
        paymentStatus: "none",
        userId: "2omM5yP8bUOJ30LqOyL2UpS0BBy1",
      };
      console.log("Order before saving:", order);

      try {
        await updateDoc(doc(db, "users", "2omM5yP8bUOJ30LqOyL2UpS0BBy1"), {
          orders: arrayUnion(order),
        });
        console.log("Order placed successfully!");
        alert("Order placed successfully!");
      } catch (error) {
        console.error("Error adding order:", error);
      }

      // window.location.href = "checkout.html";
    } else {
      window.location.href = "login-register.html";
    }
  });

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
});
