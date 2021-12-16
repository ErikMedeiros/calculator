const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
}

// must be in order of evaluation
const symbols = {
    "/": "divide",
    "*": "multiply",
    "+": "add",
    "-": "subtract",
}

function operate(operation, a, b) {
    return +operations[operation](a, b).toFixed(8)
}

function evaluate(string) {
    let output = string
    for (let symbol in symbols) {
        const regex = new RegExp(`([\\d](\\.[\\d])*)+ [\\${symbol}] ([\\d](\\.[\\d])*)+`, "g")
        const expressions = output.match(regex)

        if (expressions !== null) {
            expressions.forEach(expression => {
                [a, operation, b] = expression.split(" ")
                const result = operate(symbols[operation], Number(a), Number(b))
                output = output.replace(expression, result)
            })
        }
    }

    return output
}

const display = document.querySelector("#display")

const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", () => display.value = "")

const equalsButton = document.querySelector("#equals")
equalsButton.addEventListener("click", () => display.value = evaluate(display.value))

const valueButtons = document.querySelectorAll("button.value")
valueButtons.forEach(button => {
    button.addEventListener("click", () => display.value += button.value)
})

const operatorButtons = document.querySelectorAll("button.operator")
operatorButtons.forEach(button => {
    button.addEventListener("click", () => display.value += ` ${button.value} `)
})