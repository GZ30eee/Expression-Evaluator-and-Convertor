class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length == 0;
    }
}

function isOperator(x) {
    return ['+', '-', '/', '*', '(', ')'].includes(x);
}

function precedence(x) {
    if (x == '+' || x == '-') {
        return 1;
    } else if (x == '*' || x == '/') {
        return 2;
    }
    return 0;
}

function isValidInfix(exp) {
    var balance = 0;
    var elements = exp.split(' ');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element === '(') {
            balance++;
        } else if (element === ')') {
            balance--;
        }

        if (balance < 0) {
            return false;
        }
    }

    return balance === 0;
}

function isValidPrefix(exp) {
    var stack = new Stack();
    var elements = exp.split(' ');

    for (var i = elements.length - 1; i >= 0; i--) {
        var element = elements[i];

        if (isOperator(element)) {
            if (stack.items.length < 2) {
                return false;
            }
            stack.pop();
            stack.pop();
            stack.push(1);
        } else {
            stack.push(1);
        }
    }

    return stack.items.length === 1;
}

function isValidPostfix(exp) {
    var stack = new Stack();
    var elements = exp.split(' ');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (isOperator(element)) {
            if (stack.items.length < 2) {
                return false;
            }
            stack.pop();
            stack.pop();
            stack.push(1);
        } else {
            stack.push(1);
        }
    }

    return stack.items.length === 1;
}
function infixToPostfix(exp) {
    var stack = new Stack();
    var output = "";
    var steps = [];
    var elements = exp.split(' ');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element === '(') {
            stack.push(element);
        } else if (element === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                output += ' ' + stack.pop();
                steps.push({expression: output, stack: stack.items.join(' ')});
            }
            if (!stack.isEmpty()) {
                stack.pop(); // Pop the '('
            }
        } else if (isOperator(element)) {
            while (!stack.isEmpty() && precedence(element) <= precedence(stack.peek())) {
                output += ' ' + stack.pop();
                steps.push({expression: output, stack: stack.items.join(' ')});
            }
            stack.push(element);
        } else {
            output += ' ' + element;
            steps.push({expression: output, stack: stack.items.join(' ')});
        }
    }

    while (!stack.isEmpty()) {
        output += ' ' + stack.pop();
        steps.push({expression: output, stack: stack.items.join(' ')});
    }

    if (!isValidPostfix(output)) {
        throw new Error("Invalid expression");
    }

    return steps;
}


function postfixToInfix(exp) {
    var stack = new Stack();
    var steps = [];
    var elements = exp.split(' ');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (isOperator(element)) {
            var b = stack.pop();
            var a = stack.pop();
            var res = '(' + a + element + b + ')';
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(element);
            steps.push({expression: element, stack: stack.items.join('')});
        }
    }

    return steps;
}

function postfixToPrefix(exp) {
    var stack = new Stack();
    var steps = [];
    var elements = exp.split(' ');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (isOperator(element)) {
            var b = stack.pop();
            var a = stack.pop();
            var res = element + a + b;
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(element);
            steps.push({expression: element, stack: stack.items.join('')});
        }
    }

    return steps;
}

function prefixToInfix(exp) {
    var stack = new Stack();
    var steps = [];
    var elements = exp.split(' ');

    for (var i = elements.length - 1; i >= 0; i--) {
        var element = elements[i];

        if (isOperator(element)) {
            var a = stack.pop();
            var b = stack.pop();
            var res = '(' + a + element + b + ')';
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(element);
            steps.push({expression: element, stack: stack.items.join('')});
        }
    }

    return steps;
}
function prefixToPostfix(exp) {
    var stack = new Stack();
    var steps = [];
    var elements = exp.split(' ');

    for (var i = elements.length - 1; i >= 0; i--) {
        var element = elements[i];

        if (isOperator(element)) {
            var a = stack.pop();
            var b = stack.pop();
            var res = a + ' ' + b + ' ' + element;
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join(' ')});
        } else {
            stack.push(element);
            steps.push({expression: element, stack: stack.items.join(' ')});
        }
    }

    return steps;
}

