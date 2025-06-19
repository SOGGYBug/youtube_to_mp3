
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("convert-form");
  const urlInput = document.getElementById("youtube-url");
  const message = document.getElementById("message");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", (e) => {
    if (!urlInput.value.trim()) {
      e.preventDefault();
      message.textContent = "Please enter a valid YouTube URL.";
      message.className = "error";
    } else {
      message.textContent = "";
      loader.style.display = "inline-block";
    }
  });
});
