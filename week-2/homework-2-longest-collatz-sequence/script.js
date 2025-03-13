// Görsel açıdan güzelleştirilmiş bir biçimde hesaplama

function startCollatz() {
  let num = parseInt(document.getElementById("numberInput").value);
  if (isNaN(num) || num <= 0) {
    alert("Lütfen pozitif bir tam sayı girin!");
    return;
  }

  let startTime = performance.now();
  let numList = [];
  while (num !== 1) {
    numList.push(num);
    num = num % 2 === 0 ? num / 2 : num * 3 + 1;
  }
  numList.push(1);
  let endTime = performance.now();

  let timeTaken = ((endTime - startTime) / 1000).toFixed(2);
  document.getElementById(
    "timer"
  ).innerText = `Hesaplama süresi: ${timeTaken} saniye`;
  setTimeout(() => {
    document.getElementById("timer").innerText = "";
  }, 2500);

  let resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";
  let index = 0;
  function showNextNumber() {
    if (index < numList.length) {
      resultDiv.innerHTML += numList[index] + " ➝ ";
      index++;
      setTimeout(showNextNumber, 100);
    } else {
      resultDiv.innerHTML = resultDiv.innerHTML.slice(0, -3);
    }
  }
  showNextNumber();
}

// Temel olarak hesaplama

// let num = prompt();

// let counter = 0;
// let numList = [];

// while (num != 1) {
//   if (num % 2 == 0) {
//     num /= 2;
//   } else {
//     num = num * 3 + 1;
//   }

//   numList[counter] = num;
//   counter++;
// }

// let results = document.getElementById("collatz");

// for (var i = 0; i < numList.length; i++) {
//   results.innerHTML = results.innerHTML + numList[i] + " ";
// };
