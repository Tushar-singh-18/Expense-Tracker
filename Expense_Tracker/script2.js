let name = document.querySelector("#name-input")
let amount = document.querySelector("#amount-input")
let category = document.querySelector("#category-selection")
let btn = document.querySelector("#addBtn")
let total = document.querySelector("#total-exp")
let expenseList = document.querySelector("#expense-list")

let arr = []
let upper_total = 0

btn.addEventListener("click", function () {
    let name2 = name.value
    let amount2 = amount.value
    let category2 = category.value

    if (name2 === "" || amount2 === "" || category2 === "Select category") {
        alert("Please enter all the fields")
    }

    else {

        let li = document.createElement("li")
        let obj = {
            id: Date.now(),
            name_input: name2,
            amount_input: amount2,
            category_input: category2
        }

        li.innerHTML = name2 + " — ₹" + amount2 + " — " + category2 +
            `<button onClick="delexpense(${obj.id})">Delete</button>`
        expenseList.appendChild(li)

        arr.push(obj);
        upper_total += Number(amount2);
        total.textContent = upper_total
        localStorage.setItem("expense", JSON.stringify(arr))


        name.value = ""
        amount.value = ""
        category.selectedIndex = 0
    }
})

function delexpense(id) {
    arr = arr.filter(function (item) {
        return item.id !== id;
    })

    upper_total = arr.reduce(function (sum, item) {
        return sum + Number(item.amount_input)
    }, 0)
    total.textContent = upper_total
    localStorage.setItem("expense", JSON.stringify(arr))


    expenseList.innerHTML = "";
    arr.forEach(function (item) {
        let li = document.createElement("li")
        li.innerHTML = item.name_input + " — ₹" + item.amount_input + " — " + item.category_input +
            `<button onClick="delexpense(${item.id})">Delete</button>`
        expenseList.appendChild(li)
    })
}

let saved = localStorage.getItem("expense")

if (saved) {
    arr = JSON.parse(saved)

    arr.forEach(function (item) {
        let li = document.createElement("li")
        li.innerHTML = item.name_input + " — ₹" + item.amount_input + " — " + item.category_input +
            `<button onclick="delexpense(${item.id})">Delete</button>`
        expenseList.appendChild(li)
        upper_total += Number(item.amount_input)
    })

    total.textContent = upper_total
}
