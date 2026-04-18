let products = [];

fetch('products.xml')
  .then(response => response.text())
  .then(data => {
    let parser = new DOMParser();
    let xml = parser.parseFromString(data, "text/xml");
    let items = xml.getElementsByTagName("product");

    for (let i = 0; i < items.length; i++) {
      products.push({
        name: items[i].getElementsByTagName("name")[0].textContent,
        price: items[i].getElementsByTagName("price")[0].textContent
      });
    }

    displayProducts(products);
  });

function displayProducts(list) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(product => {
    container.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="buyProduct('${product.name}')">Buy</button>
      </div>
    `;
  });
}

function searchProduct() {
  let query = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
}

function buyProduct(name) {
  alert(name + " added to cart!");
}
