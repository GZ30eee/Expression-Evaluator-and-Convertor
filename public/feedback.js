function validateForm(event) {
    var email = document.getElementById('email-input').value;
    var optionElement = document.querySelector('.radio-with-label.selected');
    var option = optionElement ? optionElement.innerText : null;
        var text = document.querySelector('.rectangle-2-seven').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address!');        
        event.stopPropagation();
        return false;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        email: email,
        option: option,
        text: text
    }));

    return true;
}

function selectOption(element) {
    var options = document.getElementsByClassName('radio-with-label');
    
    for (var i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
    }
    
    element.classList.add('selected');
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
