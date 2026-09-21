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
// --- Quick-View Modal Functions ---
function openQuickView(productName, productPrice, imgSrc) {
  document.getElementById('modalProductName').textContent = productName;
  document.getElementById('modalProductPrice').textContent = productPrice;
  document.getElementById('modalProductImg').src = imgSrc;
  document.getElementById('quickViewModal').classList.add('active');
}

function closeQuickView() {
  document.getElementById('quickViewModal').classList.remove('active');
}

function addToBagFromModal() {
  const selectedSize = document.getElementById('sizeSelect').value;
  alert(`Added size ${selectedSize} to your luxury shopping cart!`);
  closeQuickView();
}

// --- Live Recent Purchase Toast Loop ---
const buyers = [
  "✨ Amina from Owojust secured an item!",
  "✨ David from Lagos just purchased a set!",
  "✨ Chidi from Abuja just claimed a flash sale!",
  "✨ Sophie from Osun just ordered luxury wear!"
];

function showLuxuryToast() {
  const toast = document.getElementById('luxuryToast');
  const toastText = document.getElementById('toastText');
  
  // Pick random buyer text
  const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
  toastText.textContent = randomBuyer;

  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000); // Display for 4 seconds
}

// Trigger toast every 12 seconds automatically
setInterval(showLuxuryToast, 12000);

// --- Theme Toggle (Dark / Light Mode) ---
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// --- Currency Switcher Toggle ---
let currentCurrencyIndex = 0;
const currencies = [
  { label: "USD ($)", rate: 1, symbol: "$" },
  { label: "GBP (£)", rate: 0.79, symbol: "£" },
  { label: "NGN (₦)", rate: 1500, symbol: "₦" }
];

function toggleCurrency() {
  currentCurrencyIndex = (currentCurrencyIndex + 1) % currencies.length;
  const curr = currencies[currentCurrencyIndex];
  document.getElementById('currencyBtn').textContent = curr.label;
  alert(`Currency switched to ${curr.label}. (Prices will automatically adjust based on this rate!)`);
}
// --- 1. Size & Fit Quiz Logic ---
function openSizeQuiz() {
  document.getElementById('sizeQuizModal').classList.add('active');
}
function closeSizeQuiz() {
  document.getElementById('sizeQuizModal').classList.remove('active');
}
function calculateSize() {
  const height = document.getElementById('userHeight').value;
  const weight = document.getElementById('userWeight').value;
  const resultElem = document.getElementById('sizeResult');
  
  if(!height || !weight) {
    resultElem.textContent = "Please fill in both height and weight.";
    return;
  }
  
  // Simple formula approximation for sizing
  let suggestedSize = "Medium (M)";
  if (weight < 55) suggestedSize = "Small (S)";
  else if (weight > 75) suggestedSize = "Large (L)";
  
  resultElem.textContent = `✨ Recommended Size for You: ${suggestedSize}`;
}

// --- 2. Wishlist Sidebar Drawer Logic ---
let wishlistItems = [];

function toggleWishlistDrawer() {
  document.getElementById('wishlistDrawer').classList.toggle('open');
}

function addToWishlist(itemName) {
  if (!wishlistItems.includes(itemName)) {
    wishlistItems.push(itemName);
    updateWishlistUI();
    alert(`${itemName} added to your Wishlist!`);
  } else {
    alert(`${itemName} is already in your Wishlist.`);
  }
}

function updateWishlistUI() {
  const container = document.getElementById('wishlistItems');
  document.getElementById('wishlistCount').textContent = wishlistItems.length;
  
  if (wishlistItems.length === 0) {
    container.innerHTML = '<p style="color: #a0a0a0; text-align: center; margin-top: 40px;">Your wishlist is empty.</p>';
    return;
  }
  
  container.innerHTML = '';
  wishlistItems.forEach(item => {
    container.innerHTML += `
      <div style="background: #1a1a24; padding: 12px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #8c35b5; display: flex; justify-content: space-between; align-items: center;">
        <span>${item}</span>
        <span style="color: #8c35b5; cursor: pointer;" onclick="removeFromWishlist('${item}')">✕</span>
      </div>`;
  });
}

function removeFromWishlist(itemName) {
  wishlistItems = wishlistItems.filter(i => i !== itemName);
  updateWishlistUI();
}




