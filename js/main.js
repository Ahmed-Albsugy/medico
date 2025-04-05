

document.addEventListener("DOMContentLoaded", function () {
    const profileHeader = document.querySelector(".profile");
    const dropdown = document.getElementById("dropdown-menu");

    // Toggle dropdown on click
    profileHeader.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!profileHeader.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });
});
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const profileHeader = document.querySelector(".profile");
    const dropdown = document.getElementById("dropdown-menu");
    const authButton = document.getElementById("authButton");

    // get cookie by name
    function getCookie(name) {
        let cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) {
                return value;
            }
        }
        return null;
    }
    function updateButton() {
        let username = getCookie("username");
        if (username) {
            authButton.textContent = "Sign out";
        } else {
            authButton.textContent = "Sign in";
        }
    }

    authButton.addEventListener("click", function () {
        let username = getCookie("username");

        if (username) {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            updateButton();
        } else {
            window.location.href = "/login.html"; 
        }
    });

       updateButton();
});
// =====================================================

// function getData() {
//      var data = getDoc(db,products)
//     if (data.exits())
//         console.log(data.data());
        
// }
// getData()

// async function fetchProducts() {
//     try {
//       const querySnapshot = await getDoc(collection(db, "products"));
//       querySnapshot.forEach((doc) => {
//         const product = doc.data();
//         console.log(product);
        
//       });
//     } catch (error) {
//       console.error("Error fetching products: ", error);
//       }
//     }
// fetchProducts()
// console.log(fetchProducts());


