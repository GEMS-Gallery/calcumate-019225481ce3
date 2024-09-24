import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let stack = [];
let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            currentInput += value;
            updateDisplay();
        } else if (value === 'Enter') {
            if (currentInput !== '') {
                stack.push(parseFloat(currentInput));
                currentInput = '';
                updateDisplay();
            }
        } else if (['/', '*', '-', '+'].includes(value)) {
            if (currentInput !== '') {
                stack.push(parseFloat(currentInput));
                currentInput = '';
            }
            stack.push(parseFloat(button.getAttribute('data-op')));
            calculate();
        } else if (value === 'C') {
            clear();
        }
    });
});

function updateDisplay() {
    display.value = stack.join(' ') + (currentInput ? ' ' + currentInput : '');
}

function clear() {
    stack = [];
    currentInput = '';
    updateDisplay();
}

async function calculate() {
    if (stack.length >= 3) {
        try {
            const result = await backend.calculate(stack);
            if (result === null) {
                throw new Error('Calculation error');
            }
            stack = [result];
            updateDisplay();
        } catch (error) {
            console.error('Calculation error:', error);
            display.value = 'Error';
            stack = [];
        }
    }
}
