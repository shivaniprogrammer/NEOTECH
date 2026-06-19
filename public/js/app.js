/**
 * ECOMMERCE STORE - Frontend Application
 * Handles API integration, cart, auth, and UI
 */

const API_BASE_URL = 'http://localhost:5000/api';

// ============================================
// STATE MANAGEMENT
// ============================================
const store = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  
  setUser(user, token) {
    this.user = user;
    this.token = token;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    updateUIForAuth();
  },
  
  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    updateUIForAuth();
  },
  
  addToCart(product, quantity = 1) {
    const existing = this.cart.find(item => item._id === product._id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
    this.saveCart();
    updateCartCount();
    showAlert('Added to cart successfully!', 'success');
  },
  
  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item._id !== productId);
    this.saveCart();
    updateCartCount();
    renderCart();
  },
  
  updateQuantity(productId, quantity) {
    if (quantity < 1) return;
    const item = this.cart.find(item => item._id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      renderCart();
    }
  },
  
  clearCart() {
    this.cart = [];
    this.saveCart();
    updateCartCount();
  },
  
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  },
  
  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
};

// ============================================
// API HELPERS
// ============================================
async function api(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(store.token && { 'Authorization': `Bearer ${store.token}` })
    },
    ...options
  };
  
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ============================================
// UI UPDATES
// ============================================
function updateUIForAuth() {
  const authBtn = document.querySelector('.auth-link-item');
  const userMenu = document.querySelector('.user-menu');
  const userName = document.querySelector('.user-name');
  
  if (store.user) {
    if (authBtn) authBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'flex';
    if (userName) userName.textContent = store.user.name;
  } else {
    if (authBtn) authBtn.style.display = 'inline-block';
    if (userMenu) userMenu.style.display = 'none';
    if (userName) userName.textContent = '';
  }
}

