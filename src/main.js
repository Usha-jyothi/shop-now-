
import "./style.css";

// 1. Product details

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 4,
    name: "Ladies Handbag",
    category: "Fashion",
    price: 1299,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
  },
  {
    id: 5,
    name: "Digital Camera",
    category: "Electronics",
    price: 8999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
  },
  {
    id: 6,
    name: "Sunglasses",
    category: "Fashion",
    price: 799,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
  },
  {
    id: 7,
    name: "Coffee Maker",
    category: "Home",
    price: 2999,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
  },
  {
    id: 8,
    name: "Table Lamp",
    category: "Home",
    price: 999,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
  },
  {
    id: 9,
    name: "Backpack",
    category: "Fashion",
    price: 1099,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    id: 10,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1799,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
  },
  {
    id: 11,
    name: "Plant Pot",
    category: "Home",
    price: 499,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"
  },
  {
  id: 15,
  name: "Women's Dress",
  category: "Fashion",
  sizeType: "clothing",
  price: 999,
  image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500"
},
{
  id: 16,
  name: "Women's Top",
  category: "Fashion",
  sizeType: "clothing",
  price: 699,
  image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500"
},
{
  id: 13,
  name: "Men's T-Shirt",
  category: "Fashion",
  sizeType: "clothing",
  price: 599,
  image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
},
{
  id: 14,
  name: "Men's Shirt",
  category: "Fashion",
  sizeType: "clothing",
  price: 799,
  image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
},
  {
    id: 12,
    name: "Sports Shoes",
    category: "Fashion",
    price: 1599,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
  }
];

// 2. Shopping cart data

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("shopnow-cart")) || [];
} catch {
  cart = [];
}

let selectedCategory = "All";
let searchText = "";
let sortType = "default";

// 3. Display the website

document.querySelector("#app").innerHTML = `

  <header class="navbar">

    <div class="logo">ShopNow 🛍️</div>

    <div class="search-box">
      <input
        type="text"
        id="searchInput"
        placeholder="Search your products..."
      >
      <button id="searchBtn">Search</button>
    </div>

    <button class="cart-button" id="openCart">
      🛒 Cart (<span id="cartCount">0</span>)
    </button>

  </header>

  <section class="hero">

    <h1>Welcome to ShopNow!</h1>

    <p>Discover amazing products at great prices.</p>

    <button id="shopNowBtn">Shop Now</button>

  </section>

  <section class="section" id="shop">

    <h2>Shop by Category</h2>

    <div class="categories">

      <button class="category-btn active" data-category="All">
        All
      </button>

      <button class="category-btn" data-category="Electronics">
        Electronics
      </button>

      <button class="category-btn" data-category="Fashion">
        Fashion
      </button>

      <button class="category-btn" data-category="Home">
        Home
      </button>

    </div>

    <div class="filter-row">

      <h2>Our Products</h2>

      <select id="sortSelect">
        <option value="default">Sort by</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

    </div>

    <div class="products" id="productList"></div>

  </section>

  <div class="cart-overlay" id="cartOverlay">

    <div class="cart-panel">

      <div class="cart-header">
        <h2>My Shopping Cart</h2>
        <button class="close-cart" id="closeCart">✕</button>
      </div>

      <div id="cartItems"></div>

      <div class="cart-total">
        Total: ₹<span id="cartTotal">0</span>
      </div>

      <button class="checkout-btn" id="checkoutBtn">
        Proceed to Checkout
      </button>

    </div>

  </div>

  <footer>
    <p>© 2026 ShopNow. All Rights Reserved.</p>
    <p>Online Shopping Made Easy!</p>
  </footer>

`;

// 4. Display products

