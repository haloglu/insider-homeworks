let getData = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const oneDay = 1000 * 60 * 60 * 24;

  return new Promise((resolve, reject) => {
    let savedData = localStorage.getItem("data");

    if (savedData) {
      let parsedData = JSON.parse(savedData);
      let savedTimestamp = parsedData.timestamp;
      let now = Date.now();

      if (now - savedTimestamp < oneDay) {
        resolve(parsedData.users);
        return;
      }
    }

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);
        return response.json();
      })
      .then((users) => {
        localStorage.setItem(
          "data",
          JSON.stringify({ timestamp: Date.now(), users })
        );
        resolve(users);
      })
      .catch((error) => {
        console.error(`Hata: ${error.message}`);
        reject(error);
      });
  });
};

getData().then((users) => {
  console.log("Dönen veri : ", users);
});

getData().then((users) => {
  let container = document.getElementById("ins-api-users");

  const style = document.createElement("style");
  style.textContent = `
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(135deg, #232526, #414345);
        font-family: "Poppins", sans-serif;
        color: white;
      }
  
     .content-wrapper {
        text-align: center;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        padding: 25px;
        width: 90%;
        max-width: 800px;
        border: none; /* Tamamen çerçevesiz */
      }

  
      h1 {
        font-size: 28px;
        color: #ffffff;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }
  
      p {
        font-size: 16px;
        color: #e0e0e0;
        margin-bottom: 20px;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      }
  
      table {
        width: 100%;
        border:none;
        margin-top: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        overflow: hidden;
      }
  
      th, td {
        padding: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        text-align: left;
        color: #ffffff;
      }
  
      th {
        background: rgba(255, 255, 255, 0.2);
        font-weight: bold;
      }
  
      .delete-btn {
        background: linear-gradient(45deg, #ff6b6b, #ff4757);
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
      }
  
      .delete-btn:hover {
        background: linear-gradient(45deg, #ff4757, #e84118);
        transform: scale(1.1);
      }
    `;
  document.head.appendChild(style);

  container.innerHTML = `
        <div class="content-wrapper">
          <h1>Kullanıcı Listesi</h1>
          <p>Bu tabloda API'den çekilen kullanıcıların isimleri, e-postaları ve şehirleri listelenmektedir.</p>
          <table>
            <thead>
              <tr>
                <th>İsim</th>
                <th>Email</th>
                <th>Şehir</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody id="user-table-body"></tbody>
          </table>
        </div>
      `;

  let tableBody = document.getElementById("user-table-body");

  users.forEach((user) => {
    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = user.name;

    let emailCell = document.createElement("td");
    emailCell.textContent = user.email;

    let cityCell = document.createElement("td");
    cityCell.textContent = user.address.city;

    let deleteCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
      let savedData = localStorage.getItem("data");

      if (savedData) {
        let parsedData = JSON.parse(savedData);

        // Tıklanan satırdaki kullanıcının ID'sini al
        let userId = user.id;

        // Sadece tıklanan ID'yi `localStorage`'dan kaldır
        let updatedUsers = parsedData.users.filter(
          (user) => user.id !== userId
        );

        let newDataToStore = {
          timestamp: parsedData.timestamp,
          users: updatedUsers,
        };

        localStorage.setItem("data", JSON.stringify(newDataToStore));
      }

      row.remove();
    });

    deleteCell.appendChild(deleteButton);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(cityCell);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
});
