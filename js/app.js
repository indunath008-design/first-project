// ==========================================================================
// Indra Gadgets - Modern E-Commerce Application Engine
// ==========================================================================

import { products, categories, promoCodes } from './products.js';

// Safe storage helper for browser
const safeStorage = {
  getItem: (key) => {
    try {
      return typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(key) : null;
    } catch (e) {
      return null;
    }
  },
  setItem: (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) window.localStorage.setItem(key, val);
    } catch (e) {}
  }
};

// --- State Management ---
export const state = {
  products: [...products],
  categories: [...categories],
  cart: JSON.parse(safeStorage.getItem('indra_cart') || '[]'),
  wishlist: JSON.parse(safeStorage.getItem('indra_wishlist') || '[]'),
  compare: JSON.parse(safeStorage.getItem('indra_compare') || '[]'),
  activeCategory: 'all',
  searchQuery: '',
  priceRange: 3000,
  sortBy: 'featured',
  filterInStock: false,
  filterDeals: false,
  activeCurrency: safeStorage.getItem('indra_currency') || 'USD',
  currencyRates: {
    USD: { symbol: '$', rate: 1, label: 'USD ($)' },
    EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
    GBP: { symbol: '£', rate: 0.78, label: 'GBP (£)' },
    JPY: { symbol: '¥', rate: 152, label: 'JPY (¥)' },
    INR: { symbol: '₹', rate: 84, label: 'INR (₹)' }
  },
  appliedPromo: null,
  indraCareProtection: false,
  soundEnabled: safeStorage.getItem('indra_sound') !== 'false',
  activeQuickViewId: null,
  quickViewSelectedColor: null,
  quickViewSelectedVariant: 0,
  quickViewQty: 1,
  recentOrders: JSON.parse(safeStorage.getItem('indra_orders') || '[]'),
  lastPlacedOrder: null
};

// --- Web Audio SFX Engine (Cybernetic sound effects) ---
const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

function playSound(type) {
  if (!state.soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'cart') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'wishlist') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(659, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'success') {
      const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major
      chords.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, now + idx * 0.07);
        g.gain.setValueAtTime(0.08, now + idx * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);
        o.start(now + idx * 0.07);
        o.stop(now + idx * 0.07 + 0.3);
      });
    }
  } catch (e) {
    // Ignore audio errors on unsupported browsers
  }
}

// --- Persistence Helpers ---
function saveCart() {
  safeStorage.setItem('indra_cart', JSON.stringify(state.cart));
  updateHeaderBadges();
}

function saveWishlist() {
  safeStorage.setItem('indra_wishlist', JSON.stringify(state.wishlist));
  updateHeaderBadges();
}

function saveCompare() {
  safeStorage.setItem('indra_compare', JSON.stringify(state.compare));
  updateHeaderBadges();
  renderCompareBar();
}

function saveOrders() {
  safeStorage.setItem('indra_orders', JSON.stringify(state.recentOrders));
}

// --- Currency Formatter ---
export function formatCurrency(amountUSD) {
  const curr = state.currencyRates[state.activeCurrency] || state.currencyRates.USD;
  const converted = amountUSD * curr.rate;
  if (state.activeCurrency === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// --- Toast Notifications ---
export function showToast(message, type = 'info', icon = 'check-circle') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl text-sm font-medium transition-all duration-300 ${
    type === 'success'
      ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
      : type === 'warning'
      ? 'bg-amber-950/90 border-amber-500/40 text-amber-200'
      : type === 'error'
      ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
      : 'bg-slate-900/90 border-cyan-500/40 text-cyan-200'
  }`;

  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : type === 'warning' ? 'bg-amber-400' : type === 'error' ? 'bg-rose-400' : 'bg-cyan-400'} animate-ping"></span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- Header Badges Update ---
export function updateHeaderBadges() {
  const cartCountEl = document.getElementById('cart-badge-count');
  const cartTotalEl = document.getElementById('cart-subtotal-header');
  const wishlistCountEl = document.getElementById('wishlist-badge-count');
  const compareCountEl = document.getElementById('compare-badge-count');

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
    cartCountEl.classList.toggle('hidden', totalItems === 0);
    cartCountEl.classList.add('badge-pop-animate');
    setTimeout(() => cartCountEl.classList.remove('badge-pop-animate'), 300);
  }

  if (cartTotalEl) {
    cartTotalEl.textContent = formatCurrency(cartSubtotal);
  }

  if (wishlistCountEl) {
    wishlistCountEl.textContent = state.wishlist.length;
    wishlistCountEl.classList.toggle('hidden', state.wishlist.length === 0);
  }

  if (compareCountEl) {
    compareCountEl.textContent = state.compare.length;
    compareCountEl.classList.toggle('hidden', state.compare.length === 0);
  }
}

// --- Category Navigation Renderer ---
export function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = state.categories.map(cat => {
    const isActive = state.activeCategory === cat.id;
    return `
      <button 
        class="category-tab whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
          isActive 
            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.45)]' 
            : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white hover:bg-slate-800/80'
        }"
        data-category="${cat.id}"
      >
        <span>${cat.name}</span>
        <span class="text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}">${cat.count}</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      playSound('click');
      state.activeCategory = btn.dataset.category;
      renderCategories();
      renderProducts();
    });
  });
}

// --- Filter & Sorting Logic ---
export function getFilteredProducts() {
  let list = [...state.products];

  // Category filter
  if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category === state.activeCategory);
  }

  // Search filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }

  // Price Range
  list = list.filter(p => p.price <= state.priceRange);

  // In stock only
  if (state.filterInStock) {
    list = list.filter(p => p.inStock && p.stockCount > 0);
  }

  // Deals only
  if (state.filterDeals) {
    list = list.filter(p => p.isDealOfTheDay || (p.originalPrice && p.originalPrice > p.price));
  }

  // Sorting
  switch (state.sortBy) {
    case 'price-low':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
    case 'featured':
    default:
      list.sort((a, b) => (b.isDealOfTheDay ? 1 : 0) - (a.isDealOfTheDay ? 1 : 0));
      break;
  }

  return list;
}

