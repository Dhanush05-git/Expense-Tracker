const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter both text and amount!");
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = "";
  amount.value = "";
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // Add text, amount, and delete button
  item.innerHTML = `
    ${transaction.text} 
    <span>${sign}&#8377;${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update balance, income, and expense
function updateValues() {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter((i) => i > 0).reduce((acc, i) => acc + i, 0).toFixed(2);
  const expense = (amounts.filter((i) => i < 0).reduce((acc, i) => acc + i, 0) * -1).toFixed(2);

  balance.innerHTML = `&#8377;${total}`;
  money_plus.innerHTML = `+&#8377;${income}`;
  money_minus.innerHTML = `-&#8377;${expense}`;
}

// Remove transaction by ID
window.removeTransaction = function(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateLocalStorage();
  Init();
};

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialize app
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();
form.addEventListener("submit", addTransaction);
