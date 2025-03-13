$(document).ready(function () {
  $("body").css({
    background: "#121212",
    margin: "0",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "font-family": "sans-serif",
    color: "#ddd",
  });

  const $productsListButton = $("<button>Ürünleri Listele</button>");
  $productsListButton.css({
    position: "fixed",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "transparent",
    color: "#fff",
    border: "2px solid #fff",
    padding: "12px 24px",
    "font-size": "16px",
    "font-weight": "bold",
    "border-radius": "25px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  });

  $productsListButton.hover(
    function () {
      $(this).css({
        background: "#fff",
        color: "#121212",
      });
    },
    function () {
      $(this).css({
        background: "transparent",
        color: "#fff",
      });
    }
  );

  $("body").append($productsListButton);

  const $productsContainer = $("<div></div>");
  $productsContainer.css({
    display: "grid",
    "grid-template-columns": "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px",
    position: "absolute",
    "justify-content": "center",
    top: "150px",
    width: "80%",
    left: "50%",
    transform: "translate(-50%)",
  });
  $("body").append($productsContainer);

  $productsListButton.click(function () {
    $productsContainer.empty();

    $.ajax({
      url: "products.json",
      type: "GET",
      dataType: "json",
      success: function (response) {
        $.each(response, function (index, product) {
          const $productDiv = $("<div></div>").css({
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
            background: "#222",
          });

          const $productName = $("<h2></h2>")
            .text(product.productName)
            .css({ color: "#fff" });
          const $productPrice = $("<p></p>")
            .text("Fiyat : " + product.price + " ₺")
            .css({ color: "#ddd" });
          const $productImage = $("<img>").attr("src", product.image).css({
            width: "150px",
            marginBottom: "15px",
            borderRadius: "8px",
          });

          const $productLink = $("<a></a>")
            .attr("href", product.link)
            .text("Ürünü İncele")
            .attr("target", "_blank")
            .css({
              display: "block",
              marginTop: "15px",
              color: "#007bff",
              textDecoration: "none",
            });

          $productDiv.append(
            $productImage,
            $productName,
            $productPrice,
            $productLink
          );
          $productsContainer.append($productDiv);
        });
      },
      error: function (xhr, response, error) {
        console.log("Bir hata oluştu : ", error);
      },
      complete: function (xhr, status) {
        console.log("İstek başarıyla gönderildi, sonuç : ", status);
      },
      timeout: 5000,
      async: true,
      contentType: "application/json",
    });
  });
});