// --- Product Grid Renderer ---
export function renderProducts() {
  const container = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  if (!container) return;

  const filtered = getFilteredProducts();

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${state.products.length} Gadgets`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl p-8 border border-white/10">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No Gadgets Matched Your Filters</h3>
        <p class="text-slate-400 text-sm max-w-md mx-auto mb-6">Try adjusting your price range, clearing active search keywords, or selecting a different category.</p>
        <button id="btn-reset-filters" class="px-5 py-2.5 rounded-xl btn-cyber-primary text-sm font-semibold">
          Reset All Filters
        </button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.searchQuery = '';
        state.priceRange = 3000;
        state.filterInStock = false;
        state.filterDeals = false;
        state.sortBy = 'featured';
        const searchInput = document.getElementById('main-search-input');
        if (searchInput) searchInput.value = '';
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) priceSlider.value = 3000;
        const priceLabel = document.getElementById('price-slider-label');
        if (priceLabel) priceLabel.textContent = formatCurrency(3000);
        renderCategories();
        renderProducts();
      });
    }
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isWishlisted = state.wishlist.includes(p.id);
    const isCompared = state.compare.includes(p.id);
    const discountPercent = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
    
    // Quick spec line
    const specEntries = Object.entries(p.specs || {});
    const highlightSpec = specEntries.length > 0 ? `${specEntries[0][0]}: ${specEntries[0][1]}` : '';

    return `
      <div class="product-card group relative flex flex-col glass-panel rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden hover:shadow-[0_12px_35px_-8px_rgba(6,182,212,0.22)]" data-id="${p.id}">
        
        <!-- Image & Badges Container -->
        <div class="product-image-container relative aspect-[4/3] bg-gradient-to-b from-slate-900/60 to-slate-950/90 flex items-center justify-center p-4">
          
          <!-- Badges -->
          <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            ${p.badge ? `
              <span class="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${
                p.badge === 'BESTSELLER' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : p.badge === 'HOT DEAL'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm animate-pulse'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              }">${p.badge}</span>
            ` : ''}
            ${discountPercent > 0 ? `
              <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                -${discountPercent}% OFF
              </span>
            ` : ''}
          </div>

          <!-- Quick Action Buttons -->
          <div class="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <!-- Wishlist Button -->
            <button 
              class="btn-wishlist w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                isWishlisted ? 'text-rose-500 border-rose-500/40 bg-rose-500/10' : 'text-slate-300 hover:text-rose-400'
              }"
              title="Add to Wishlist"
              data-id="${p.id}"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>

            <!-- Compare Button -->
            <button 
              class="btn-compare w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                isCompared ? 'text-cyan-400 border-cyan-500/50 bg-cyan-500/15' : 'text-slate-300 hover:text-cyan-400'
              }"
              title="Compare Gadget"
              data-id="${p.id}"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
            </button>

            <!-- Quick View Button -->
            <button 
              class="btn-quick-view w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all duration-200"
              title="Quick View Specs"
              data-id="${p.id}"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>

          <!-- Product Image -->
          <img 
            src="${p.image}" 
            alt="${p.name}" 
            class="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] cursor-pointer"
            loading="lazy"
            onclick="window.openQuickView('${p.id}')"
          />

          <!-- Deal countdown banner if active -->
          ${p.isDealOfTheDay ? `
            <div class="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between text-[11px] text-cyan-300">
              <span class="flex items-center gap-1 font-semibold">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                FLASH DROP
              </span>
              <span class="deal-countdown font-mono font-bold text-white">08:42:15</span>
            </div>
          ` : ''}
        </div>

        <!-- Product Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <!-- Category and Rating -->
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="text-xs uppercase tracking-wider font-semibold text-cyan-400/90">${p.categoryLabel}</span>
              <div class="flex items-center gap-1 text-xs text-amber-400 font-bold">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>${p.rating}</span>
                <span class="text-slate-500 font-normal">(${p.reviewsCount})</span>
              </div>
            </div>

            <!-- Title & Tagline -->
            <h3 
              class="font-bold text-white text-base line-clamp-1 group-hover:text-cyan-400 transition-colors cursor-pointer"
              onclick="window.openQuickView('${p.id}')"
            >
              ${p.name}
            </h3>
            <p class="text-xs text-slate-400 line-clamp-1 mt-0.5 mb-2">${p.tagline}</p>

            <!-- Spec Pill -->
            ${highlightSpec ? `
              <div class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/80 border border-white/5 text-[11px] text-slate-300 mb-3">
                <span class="text-cyan-400">⚡</span>
                <span class="truncate">${highlightSpec}</span>
              </div>
            ` : ''}

            <!-- Color Swatches -->
            <div class="flex items-center gap-1.5 mb-4">
              <span class="text-[11px] text-slate-400 mr-1">Colors:</span>
              ${p.colors.map((c, i) => `
                <span 
                  class="w-3.5 h-3.5 rounded-full border border-white/30 inline-block transition-transform hover:scale-125" 
                  style="background-color: ${c.hex};" 
                  title="${c.name}"
                ></span>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Price & Add to Cart -->
          <div class="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-lg font-black text-white">${formatCurrency(p.price)}</span>
                ${p.originalPrice ? `
                  <span class="text-xs line-through text-slate-500">${formatCurrency(p.originalPrice)}</span>
                ` : ''}
              </div>
              <div class="text-[10px] ${p.inStock ? 'text-emerald-400' : 'text-rose-400'} font-medium">
                ${p.inStock ? (p.stockCount < 10 ? `Only ${p.stockCount} left in stock!` : 'In Stock • Ready to Ship') : 'Backorder Available'}
              </div>
            </div>

            <button 
              class="btn-add-cart px-4 py-2 rounded-xl btn-cyber-primary text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
              data-id="${p.id}"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>
    `;
  }).join('');

  // Wire up event listeners
  container.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(btn.dataset.id);
    });
  });

  container.querySelectorAll('.btn-compare').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCompare(btn.dataset.id);
    });
  });

  container.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openQuickView(btn.dataset.id);
    });
  });

  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const p = state.products.find(item => item.id === btn.dataset.id);
      if (p) {
        addToCart(p, p.colors[0], p.variants[0], 1);
      }
    });
  });
}

// --- Cart Operations ---
export function addToCart(product, color = null, variant = null, quantity = 1) {
  const chosenColor = color || product.colors[0];
  const chosenVariant = variant || product.variants[0];
  const price = product.price + (chosenVariant.priceDiff || 0);

  // Cart key includes variant & color
  const cartItemIndex = state.cart.findIndex(
    item => item.productId === product.id && 
            item.color.code === chosenColor.code && 
            item.variant.label === chosenVariant.label
  );

  if (cartItemIndex > -1) {
    state.cart[cartItemIndex].quantity += quantity;
  } else {
    state.cart.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      categoryLabel: product.categoryLabel,
      color: chosenColor,
      variant: chosenVariant,
      unitBasePrice: product.price,
      price: price,
      quantity: quantity
    });
  }

  saveCart();
  playSound('cart');
  showToast(`Added <strong>${product.name}</strong> to your cyber cart!`, 'success');
  openCartDrawer();
}

