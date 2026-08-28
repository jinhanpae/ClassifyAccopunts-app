// Login handling for Account Classification app

// CONFIG: change these as needed
const APP_PASSWORD = "KUBS";      // password required to start
const SKIP_LOGIN = false;         // set to true to bypass login screen

function initLogin() {
  const studentNameInput = document.getElementById("studentNameInput");
  const passwordInput = document.getElementById("passwordInput");
  const loginBtn = document.getElementById("loginBtn");
  const loginError = document.getElementById("loginError");
  const loginView = document.getElementById("loginView");

  if (typeof window.startApp !== "function") {
    console.error("startApp is not defined. Check that app.js is loaded before login.js.");
    return;
  }

  function attemptLogin() {
    const pwd = (passwordInput.value || "").trim();
    if (pwd === APP_PASSWORD) {
      const name = (studentNameInput.value || "").trim();

      fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => {
          const ip = data.ip || "";
          window.startApp(name, ip);
        })
        .catch(() => {
          window.startApp(name, "");
        });

      loginError.textContent = "";
    } else {
      loginError.textContent = "Incorrect password. Please try again.";
    }
  }

  function autoStartIfSkipEnabled() {
    if (!SKIP_LOGIN) return;

    if (loginView) loginView.classList.add("hidden");

    const defaultName = "";
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => {
        const ip = data.ip || "";
        window.startApp(defaultName, ip);
      })
      .catch(() => {
        window.startApp(defaultName, "");
      });
  }

  if (!SKIP_LOGIN) {
    if (loginBtn) {
      loginBtn.addEventListener("click", attemptLogin);
    }
    if (passwordInput) {
      passwordInput.addEventListener("keyup", e => {
        if (e.key === "Enter") attemptLogin();
      });
    }
    if (studentNameInput) {
      studentNameInput.addEventListener("keyup", e => {
        if (e.key === "Enter") attemptLogin();
      });
    }
  } else {
    autoStartIfSkipEnabled();
  }
}

// Wait until the DOM and app.js are ready
document.addEventListener("DOMContentLoaded", initLogin);
