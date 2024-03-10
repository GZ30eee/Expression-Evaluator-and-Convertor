var button = document.getElementById('theme-button');

button.onclick = function() {
  var theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  applyTheme();
}

window.onload = function() {
  applyTheme();
}

function applyTheme() {
  var theme = localStorage.getItem('theme');
  var themeStyle1 = document.getElementById('theme-style-1');
  var themeStyle2 = document.getElementById('theme-style-2');
  if (theme === 'dark') {
    themeStyle1.href = "main3.css";
  } else {
    themeStyle1.href = "main.css";
  }
}

/* function setTheme() {
  var checkbox = document.getElementById('theme-button');
  if (localStorage.getItem('theme') === 'dark') {
    checkbox.checked = true;
    // Set dark theme styles
  } else {
    checkbox.checked = false;
    // Set light theme styles
  }
} */


// JavaScript to handle the slider state
document.addEventListener('DOMContentLoaded', (event) => {
  const themeButton = document.getElementById('theme-button');

  // Load the saved state from local storage and apply it to the slider
  const savedState = localStorage.getItem('sliderState') === 'true';
  themeButton.checked = savedState;
/*   updateSlider(savedState);
 */
  // Event listener for when the slider changes state
  themeButton.addEventListener('change', (event) => {
      const isChecked = event.target.checked;
      localStorage.setItem('sliderState', isChecked);
/*       updateSlider(isChecked);
 */  });
});

/* function updateSlider(isChecked) {
  if (isChecked) {
      // Code to set the dark theme
  } else {
      // Code to set the light theme
  }
}
 */

window.transitionToPage = function(href) {
  document.querySelector('body').style.opacity = 0
  setTimeout(function() { 
      window.location.href = href
  }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
  document.querySelector('body').style.opacity = 1
})