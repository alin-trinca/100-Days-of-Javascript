const elements = {
  captchaTextBox: document.querySelector(".captch_box input"),
  refreshButton: document.querySelector(".refresh_button"),
  captchaInputBox: document.querySelector(".captch_input input"),
  message: document.querySelector(".message"),
  submitButton: document.querySelector(".button")
};

let captchaText = null;

const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char
  );
  captchaText = changeString.join("   ");
  elements.captchaTextBox.value = captchaText;
  console.log(captchaText);
};

const refreshBtnClick = () => {
  generateCaptcha();
  elements.captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  elements.submitButton.classList.toggle(
    "disabled",
    !elements.captchaInputBox.value
  );
  if (!elements.captchaInputBox.value)
    elements.message.classList.remove("active");
};

const submitBtnClick = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");
  elements.message.classList.add("active");

  if (elements.captchaInputBox.value === captchaText) {
    elements.message.innerText = "Entered captcha is correct";
    elements.message.style.color = "#826afb";
  } else {
    elements.message.innerText = "Entered captcha is not correct";
    elements.message.style.color = "#FF2525";
  }
};

elements.refreshButton.addEventListener("click", refreshBtnClick);
elements.captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
elements.submitButton.addEventListener("click", submitBtnClick);

generateCaptcha();