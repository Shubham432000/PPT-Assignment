document.addEventListener("DOMContentLoaded", () => {
    const productId = localStorage.getItem("productId");

    if (productId) {
        fetchSingleProduct(productId); // Fetch and display the specific product data
    } else {
        // If no product ID is found in localStorage, redirect back to the index.html
        window.location.href = "index.html";
    }
});

// Function to fetch and display the specific product data
function fetchSingleProduct(productId) {
    const singleProductContainer = document.getElementById("singleProduct");

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            displaySingleProduct(data); // Display the product data on the single product page
        })
        .catch(error => {
            singleProductContainer.innerHTML = "<p>Error fetching product data. Please try again later.</p>";
            console.error(error);
        });
}

// Function to display the product data on the single product page
function displaySingleProduct(product) {
    const singleProductContainer = document.getElementById("singleProduct");

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImg = document.createElement("img");
    productImg.classList.add("product-img");
    productImg.src = product.image;
    productImg.alt = product.title;

    const productTitle = document.createElement("div");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;

    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.textContent = `$${product.price}`;

    // Append elements to product card
    productCard.appendChild(productImg);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);

    // Append product card to single product container
    singleProductContainer.appendChild(productCard);
}
