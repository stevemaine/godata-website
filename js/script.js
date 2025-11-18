// js/script.js
lucide.createIcons();

// === NAVIGATION ===
function navigate(page) {
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('bundlesSection').style.display = 'none';
  document.getElementById('supportSection').style.display = 'none';
  document.getElementById('servicesSection').style.display = 'none';

  if (page === 'home') document.getElementById('homeSection').style.display = 'block';
  if (page === 'support') document.getElementById('supportSection').style.display = 'block';
  if (page === 'services') document.getElementById('servicesSection').style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = mobileBtn.querySelector('i');
  icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
  lucide.createIcons();
});

// Support form
document.getElementById('supportForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Thank you! Your message has been sent. We’ll reply within 1 hour.');
  this.reset();
};

// === BUNDLES DATA ===
const bundles = {
  MTN: [{gb:1,price:8},{gb:2,price:14},{gb:3,price:20.2},{gb:4,price:25},{gb:5,price:30.8},{gb:6,price:35},{gb:7,price:37.5},
        {gb:8,price:44},{gb:10,price:55},{gb:15,price:72},{gb:20,price:95.5},{gb:25,price:112},
        {gb:30,price:140},{gb:40,price:179},{gb:50,price:225}],
  AirtelTigo: [{gb:1,price:8},{gb:2,price:14},{gb:3,price:19.2},{gb:4,price:24.4},{gb:5,price:28.2},{gb:6,price:31.2},{gb:7,price:35.6},
        {gb:10,price:44},{gb:12,price:48},{gb:15,price:63},{gb:20,price:86},{gb:25,price:97},
        {gb:30,price:125.5}],
  Telecel: [{gb:10,price:53.5},{gb:15,price:74},{gb:20,price:92},{gb:30,price:130},{gb:40,price:172},{gb:50,price:215}],
};
const feeRate = 0.025;
let currentNetwork = '';

const homeSection = document.getElementById('homeSection');
const bundlesSection = document.getElementById('bundlesSection');
const networkTitle = document.getElementById('networkTitle');
const bundlesGrid = document.getElementById('bundlesGrid');
const modal = document.getElementById('checkoutModal');
const closeModal = document.querySelector('.close');
const form = document.getElementById('checkoutForm');

window.addEventListener('load', () => setTimeout(() => document.getElementById('loaderWrapper').classList.add('hidden'), 600));

window.goToNetwork = function(network) {
  currentNetwork = network;
  homeSection.style.display = 'none';
  bundlesSection.style.display = 'block';
  networkTitle.textContent = `${network} Data Bundles`;
  document.getElementById('modalNetwork').textContent = network;
  loadBundlesWithAnimation(network);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function loadBundlesWithAnimation(network) {
  bundlesGrid.innerHTML = '';
  for(let i=0;i<6;i++){
    bundlesGrid.innerHTML += `<div class="bundle-card"><div class="bundle-info">
      <div class="skeleton skeleton-text" style="width:60%"></div>
      <div class="skeleton skeleton-text" style="width:40%;margin-top:.5rem;"></div>
    </div><div class="skeleton skeleton-btn"></div></div>`;
  }
  setTimeout(() => {
    bundlesGrid.innerHTML = '';
    bundles[network].forEach((b, i) => {
      const card = document.createElement('div');
      card.className = 'bundle-card fade-in';
      card.style.animationDelay = `${i*50}ms`;
      card.innerHTML = `
        <div class="bundle-info"><h3>${b.gb}GB</h3><p>GHS ${b.price}</p></div>
        <button class="buy-btn" onclick="openCheckout(${b.gb},${b.price})">Buy</button>`;
      bundlesGrid.appendChild(card);
    });
  }, 800);
}

window.openCheckout = function(gb, price) {
  const fees = (price * feeRate).toFixed(2);
  const total = (price + parseFloat(fees)).toFixed(2);
  document.getElementById('modalVolume').textContent = gb;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalFees').textContent = fees;
  document.getElementById('modalTotal').textContent = `GHS ${total}`;
  document.getElementById('payAmount').textContent = total;
  modal.classList.add('show');
};

closeModal.onclick = () => modal.classList.remove('show');
window.onclick = e => { if(e.target === modal) modal.classList.remove('show'); };

form.onsubmit = e => {
  e.preventDefault();
  const rec = document.getElementById('recipientNumber').value;
  const momo = document.getElementById('momoNumber').value;
  if(!rec || !momo) return alert('Please fill all fields');
  alert(`Payment of GHS ${document.getElementById('payAmount').textContent} initiated!\nRecipient: ${rec}\nMoMo: ${momo}`);
  modal.classList.remove('show');
  form.reset();
};