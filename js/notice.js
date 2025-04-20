const GERMAN = document.getElementById("german");
const ENGLISH = document.getElementById("english");

const RADIOS = document.querySelectorAll('input[name="lang"]');

RADIOS.forEach((radio) => {
  radio.addEventListener("change", () => {
    GERMAN.classList.toggle("hidden");
    ENGLISH.classList.toggle("hidden");
    if (radio.value == "german") {
      document.getElementById("message").placeholder = "Nachricht";
      document.getElementById("send").innerHTML = "Senden";
      document.documentElement.lang = "de";
    } else {
      document.getElementById("message").placeholder = "Message";
      document.getElementById("send").innerHTML = "Send";
      document.documentElement.lang = "en";
    }
  });
});

if (navigator.language == "de-DE" || navigator.language == "de") {
  document.getElementById("message").placeholder = "Nachricht";
  document.getElementById("send").innerHTML = "Senden";
  document.documentElement.lang = "de";
  GERMAN.classList.toggle("hidden");
  ENGLISH.classList.toggle("hidden");
}
