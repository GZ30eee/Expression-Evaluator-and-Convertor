var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', function(req, res) {
    var email = req.body.email;
    var option = req.body.option;
    var text = req.body.text;

    saveData(email, option, text);

    res.send('Form submitted successfully!');
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
