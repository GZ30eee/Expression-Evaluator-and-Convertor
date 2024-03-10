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
  var okButton = document.querySelector('.modal-ok');

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
downloadDiv.style.backgroundColor = '#D0E7D2';
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
   
    var topPosition = 85 + (index * 60);
    var historyItemDiv = document.createElement('div');
    historyItemDiv.style.cssText = 'width: 604px; height: 51px; left: 0; top: ' + topPosition + 'px; margin-left: 10px; position: absolute; background: rgba(255, 255, 255, 0.31); border-radius: 30px; border: 1px rgba(255, 255, 255, 0.01) solid; backdrop-filter: blur(27.20px);';
  
    var delDiv = document.createElement('div');
    delDiv.className = 'del';
    delDiv.style.cssText = 'left: 15px; top: 15px; position: absolute;';
    var delImg = document.createElement('img');
    delImg.src = 'Vector.svg';
    delImg.style.width = '14px'; 
delImg.style.height = '14px';
    delDiv.appendChild(delImg);

  
    var separatorDiv = document.createElement('div');
    separatorDiv.style.cssText = 'width: 51.01px; height: 0px; left: 6vh; top: 85; position: absolute; transform: rotate(90deg); transform-origin: 0 0; background: rgba(170, 164, 157, 0.12); border-radius: 30px; border: 1px rgba(170, 164, 157, 0.10) solid; backdrop-filter: blur(40px)';

    
    var contentDiv = document.createElement('div');
    contentDiv.className = 'two';
    contentDiv.style.cssText = 'margin-left: 40px; margin-top: 15px; position: absolute; font-family: Cascadia Mono; font-size: 12px;';
    contentDiv.textContent = 'expression:' + item.expression + ', conversion:' + item.conversion;

   
    historyItemDiv.appendChild(delDiv);
    historyItemDiv.appendChild(separatorDiv);
    historyItemDiv.appendChild(contentDiv);

    delDiv.addEventListener('click', function() {
        deleteHistory(index);
    });

    return historyItemDiv;
}


var historyItemsContainer = document.createElement('div');
historyItemsContainer.className = 'history-items-container';
historyItemsContainer.style.cssText = 'position: absolute; top: 75px; bottom: 345px; width: 604px; overflow-y: auto;';


function showHistory() {
    var historyContent = document.getElementById('historyContent');
    historyContent.innerHTML = ''; 
    var historyItemsContainer = document.createElement('div');
    historyItemsContainer.className = 'history-items-container';
    historyItemsContainer.style.cssText = 'position: absolute; top: 75px; bottom: 345px; width: 604px; overflow-y: auto;';
    
    for (var i = 0; i < historyData.length; i++) {
        var item = historyData[i];
        var historyItem = createHistoryItem(item, i);
        historyItemsContainer.appendChild(historyItem);
    }

    historyContent.appendChild(historyItemsContainer); 

  
    var historyModal = document.getElementById('historyModal');
    historyModal.style.display = "block";

    for (var i = 0; i < historyData.length; i++) {
        var item = historyData[i];
        var historyItem = createHistoryItem(item, i);
        historyContent.appendChild(historyItem);
    }

    
    var historyModal = document.getElementById('historyModal');
    historyModal.style.display = "block";

   
    var historyModal = document.getElementById('historyModal');
    historyModal.style.display = "block";
}




var historyModal = document.getElementById('historyModal');
var closeButton = document.getElementById('close1');


closeButton.onclick = function() {
    historyModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == historyModal) {
/*         historyModal.style.display = "none";
 */    }
}

function deleteHistory(index) {
    historyData.splice(index, 1);
    localStorage.setItem('historyData', JSON.stringify(historyData));
    showHistory(); 
}

document.getElementById('deleteAll').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all history?')) {
        historyData = [];
        localStorage.setItem('historyData', JSON.stringify(historyData));
        showHistory(); 
    }
});

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
  
  
  




  