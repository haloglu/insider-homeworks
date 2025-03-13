// 1. prompt() ile kullanıcıdan isim, yaş ve meslek almalı ve bir nesne (object) içinde saklamalı.

// let userDetails = {};

// userDetails.name = prompt("Lütfen isminizi giriniz : ");
// userDetails.age = prompt("Lüfen yaşınızı giriniz : ");
// userDetails.job = prompt("Lütfen mesleğinizi giriniz : ");

// alert(
//   `İsminiz: ${userDetails.name}, Yaşınız: ${userDetails.age}, Mesleğiniz: ${userDetails.job}`
// );

///////////////////////////////////////////////////////

// 2. Bir dizi (array) kullanarak ürünleri sepete eklemeli ve listelemeli. (name, price)

// const cart = [
//   { id: 1, name: "Laptop", price: 5000 },
//   { id: 2, name: "Tablet", price: 3500 },
//   { id: 3, name: "Telefon", price: 1000 },
// ];

// let cartDetails = "";
// cart.forEach((item) => {
//   cartDetails += `Ürün : ${item.name}, Fiyat : ${item.price}\n`;
// });

// alert(cartDetails);

///////////////////////////////////////////////////////

// 3. reduce() metodunu kullanarak sepetin toplam fiyatını hesaplamalı.

// let sum = cart.reduce((acc, curr) => acc + curr.price, 0);
// alert("Sepet Toplamı : " + sum);

///////////////////////////////////////////////////////

// 4. Kullanıcıdan dinamik olarak ürün eklemesini isteyebiliriz

let fruits = ["elma", "portakal"];
alert("Mevcut Meyveler : " + fruits.join(", "));

let addFruit = prompt("Lütfen bir meyve giriniz : ");

if (addFruit) {
  fruits.push(addFruit);
  alert("Yeni meyve eklendi! Güncel liste : " + fruits.join(", "));
} else {
  alert("Bir meyve girdiniz.");
}

// 5. Bir ürünü sepetten çıkarmalarını sağlayacak bir fonksiyon nasıl yazılabilir bunu araştırmalı ve yapabiliyorsa yapmalı.

function removeFromCart() {
  if (fruits.length === 0) {
    alert("Sepetinizde hiç ürün yok!");
    return;
  }

  let removeIndex = prompt(
    "Silmek istediğiniz meyvenin index numarasını giriniz (0'dan başlar): \n" +
      fruits.map((fruit, index) => `${index}: ${fruit}`).join("\n")
  );

  removeIndex = Number(removeIndex); // String girdiyi sayıya çeviriyoruz

  // Girilen indexin geçerli olup olmadığını kontrol etme
  if (!isNaN(removeIndex) && removeIndex >= 0 && removeIndex < fruits.length) {
    let removedFruit = fruits.splice(removeIndex, 1); // Ürünü listeden çıkar
    alert(
      `${removedFruit} adlı meyve silindi! Güncel liste: ` + fruits.join(", ")
    );
  } else {
    alert("Geçersiz index girdiniz.");
  }
}

// Kullanıcıdan ürünü çıkarmasını isteme
let removeProduct = confirm("Bir ürünü çıkarmak ister misiniz?");
if (removeProduct) {
  removeFromCart();
}