function infixToPostfix(exp) {
    var stack = new Stack();
    var output = "";
    var steps = [];
    var elements = exp.split(' ');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element === '(') {
            stack.push(element);
        } else if (element === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                output += ' ' + stack.pop();
                steps.push({expression: output, stack: stack.items.join(' ')});
            }
            if (!stack.isEmpty()) {
                stack.pop(); // Pop the '('
            }
        } else if (isOperator(element)) {
            while (!stack.isEmpty() && precedence(element) <= precedence(stack.peek())) {
                output += ' ' + stack.pop();
                steps.push({expression: output, stack: stack.items.join(' ')});
            }
            stack.push(element);
        } else {
            output += ' ' + element;
            steps.push({expression: output, stack: stack.items.join(' ')});
        }
    }

    while (!stack.isEmpty()) {
        output += ' ' + stack.pop();
        steps.push({expression: output, stack: stack.items.join(' ')});
    }

    if (!isValidPostfix(output)) {
        throw new Error("Invalid expression");
    }

    return steps;
}
function convert() {
    var exp = document.getElementById('exp').value.split(' ');
    var exp = document.getElementById('exp').value;
    if (exp.trim() === '') {
        
        return;
    }
    var conversion = document.getElementById('conversion').value;
    var steps;
    var inputType;
    var outputType;

    try {
        switch (conversion) {
            case 'infixToPostfix':
                steps = infixToPostfix(exp);
                inputType = 'Infix';
                outputType = 'Postfix';
                break;
            case 'infixToPrefix':
                steps = infixToPrefix(exp);
                inputType = 'Infix';
                outputType = 'Prefix';
                break;
            case 'postfixToInfix':
                steps = postfixToInfix(exp);
                inputType = 'Postfix';
                outputType = 'Infix';
                break;
            case 'postfixToPrefix':
                steps = postfixToPrefix(exp);
                inputType = 'Postfix';
                outputType = 'Prefix';
                break;
            case 'prefixToInfix':
                steps = prefixToInfix(exp);
                inputType = 'Prefix';
                outputType = 'Infix';
                break;
            case 'prefixToPostfix':
                steps = prefixToPostfix(exp);
                inputType = 'Prefix';
                outputType = 'Postfix';
                break;
        }

        var table = '<table border="1"><tr><th>Sr No</th><th>' + inputType + '</th><th>Stack</th><th>' + outputType + '</th></tr>';
        for (var i = 0; i < steps.length; i++) {
            table += '<tr><td>' + (i + 1) + '</td><td>' + exp.join(' ') + '</td><td>' + steps[i].stack + '</td><td>' + steps[i].expression + '</td></tr>';
        }
        table += '</table>';

        document.getElementById('output').innerHTML = '<div style="height:300px;overflow:auto;">' + table + '</div>';
    } catch (error) {
        document.getElementById('output').innerHTML = 'Error: ' + error.message;
    }
    var outputDiv = document.getElementById('output');
    var downloadDiv = document.createElement('div');
    downloadDiv.innerHTML = '<table style="border: none;"><tr><td style="border: none;">Download result: </td><td style="border: none;"><button style="background-color: transparent; border: none;" onclick="downloadAsImage()"><span class="material-icons">image</span></button></td><td style="border: none;"><button style="background-color: transparent; border: none;" onclick="downloadAsPDF()"><span class="material-icons">picture_as_pdf</span></button></td><td style="border: none;"><button style="background-color: transparent; border: none;" onclick="downloadAsText()"><span class="material-icons">text_snippet</span></button></td></tr></table>';
    outputDiv.appendChild(downloadDiv);
}
function goBack() {
    window.location.href = "main.html";
}

function downloadAsPDF() {
    var output = document.getElementById('output');
    var resultTable = output.getElementsByTagName('table')[0];
    if (!resultTable) {
        alert('No table to download!');
        return;
    }
    html2canvas(resultTable).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'mm');
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save('output.pdf');
    });
}

function downloadAsImage() {
    var output = document.getElementById('output');
    var resultTable = output.getElementsByTagName('table')[0];
    if (!resultTable) {
        alert('No table to download!');
        return;
    }
    html2canvas(resultTable).then(function(canvas) {
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'output.png';
        link.click();
    });
}

function downloadAsText() {
    var output = document.getElementById('output');
    var resultTable = output.getElementsByTagName('table')[0];
    if (!resultTable) {
        alert('No table to download!');
        return;
    }
    var text = resultTable.innerText;
    var link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    link.download = 'output.txt';
    link.click();
}

