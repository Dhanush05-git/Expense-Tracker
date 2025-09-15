const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addIncomeBtn = document.getElementById("addIncome");
const addExpenseBtn = document.getElementById("addExpense");

// ✅ Load transactions from localStorage if available
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Chart.js Setup
const ctx = document.getElementById("expenseChart").getContext("2d");
let expenseChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["green", "red"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});

// Save transactions to localStorage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add transaction (income or expense)
function addTransaction(type) {
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter description and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: type === "income" ? +amount.value : -Math.abs(amount.value),
  };

  transactions.push(transaction);
  saveTransactions(); // ✅ Save after adding
  addTransactionDOM(transaction);
  updateValues();
  updateChart();

  text.value = "";
  amount.value = "";
  amount.classList.remove("income-mode", "expense-mode");
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} <span>${sign}&#8377;${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">✖</button>
  `;

  list.prepend(item); // Keep latest transaction on top
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveTransactions(); // ✅ Save after removing
  init();
}

// Update balance, income, expense
function updateValues() {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense =
    (amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) *
      -1).toFixed(2);

  balance.innerHTML = `&#8377;${total}`;
  money_plus.innerHTML = `+&#8377;${income}`;
  money_minus.innerHTML = `-&#8377;${expense}`;
}

// Update chart
function updateChart() {
  const amounts = transactions.map((t) => t.amount);
  const income = amounts.filter((a) => a > 0).reduce((a, b) => a + b, 0);
  const expense = amounts.filter((a) => a < 0).reduce((a, b) => a + b, 0) * -1;

  expenseChart.data.datasets[0].data = [income, expense];
  expenseChart.update();
}

// Initialize the list
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
  updateChart();
}

// Button Click Listeners
addIncomeBtn.addEventListener("click", () => {
  amount.classList.add("income-mode");
  amount.classList.remove("expense-mode");
  addTransaction("income");
});

addExpenseBtn.addEventListener("click", () => {
  amount.classList.add("expense-mode");
  amount.classList.remove("income-mode");
  addTransaction("expense");
});

// ✅ Initialize with saved data
init();
