let state = 'firstOperandStart';
let secondOperand = '';
let firstOperand = '';
let currOperator = '';
let point = false;
const screenContent = document.querySelector('.screen');

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(op, a, b) {
    switch (op) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}
//---------------
function doOnNumberClick(e) {
    const keyId = e.target.getAttribute('key-id');
    switch (state) {


        case 'firstOperand':
            if (screenContent.textContent.length < 10) {
                if (keyId === '.' && point) break;
                if (keyId === '.') point = true;
                screenContent.textContent += keyId;
                firstOperand += keyId;
            }
            break;
        case 'secondOperandStart':
            screenContent.textContent = keyId;
            secondOperand = keyId;
            state = 'secondOperand';
            if (keyId === '.') point = true;
            break;
        case 'secondOperand':
            if (screenContent.textContent.length < 10) {
                if (keyId === '.' && point) break;
                if (keyId === '.') point = true;
                screenContent.textContent += keyId;
                secondOperand += keyId;
            }
            break;
        case 'result':
        case 'firstOperandStart':
            screenContent.textContent = keyId;
            firstOperand = keyId;
            state = 'firstOperand';
            if (keyId === '.') point = true;

    }
}
const numKeys = document.querySelectorAll('button.number');
numKeys.forEach(key => key.addEventListener('click', doOnNumberClick));

//----------------
function doOnOperatorClick(e) {
    switch (state) {
        case 'firstOperand': case 'firstOperandStart':
            currOperator = e.target.getAttribute('key-id');
            state = 'secondOperandStart';
            break;
        case 'secondOperand':
            doOnEqlsClick();
            break;
        case 'result':
            state = 'secondOperandStart';
            firstOperand = screenContent.textContent;
            currOperator = e.target.getAttribute('key-id');

    }
}
const opKeys = document.querySelectorAll('div.operators *');
opKeys.forEach(key => key.addEventListener('click', doOnOperatorClick));
//---------------
function doOnEqlsClick() {
    if (state === 'secondOperand') {
        screenContent.textContent = operate(currOperator, Number(firstOperand), Number(secondOperand));
        state = 'result';
    }
}
const eqlsKey = document.querySelector('button.eqls');
eqlsKey.addEventListener('click', doOnEqlsClick);
//----------------
function doOnClearClick() {
    switch (state) {
        case 'firstOperand':
            screenContent.textContent = screenContent.textContent.split('').slice(0, -1).join('');
            if (screenContent.textContent.length === 0) screenContent.textContent = '0';
            firstOperand = screenContent.textContent;
            break;
        case 'secondOperand':
            screenContent.textContent = screenContent.textContent.split('').slice(0, -1).join('');
            if (screenContent.textContent.length === 0) screenContent.textContent = '0';
            secondOperand = screenContent.textContent;
    }
}
const clearKey = document.querySelector('.clear');
clearKey.addEventListener('click', doOnClearClick);
//----------------
function doOnAllClearClick() {
    screenContent.textContent = '0';
    state = 'firstOperandStart';

}
const clearAllKey = document.querySelector('.clearall');
clearAllKey.addEventListener('click', doOnAllClearClick);
//----------------
document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseenter', function (e) {
    document.querySelector(`button[key-id="${e.target.getAttribute('key-id')}"]`).setAttribute('style', 'background: #854848;')
}));
document.querySelectorAll('button').forEach(btn => btn.addEventListener('mouseleave', function (e) {
    document.querySelector(`button[key-id="${e.target.getAttribute('key-id')}"]`).setAttribute('style', 'background: #682fc5;')
}));