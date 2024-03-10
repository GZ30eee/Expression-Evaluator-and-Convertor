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
    switch (x) {
        case '+':
        case '-':
        case '/':
        case '*':
        case '(':
        case ')':
            return true;
    }
    return false;
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

    for (var i = 0; i < exp.length; i++) {
        var char = exp[i];

        if (char === '(') {
            balance++;
        } else if (char === ')') {
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

    for (var i = exp.length - 1; i >= 0; i--) {
        var char = exp[i];

        if (isOperator(char)) {
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

    for (var i = 0; i < exp.length; i++) {
        var char = exp[i];

        if (isOperator(char)) {
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

function infixToPrefix(exp) {
    var stack = new Stack();
    var output = "";
    var steps = [];

    for (var i = exp.length - 1; i >= 0; i--) {
        var char = exp[i];

        if (char === ')') {
            stack.push(char);
        } else if (char === '(') {
            while (!stack.isEmpty() && stack.peek() !== ')') {
                output = stack.pop() + output;
                steps.push({expression: output, stack: stack.items.join('')});
            }
            if (!stack.isEmpty()) {
                stack.pop(); // Pop the ')'
            }
        } else if (isOperator(char)) {
            while (!stack.isEmpty() && precedence(char) < precedence(stack.peek())) {
                output = stack.pop() + output;
                steps.push({expression: output, stack: stack.items.join('')});
            }
            stack.push(char);
        } else {
            output = char + output;
            steps.push({expression: output, stack: stack.items.join('')});
        }
    }

    while (!stack.isEmpty()) {
        output = stack.pop() + output;
        steps.push({expression: output, stack: stack.items.join('')});
    }

    return steps;
}

function postfixToInfix(exp) {
    var stack = new Stack();
    var steps = [];

    for (var i = 0; i < exp.length; i++) {
        var char = exp[i];

        if (isOperator(char)) {
            var b = stack.pop();
            var a = stack.pop();
            var res = '(' + a + char + b + ')';
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(char);
            steps.push({expression: char, stack: stack.items.join('')});
        }
    }

    return steps;
}

function postfixToPrefix(exp) {
    var stack = new Stack();
    var steps = [];

    for (var i = 0; i < exp.length; i++) {
        var char = exp[i];

        if (isOperator(char)) {
            var b = stack.pop();
            var a = stack.pop();
            var res = char + a + b;
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(char);
            steps.push({expression: char, stack: stack.items.join('')});
        }
    }

    return steps;
}

function prefixToInfix(exp) {
    var stack = new Stack();
    var steps = [];

    for (var i = exp.length - 1; i >= 0; i--) {
        var char = exp[i];

        if (isOperator(char)) {
            var a = stack.pop();
            var b = stack.pop();
            var res = '(' + a + char + b + ')';
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(char);
            steps.push({expression: char, stack: stack.items.join('')});
        }
    }

    return steps;
}

function prefixToPostfix(exp) {
    var stack = new Stack();
    var steps = [];

    for (var i = exp.length - 1; i >= 0; i--) {
        var char = exp[i];

        if (isOperator(char)) {
            var a = stack.pop();
            var b = stack.pop();
            var res = a + b + char;
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(char);
            steps.push({expression: char, stack: stack.items.join('')});
        }
    }

    return steps;
}

function infixToPostfix(exp) {
    var stack = new Stack();
    var output = "";
    var steps = [];

    for (var i = 0; i < exp.length; i++) {
        var char = exp[i];

        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                output += stack.pop();
                steps.push({expression: output, stack: stack.items.join('')});
            }
            if (!stack.isEmpty()) {
                stack.pop(); // Pop the '('
            }
        } else if (isOperator(char)) {
            while (!stack.isEmpty() && precedence(char) <= precedence(stack.peek())) {
                output += stack.pop();
                steps.push({expression: output, stack: stack.items.join('')});
            }
            stack.push(char);
        } else {
            output += char;
            steps.push({expression: output, stack: stack.items.join('')});
        }
    }

    while (!stack.isEmpty()) {
        output += stack.pop();
        steps.push({expression: output, stack: stack.items.join('')});
    }

    if (!isValidPostfix(output)) {
        throw new Error("Invalid expression");
    }

    return steps;
}

function convert() {
    var exp = document.getElementById('exp').value;
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
            table += '<tr><td>' + (i + 1) + '</td><td>' + exp + '</td><td>' + steps[i].stack + '</td><td>' + steps[i].expression + '</td></tr>';
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
    var text = resultTable.innerText;
    var link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    link.download = 'output.txt';
    link.click();
}

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

function help() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; 
}

span.onclick = function() {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; 
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; 
  }
}