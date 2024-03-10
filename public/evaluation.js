var historyData = [];

function evaluateExpression() {
   
    var expression = document.getElementById('exp').value;
    var type = document.getElementById('conversion').value;
    var result;

    var evaluateButton = document.getElementById('evaluateButton');
    evaluateButton.disabled = true;

    if (!expression){
        
        showModal('Please enter an expression.');
        return; 
    }

    
    
    historyData.push({
        expression: expression,
        type: type,
        result: result
    });
    localStorage.setItem('historyData', JSON.stringify(historyData));
    
    document.getElementById('steps').innerHTML = 
    `
    <tr>
        <th>Sr No.</th>
        <th>Input Symbol</th>
        <th>Operation</th>
        <th>Stack</th>
        <th>Calculation</th>
    </tr>
    `;  
    
    

    try {
        if (type === 'postfix') {
            result = evaluatePostfix(expression);
        } else {
            result = evaluatePrefix(expression);
        }
        var oldDownloadDiv = document.getElementById('download');
    if (oldDownloadDiv) {
        oldDownloadDiv.remove();
    }

        document.getElementById('result').innerHTML = 'Result: ' + result;
      
    var outputDiv = document.getElementById('output');
    var downloadDiv = document.createElement('div');
    downloadDiv.style.display = 'flex';
downloadDiv.style.alignItems = 'center';
downloadDiv.style.gap = '15px';
downloadDiv.style.justifyContent = 'center'; 
downloadDiv.style.alignItems = 'center'; 
downloadDiv.style.marginTop = '5px';
downloadDiv.style.backgroundColor = 'peru';
downloadDiv.style.borderRadius = '15px';
downloadDiv.style.padding = '0px 5px 0px 5px';
var label = document.createElement('span');
label.textContent = 'Download:';
downloadDiv.appendChild(label);

downloadDiv.appendChild(imageButton);
downloadDiv.appendChild(pdfButton);
downloadDiv.appendChild(textButton);
outputDiv.appendChild(downloadDiv);
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error: ' + error.message;
    }
    evaluateButton.disabled = false;
}
document.getElementById('exp').addEventListener('input', function() {
    document.getElementById('evaluateButton').disabled = false;
});

function evaluatePostfix(expression) {
var stack = [];
var tokens = expression.split(' ');
var stepsTable = document.getElementById('steps');
var serialNo = 1;

for (var i = 0; i < tokens.length; i++) {
var token = tokens[i];
var row = stepsTable.insertRow(-1);

if (!isNaN(token)) {
    row.insertCell(0).innerHTML = serialNo++;
    row.insertCell(1).innerHTML = token;
    row.insertCell(2).innerHTML = 'Push';
    row.insertCell(3).innerHTML = stack.toString();
    row.insertCell(4).innerHTML = '';
    stack.push(parseInt(token));
} else {
    if (stack.length < 2) {
        throw new Error('Invalid postfix expression');
    }

    var b = stack.pop();
    var a = stack.pop();

    row.insertCell(0).innerHTML = serialNo++;
    row.insertCell(1).innerHTML = token;
    row.insertCell(2).innerHTML = 'Pop and evaluate';
    row.insertCell(3).innerHTML = stack.toString();
    row.insertCell(4).innerHTML = a + ' ' + token + ' ' + b;

    switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': 
            if (b === 0) {
                throw new Error('Division by zero');
            }
            stack.push(a / b); 
            break;
        default: throw new Error('Unknown operator: ' + token);
    }
}
}

if (stack.length !== 1) {
throw new Error('Invalid postfix expression');
}

return stack.pop();
}

