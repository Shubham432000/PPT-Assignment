const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const cartItems = document.getElementById("cartItems");
const cart = [];

fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(error => {
        productsContainer.innerHTML = "<p>Error fetching products. Please try again later.</p>";
        console.error(error);
    });

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
            addToCart(product);
        });

        productCard.appendChild(productImg);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartBtn);

        productsContainer.appendChild(productCard);
    });
}

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

    updateCartUI();
}

function updateCartUI() {
    cartItems.innerHTML = "";

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        const cartItemImage = document.createElement("img");
        cartItemImage.src = item.image;
        cartItemImage.alt = item.title;

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

    if (cart.length > 0) {
        cartContainer.style.display = "block";
    } else {
        cartContainer.style.display = "none";
    }
}
