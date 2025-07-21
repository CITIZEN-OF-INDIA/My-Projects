

function submitWord() {
  const word = document.getElementById("wordInput").value.trim();
  const result = document.getElementById("wordResult");

  if (word === "") {
    result.style.color = "red";
    result.textContent = "Please enter a valid word.";
  } else {
    result.style.color = "green";
    result.textContent = `Word received: "${word}"`;
  }
}

function startSPSGame() {
  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = `
    <h3>Stone Paper Scissors</h3>
    <p>Choose your move:</p>
    <div class="choices">
      <button onclick="playSPS('stone')">Stone</button>
      <button onclick="playSPS('paper')">Paper</button>
      <button onclick="playSPS('scissors')">Scissors</button>
    </div>
    <p class="result" id="spsResult"></p>
  `;
}

function playSPS(playerChoice) {
  const choices = ["stone", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const result = document.getElementById("spsResult");

  let outcome = "";

  if (playerChoice === computerChoice) {
    outcome = "It's a draw!";
  } else if (
    (playerChoice === "stone" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "stone") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    outcome = "You win!";
  } else {
    outcome = "You lose!";
  }

  result.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${outcome}`;
}
let lastLetter = "";
let currentScore = 0;
let usedWords = [];

const input = document.getElementById("wordInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const currentScoreSpan = document.getElementById("currentScore");
const highScoreSpan = document.getElementById("highScore");

let highScore = localStorage.getItem("highScore") || 0;
highScoreSpan.textContent = highScore;

submitBtn.addEventListener("click", submitWord);
resetBtn.addEventListener("click", resetGame);

function submitWord() {
  const word = input.value.trim().toLowerCase();

  if (!word.match(/^[a-z]+$/)) {
    showMessage("❌ Please enter a valid word (only letters).", true);
    return;
  }

  if (usedWords.includes(word)) {
    showMessage("⚠️ You already used this word.", true);
    return;
  }

  if (lastLetter && word[0] !== lastLetter) {
    showMessage(`❌ Word must start with "${lastLetter.toUpperCase()}".`, true);
    return;
  }

  usedWords.push(word);
  lastLetter = word[word.length - 1];
  currentScore += word.length;
  currentScoreSpan.textContent = currentScore;

  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem("highScore", highScore);
    highScoreSpan.textContent = highScore;
  }

  showMessage(`✅ Good! Now use a word starting with "${lastLetter.toUpperCase()}"`);
  input.value = "";
  input.focus();
}

function resetGame() {
  currentScore = 0;
  lastLetter = "";
  usedWords = [];
  currentScoreSpan.textContent = 0;
  input.value = "";
  input.focus();
  showMessage("🔄 Game reset. Start with any word.");
}

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "red" : "green";
}
