var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});

var userSchema = new mongoose.Schema({
    email: String,
    option: String,
    text: String
  });
  
  function saveData(email, option, text) {
    var user = new User({ email: email, option: option, text: text });
  
    user.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user.email + " saved to users collection.");
    });
  }
  
  function validateForm() {
      var email = document.getElementById('email-input').value;
      var option = document.querySelector('.radio-with-label.selected').innerText;
      var text = document.querySelector('.rectangle-2-seven').value;
  
      if (!validateEmail(email)) {
          alert('Please enter a valid email address!');        
          event.stopPropagation();
          return false;
      }
  
      saveData(email, option, text);
  
      return true;
  }
  
  document.getElementById('final').onclick = validateForm;
  