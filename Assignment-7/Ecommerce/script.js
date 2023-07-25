const productsContainer = document.getElementById("productsContainer");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    displayProducts(data);
  })
  .catch((error) => {
    productsContainer.innerHTML =
      "<p>Error fetching products. Please try again later.</p>";
    console.error(error);
  });

function displayProducts(products) {
  products.forEach((product) => {
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
    productPrice.textContent = `Price ${product.price}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.textContent = "Add to Cart";
    // addToCartBtn.addEventListener("click", () => {
    //     addToCart(product);
    // });

    productCard.appendChild(productImg);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartBtn);

    productsContainer.appendChild(productCard);
  });
}

function addToCart(product) {
  // Replace this with your own cart handling logic
  console.log(`Added "${product.title}" to the cart!`);
}
