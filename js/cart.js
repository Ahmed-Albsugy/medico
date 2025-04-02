document.addEventListener("DOMContentLoaded", () => {
    const cartTable = document.querySelector(".cart-table tbody");
    const subtotalElement = document.querySelector(".cart-total p span");
    const totalElement = document.querySelector(".total span");
    const couponInput = document.querySelector(".coupon-container input");
    const applyCouponBtn = document.querySelector(".apply-btn");
    const returnBtn = document.querySelector(".return-btn");
    const checkoutBtn = document.querySelector(".checkout-btn");
    let discount = 0;

    function updateCart() {
        let subtotal = 0;
        
        cartTable.querySelectorAll("tr").forEach(row => {
            const price = parseFloat(row.children[1].textContent.replace("$", ""));
            const quantity = row.querySelector("input").value;
            const subtotalCell = row.children[3];
            
            const rowSubtotal = price * quantity;
            subtotalCell.textContent = `$${rowSubtotal}`;
            subtotal += rowSubtotal;
        });
        
        let total = subtotal - discount;
        subtotalElement.textContent = `$${subtotal}`;
        totalElement.textContent = `$${total}`;
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

    document.querySelector(".update-btn").addEventListener("click", updateCart);
    
    returnBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
    
    document.querySelector(".checkout-btn").addEventListener("click", function () {
        const isLoggedIn = false;
    
        if (!isLoggedIn) {
            window.location.href = "signin.html"; // صفحة تسجيل الدخول
        } else {
            window.location.href = "checkout.html"; // صفحة الدفع
        }
    });
    
});
