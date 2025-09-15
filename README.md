# Expense-Tracker
A simple and interactive Expense Tracker web application to help you manage your finances. You can easily track income, expenses, and balance in real time. Each transaction you add is saved locally in your browser, so it persists even if you refresh the page.

💡 Features

Track your balance – see your total income minus expenses.

Income and Expense Overview – separate sections for quick visualization.

Transaction History – shows all your transactions with clear labels for income (+) and expense (-).

Delete Transactions – remove a specific transaction with a single click.

Persistent Data – all your transactions are saved in your browser using local storage.

🖥️ Screenshots

<img width="1504" height="756" alt="Screenshot 2025-09-15 at 12 34 41 PM" src="https://github.com/user-attachments/assets/149253c8-dc8b-482a-bde3-27e7b0813e0f" />

⚙️ How to Use

Open the project: Open index.html in your browser.

Add a transaction:

Enter a description in the Text field.

Enter an amount in the Amount field:

Positive number → Income

Negative number → Expense

Click Submit.

View History: Your transactions will appear below in the history section.

Delete a transaction: Click the ❌ button next to any transaction to remove it.

See your balance: The balance, total income, and total expenses update automatically.

expense-tracker/
│
├─ tracker.html           
├─ tracker.css 
└─ tracker.js     

💻 Technologies Used

HTML – structure of the app.

CSS – styling and responsive layout.

JavaScript – dynamic behaviour, DOM manipulation, and local storage.

🚀 How it Works

Adding a Transaction:
When you submit a transaction, it is saved in an array and in local storage, then displayed in the history list.

Updating Balance:
The app calculates total income, total expenses, and current balance in real time.

Deleting a Transaction:
Clicking the ❌ button removes the transaction from the history, updates the balance, and deletes it from local storage.

📝 Notes

All transactions are saved locally, so clearing browser data will remove them.

Only basic input validation is applied (cannot submit empty text or amount).

👨‍💻 Author

Dhanush Gundu – Frontend Enthusiast | Web Developer 
