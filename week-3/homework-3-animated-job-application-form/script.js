$(document).ready(function () {
  $("body").css({
    "font-family": "Arial, sans-serif",
    "background-color": "#f6f6f6",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    height: "100vh",
    margin: "0",
  });

  $(".container").css({
    "text-align": "center",
  });
  $(".apply-button-container").css({
    "text-align": "center",
    "margin-bottom": "20px",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  });

  $(".insider-logo").css({
    width: "50px",
    "margin-bottom": "10px",
  });

  $(".apply-button-header").css({
    "font-size": "1.1em",
    color: "#333",
    "margin-bottom": "15px",
  });

  $(".apply-button")
    .css({
      "background-color": "#007bff",
      color: "white",
      padding: "15px 30px",
      "border-radius": "5px",
      "font-size": "1.2em",
      cursor: "pointer",
      transition: "background-color 0.3s",
      "box-shadow": "0 2px 4px rgba(0, 0, 0, 0.2)",
    })
    .hover(
      function () {
        $(this).css("background-color", "#0069d9");
      },
      function () {
        $(this).css("background-color", "#007bff");
      }
    );

  $(".apply-button i").css({
    "margin-right": "8px",
    "font-size": "1.2em",
    color: "white",
  });

  $(".form-container").css({
    display: "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "background-color": "white",
    padding: "20px",
    "border-radius": "8px",
    "box-shadow": "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
  });

  $("#form-validate label").css({
    display: "block",
    "margin-bottom": "8px",
    "font-weight": "bold",
  });

  $("#form-header h3").css({
    "font-size": "1.5em",
    "font-weight": "bold",
    color: "#007bff",
    "text-align": "center",
    "margin-bottom": "5px",
  });

  $("#form-header p").css({
    "font-size": "0.9em",
    color: "#666",
    "text-align": "center",
    "margin-bottom": "15px",
  });

  $("#form-validate input, #form-validate button").css({
    width: "100%",
    padding: "10px",
    "margin-bottom": "10px",
    border: "1px solid #ccc",
    "border-radius": "4px",
    "box-sizing": "border-box",
  });

  $("#form-validate button")
    .css({
      "background-color": "#28a745",
      color: "white",
      cursor: "pointer",
      transition: "background-color .3s",
    })
    .hover(function () {
      $(this).css("background-color", "#218838");
    });

  $(".success-message").css({
    display: "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "background-color": "#d4edda",
    color: "#155724",
    padding: "20px",
    border: "1px solid #c3e6cb",
    "border-radius": "5px",
  });

  $(".apply-button").click(function () {
    $(".form-container").fadeIn(500);
  });

  $("#phone").mask("(999) 999-99-99");

  $("#date").flatpickr({
    dateFormat: "Y-m-d",
  });

  $("#form-validate").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      surname: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 10,
      },
      position: {
        required: true,
        minlength: 3,
      },
      date: {
        required: true,
        date: true,
      },
    },
    messages: {
      name: {
        required: "Lütfen adınızı girin.",
        minlength: "Adınız en az 2 karakter olmalıdır.",
      },
      surname: {
        required: "Lütfen soyadınızı girin.",
        minlength: "Soyadınız en az 2 karakter olmalıdır.",
      },
      email: {
        required: "Lütfen e-posta adresinizi girin.",
        email: "Lütfen geçerli bir e-posta adresi girin.",
      },
      phone: {
        required: "Lütfen telefon numaranızı girin.",
        minlength: "Telefon numaranız en az 10 karakter olmalıdır.",
      },
      position: {
        required: "Lütfen pozisyon bilgisini girin.",
        minlength: "Pozisyon bilgisi en az 3 karakter olmalıdır.",
      },
      date: {
        required: "Lütfen tarihi girin.",
        date: "Lütfen geçerli bir tarih girin.",
      },
    },
    errorPlacement: function (error, element) {
      error
        .css({
          color: "red",
          display: "block",
          "font-size": "0.8em",
          "margin-top": "2px",
          "margin-bottom": "10px",
        })
        .insertAfter(element);
      element.css("border", "1px solid red");
    },
    success: function (label, element) {
      $(element).css("border", "1px solid #ccc");
    },
    submitHandler: function (form) {
      $(".form-container").fadeOut(function () {
        $(".success-message")
          .css("top", "70%")
          .fadeIn(function () {
            setTimeout(function () {
              $(".success-message").fadeOut();
            }, 3000);
          });
        form.reset();
      });
    },
  });
});
