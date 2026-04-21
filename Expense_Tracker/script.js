// Step 1 — grab elements
let nameInput = document.querySelector("#name-input")
let amountInput = document.querySelector("#amount-input")
let categorySelect = document.querySelector("#category-selection")
let addBtn = document.querySelector("#addBtn")
let expenseList = document.querySelector("#expense-list")
let totalExp = document.querySelector("#total-exp")

// Step 2 — data variables
let expenses = []
let total = 0

// Step 3 — add expense
addBtn.addEventListener("click", function() {
    let name = nameInput.value
    let amount = Number(amountInput.value)
    let category = categorySelect.value

    // basic validation
    if(name === "" || amount === 0 || category === "Select category") {
        alert("Please fill all fields!")
        return
    }

    // create expense object
    let expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    }

    // push to array
    expenses.push(expense)

    // update total
    total += amount
    totalExp.textContent = total

    // show on screen
    renderList()

    // clear inputs
    nameInput.value = ""
    amountInput.value = ""
})

// Step 4 — render list
function renderList() {
    expenseList.innerHTML = ""

    expenses.forEach(function(expense) {
        let li = document.createElement("li")
        li.innerHTML = `
            ${expense.name} — 
            ₹${expense.amount} — 
            ${expense.category}
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `
        expenseList.appendChild(li)
    })
}

// Step 5 — delete expense
function deleteExpense(id) {
    expenses = expenses.filter(function(expense) {
        return expense.id !== id
    })

    // recalculate total
    total = expenses.reduce(function(sum, expense) {
        return sum + expense.amount
    }, 0)

    totalExp.textContent = total
    renderList()
}