export function updateCartQuantity(index, newQty) {
  if (newQty <= 0) {
    const item = state.cart[index];
    state.cart.splice(index, 1);
    showToast(`Removed <strong>${item.name}</strong> from cart`, 'info');
  } else {
    state.cart[index].quantity = newQty;
  }
  saveCart();
  renderCartDrawer();
}

export function removeFromCart(index) {
  const item = state.cart[index];
  state.cart.splice(index, 1);
  saveCart();
  playSound('click');
  showToast(`Removed <strong>${item.name}</strong>`, 'info');
  renderCartDrawer();
}

// --- Wishlist Operations ---
export function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const prod = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed <strong>${prod ? prod.name : 'Gadget'}</strong> from Wishlist`, 'info');
  } else {
    state.wishlist.push(productId);
    playSound('wishlist');
    showToast(`Saved <strong>${prod ? prod.name : 'Gadget'}</strong> to Wishlist!`, 'success');
  }

  saveWishlist();
  renderProducts();
  renderWishlistModal();
}

// --- Compare Operations ---
export function toggleCompare(productId) {
  const index = state.compare.indexOf(productId);
  const prod = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.compare.splice(index, 1);
    showToast(`Removed <strong>${prod ? prod.name : 'Gadget'}</strong> from Comparison`, 'info');
  } else {
    if (state.compare.length >= 4) {
      showToast('You can compare a maximum of 4 gadgets simultaneously.', 'warning');
      return;
    }
    state.compare.push(productId);
    playSound('click');
    showToast(`Added <strong>${prod ? prod.name : 'Gadget'}</strong> to Comparison!`, 'success');
  }

  saveCompare();
  renderProducts();
}

// --- Floating Compare Bar Renderer ---
export function renderCompareBar() {
  const bar = document.getElementById('floating-compare-bar');
  const countEl = document.getElementById('compare-bar-count');
  const thumbsContainer = document.getElementById('compare-bar-thumbs');
  if (!bar) return;

  if (state.compare.length === 0) {
    bar.classList.add('hidden');
    return;
  }

  bar.classList.remove('hidden');
  if (countEl) countEl.textContent = state.compare.length;

  if (thumbsContainer) {
    thumbsContainer.innerHTML = state.compare.map(id => {
      const p = state.products.find(item => item.id === id);
      if (!p) return '';
      return `
        <div class="relative group w-10 h-10 rounded-lg bg-slate-800 border border-cyan-500/40 p-1 flex items-center justify-center">
          <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain">
          <button 
            class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
            onclick="window.removeCompareItem('${p.id}')"
            title="Remove"
          >×</button>
        </div>
      `;
    }).join('');
  }
}

// --- Compare Modal Matrix ---
export function openCompareModal() {
  if (state.compare.length === 0) {
    showToast('Add at least one gadget to compare specifications!', 'info');
    return;
  }
  const modal = document.getElementById('compare-modal');
  const content = document.getElementById('compare-modal-content');
  if (!modal || !content) return;

  const compareItems = state.compare.map(id => state.products.find(p => p.id === id)).filter(Boolean);

  // Collect all unique specs keys
  const specKeys = Array.from(new Set(
    compareItems.flatMap(p => Object.keys(p.specs || {}))
  ));

  content.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-white/10">
            <th class="p-4 bg-slate-950/80 text-slate-400 font-medium min-w-[160px] sticky left-0 z-20">Specifications</th>
            ${compareItems.map(p => `
              <th class="p-4 min-w-[220px] bg-slate-900/60 align-top">
                <div class="flex flex-col items-center text-center">
                  <div class="w-24 h-24 mb-2 p-2 bg-slate-950/60 rounded-xl border border-white/10 flex items-center justify-center">
                    <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain">
                  </div>
                  <h4 class="font-bold text-white text-sm line-clamp-1 mb-1">${p.name}</h4>
                  <div class="text-cyan-400 font-extrabold text-base mb-2">${formatCurrency(p.price)}</div>
                  <button 
                    class="px-3 py-1.5 rounded-lg btn-cyber-primary text-xs font-bold w-full"
                    onclick="window.addCompareItemToCart('${p.id}')"
                  >Add to Cart</button>
                  <button 
                    class="text-xs text-rose-400 hover:underline mt-2"
                    onclick="window.removeCompareItem('${p.id}')"
                  >Remove</button>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr>
            <td class="p-4 bg-slate-950/80 font-semibold text-slate-300 sticky left-0 z-10">Category</td>
            ${compareItems.map(p => `<td class="p-4 text-slate-300 text-center font-medium">${p.categoryLabel}</td>`).join('')}
          </tr>
          <tr>
            <td class="p-4 bg-slate-950/80 font-semibold text-slate-300 sticky left-0 z-10">User Rating</td>
            ${compareItems.map(p => `
              <td class="p-4 text-center">
                <span class="inline-flex items-center gap-1 text-amber-400 font-bold">
                  ★ ${p.rating} <span class="text-slate-500 font-normal">(${p.reviewsCount})</span>
                </span>
              </td>
            `).join('')}
          </tr>
          <tr>
            <td class="p-4 bg-slate-950/80 font-semibold text-slate-300 sticky left-0 z-10">Stock Status</td>
            ${compareItems.map(p => `
              <td class="p-4 text-center">
                <span class="text-xs font-semibold ${p.inStock ? 'text-emerald-400' : 'text-rose-400'}">
                  ${p.inStock ? `In Stock (${p.stockCount} left)` : 'Out of Stock'}
                </span>
              </td>
            `).join('')}
          </tr>
          ${specKeys.map(key => `
            <tr>
              <td class="p-4 bg-slate-950/80 font-semibold text-slate-300 sticky left-0 z-10">${key}</td>
              ${compareItems.map(p => `
                <td class="p-4 text-slate-300 text-center">${(p.specs && p.specs[key]) ? p.specs[key] : '—'}</td>
              `).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  modal.classList.remove('modal-hidden');
}

export function closeCompareModal() {
  const modal = document.getElementById('compare-modal');
  if (modal) modal.classList.add('modal-hidden');
}

// --- Cart Drawer Renderer ---
export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.remove('drawer-hidden');
  renderCartDrawer();
}

export function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('drawer-hidden');
}

export function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const shippingEl = document.getElementById('cart-shipping');
  const taxEl = document.getElementById('cart-tax');
  const totalEl = document.getElementById('cart-total');
  const shippingProgressEl = document.getElementById('cart-shipping-progress');
  const shippingTextEl = document.getElementById('cart-shipping-text');
  const indraCareCheckbox = document.getElementById('cart-indracare-toggle');

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        </div>
        <h4 class="text-lg font-bold text-white mb-1">Your Cyber Cart is Empty</h4>
        <p class="text-xs text-slate-400 max-w-xs mx-auto mb-6">Discover flagship audio, neural smartphones, and AI rigs waiting for you.</p>
        <button 
          class="px-5 py-2.5 rounded-xl btn-cyber-primary text-xs font-bold"
          onclick="window.closeCartDrawer()"
        >Start Exploring</button>
      </div>
    `;

    if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
    if (discountEl) discountEl.textContent = formatCurrency(0);
    if (shippingEl) shippingEl.textContent = formatCurrency(0);
    if (taxEl) taxEl.textContent = formatCurrency(0);
    if (totalEl) totalEl.textContent = formatCurrency(0);
    if (shippingProgressEl) shippingProgressEl.style.width = '0%';
    if (shippingTextEl) shippingTextEl.textContent = 'Add items to qualify for FREE Express Shipping!';
    return;
  }

  // Calculate numbers
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Free Shipping Threshold: $99
  const threshold = 99;
  const isFreeShipping = subtotal >= threshold;
  const shippingCost = isFreeShipping ? 0 : 15;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));

  if (shippingProgressEl) {
    shippingProgressEl.style.width = `${progressPercent}%`;
  }
  if (shippingTextEl) {
    if (isFreeShipping) {
      shippingTextEl.innerHTML = `<span class="text-emerald-400 font-bold">🎉 UNLOCKED!</span> You have Free Worldwide Express Shipping!`;
    } else {
      const remaining = threshold - subtotal;
      shippingTextEl.innerHTML = `Add <strong>${formatCurrency(remaining)}</strong> more to unlock <strong>FREE Express Shipping</strong>!`;
    }
  }

  // Promo discount calculation
  let promoDiscount = 0;
  if (state.appliedPromo) {
    const p = state.appliedPromo;
    if (p.discountPercent) {
      promoDiscount = subtotal * (p.discountPercent / 100);
    } else if (p.discountFixed) {
      promoDiscount = Math.min(subtotal, p.discountFixed);
    }
  }

  // IndraCare Protection Plan addon ($29)
  const protectionFee = state.indraCareProtection ? 29 : 0;
  if (indraCareCheckbox) {
    indraCareCheckbox.checked = state.indraCareProtection;
  }

  const tax = (subtotal - promoDiscount) * 0.08; // 8% sales tax estimate
  const finalTotal = Math.max(0, subtotal - promoDiscount + shippingCost + tax + protectionFee);

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (discountEl) {
    discountEl.textContent = promoDiscount > 0 ? `-${formatCurrency(promoDiscount)}` : formatCurrency(0);
    discountEl.parentElement.classList.toggle('hidden', promoDiscount <= 0);
  }
  if (shippingEl) shippingEl.textContent = isFreeShipping ? 'FREE' : formatCurrency(shippingCost);
  if (taxEl) taxEl.textContent = formatCurrency(tax);
  if (totalEl) totalEl.textContent = formatCurrency(finalTotal);

  // Render items
  container.innerHTML = state.cart.map((item, idx) => `
    <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/20 transition-all">
      <div class="w-16 h-16 rounded-lg bg-slate-950 p-1.5 flex items-center justify-center flex-shrink-0 border border-white/5">
        <img src="${item.image}" alt="${item.name}" class="max-h-full max-w-full object-contain">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-white truncate">${item.name}</h4>
        <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
          <span class="flex items-center gap-1">
            <span class="w-2 h-2 rounded-full inline-block" style="background-color: ${item.color.hex}"></span>
            ${item.color.name}
          </span>
          <span>•</span>
          <span class="truncate">${item.variant.label}</span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <div class="font-extrabold text-sm text-cyan-400">${formatCurrency(item.price)}</div>
          <div class="flex items-center border border-white/10 rounded-lg overflow-hidden bg-slate-950">
            <button 
              class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              onclick="window.updateCartQty(${idx}, ${item.quantity - 1})"
            >−</button>
            <span class="w-8 text-center text-xs font-bold text-white">${item.quantity}</span>
            <button 
              class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              onclick="window.updateCartQty(${idx}, ${item.quantity + 1})"
            >+</button>
          </div>
        </div>
      </div>
      <button 
        class="text-slate-500 hover:text-rose-400 p-1 transition-colors"
        onclick="window.removeCartItem(${idx})"
        title="Remove Item"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    </div>
  `).join('');
}