function updateCartCount() {
  const count = store.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function showAlert(message, type = 'success') {
  const existing = document.querySelector('.alert');
  if (existing) existing.remove();
  
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  
  const container = document.querySelector('.page-container') || document.body;
  container.insertBefore(alert, container.firstChild);
  
  setTimeout(() => alert.remove(), 3000);
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// ============================================
// HOME PAGE
// ============================================
async function loadFeaturedProducts() {
  const container = document.querySelector('.products-grid');
  if (!container) return;

  container.innerHTML = '<div class="loading"></div>';

  try {
    const res = await fetch('http://localhost:5000/api/products');
    const products = await res.json();

    if (!products.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--gray-400);">No products found</p>';
      return;
    }

    const brands = {};
    products.forEach(p => {
      const brand = p.name.split(' ')[0];
      if (!brands[brand]) brands[brand] = [];
      brands[brand].push(p);
    });

    const brandColors = {
      'Samsung': '#1428A0', 'Apple': '#555555', 'OPPO': '#1D4ED8',
      'OnePlus': '#F50514', 'Google': '#4285F4', 'boAt': '#FF3B00',
      'Dell': '#007DB8', 'Lenovo': '#E2231A', 'HP': '#0096D6'
    };

    let html = '';
    Object.keys(brands).forEach(brand => {
      const color = brandColors[brand] || '#1a1a2e';
      html += '<div style="grid-column: 1/-1; margin-bottom: 2rem;">';
      html += '<div style="display:flex; align-items:center; gap:1.5rem; margin-bottom:1.5rem;">';
      html += '<h2 style="font-size:1.5rem; font-weight:700; color:var(--primary); white-space:nowrap;">' + brand + '</h2>';
      html += '<div style="height:3px; flex:1; background:' + color + '; border-radius:2px;"></div>';
      html += '</div>';
      html += '<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;">';
      brands[brand].slice(0, 3).forEach(function(product) {
        html += '<div class="product-card" onclick="window.location.href=\'product.html?id=' + product._id + '\'">';
        html += '<div style="overflow:hidden; height:260px; background:white; display:flex; align-items:center; justify-content:center;">';
        html += '<img src="' + product.image + '" alt="' + product.name + '" style="width:100%; height:100%; object-fit:contain; padding:1rem;">';
        html += '</div>';
        html += '<div class="product-info">';
        html += '<div class="product-category">' + (product.category || 'General') + '</div>';
        html += '<h3 class="product-name">' + product.name + '</h3>';
        html += '<div class="product-price">₹' + product.price.toLocaleString('en-IN') + '</div>';
        html += '<button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCartHome(\'' + product._id + '\',\'' + product.name + '\',' + product.price + ',\'' + product.image + '\',\'' + product.category + '\')">ADD TO CART</button>';
        html += '</div></div>';
      });
      html += '</div></div>';
    });

    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = '<p style="text-align:center;color:var(--gray-400);">Failed to load products</p>';
  }
}

window.addToCartHome = function(id, name, price, image, category) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const ex = cart.find(function(i) { return i._id === id; });
  if (ex) {
    ex.quantity++;
  } else {
   cart.push({
  _id: id,
  name,
  price: Number(price),
  image,
  category,
  description,
  quantity: 1
});
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  const total = cart.reduce(function(s, i) { return s + i.quantity; }, 0);
  document.querySelectorAll('.cart-count').forEach(function(el) {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
  alert('Added to cart: ' + name);
};

// Add to cart from home page
window.addToCartHome = function(id, name, price, image, category, description) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const ex = cart.find(i => i._id === id);
  if (ex) {
    ex.quantity++;
  } else {
    cart.push({ _id: id, name, price: Number(price), image, category, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  // update cart count
  const total = cart.reduce((s, i) => s + i.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
  alert(`✓ ${name} added to cart!`);
};

// ============================================
// PRODUCTS PAGE
// ============================================


// ============================================
// PRODUCT DETAIL PAGE
// ============================================
async function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  
  if (!productId) {
    window.location.href = 'products.html';
    return;
  }
  
  try {
    const data = await api(`/products/${productId}`);
    const product = data.product || data;
    
    document.querySelector('.product-gallery img').src = 
      product.image || 'https://via.placeholder.com/600x700?text=No+Image';
    document.querySelector('.product-gallery img').alt = product.name;
    document.querySelector('.product-detail-name').textContent = product.name;
    document.querySelector('.product-detail-price').textContent = `$${product.price.toFixed(2)}`;
    document.querySelector('.product-detail-desc').textContent = 
      product.description || 'No description available.';
    document.querySelector('.product-category-tag').textContent = 
      (product.category || 'General').toUpperCase();
    
    let quantity = 1;
    const qtyDisplay = document.querySelector('.qty-display');
    const minusBtn = document.querySelector('.qty-minus');
    const plusBtn = document.querySelector('.qty-plus');
    
    function updateQty() {
      if (qtyDisplay) qtyDisplay.textContent = quantity;
    }
    
    minusBtn?.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        updateQty();
      }
    });
    
    plusBtn?.addEventListener('click', () => {
      quantity++;
      updateQty();
    });
    
    document.querySelector('.add-to-cart-detail')?.addEventListener('click', () => {
      store.addToCart(product, quantity);
    });
    
  } catch (error) {
    showAlert('Failed to load product details', 'error');
  }
  const card =
document.getElementById('product3DCard');

if (card) {

  card.addEventListener('mousemove', (e) => {

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    const centerX =
    rect.width / 2;

    const centerY =
    rect.height / 2;

    const rotateY =
    ((x - centerX) / centerX) * 15;

    const rotateX =
    ((centerY - y) / centerY) * 15;

    card.style.transform =
      `rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {

    card.style.transform =
      'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}
}

// ============================================
// CART PAGE - FIXED
// ============================================
function renderCart() {
  const container = document.querySelector('.cart-items');
  if (!container) return;
  
  if (store.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem;">
        <p style="font-size: 1.2rem; color: var(--gray-400); margin-bottom: 1.5rem;">Your cart is empty</p>
        <a href="products.html" class="nav-btn btn-primary">CONTINUE SHOPPING</a>
      </div>
    `;
    const summary = document.querySelector('.cart-summary');
    if (summary) summary.style.display = 'none';
    return;
  }
  container.innerHTML = store.cart.map(item => {

  const descriptionHTML = item.description
    ? item.description
        .split(',')
        .map(desc => `<li>${desc.trim()}</li>`)
        .join('')
    : '<li>No description available</li>';

  return `
    <div class="cart-item">

      <div class="cart-image">
        <img src="${item.image || 'https://via.placeholder.com/100'}"
             alt="${item.name}">
      </div>

      <div class="cart-item-info">
        <h3>${item.name}</h3>

        <p class="cart-category">
          ${item.category || 'General'}
        </p>

        <ul class="cart-description">
          ${descriptionHTML}
        </ul>
      </div>

      <div class="cart-right">

        <div class="quantity-selector">
          <button type="button"
            onclick="window.updateCartQty('${item._id}', ${item.quantity - 1})">
            −
          </button>

          <span>${item.quantity}</span>

          <button type="button"
            onclick="window.updateCartQty('${item._id}', ${item.quantity + 1})">
            +
          </button>
        </div>

        <div class="cart-item-price">
          ₹${(item.price * item.quantity).toLocaleString('en-IN')}
        </div>

        <button type="button"
          class="cart-item-remove"
          onclick="window.removeCartItem('${item._id}')">
          REMOVE
        </button>

      </div>

    </div>
  `;
}).join('');
  
  const subtotal = store.getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;
  
  const subtotalEl = document.querySelector('.cart-subtotal');
  const shippingEl = document.querySelector('.cart-shipping');
  const totalEl = document.querySelector('.cart-total');
  const summary = document.querySelector('.cart-summary');
  
if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`;
if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (summary) summary.style.display = 'block';
}

// GLOBAL functions for cart onclick handlers
window.updateCartQty = function(productId, quantity) {
  store.updateQuantity(productId, quantity);
};

window.removeCartItem = function(productId) {
  store.removeFromCart(productId);
};

// Checkout handler
document?.addEventListener('click', (e) => {
  if (e.target.matches('.checkout-btn') || e.target.closest('.checkout-btn')) {
    if (!store.token) {
      showAlert('Please login to checkout', 'error');
      setTimeout(() => window.location.href = 'login.html', 1500);
      return;
    }
    
    if (store.cart.length === 0) {
      showAlert('Your cart is empty', 'error');
      return;
    }
    
    const orderData = {
      items: store.cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: store.getCartTotal(),
      shippingAddress: 'Default Address'
    };
const confirm = window.confirm('💰 Cash on Delivery is available!\n\nClick OK to place your order.');
    if (confirm) {
      store.clearCart();
      document.body.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:Inter,sans-serif;background:white;">
          <div style="width:100px;height:100px;background:#34a853;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:3rem;margin-bottom:2rem;">✓</div>
          <h1 style="font-size:2rem;font-weight:700;color:#34a853;margin-bottom:1rem;">Order Placed!</h1>
          <p style="color:#5f6368;font-size:1.1rem;margin-bottom:2rem;">Thank you for shopping with us!</p>
          <a href="index.html" style="padding:1rem 2.5rem;background:#1a1a2e;color:white;text-decoration:none;font-weight:600;">CONTINUE SHOPPING</a>
        </div>
      `;
    }
  }
});

// ============================================
// AUTH PAGES

// ============================================
// AUTH PAGES
// ============================================
function initAuth() {
  const loginForm = document.querySelector('.login-form');
  const registerForm = document.querySelector('.register-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;
      
      try {
        const data = await api('/auth/login', {
          method: 'POST',
          body: { email, password }
        });
        
        store.setUser(data.user, data.token);
        showAlert('Login successful!', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
      } catch (error) {
        showAlert(error.message || 'Invalid credentials', 'error');
      }
    });
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.querySelector('#reg-name').value;
      const email = document.querySelector('#reg-email').value;
      const password = document.querySelector('#reg-password').value;
      
      try {
        const data = await api('/auth/register', {
          method: 'POST',
          body: { name, email, password }
        });
        
        store.setUser(data.user, data.token);
        showAlert('Account created successfully!', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
      } catch (error) {
        showAlert(error.message || 'Registration failed', 'error');
      }
    });
  }
}

// Logout
document?.addEventListener('click', (e) => {
  if (e.target.matches('.logout-btn') || e.target.closest('.logout-btn')) {
    e.preventDefault();
    store.logout();
    showAlert('Logged out successfully', 'success');
    setTimeout(() => window.location.href = 'index.html', 1000);
  }
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  updateUIForAuth();
  updateCartCount();
  
  const page = window.location.pathname.split('/').pop() || 'index.html';
  
  switch (page) {
    case 'products.html':
      loadAllProducts();
      break;
    case 'product.html':
      loadProductDetail();
      break;
    case 'cart.html':
      renderCart();
      break;
    case 'login.html':
      initAuth();
      break;
  }
});
