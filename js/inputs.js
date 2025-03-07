REAL_INPUTS = document.querySelectorAll("input[type=color]");
COLOR_INPUTS = document.querySelectorAll(".color-input");

SETTINGS_BUTTON = document.getElementById("settings");
SETTINGS_CONTAINER = document.querySelector(".options");

REAL_INPUTS.forEach((input) => {
  input.addEventListener("change", () => {
    const inputElement = document.getElementById(input.id + "-input");
    inputElement.style.backgroundColor = input.value;
  });
  input.dispatchEvent(new Event("change"));
});

COLOR_INPUTS.forEach((input) => {
  input.addEventListener("click", () => {
    INPUT_ELEMENT = document.getElementById(input.id.replace("-input", ""));
    INPUT_ELEMENT.click();
  });
});

SETTINGS_BUTTON.addEventListener("click", () => {
  SETTINGS_CONTAINER.classList.toggle("hidden");
});
