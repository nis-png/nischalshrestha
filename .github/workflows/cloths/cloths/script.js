const products = [
    { id: 1, name: 'T-Shirt', price: 19.99, image: './images/t-shirt.jpg' },
    { id: 2, name: 'Jeans', price: 49.99, image: './images/jeans.jpg' },
    { id: 3, name: 'Hoodie', price: 39.99, image: './images/hoodie.jpg' },
    { id: 4, name: 'Sneakers', price: 79.99, image: './images/sneakers.jpg' },
];

let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <div class="quantity">
                <button onclick="decrementQuantity(${product.id})">-</button>
                <input type="number" id="quantity-${product.id}" value="1" min="1">
                <button onclick="incrementQuantity(${product.id})">+</button>
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function incrementQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrementQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const newValue = parseInt(quantityInput.value) - 1;
    quantityInput.value = newValue > 0 ? newValue : 1;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    saveCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function displayCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = '<h2>Cart Summary</h2>';

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        cartSummary.appendChild(cartItem);
    });

    const totalElement = document.createElement('div');
    totalElement.classList.add('cart-item');
    totalElement.innerHTML = `
        <strong>Total:</strong>
        <strong>$${total.toFixed(2)}</strong>
    `;
    cartSummary.appendChild(totalElement);
}

function setupPaymentMethodListeners() {
    const paymentForm = document.getElementById('payment-form');
    const esewaDetails = document.querySelector('.esewa-details');
    const phonepayDetails = document.querySelector('.phonepay-details');

    paymentForm.addEventListener('change', (e) => {
        if (e.target.name === 'payment') {
            esewaDetails.style.display = e.target.value === 'esewa' ? 'block' : 'none';
            phonepayDetails.style.display = e.target.value === 'phonepay' ? 'block' : 'none';
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        localStorage.removeItem('cart'); // Clear the cart
        window.location.href = 'index.html'; // Redirect to the products page
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    if (document.getElementById('products')) {
        displayProducts();
        updateCartCount();
    } else if (document.getElementById('cart-summary')) {
        displayCartSummary();
        setupPaymentMethodListeners();
    }
});

// ... (previous code remains the same)

function setupPaymentMethodListeners() {
    const paymentForm = document.getElementById('payment-form');
    const shippingForm = document.getElementById('shipping-form');
    const esewaDetails = document.querySelector('.esewa-details');
    const phonepayDetails = document.querySelector('.phonepay-details');

    paymentForm.addEventListener('change', (e) => {
        if (e.target.name === 'payment') {
            esewaDetails.style.display = e.target.value === 'esewa' ? 'block' : 'none';
            phonepayDetails.style.display = e.target.value === 'phonepay' ? 'block' : 'none';
        }
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateShippingForm()) {
            const shippingDetails = getShippingDetails();
            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            placeOrder(shippingDetails, paymentMethod);
        }
    });
}

function validateShippingForm() {
    const shippingForm = document.getElementById('shipping-form');
    return shippingForm.checkValidity();
}

function getShippingDetails() {
    return {
        fullName: document.getElementById('full-name').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };
}

function placeOrder(shippingDetails, paymentMethod) {
    // Here you would typically send the order details to a server
    // For this example, we'll just show an alert with the order information
    const orderDetails = {
        items: cart,
        shipping: shippingDetails,
        payment: paymentMethod,
        total: calculateTotal()
    };

    console.log('Order placed:', orderDetails);
    alert('Order placed successfully!');
    localStorage.removeItem('cart'); // Clear the cart
    window.location.href = 'index.html'; // Redirect to the products page
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// ... (rest of the code remains the same)
n=0;
if()