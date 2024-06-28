document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    addEntry(description, type, category, amount);
    updateTotals();

    document.getElementById('expenseForm').reset();
    updateCategoryOptions(); // Reset categories to default state
});

document.getElementById('type').addEventListener('change', function() {
    updateCategoryOptions();
});

let totalIncome = 0;
let totalExpense = 0;

function addEntry(description, type, category, amount) {
    const table = document.getElementById('entryTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const descriptionCell = newRow.insertCell(0);
    const typeCell = newRow.insertCell(1);
    const categoryCell = newRow.insertCell(2);
    const amountCell = newRow.insertCell(3);

    descriptionCell.textContent = description;
    descriptionCell.classList.add('border-b', 'border-gray-200', 'text-center');
    typeCell.textContent = type;
    typeCell.classList.add('border-b', 'border-gray-200', 'text-center');
    categoryCell.textContent = category;
    categoryCell.classList.add('border-b', 'border-gray-200', 'text-center');
    amountCell.textContent = amount.toFixed(2);
    amountCell.classList.add('border-b', 'border-gray-200', 'text-center');

    if (type === 'Income') {
        totalIncome += amount;
    } else if (type === 'Expense') {
        totalExpense += amount;
    }
}

function updateTotals() {
    const remainingBalance = totalIncome - totalExpense;

    document.getElementById('totalIncome').textContent = `Total Income: Rs${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpense').textContent = `Total Expense: Rs${totalExpense.toFixed(2)}`;
    document.getElementById('remainingBalance').textContent = `Remaining Balance: Rs${remainingBalance.toFixed(2)}`;
}

function updateCategoryOptions() {
    const type = document.getElementById('type').value;
    const categorySelect = document.getElementById('category');
    
    // Clear existing options
    categorySelect.innerHTML = '';

    if (type === 'Income') {
        const options = ['Salary', 'Others'];
        options.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.text = optionValue;
            categorySelect.appendChild(option);
        });
    } else if (type === 'Expense') {
        const options = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Others'];
        options.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.text = optionValue;
            categorySelect.appendChild(option);
        });
    }
}
