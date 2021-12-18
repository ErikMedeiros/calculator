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
		const re = new RegExp(
			`\\-?[\\d]+(\\.?[\\d]+)? \\${symbol} \\-?[\\d]+(\\.?[\\d]+)?`,
			"g"
		)
		const expressions = output.match(re)

		if (expressions !== null) {
			expressions.forEach(expression => {
				;[a, operation, b] = expression.split(" ")
				const result = operate(symbols[operation], Number(a), Number(b))
				output = output.replace(expression, result)
			})
		}
	}

	return output
}

const display = document.querySelector("#display")

document.querySelector("#clear").addEventListener("click", () => (display.value = ""))

document.querySelector("#negate").addEventListener("click", () => {
	const exp = display.value.split(" ").at(-1)

	if (exp.match(/^\-?[\d]+(\.?[\d]+)?$/) != null) {
		const toggle = exp.includes("-") ? exp.slice(1) : `-${exp}`
		display.value = display.value.replace(new RegExp(`${exp}$`), toggle)
	}
})

document.querySelector("#decimal").addEventListener("click", () => {
	const exp = display.value.split(" ").at(-1)

	if (exp.match(/^\-?[\d]+\.?$/) != null) {
		const toggle = exp.includes(".") ? exp.slice(0, -1) : `${exp}.`
		display.value = display.value.replace(new RegExp(`${exp}$`), toggle)
	}
})

document.querySelector("#equals").addEventListener("click", () => {
	if (display.value === "Invalid Expression") {
		display.value = ""
		return
	}

	const result = evaluate(display.value)
	const invalidExp = result.split(" ").length !== 1 || result === "Infinity"

	display.value = invalidExp ? "Invalid Expression" : result
})

document.querySelectorAll("button.value").forEach(button => {
	button.addEventListener("click", () => {
		if (display.value === "Invalid Expression") {
			display.value = ""
		}

		display.value += button.value
	})
})

document.querySelectorAll("button.operator").forEach(button => {
	button.addEventListener("click", () => {
		if (display.value === "Invalid Expression") {
			display.value = ""
			return
		}

		const exp = display.value.split(" ").at(-1)
		if (exp.match(/^\-?[\d]+(\.?[\d]+)?$/) != null) {
			display.value += ` ${button.value} `
		}
	})
})
