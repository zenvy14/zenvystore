const cart = [];


function addToCart(name, price) {
cart.push({ name, price });
renderCart();
}


function renderCart() {
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');


cartItems.innerHTML = '';
let total = 0;


cart.forEach(item => {
const p = document.createElement('p');
p.textContent = `${item.name} - $${item.price}`;
cartItems.appendChild(p);
total += item.price;
});


cartTotal.textContent = `Total: $${total}`;
}


async function checkoutStripe() {
if (cart.length === 0) {
alert('Cart is empty');
return;
}


const response = await fetch('/api/create-checkout-session', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ cartItems: cart })
});


const data = await response.json();


const stripe = Stripe('YOUR_PUBLISHABLE_KEY');
stripe.redirectToCheckout({ sessionId: data.id });
}