function evaluatePrefix(expression) {
var stack = [];
var tokens = expression.split(' ').reverse();
var stepsTable = document.getElementById('steps');
var serialNo = 1;

for (var i = 0; i < tokens.length; i++) {
var token = tokens[i];
var row = stepsTable.insertRow(-1);

if (!isNaN(token)) {
    row.insertCell(0).innerHTML = serialNo++;
    row.insertCell(1).innerHTML = token;
    row.insertCell(2).innerHTML = 'Push';
    row.insertCell(3).innerHTML = stack.toString();
    row.insertCell(4).innerHTML = '';
    stack.push(parseInt(token));
} else {
    if (stack.length < 2) {
        throw new Error('Invalid prefix expression');
    }

    var a = stack.pop();
    var b = stack.pop();

    row.insertCell(0).innerHTML = serialNo++;
    row.insertCell(1).innerHTML = token;
    row.insertCell(2).innerHTML = 'Pop and evaluate';
    row.insertCell(3).innerHTML = stack.toString();
    row.insertCell(4).innerHTML = a + ' ' + token + ' ' + b;

    switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': 
            if (b === 0) {
                throw new Error('Division by zero');
            }
            stack.push(a / b); 
            break;
        default: throw new Error('Unknown operator: ' + token);
    }
}
}

if (stack.length !== 1) {
throw new Error('Invalid prefix expression');
}

return stack.pop();
}

function goBack() {
    window.location.href = "main.html";
}

function downloadAsPDF() {
    var output = document.getElementById('output');
    var resultDiv = document.getElementById('result');
    var resultTable = output.getElementsByTagName('table')[0];
    html2canvas(resultTable).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'mm');
        doc.text(resultDiv.innerText, 10, 10);
        doc.addImage(imgData, 'PNG', 10, 30);
        doc.save('output.pdf');
    });
}

function downloadAsImage() {
    var output = document.getElementById('output');
    var result = document.getElementById('result');

    var container = document.createElement('div');
    container.appendChild(result.cloneNode(true));
    container.appendChild(output.cloneNode(true));

    container.style.display = 'none';

    document.body.appendChild(container);

    var downloadDiv = container.querySelector('#download');
    if (downloadDiv) {
        downloadDiv.parentNode.removeChild(downloadDiv);
    }

    html2canvas(container).then(function(canvas) {
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'combined.png';
        link.click();

        document.body.removeChild(container);
    });
}



function downloadAsText() {
    var output = document.getElementById('output');
    var resultDiv = document.getElementById('result');
    var resultTable = output.getElementsByTagName('table')[0];
    var text = resultDiv.innerText + '\n' + resultTable.innerText;
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

function showHistory() {
    var historyModal = document.getElementById('historyModal');
    historyModal.style.display = "block";

    var historyContent = document.getElementById('historyContent');
    historyContent.innerHTML = '<table style="width: 100%; border-collapse: collapse; table-layout: fixed;">'; // Start the table

   
    for (var i = 0; i < historyData.length; i++) {
        var item = historyData[i];
        historyContent.innerHTML += `
            <tr>
                <td style="text-align: center;">${item.expression}</td>
                <td style="text-align: center;">${item.type}</td>
                <td style="text-align: center;">${item.result}</td>
                <td style="text-align: center;"><button onclick="deleteHistory(${i})">Delete</button></td>
            </tr>
        `;
    }

    historyContent.innerHTML += '</table>';
}

function deleteHistory(index) {
    historyData.splice(index, 1);
    localStorage.setItem('historyData', JSON.stringify(historyData));
    showHistory();
}

function clearHistory() {
    if (confirm('Are you sure you want to delete all history?')) {
        historyData = [];
        localStorage.setItem('historyData', JSON.stringify(historyData));
        showHistory(); 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var storedHistory = localStorage.getItem('historyData');
    if (storedHistory) {
        historyData = JSON.parse(storedHistory);
    }
});


window.onclick = function(event) {
    var historyModal = document.getElementById('historyModal');
    if (event.target == historyModal) {
        closeModal();
    }
}   

var historyModal = document.getElementById('historyModal');
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
    var icons = document.getElementsByClassName('icon');

    if (theme === 'dark') {
      themeStyle1.href = "evaluation3.css";
      themeStyle2.href = "evaluation3.css";    
    } else {
      themeStyle1.href = "evaluation.css";
      themeStyle2.href = "evaluation2.css"; 
}
  }

  function showModal(message) {
    var modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black; z-index: 100;">
            <p>${message}</p>
            <button onclick="this.parentElement.style.display='none'">OK</button>
        </div>`;
    document.body.appendChild(modal);
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
  