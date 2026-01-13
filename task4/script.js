const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || button.classList.contains('decimal')) {
            appendNumber(value);
        } else if (button.classList.contains('operator')) {
            chooseOperator(value);
        } else if (button.classList.contains('equals')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clear();
        } else if (button.classList.contains('delete')) {
            deleteLast();
        }
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        chooseOperator(key === '*' ? '*' : key === '/' ? '/' : key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}
