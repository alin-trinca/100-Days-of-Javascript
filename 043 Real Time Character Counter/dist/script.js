"use strict";

const textarea = document.querySelector("#textarea");
const counter = document.querySelector("#counter");

const updateCharacterCount = () => {
  const count = textarea.value.length;
  counter.innerHTML = `${count} Characters`;
};

textarea.addEventListener("input", updateCharacterCount);