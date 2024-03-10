import express from 'express';
var app = express();
import { urlencoded, json } from 'body-parser';
import { connect, connection, Schema, model } from 'mongoose';

connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

var db = connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});

var userSchema = new Schema({
  email: String,
  option: String,
  text: String
});

var User = model('User', userSchema);

app.use(urlencoded({ extended: true }));
app.use(json());

app.post('/submit', function(req, res) {
    var email = req.body.email;
    var option = req.body.option;
    var text = req.body.text;

    var user = new User({ email: email, option: option, text: text });

    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(user.email + " saved to users collection.");
    });

    res.send('Form submitted successfully!');
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
