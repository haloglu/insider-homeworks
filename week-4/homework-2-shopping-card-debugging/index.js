const products = [
  { id: 1, name: "Laptop", price: 15000, stock: 5 },
  { id: 2, name: "Telefon", price: 8000, stock: 10 },
  { id: 3, name: "Tablet", price: 5000, stock: 8 },
  { id: 4, name: "Kulaklık", price: 1000, stock: 15 },
  { id: 5, name: "Mouse", price: 500, stock: 20 },
];

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.discountApplied = false;
  }

  addItem(productId, quantity = 1) {
    try {
      const product = products.find((p) => p.id === productId);

      if (!product) {
        throw new Error("Ürün bulunamadı!");
      }

      if (product.stock < quantity) {
        // ✅ HATA DÜZELTİLDİ: `<=` yerine `<` kullanıldı
        throw new Error("Yetersiz stok!");
      }

      const existingItem = this.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          productId,
          name: product.name,
          price: product.price,
          quantity,
        });
      }

      product.stock -= quantity; // ✅ Stok doğru şekilde azaltıldı

      this.calculateTotal();
      this.updateUI();
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      this.showError(error.message);
    }
  }

  removeItem(productId) {
    try {
      const itemIndex = this.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex === -1) {
        throw new Error("Ürün sepette bulunamadı!");
      }

      const item = this.items[itemIndex];
      const product = products.find((p) => p.id === productId);

      if (item.quantity > 1) {
        item.quantity -= 1; // ✅ Eğer miktar 1'den fazlaysa sadece 1 azalt
      } else {
        this.items.splice(itemIndex, 1); // ✅ Son ürünse tamamen kaldır
      }

      product.stock += 1; // ✅ Silinen ürünün sadece 1 tanesi stoğa geri ekleniyor

      this.calculateTotal();
      this.updateUI();
      document.dispatchEvent(new Event("stockUpdate")); // ✅ Stok değişikliği için event tetiklendi
    } catch (error) {
      console.error("Ürün silme hatası:", error);
      this.showError(error.message);
    }
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity; // ✅ HATA DÜZELTİLDİ: `quantity` ile çarpılmadığı için yanlış hesaplama yapılıyordu
    }, 0);

    if (this.discountApplied && this.total > 0) {
      this.total *= 0.9; // ✅ HATA DÜZELTİLDİ: `this.total *= 0.1` yerine `0.9` ile çarpıldı
    }
  }

  applyDiscount(code) {
    if (this.discountApplied) {
      this.showError("Bu indirim kodu zaten kullanıldı!"); // ✅ Aynı kod tekrar girildiğinde hata mesajı verildi
      return;
    }

    if (code === "INDIRIM10") {
      this.discountApplied = true;
      this.calculateTotal();
      this.updateUI();
      this.showMessage("İndirim uygulandı!");
    } else {
      this.showError("Geçersiz indirim kodu!"); // ✅ Geçersiz kod girildiğinde hata mesajı verildi
    }
  }

  updateUI() {
    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total");

    if (cartElement && totalElement) {
      cartElement.innerHTML = this.items
        .map(
          (item) => `
                    <div class="cart-item">
                        <span>${item.name}</span>
                        <span>${item.quantity} adet</span>
                        <span>${item.price} TL</span>
                        <button onclick="cart.removeItem(${item.productId})">Sil</button>
                    </div>
                `
        )
        .join("");

      totalElement.textContent = `Toplam: ${this.total} TL`;
    }

    if (window.app && typeof window.app.renderProducts === "function") {
      window.app.renderProducts(); // ✅ HATA DÜZELTİLDİ: `this.renderProducts()` yerine `window.app.renderProducts()` çağırıldı
    }

    console.log(
      `Sepet güncellendi - Ürünler: ${this.items
        .map((item) => `${item.name} (${item.quantity} adet)`)
        .join(", ")}, Toplam Tutar: ${this.total} TL`
    ); // ✅ Gereksiz dizi console.log() yerine okunabilir mesaj eklendi
  }

  showError(message) {
    const errorElement = document.getElementById("error");
    if (errorElement) {
      errorElement.textContent = message; // ✅ HATA DÜZELTİLDİ: Hata mesajları birikmemesi için temizlenerek ekleniyor
    }
  }

  showMessage(message) {
    const messageElement = document.getElementById("message");
    if (messageElement) {
      messageElement.textContent = message;
      setTimeout(() => {
        messageElement.textContent = "";
      }, 3000);
    }
  }
}

class App {
  constructor() {
    window.cart = new ShoppingCart();
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      this.renderProducts();
      this.setupEventHandlers();
    });
  }

  renderProducts() {
    const productsElement = document.getElementById("products");
    if (productsElement) {
      productsElement.innerHTML = products
        .map(
          (product) => `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>Fiyat: ${product.price}.00 TL</p>
                    <p>Stok: ${product.stock}</p>
                    <button onclick="app.addToCart(${product.id})"
                            ${product.stock === 0 ? "disabled" : ""}>
                        Sepete Ekle
                    </button>
                </div>
            `
        )
        .join("");
    }
  }

  setupEventHandlers() {
    const discountForm = document.getElementById("discount-form");
    if (discountForm) {
      discountForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const codeInput = document.getElementById("discount-code");
        if (codeInput) {
          window.cart.applyDiscount(codeInput.value);
        }
      });
    }

    document.addEventListener("stockUpdate", () => {
      this.renderProducts();
    });
  }

  addToCart(productId) {
    window.cart.addItem(productId, 1);
    document.dispatchEvent(new Event("stockUpdate"));
  }
}

const app = new App();
window.app = app;
