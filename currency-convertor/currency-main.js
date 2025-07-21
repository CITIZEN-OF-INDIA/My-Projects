//const API_KEY = "";  // Replace with your real API key by signing in to ExchangeRate API
const API_KEY = "YOUR_API_KEY_HERE";  // Replace this after cloning

const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.text = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateExchangeRate = async () => {
  let amountInput = document.querySelector(".amount input");
  let amtVal = parseFloat(amountInput.value);
  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;
  const url = `${BASE_URL}/${from}/${to}/${amtVal}`;
  console.log("Fetching:", url);

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data || typeof data.conversion_result === "undefined") {
      throw new Error("Invalid data structure");
    }

    const finalAmount = data.conversion_result.toFixed(2);
    msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msg.innerText = "Something went wrong. Please try again.";
  }
};

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
