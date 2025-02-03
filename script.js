document.addEventListener('DOMContentLoaded', function() {
  // Lade gespeicherte Transaktionen oder initialisiere ein leeres Array
  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
  const transactionForm = document.getElementById('transaction-form');
  const transactionList = document.getElementById('transaction-list');
  const balanceEl = document.getElementById('balance');

  // Aktualisiere die Anzeige: Liste der Transaktionen und den Kontostand
  function updateDisplay() {
    transactionList.innerHTML = '';
    let balance = 0;

    transactions.forEach((transaction, index) => {
      balance += transaction.amount;

      const li = document.createElement('li');
      li.textContent = `${transaction.description}: ${transaction.amount.toFixed(2)} €`;

      // Optional: Button zum Löschen eines Eintrags
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Löschen';
      deleteButton.addEventListener('click', function() {
        transactions.splice(index, 1);
        saveTransactions();
        updateDisplay();
      });

      li.appendChild(deleteButton);
      transactionList.appendChild(li);
    });

    balanceEl.textContent = balance.toFixed(2);
  }

  // Speichert die Transaktionen im localStorage
  function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  // Ereignishandler für das Formular
  transactionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && !isNaN(amount)) {
      transactions.push({ description, amount });
      saveTransactions();
      updateDisplay();
      transactionForm.reset();
    }
  });

  // Initiale Anzeige
  updateDisplay();
});