function displayProducts() {

  let filteredProducts = products.filter(product => {

    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchMatch =
      product.name.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;

  });

  if (sortType === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortType === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const productList = document.getElementById("productList");

  if (filteredProducts.length === 0) {

    productList.innerHTML = `
      <div class="empty-message">
        <h3>No products found!</h3>
        <p>Try another search.</p>
      </div>
    `;

    return;
  }

  productList.innerHTML = filteredProducts.map(product => `

    <div class="product-card">

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div class="product-info">

  <h3>${product.name}</h3>

  <p class="category-name">
    ${product.category}
  </p>

${product.name.includes("Shoes") ? `
  <label>Select Shoe Size:</label>
  <select class="size-select" data-size-select="${product.id}">
    <option value="">Choose Shoe Size</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
` : product.sizeType === "clothing" ? `
  <label>Select Clothing Size:</label>
  <select class="size-select" data-size-select="${product.id}">
    <option value="">Choose Clothing Size</option>
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
    <option value="XXL">XXL</option>
  </select>
` : ""}

  <p class="price">₹${product.price.toLocaleString("en-IN")}</p>

  <button
    class="add-btn"
    data-add="${product.id}"
  >
    Add to Cart
  </button>

</div>

      </div>

    </div>

  `).join("");

}
// Add to Cart button click event

document.getElementById("productList").addEventListener("click", event => {

  const button = event.target.closest("[data-add]");

  if (!button) return;

  const productId = Number(button.dataset.add);

  addToCart(productId);

});

// 5. Add product to cart

function addToCart(productId) {

  const existingProduct = cart.find(
    item => item.id === productId
  );

  if (existingProduct) {

    existingProduct.quantity++;

  } else {

    cart.push({
      id: productId,
      quantity: 1
    });

  }

  updateCart();

}

// 6. Save cart and update quantity

function updateCart() {

  localStorage.setItem(
    "shopnow-cart",
    JSON.stringify(cart)
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  document.getElementById("cartCount").textContent =
    totalItems;

  displayCart();

}

// 7. Display cart items

function displayCart() {

  const cartItems = document.getElementById("cartItems");

  let total = 0;

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-message">
        <h3>Your cart is empty!</h3>
        <p>Add some products to continue.</p>
      </div>
    `;

  } else {

    cartItems.innerHTML = cart.map(item => {

      const product = products.find(
        p => p.id === item.id
      );

      if (!product) return "";

      total += product.price * item.quantity;

      return `

        <div class="cart-item">

          <img src="${product.image}" alt="${product.name}">

          <div class="cart-details">

            <h4>${product.name}</h4>

            <p>₹${product.price.toLocaleString("en-IN")}</p>

            <div class="quantity-controls">

              <button data-minus="${product.id}">-</button>

              <span>${item.quantity}</span>

              <button data-plus="${product.id}">+</button>

            </div>

            <button
              class="remove-btn"
              data-remove="${product.id}"
            >
              Remove
            </button>

          </div>

        </div>

      `;

    }).join("");

  }

  document.getElementById("cartTotal").textContent =
    total.toLocaleString("en-IN");

  document.getElementById("checkoutBtn").disabled =
    cart.length === 0;

}

// 8. Cart quantity controls

function changeQuantity(productId, change) {

  const item = cart.find(
    p => p.id === productId
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {

    cart = cart.filter(
      p => p.id !== productId
    );

  }

  updateCart();

}

// 9. Remove product

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  updateCart();

}

// 10. Search products

document.getElementById("searchBtn").addEventListener(
  "click", () => {

    searchText = document.getElementById("searchInput")
      .value.trim().toLowerCase();

    displayProducts();

  }
);

document.getElementById("searchInput").addEventListener(
  "input", event => {

    searchText = event.target.value.trim().toLowerCase();

    displayProducts();

  }
);

// 11. Category filtering

document.querySelector(".categories").addEventListener(
  "click", event => {

    const button = event.target.closest("[data-category]");

    if (!button) return;

    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    displayProducts();

  }
);

// 12. Sorting products

document.getElementById("sortSelect").addEventListener(
  "change", event => {

    sortType = event.target.value;

    displayProducts();

  }
);

// 13. Open and close cart

document.getElementById("openCart").addEventListener(
  "click", () => {

    document.getElementById("cartOverlay")
      .classList.add("show");

  }
);

document.getElementById("closeCart").addEventListener(
  "click", () => {

    document.getElementById("cartOverlay")
      .classList.remove("show");

  }
);

document.getElementById("cartOverlay").addEventListener(
  "click", event => {

    if (event.target.id === "cartOverlay") {

      event.currentTarget.classList.remove("show");

    }

  }
);

// 14. Handle cart buttons

document.getElementById("cartItems").addEventListener(
  "click", event => {

    const plus = event.target.closest("[data-plus]");
    const minus = event.target.closest("[data-minus]");
    const remove = event.target.closest("[data-remove]");

    if (plus) {
      changeQuantity(Number(plus.dataset.plus), 1);
    }

    if (minus) {
      changeQuantity(Number(minus.dataset.minus), -1);
    }

    if (remove) {
      removeFromCart(Number(remove.dataset.remove));
    }

  }
);

// 15. Demo checkout

document.getElementById("checkoutBtn").addEventListener(
  "click", () => {

    if (cart.length === 0) return;

    const confirmed = confirm(
      "Do you want to place this demo order?"
    );

    if (confirmed) {

      alert(
        "Thank you for shopping with ShopNow! " +
        "Your demo order has been placed."
      );

      cart = [];

      updateCart();

      document.getElementById("cartOverlay")
        .classList.remove("show");

    }

  }
);

// 16. Shop Now button

document.getElementById("shopNowBtn").addEventListener(
  "click", () => {

    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });

  }
);

// 17. Start the website

displayProducts();
updateCart();

console.log("ShopNow website started successfully!");
