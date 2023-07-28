const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  messageContainer.style.borderColor = color;
}

function validateForm() {
  // Use HTML constraint API to check form validity
  const isValid = form.checkValidity();

  if (!isValid) {
    // If the form isn't valid
    showMessage("Please fill out all fields.", "#37BC9B");
    return false;
  }

  if (password1El.value !== password2El.value) {
    // Check to see if both password fields match
    showMessage("Make sure passwords match.", "#DA4453");
    password1El.style.borderColor = "#DA4453";
    password2El.style.borderColor = "#DA4453";
    return false;
  }

  // If form is valid and passwords match
  showMessage("Successfully Registered!", "#37BC9B");
  password1El.style.borderColor = "#37BC9B";
  password2El.style.borderColor = "#37BC9B";
  return true;
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value
  };
  // Do something with user data
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  // Validate Form
  if (validateForm()) {
    // Submit Form if Valid
    storeFormData();
  }
}

// Event Listener
form.addEventListener("submit", processFormData);
