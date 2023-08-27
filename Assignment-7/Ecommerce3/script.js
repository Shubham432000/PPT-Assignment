const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const cartItems = document.getElementById("cartItems"); // This element will be used to display cart items
const cart = []; // This array will hold the cart items

// Fetch product data from the API
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        displayProducts(data); // Display the products on the page
    })
    .catch(error => {
        productsContainer.innerHTML = "<p>Error fetching products. Please try again later.</p>";
        console.error(error);
    });

// Function to display products on the page
function displayProducts(products) {
    products.forEach(product => {
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

        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-to-cart-btn");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener("click", () => {
            addToCart(product); // Add the selected product to the cart
        });

        // Append elements to product card
        productCard.appendChild(productImg);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartBtn);

        // Append product card to products container
        productsContainer.appendChild(productCard);
    });
}

// Function to add a product to the cart
function addToCart(product) {
    const existingCartItem = cart.find(item => item.id === product.id);

    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        };
        cart.push(cartItem);
    }

    updateCartUI(); // Update the cart UI after adding the product
}

// Function to update the cart UI
function updateCartUI() {
    cartItems.innerHTML = ""; // Clear the cart items container

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        const cartItemImage = document.createElement("img");
        cartItemImage.src = item.image;
        cartItemImage.alt = item.title;
        cartItemImage.classList.add("cart-item-img");

        const cartItemTitle = document.createElement("div");
        cartItemTitle.classList.add("cart-item-title");
        cartItemTitle.textContent = item.title;

        const cartItemPrice = document.createElement("div");
        cartItemPrice.classList.add("cart-item-price");
        cartItemPrice.textContent = `$${item.price}`;

        const cartItemQuantity = document.createElement("div");
        cartItemQuantity.classList.add("cart-item-quantity");
        cartItemQuantity.textContent = `Quantity: ${item.quantity}`;

        cartItemElement.appendChild(cartItemImage);
        cartItemElement.appendChild(cartItemTitle);
        cartItemElement.appendChild(cartItemPrice);
        cartItemElement.appendChild(cartItemQuantity);

        cartItems.appendChild(cartItemElement);
    });

    // Show or hide the cart container based on cart length
    if (cart.length > 0) {
        cartContainer.style.display = "block";
    } else {
        cartContainer.style.display = "none";
    }
}
