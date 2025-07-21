const lengthEl = document.getElementById("length");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const passwordEl = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const number = "0123456789";
const symbol = "!@#$%&*.?";

function generatePassword() {
  const length = +lengthEl.value;
  let chars = "";

  if (lowercaseEl.checked) chars += lower;
  if (uppercaseEl.checked) chars += upper;
  if (numbersEl.checked) chars += number;
  if (symbolsEl.checked) chars += symbol;

  if (chars === "") {
    passwordEl.value = "Select at least one option";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    password += randomChar;
  }

  passwordEl.value = password;
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  passwordEl.select();
  document.execCommand("copy");
  alert("Password copied!");
});
