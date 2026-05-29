let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function removeItem(name, price) {
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
    total -= price;
    updateCart();
  }
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });
  if(cart.length === 0) cartList.innerHTML = "<li>No items added yet</li>";
  document.getElementById("total").textContent = total;
}

// EmailJS integration
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // replace with your EmailJS public key
})();

document.getElementById("booking-form").addEventListener("submit", e => {
  e.preventDefault();
  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    cart: cart.map(i => i.name).join(", "),
    total: total
  };

  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",params)
    .then(() => {
      document.getElementById("confirmation").textContent =
        "✅ Thank you For Booking the Service. We will get back to you soon!";
      cart = []; total = 0; updateCart();
    })
    .catch(err => console.error("EmailJS Error:", err));
});
