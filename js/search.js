

let products = [];

    // Load products from external JSON
    fetch('medical.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        products = data;
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
        document.getElementById("results").innerHTML = "<p>Failed to load products.</p>";
      });

    const input = document.getElementById("categoryInput");
    const resultsDiv = document.getElementById("results");

    input.addEventListener("input", () => {
      const value = input.value.toLowerCase().trim();
      const filtered = products.filter(p => p.category.toLowerCase().includes(value));

      resultsDiv.innerHTML = "";

      if (filtered.length === 0) {
        resultsDiv.innerHTML = "<p>No products found.</p>";
      } else {
        filtered.forEach(product => {
          const div = document.createElement("div");
          div.className = "product";
          div.textContent = `${product.name} (${product.category})`;
          resultsDiv.appendChild(div);
        });
      }
    });