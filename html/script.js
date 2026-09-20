let cart =[];
let total=0
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;
    updateCartUI();
    showToast(); // <-- Add this line here
}
function showToast() {
    const toast = document.getElementById("toast");
    toast.className = "show";
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
function removeFromCart(index){
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}
function updateCartUI() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');

    cartItemsList.innerHTML ='';
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li><em>Your cart is currently empty.</em></li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name}</span> <span>₦${item.price.toLocaleString()} <button onclick="removeFromCart(${index})" style="background:none; border:nonr; color:#ff9999; cursor:pointer; margin-left:10px;">❌</button></span`;
            cartItemsList.appendChild(li);
        });
    }
    cartTotalSpan.innerText = total.toLocaleString();
}
function checkoutViaWhatsapp() {
    // Check if the cart is empty
    if (cart.length ===0) {
        alert('Your cart is empty!');
        return;
    }

    let message = 'Hello, I would like to place an order:\n';

    // Loop through your cart array to list items and prices
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()}\n`;
    });

    const cartTotal = document.getElementById('cart-total').innerText;
    message += `\nTotal: ₦${cartTotal}`;

    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '2347067051873';
    
  //Explicitly open in a clean window instance
  const targetUrl = 'https://api.whatsapp.com/send?phone=' + phoneNumber +'&text=' +encodedMessage;
    window.open(targetUrl, '_blank');
}
function shareStore(){
    if (navigator.share) {
        navigator.share({title: 'House of Eloria', url: window.location.href});
    } else {
        alert("Link copied to share with friends!");
    }
}
// Set the countdown time (e.g., 2 hours from now)
let timeInSeconds = 7200; 

function updateCountdown() {
    const timerElement = document.getElementById("countdown-timer");
    if (!timerElement) return;

    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);
    let seconds = timeInSeconds % 60;

    // Format numbers to always show two digits
    timerElement.textContent = 
        String(hours).padStart(2, '0') + ":" + 
        String(minutes).padStart(2, '0') + ":" + 
        String(seconds).padStart(2, '0');

    if (timeInSeconds > 0) {
        timeInSeconds--;
    }
}

// Run the countdown every 1 second
setInterval(updateCountdown, 1000);