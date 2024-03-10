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


function infixToPostfix(exp) {
    var stack = new Stack();
    var output = "";
    var steps = [];

    var tokens = exp.split(' ');  // Split the expression into tokens

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                output += ' ' + stack.pop();
                steps.push({expression: output, stack: stack.items.join(' ')});
            }
            if (!stack.isEmpty()) {
                stack.pop(); // Pop the '('
            }
        } else if (isOperator(token)) {
            while (!stack.isEmpty() && precedence(token) <= precedence(stack.peek())) {
                output += ' ' + stack.pop();
                steps.push({expression: output, stack: stack.items.join(' ')});
            }
            stack.push(token);
        } else {
            output += ' ' + token;
            steps.push({expression: output, stack: stack.items.join(' ')});
        }
    }

    while (!stack.isEmpty()) {
        output += ' ' + stack.pop();
        steps.push({expression: output, stack: stack.items.join(' ')});
    }

    if (!isValidInfix(output.trim())) {
        throw new Error("Invalid expression");
    }

    return steps;
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
            var number = "";
            while(i >= 0 && !isNaN(exp[i])) {
                number = exp[i] + number;
                i--;
            }
            i++;
            output = number + output;
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

    var tokens = exp.split(' ');  // Split the expression into tokens

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (isOperator(token)) {
            var b = stack.pop();
            var a = stack.pop();
            var res = '(' + a + ' ' + token + ' ' + b + ')';
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(token);
            steps.push({expression: token, stack: stack.items.join('')});
        }
    }

    return steps;
}



function postfixToPrefix(exp) {
    var stack = new Stack();
    var steps = [];

    var tokens = exp.split(' ');  // Split the expression into tokens

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (isOperator(token)) {
            var b = stack.pop();
            var a = stack.pop();
            var res = token + ' ' + a + ' ' + b;
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(token);
            steps.push({expression: token, stack: stack.items.join('')});
        }
    }

    return steps;
}


function prefixToInfix(exp) {
    var stack = new Stack();
    var steps = [];

    var tokens = exp.split(' ');  // Split the expression into tokens

    for (var i = tokens.length - 1; i >= 0; i--) {
        var token = tokens[i];

        if (isOperator(token)) {
            var a = stack.pop();
            var b = stack.pop();
            var res = '(' + a + ' ' + token + ' ' + b + ')';
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(token);
            steps.push({expression: token, stack: stack.items.join('')});
        }
    }

    return steps;
}


function prefixToPostfix(exp) {
    var stack = new Stack();
    var steps = [];

    var tokens = exp.split(' ');  // Split the expression into tokens

    for (var i = tokens.length - 1; i >= 0; i--) {
        var token = tokens[i];

        if (isOperator(token)) {
            var a = stack.pop();
            var b = stack.pop();
            var res = a + ' ' + b + ' ' + token;
            stack.push(res);
            steps.push({expression: res, stack: stack.items.join('')});
        } else {
            stack.push(token);
            steps.push({expression: token, stack: stack.items.join('')});
        }
    }

    return steps;
}



var historyData = JSON.parse(localStorage.getItem('historyData')) || [];

function convert() {
    var exp = document.getElementById('exp').value;
    var conversion = document.getElementById('conversion').value;
    // Add to history
   historyData.push({expression: exp, conversion: conversion});

   // Save history to localStorage
   localStorage.setItem('historyData', JSON.stringify(historyData));
    var steps;
    var inputType;
    var outputType;
    var input = document.getElementById('exp').value.trim();
  var modal = document.getElementById('inputModal');
  var okButton = document.querySelector('.m-ok');

  // Check if the input is empty
  if (input === '') {
    modal.style.display = 'block'; // Show the modal
    okButton.onclick = function() {
      modal.style.display = 'none'; // Hide the modal when OK is clicked
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none'; // Hide the modal when clicked outside
      }
    }
    return; // Exit the function if the input is empty
  }

    var button = document.querySelector('.button');
    button.classList.add('animate');
  
    // Remove the class after the animation ends
    button.addEventListener('animationend', function() {
      button.classList.remove('animate');
    });
    


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
downloadDiv.style.display = 'flex';
downloadDiv.style.alignItems = 'center';
downloadDiv.style.gap = '15px';
downloadDiv.style.justifyContent = 'center'; // Center horizontally
downloadDiv.style.alignItems = 'center'; // Center vertically
downloadDiv.style.marginTop = '5px';
downloadDiv.style.backgroundColor = '#B99470';
downloadDiv.style.borderRadius = '15px';
downloadDiv.style.padding = '0px 5px 0px 5px';
var label = document.createElement('span');
label.textContent = 'Download:';
downloadDiv.appendChild(label);

downloadDiv.appendChild(imageButton);
downloadDiv.appendChild(pdfButton);
downloadDiv.appendChild(textButton);
outputDiv.appendChild(downloadDiv);

}

document.querySelector('.button').addEventListener('click', convert);

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

function createHistoryItem(item, index) {
    var historyItemDiv = document.createElement('div');
    historyItemDiv.className = 'history-item';

    var contentDiv = document.createElement('div');
    contentDiv.className = 'history-entry';
    contentDiv.textContent = `${item.expression} (${item.conversion})`;

    var delButton = document.createElement('button');
    delButton.className = 'del-button';
    delButton.textContent = 'Delete';

    historyItemDiv.appendChild(contentDiv);
    historyItemDiv.appendChild(delButton);

    delButton.addEventListener('click', function () {
        deleteHistory(index);
    });

    return historyItemDiv;
}

function deleteHistory(index) {
    // Remove the item at the specified index from the historyData array
    historyData.splice(index, 1);

    // Update the local storage with the modified historyData
    localStorage.setItem('historyData', JSON.stringify(historyData));

    // Refresh the display of the history
    showHistory();
}

function showHistory() {
    console.log('showHistory called');

    var historyContent = document.getElementById('historyContent');
    historyContent.innerHTML = '';

    for (var i = 0; i < historyData.length; i++) {
        var item = historyData[i];
        var historyItem = createHistoryItem(item, i);
        historyContent.appendChild(historyItem);
    }

    var historyModal = document.getElementById('historyModal');
    historyModal.style.display = 'block';
}


// Other code...

document.getElementById('deleteAll').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all history?')) {
        historyData = [];
        localStorage.setItem('historyData', JSON.stringify(historyData));
        showHistory(); 
    }
});

var closeButton = document.getElementById('close1');
closeButton.onclick = function() {
    historyModal.style.display = "none";
}


window.onload = function() {
    applyTheme();
  }
  
  function applyTheme() {
    var theme = localStorage.getItem('theme');
    var themeStyle1 = document.getElementById('theme-style-1');
    var themeStyle2 = document.getElementById('theme-style-2');

    if (theme === 'dark') {
      themeStyle1.href = "conversion3.css";
      themeStyle2.href = "conversion3.css";    
    } else {
      themeStyle1.href = "conversion.css";
      themeStyle2.href = "conversion2.css"; 
}
  }

 
function createButton(onclickFunction, imageName) {
    var button = document.createElement('button');
    button.style.backgroundColor = 'transparent';
    button.style.border = 'none';
    button.onclick = onclickFunction;
  
    var image = document.createElement('img');
    image.src = imageName; 
    image.style.width = '20px'; 
    image.style.height = 'auto'; 
  
    button.appendChild(image);
    return button;
  }
  
 
  var imageButton = createButton(downloadAsImage, 'image.png');
  var pdfButton = createButton(downloadAsPDF, 'file.png');
  var textButton = createButton(downloadAsText, 'pdf.png');
  