// --- Quick View Modal ---
export function openQuickView(productId) {
  const p = state.products.find(item => item.id === productId);
  if (!p) return;

  state.activeQuickViewId = productId;
  state.quickViewSelectedColor = p.colors[0];
  state.quickViewSelectedVariant = 0;
  state.quickViewQty = 1;

  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-modal-content');
  if (!modal || !content) return;

  const discountPercent = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Media Gallery -->
      <div class="flex flex-col gap-4">
        <div class="aspect-square bg-slate-950 rounded-2xl border border-white/10 p-6 flex items-center justify-center relative overflow-hidden group">
          <img 
            id="quickview-main-img" 
            src="${p.image}" 
            alt="${p.name}" 
            class="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
          >
          ${discountPercent > 0 ? `
            <span class="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-black bg-rose-500 text-white">
              -${discountPercent}% OFF
            </span>
          ` : ''}
        </div>
        
        <!-- Thumbnails -->
        <div class="flex items-center gap-3 overflow-x-auto pb-1">
          ${p.gallery.map((img, i) => `
            <button 
              class="w-16 h-16 rounded-xl border ${i === 0 ? 'border-cyan-400 bg-cyan-950/20' : 'border-white/10 bg-slate-900/60'} p-1.5 flex items-center justify-center flex-shrink-0 hover:border-cyan-400/60 transition-colors"
              onclick="document.getElementById('quickview-main-img').src = '${img}'"
            >
              <img src="${img}" alt="Thumbnail" class="max-h-full max-w-full object-contain">
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Details -->
      <div class="flex flex-col justify-between">
        <div>
          <!-- Badges & Ratings -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs uppercase tracking-wider font-extrabold text-cyan-400">${p.categoryLabel}</span>
            <div class="flex items-center gap-1 text-xs text-amber-400 font-bold">
              ★ <span>${p.rating}</span>
              <span class="text-slate-500 font-normal">(${p.reviewsCount} customer reviews)</span>
            </div>
          </div>

          <h2 class="text-2xl font-black text-white mb-1">${p.name}</h2>
          <p class="text-sm text-cyan-200/80 mb-4">${p.tagline}</p>

          <!-- Pricing -->
          <div class="flex items-baseline gap-3 p-3 rounded-xl bg-slate-900/80 border border-white/5 mb-5">
            <span id="quickview-price" class="text-2xl font-black text-white">${formatCurrency(p.price)}</span>
            ${p.originalPrice ? `
              <span class="text-sm line-through text-slate-500">${formatCurrency(p.originalPrice)}</span>
              <span class="text-xs font-bold text-emerald-400">Save ${formatCurrency(p.originalPrice - p.price)}</span>
            ` : ''}
          </div>

          <!-- Description -->
          <p class="text-xs text-slate-300 leading-relaxed mb-5">${p.description}</p>

          <!-- Color Chooser -->
          <div class="mb-5">
            <label class="text-xs font-bold text-slate-300 block mb-2">
              Color: <span id="quickview-color-name" class="text-cyan-400">${p.colors[0].name}</span>
            </label>
            <div class="flex items-center gap-2">
              ${p.colors.map((c, idx) => `
                <button 
                  class="quickview-color-btn w-8 h-8 rounded-full border-2 ${idx === 0 ? 'swatch-selected' : 'border-white/20'} transition-transform hover:scale-110"
                  style="background-color: ${c.hex};"
                  data-idx="${idx}"
                  data-name="${c.name}"
                  title="${c.name}"
                ></button>
              `).join('')}
            </div>
          </div>

          <!-- Variant Options -->
          <div class="mb-5">
            <label class="text-xs font-bold text-slate-300 block mb-2">Configuration / Variant:</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${p.variants.map((v, idx) => `
                <button 
                  class="quickview-variant-btn p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                    idx === 0 
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                      : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/30'
                  }"
                  data-idx="${idx}"
                  data-diff="${v.priceDiff}"
                >
                  <div class="font-bold">${v.label}</div>
                  <div class="text-[11px] text-slate-400 mt-0.5">
                    ${v.priceDiff > 0 ? `+${formatCurrency(v.priceDiff)}` : 'Standard Price'}
                  </div>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Specs List Accordion -->
          <div class="p-3 rounded-xl bg-slate-950/60 border border-white/5 mb-6 text-xs divide-y divide-white/5">
            ${Object.entries(p.specs).map(([k, v]) => `
              <div class="py-1.5 flex justify-between">
                <span class="text-slate-400">${k}:</span>
                <span class="text-white font-medium text-right">${v}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Add to Cart Controls -->
        <div class="pt-4 border-t border-white/10 flex items-center gap-4">
          <div class="flex items-center border border-white/15 rounded-xl bg-slate-950">
            <button 
              id="qv-qty-minus" 
              class="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white text-base hover:bg-slate-800 transition-colors"
            >−</button>
            <span id="qv-qty-display" class="w-10 text-center font-bold text-sm text-white">1</span>
            <button 
              id="qv-qty-plus" 
              class="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white text-base hover:bg-slate-800 transition-colors"
            >+</button>
          </div>

          <button 
            id="qv-btn-add" 
            class="flex-1 py-3 px-6 rounded-xl btn-cyber-primary text-sm font-bold flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span>Add to Cyber Cart</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Quickview dynamic handlers
  const colorBtns = content.querySelectorAll('.quickview-color-btn');
  const colorNameEl = content.getElementById('quickview-color-name');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('swatch-selected'));
      btn.classList.add('swatch-selected');
      const idx = parseInt(btn.dataset.idx, 10);
      state.quickViewSelectedColor = p.colors[idx];
      if (colorNameEl) colorNameEl.textContent = p.colors[idx].name;
      playSound('click');
    });
  });

  const variantBtns = content.querySelectorAll('.quickview-variant-btn');
  const priceDisplayEl = content.getElementById('quickview-price');
  variantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      variantBtns.forEach(b => {
        b.classList.remove('bg-cyan-500/15', 'border-cyan-400', 'text-white', 'shadow-[0_0_15px_rgba(6,182,212,0.2)]');
        b.classList.add('bg-slate-900/60', 'border-white/10', 'text-slate-300');
      });
      btn.classList.add('bg-cyan-500/15', 'border-cyan-400', 'text-white', 'shadow-[0_0_15px_rgba(6,182,212,0.2)]');
      btn.classList.remove('bg-slate-900/60', 'border-white/10', 'text-slate-300');

      const idx = parseInt(btn.dataset.idx, 10);
      state.quickViewSelectedVariant = idx;
      const v = p.variants[idx];
      const newPrice = p.price + (v.priceDiff || 0);
      if (priceDisplayEl) priceDisplayEl.textContent = formatCurrency(newPrice);
      playSound('click');
    });
  });

  let currentQty = 1;
  const qtyMinus = content.getElementById('qv-qty-minus');
  const qtyPlus = content.getElementById('qv-qty-plus');
  const qtyDisplay = content.getElementById('qv-qty-display');

  qtyMinus.addEventListener('click', () => {
    if (currentQty > 1) {
      currentQty--;
      qtyDisplay.textContent = currentQty;
      playSound('click');
    }
  });

  qtyPlus.addEventListener('click', () => {
    if (currentQty < (p.stockCount || 10)) {
      currentQty++;
      qtyDisplay.textContent = currentQty;
      playSound('click');
    }
  });

  content.getElementById('qv-btn-add').addEventListener('click', () => {
    addToCart(
      p, 
      state.quickViewSelectedColor, 
      p.variants[state.quickViewSelectedVariant], 
      currentQty
    );
    closeQuickView();
  });

  modal.classList.remove('modal-hidden');
}

export function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) modal.classList.add('modal-hidden');
}

// --- Wishlist Modal ---
export function openWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  if (!modal) return;
  modal.classList.remove('modal-hidden');
  renderWishlistModal();
}

export function closeWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  if (modal) modal.classList.add('modal-hidden');
}

export function renderWishlistModal() {
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </div>
        <h4 class="text-lg font-bold text-white mb-1">Your Wishlist is Empty</h4>
        <p class="text-xs text-slate-400 max-w-xs mx-auto mb-4">Click the heart icon on any gadget to save it to your personal tech vault.</p>
      </div>
    `;
    return;
  }

  const items = state.wishlist.map(id => state.products.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${items.map(p => `
        <div class="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 transition-all">
          <div class="w-16 h-16 rounded-lg bg-slate-950 p-2 flex items-center justify-center flex-shrink-0">
            <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain">
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-white truncate">${p.name}</h4>
            <div class="text-xs font-black text-cyan-400 mt-1">${formatCurrency(p.price)}</div>
            <div class="flex items-center gap-2 mt-2">
              <button 
                class="px-3 py-1 rounded-lg btn-cyber-primary text-[11px] font-bold"
                onclick="window.moveWishlistToCart('${p.id}')"
              >Add to Cart</button>
              <button 
                class="text-xs text-rose-400 hover:underline"
                onclick="window.removeWishlistItem('${p.id}')"
              >Remove</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// --- Checkout Modal ---
export function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty! Add gadgets before checking out.', 'warning');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  // Initialize summary in checkout modal
  updateCheckoutSummary();
  modal.classList.remove('modal-hidden');
}

export function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('modal-hidden');
}

function updateCheckoutSummary() {
  const itemsContainer = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const totalEl = document.getElementById('checkout-total');
  const payBtnAmount = document.getElementById('checkout-pay-btn-amount');

  if (!itemsContainer) return;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const threshold = 99;
  const shippingCost = subtotal >= threshold ? 0 : 15;
  let promoDiscount = 0;
  if (state.appliedPromo) {
    if (state.appliedPromo.discountPercent) promoDiscount = subtotal * (state.appliedPromo.discountPercent / 100);
    else if (state.appliedPromo.discountFixed) promoDiscount = Math.min(subtotal, state.appliedPromo.discountFixed);
  }
  const protectionFee = state.indraCareProtection ? 29 : 0;
  const tax = (subtotal - promoDiscount) * 0.08;
  const grandTotal = Math.max(0, subtotal - promoDiscount + shippingCost + tax + protectionFee);

  itemsContainer.innerHTML = state.cart.map(item => `
    <div class="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
      <div class="flex items-center gap-2 truncate">
        <span class="text-cyan-400 font-bold">${item.quantity}x</span>
        <span class="text-slate-300 truncate">${item.name}</span>
      </div>
      <span class="text-white font-bold ml-2">${formatCurrency(item.price * item.quantity)}</span>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (totalEl) totalEl.textContent = formatCurrency(grandTotal);
  if (payBtnAmount) payBtnAmount.textContent = formatCurrency(grandTotal);
}

// --- Order Submission & Celebration ---
export function submitOrder(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('checkout-name');
  const emailInput = document.getElementById('checkout-email');
  const addressInput = document.getElementById('checkout-address');

  if (!nameInput || !nameInput.value.trim()) {
    showToast('Please enter your full name for delivery.', 'error');
    return;
  }
  if (!emailInput || !emailInput.value.trim() || !emailInput.value.includes('@')) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  if (!addressInput || !addressInput.value.trim()) {
    showToast('Please enter your delivery street address.', 'error');
    return;
  }

  // Create order data
  const orderId = 'INDRA-' + Math.floor(100000 + Math.random() * 900000);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const order = {
    id: orderId,
    date: new Date().toISOString(),
    customer: {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      address: addressInput.value.trim()
    },
    items: [...state.cart],
    totalUSD: subtotal,
    currency: state.activeCurrency,
    status: 'Confirmed'
  };

  state.recentOrders.unshift(order);
  state.lastPlacedOrder = order;
  saveOrders();

  // Clear cart
  state.cart = [];
  state.appliedPromo = null;
  state.indraCareProtection = false;
  saveCart();

  // Sound and confetti
  playSound('success');
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  closeCheckoutModal();
  openOrderSuccessModal(order);
}

// --- Order Success Modal ---
export function openOrderSuccessModal(order) {
  const modal = document.getElementById('order-success-modal');
  const content = document.getElementById('order-success-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="text-center py-6">
      <div class="w-20 h-20 mx-auto mb-4 rounded-3xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 glow-cyan">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
      </div>
      <div class="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
        ORDER REFERENCE: #${order.id}
      </div>
      <h3 class="text-2xl font-black text-white mb-2">Cyber Transmission Confirmed!</h3>
      <p class="text-xs text-slate-300 max-w-sm mx-auto mb-6">
        Thank you, <strong>${order.customer.name}</strong>. A receipt and real-time tracking telemetry have been sent to <strong>${order.customer.email}</strong>.
      </p>

      <div class="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-left mb-6 max-h-48 overflow-y-auto">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Package Contents:</div>
        <div class="divide-y divide-white/5">
          ${order.items.map(item => `
            <div class="flex items-center justify-between py-2 text-xs">
              <div class="truncate text-slate-200">
                <span class="text-cyan-400 font-bold">${item.quantity}x</span> ${item.name}
                <span class="text-[10px] text-slate-500 block">${item.color.name} • ${item.variant.label}</span>
              </div>
              <span class="text-white font-bold ml-2">${formatCurrency(item.price * item.quantity)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button 
          class="flex-1 py-3 rounded-xl btn-cyber-primary text-xs font-bold"
          onclick="window.trackOrderById('${order.id}')"
        >Track Shipment Live</button>
        <button 
          class="px-5 py-3 rounded-xl btn-cyber-outline text-xs font-bold"
          onclick="window.closeOrderSuccessModal()"
        >Continue Shopping</button>
      </div>
    </div>
  `;

  modal.classList.remove('modal-hidden');
}

export function closeOrderSuccessModal() {
  const modal = document.getElementById('order-success-modal');
  if (modal) modal.classList.add('modal-hidden');
}

// --- Order Tracking Modal ---
export function openTrackingModal(orderId = null) {
  const modal = document.getElementById('tracking-modal');
  const input = document.getElementById('tracking-order-id-input');
  if (!modal) return;

  if (orderId && input) {
    input.value = orderId;
    trackOrderQuery(orderId);
  } else if (state.recentOrders.length > 0 && input && !input.value) {
    input.value = state.recentOrders[0].id;
    trackOrderQuery(state.recentOrders[0].id);
  }

  modal.classList.remove('modal-hidden');
}

export function closeTrackingModal() {
  const modal = document.getElementById('tracking-modal');
  if (modal) modal.classList.add('modal-hidden');
}

export function trackOrderQuery(id) {
  const container = document.getElementById('tracking-result-container');
  if (!container) return;

  const order = state.recentOrders.find(o => o.id.toLowerCase() === id.trim().toLowerCase());

  if (!order && !id.startsWith('INDRA-')) {
    container.innerHTML = `
      <div class="p-6 text-center rounded-xl bg-slate-900/60 border border-white/5">
        <p class="text-xs text-rose-400">No active dispatch found for order reference "${id}". Orders typically follow format #INDRA-XXXXXX.</p>
      </div>
    `;
    return;
  }

  const displayId = order ? order.id : id.toUpperCase();
  const customerName = order ? order.customer.name : 'Cyber Citizen';

  container.innerHTML = `
    <div class="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30">
      <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div>
          <span class="text-xs font-mono text-cyan-400">TRACKING #${displayId}</span>
          <h4 class="text-sm font-bold text-white">Recipient: ${customerName}</h4>
        </div>
        <div class="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          IN TRANSIT
        </div>
      </div>

      <!-- Cyber Timeline -->
      <div class="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-cyan-500/60 before:to-slate-800">
        <div class="relative">
          <span class="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
          <div class="text-xs font-bold text-white">Order Received & Authenticated</div>
          <div class="text-[11px] text-slate-400">Payment 256-bit cleared. Indra inventory reserved.</div>
        </div>
        <div class="relative">
          <span class="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
          <div class="text-xs font-bold text-white">Neural Diagnostic & Quality Inspection</div>
          <div class="text-[11px] text-slate-400">Gadget calibrated, firmware v4.2 flashed, sealed in cyber anti-static packaging.</div>
        </div>
        <div class="relative">
          <span class="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          <div class="text-xs font-bold text-cyan-300">Dispatched via CyberDrop Autonomous Flight</div>
          <div class="text-[11px] text-slate-300">Package is en route. Altitude: 420m • Flight Speed: 110 km/h.</div>
        </div>
        <div class="relative opacity-60">
          <span class="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-slate-700"></span>
          <div class="text-xs font-bold text-slate-400">Out for Final Delivery</div>
          <div class="text-[11px] text-slate-500">Estimated Arrival: Tomorrow before 2:00 PM.</div>
        </div>
      </div>
    </div>
  `;
}

// --- Live Search Autocomplete Dropdown ---
function setupSearchAutocomplete() {
  const searchInput = document.getElementById('main-search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!searchInput || !dropdown) return;

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    state.searchQuery = val;

    if (val.length === 0) {
      dropdown.classList.add('hidden');
      renderProducts();
      return;
    }

    const matches = state.products.filter(p => 
      p.name.toLowerCase().includes(val) || 
      p.tagline.toLowerCase().includes(val) ||
      p.categoryLabel.toLowerCase().includes(val)
    ).slice(0, 5);

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div class="p-4 text-center text-xs text-slate-400">
          No gadgets found for "<span class="text-white">${val}</span>"
        </div>
      `;
    } else {
      dropdown.innerHTML = `
        <div class="p-2 divide-y divide-white/5">
          ${matches.map(p => `
            <div 
              class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-colors"
              onclick="window.selectSearchResult('${p.id}')"
            >
              <div class="w-10 h-10 rounded-lg bg-slate-950 p-1 flex items-center justify-center flex-shrink-0">
                <img src="${p.image}" alt="${p.name}" class="max-h-full max-w-full object-contain">
              </div>
              <div class="flex-1 min-w-0">
                <h5 class="text-xs font-bold text-white truncate">${p.name}</h5>
                <span class="text-[10px] text-cyan-400">${p.categoryLabel}</span>
              </div>
              <span class="text-xs font-extrabold text-white">${formatCurrency(p.price)}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    dropdown.classList.remove('hidden');
    renderProducts();
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  // Shortcut key '/' to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape') {
      closeQuickView();
      closeCartDrawer();
      closeWishlistModal();
      closeCompareModal();
      closeCheckoutModal();
      closeOrderSuccessModal();
      closeTrackingModal();
    }
  });
}

// --- Live Virtual Credit Card Form Binding ---
function setupCreditCardSync() {
  const numInput = document.getElementById('card-input-number');
  const nameInput = document.getElementById('card-input-name');
  const expInput = document.getElementById('card-input-exp');
  const cvvInput = document.getElementById('card-input-cvv');

  const cardNumDisplay = document.getElementById('card-display-number');
  const cardNameDisplay = document.getElementById('card-display-name');
  const cardExpDisplay = document.getElementById('card-display-exp');

  if (numInput && cardNumDisplay) {
    numInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
      e.target.value = val;
      cardNumDisplay.textContent = val || '•••• •••• •••• ••••';
    });
  }

  if (nameInput && cardNameDisplay) {
    nameInput.addEventListener('input', (e) => {
      cardNameDisplay.textContent = e.target.value.toUpperCase() || 'CYBER CITIZEN';
    });
  }

  if (expInput && cardExpDisplay) {
    expInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
      cardExpDisplay.textContent = val || 'MM/YY';
    });
  }
}

// --- Deal of the Day Countdown Timer ---
function startDealCountdown() {
  let secondsRemaining = 8 * 3600 + 42 * 60 + 15; // 8h 42m 15s

  setInterval(() => {
    if (secondsRemaining <= 0) {
      secondsRemaining = 24 * 3600;
    } else {
      secondsRemaining--;
    }

    const h = String(Math.floor(secondsRemaining / 3600)).padStart(2, '0');
    const m = String(Math.floor((secondsRemaining % 3600) / 60)).padStart(2, '0');
    const s = String(secondsRemaining % 60).padStart(2, '0');
    const timeStr = `${h}:${m}:${s}`;

    document.querySelectorAll('.deal-countdown').forEach(el => {
      el.textContent = timeStr;
    });

    const heroTimer = document.getElementById('hero-countdown-timer');
    if (heroTimer) {
      heroTimer.textContent = timeStr;
    }
  }, 1000);
}

// --- Attach Window Bridge Functions for Inline Handlers ---
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.closeCartDrawer = closeCartDrawer;
window.openCartDrawer = openCartDrawer;
window.removeCartItem = removeFromCart;
window.updateCartQty = updateCartQuantity;
window.removeWishlistItem = (id) => toggleWishlist(id);
window.moveWishlistToCart = (id) => {
  const p = state.products.find(item => item.id === id);
  if (p) {
    addToCart(p);
    toggleWishlist(id);
  }
};
window.removeCompareItem = (id) => toggleCompare(id);
window.addCompareItemToCart = (id) => {
  const p = state.products.find(item => item.id === id);
  if (p) addToCart(p);
};
window.closeCompareModal = closeCompareModal;
window.openCompareModal = openCompareModal;
window.closeWishlistModal = closeWishlistModal;
window.closeOrderSuccessModal = closeOrderSuccessModal;
window.trackOrderById = (id) => {
  closeOrderSuccessModal();
  openTrackingModal(id);
};
window.selectSearchResult = (id) => {
  const searchInput = document.getElementById('main-search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (searchInput) searchInput.value = '';
  if (dropdown) dropdown.classList.add('hidden');
  state.searchQuery = '';
  openQuickView(id);
};

// --- Initialization ---
export function initApp() {
  renderCategories();
  renderProducts();
  updateHeaderBadges();
  renderCompareBar();
  setupSearchAutocomplete();
  setupCreditCardSync();
  startDealCountdown();

  // Price Range Slider Listener
  const priceSlider = document.getElementById('price-slider');
  const priceLabel = document.getElementById('price-slider-label');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.priceRange = val;
      if (priceLabel) priceLabel.textContent = formatCurrency(val);
      renderProducts();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      playSound('click');
      renderProducts();
    });
  }

  // Quick Filter Toggles
  const inStockCheck = document.getElementById('filter-in-stock');
  if (inStockCheck) {
    inStockCheck.addEventListener('change', (e) => {
      state.filterInStock = e.target.checked;
      playSound('click');
      renderProducts();
    });
  }

  const dealsCheck = document.getElementById('filter-deals');
  if (dealsCheck) {
    dealsCheck.addEventListener('change', (e) => {
      state.filterDeals = e.target.checked;
      playSound('click');
      renderProducts();
    });
  }

  // Currency Selector
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.value = state.activeCurrency;
    currencySelect.addEventListener('change', (e) => {
      state.activeCurrency = e.target.value;
      localStorage.setItem('indra_currency', state.activeCurrency);
      playSound('click');
      renderProducts();
      updateHeaderBadges();
      renderCartDrawer();
      if (priceSlider && priceLabel) {
        priceLabel.textContent = formatCurrency(parseInt(priceSlider.value, 10));
      }
      showToast(`Currency changed to ${state.activeCurrency}`, 'info');
    });
  }

  // Sound FX Toggle
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      localStorage.setItem('indra_sound', state.soundEnabled);
      soundBtn.innerHTML = state.soundEnabled 
        ? `<svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>`
        : `<svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      showToast(state.soundEnabled ? 'Cyber Sound FX: Activated' : 'Cyber Sound FX: Muted', 'info');
      if (state.soundEnabled) playSound('click');
    });
  }

  // Cart Drawer Triggers
  const openCartBtn = document.getElementById('btn-open-cart');
  if (openCartBtn) openCartBtn.addEventListener('click', () => { playSound('click'); openCartDrawer(); });

  const closeCartBtn = document.getElementById('btn-close-cart');
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => { playSound('click'); closeCartDrawer(); });

  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // Wishlist Modal Triggers
  const openWishlistBtn = document.getElementById('btn-open-wishlist');
  if (openWishlistBtn) openWishlistBtn.addEventListener('click', () => { playSound('click'); openWishlistModal(); });

  const closeWishlistBtn = document.getElementById('btn-close-wishlist');
  if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlistModal);

  // Compare Modal Triggers
  const openCompareBtn = document.getElementById('btn-open-compare');
  if (openCompareBtn) openCompareBtn.addEventListener('click', () => { playSound('click'); openCompareModal(); });

  const closeCompareBtn = document.getElementById('btn-close-compare');
  if (closeCompareBtn) closeCompareBtn.addEventListener('click', closeCompareModal);

  // Quick View Close Trigger
  const closeQvBtn = document.getElementById('btn-close-quickview');
  if (closeQvBtn) closeQvBtn.addEventListener('click', closeQuickView);

  // Checkout Triggers
  const btnProceedCheckout = document.getElementById('btn-proceed-checkout');
  if (btnProceedCheckout) btnProceedCheckout.addEventListener('click', openCheckoutModal);

  const btnCloseCheckout = document.getElementById('btn-close-checkout');
  if (btnCloseCheckout) btnCloseCheckout.addEventListener('click', closeCheckoutModal);

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', submitOrder);

  // Order Tracking Triggers
  const openTrackingBtn = document.getElementById('btn-open-tracking');
  if (openTrackingBtn) openTrackingBtn.addEventListener('click', () => { playSound('click'); openTrackingModal(); });

  const closeTrackingBtn = document.getElementById('btn-close-tracking');
  if (closeTrackingBtn) closeTrackingBtn.addEventListener('click', closeTrackingModal);

  const trackingQueryBtn = document.getElementById('btn-track-query');
  if (trackingQueryBtn) {
    trackingQueryBtn.addEventListener('click', () => {
      const input = document.getElementById('tracking-order-id-input');
      if (input && input.value) {
        trackOrderQuery(input.value);
      }
    });
  }

  // Promo Code in Cart Drawer
  const btnApplyPromo = document.getElementById('btn-apply-promo');
  const promoInput = document.getElementById('cart-promo-input');
  if (btnApplyPromo && promoInput) {
    btnApplyPromo.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;
      if (promoCodes[code]) {
        state.appliedPromo = promoCodes[code];
        playSound('success');
        showToast(`Promo <strong>${code}</strong> applied! (${promoCodes[code].description})`, 'success');
        promoInput.value = '';
        renderCartDrawer();
      } else {
        showToast(`Invalid promo code "${code}". Try CYBERGADGET or INDRA10`, 'error');
      }
    });
  }

  // IndraCare checkbox in cart
  const indraCareCheckbox = document.getElementById('cart-indracare-toggle');
  if (indraCareCheckbox) {
    indraCareCheckbox.addEventListener('change', (e) => {
      state.indraCareProtection = e.target.checked;
      playSound('click');
      renderCartDrawer();
    });
  }

  // Newsletter VIP Signup
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        playSound('success');
        if (typeof window.confetti === 'function') {
          window.confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
        }
        showToast('Welcome to Indra Syndicate! Your VIP discount is: <strong>CYBERGADGET</strong> (15% OFF)', 'success');
        document.getElementById('newsletter-email').value = '';
      }
    });
  }

  // Hero Shop Flagship Action
  const btnHeroFlagship = document.getElementById('btn-hero-flagship');
  if (btnHeroFlagship) {
    btnHeroFlagship.addEventListener('click', () => {
      openQuickView('indra-quantum-x1');
    });
  }
}

// Auto bootstrap when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
