const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
}

const symbols = {
    "add": "+",
    "subtract": "-",
    "multiply": "*",
    "divide": "/",
}

function operate(operation, a, b) {
    return operations[operation](a, b)
}

const display = document.querySelector("#display")

const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", () => display.value = "")

const valueButtons = document.querySelectorAll("button.value")
valueButtons.forEach(button => {
    button.addEventListener("click", () => display.value += button.value)
})

const operatorButtons = document.querySelectorAll("button.operator")
operatorButtons.forEach(button => {
    button.addEventListener("click", () => display.value = ` ${symbols[button.value]} `)
})