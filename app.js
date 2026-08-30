// Account Classification Practice App logic
// Interface: Report / Continue / Start new session and modal explanation.

const accounts = getAccountsFromChart();

let currentAccount = null;
let score = 0.0;
let totalQuestions = 0;
let attemptCountForCurrent = 0;
let lockedForCurrent = false;
let questionCompleted = false;

let firstAttemptType = null;
let firstAttemptBalance = null;
let firstAttemptContra = null;
let pendingWrongOnSkip = false;

let studentName = "";
let studentIp = "";
let sessionStart = null;
let sessionEnd = null;

const sessionDetails = [];

const appView = document.getElementById("appView");
const loginView = document.getElementById("loginView");
const studentNameDisplay = document.getElementById("studentNameDisplay");
const difficultySelect = document.getElementById("difficultySelect");
const accountNameEl = document.getElementById("accountName");
const typeButtonsWrap = document.getElementById("typeButtons");
const balanceButtonsWrap = document.getElementById("balanceButtons");
const contraCheckbox = document.getElementById("contraCheckbox");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const reportBtn = document.getElementById("reportBtn");
const continueSessionBtn = document.getElementById("continueSessionBtn");
const startNewSessionBtn = document.getElementById("startNewSessionBtn");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

const reportBackdrop = document.getElementById("reportBackdrop");
const reportContent = document.getElementById("reportContent");

const explainBtnSmall = document.getElementById("explainBtnSmall");
const explanationBackdrop = document.getElementById("explanationBackdrop");
const explanationContent = document.getElementById("explanationContent");
const closeExplanationBtn = document.getElementById("closeExplanationBtn");

const typeInfoBtn = document.getElementById("typeInfoBtn");
const typeInfoBackdrop = document.getElementById("typeInfoBackdrop");
const typeInfoContent = document.getElementById("typeInfoContent");
const closeTypeInfoBtn = document.getElementById("closeTypeInfoBtn");

let selectedType = "";
let selectedBalance = "";
let remainingAccounts = [];


///////////////////////////////////////////////////////////////////////////////
// Account-set selection and screen state
///////////////////////////////////////////////////////////////////////////////

function getCurrentSet() {
  const difficulty = difficultySelect.value;

  if (difficulty === "basic") {
    return accounts.filter(account => account.level === "basic").slice();
  }

  if (difficulty === "extended-only") {
    return accounts.filter(account => account.level === "extended").slice();
  }

  return accounts
    .filter(account => account.level === "basic" || account.level === "extended")
    .slice();
}

function getDataSetLabel() {
  const difficulty = difficultySelect.value;

  if (difficulty === "basic") {
    return "Basic";
  }

  if (difficulty === "extended-only") {
    return "Extended Only";
  }

  return "Basic + Extended";
}

function resetRemainingAccounts() {
  remainingAccounts = getCurrentSet();
}

function clearButtonSelection(groupElement) {
  groupElement
    .querySelectorAll(".segmented-button")
    .forEach(button => button.classList.remove("active"));
}

function setControlsEnabled(enabled) {
  typeButtonsWrap
    .querySelectorAll(".segmented-button")
    .forEach(button => {
      button.disabled = !enabled;
    });

  balanceButtonsWrap
    .querySelectorAll(".segmented-button")
    .forEach(button => {
      button.disabled = !enabled;
    });

  contraCheckbox.disabled = !enabled;
  submitBtn.disabled = !enabled;
  difficultySelect.disabled = !enabled;
}

function setExplanationEnabled(enabled) {
  explainBtnSmall.disabled = !enabled;
}

function clearSelections() {
  selectedType = "";
  selectedBalance = "";

  firstAttemptType = null;
  firstAttemptBalance = null;
  firstAttemptContra = null;

  clearButtonSelection(typeButtonsWrap);
  clearButtonSelection(balanceButtonsWrap);

  contraCheckbox.checked = false;

  feedbackEl.style.display = "none";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  lockedForCurrent = false;
  questionCompleted = false;
  pendingWrongOnSkip = false;

  setControlsEnabled(true);

  // The explanation is unavailable until the student submits a first attempt.
  setExplanationEnabled(false);
}


///////////////////////////////////////////////////////////////////////////////
// Classification and session-record helpers
///////////////////////////////////////////////////////////////////////////////

function correctClassification(account) {
  return {
    type: account.type,
    subtype: account.subtype || null,
    balance: account.normal_balance,
    contra: account.contra
  };
}

function getTypeDisplay(account) {
  const typeLabels = {
    Asset: "Assets",
    Liability: "Liabilities",
    Equity: "Equity",
    Revenue: "Revenues",
    Expense: "Expenses",
    Other: "Other Items"
  };

  let typeDisplay = typeLabels[account.type] || account.type || "(unknown)";

  if (account.subtype) {
    typeDisplay += " (" + account.subtype + ")";
  }

  return typeDisplay;
}

function classificationText(account) {
  let text = "Type: " + getTypeDisplay(account);

  if (account.type === "Revenue" || account.type === "Expense") {
    text += " (Profit or Loss)";
  }

  text += ", Normal balance: " + account.normal_balance;
  text += account.contra ? ", Contra-account." : ".";

  if (account.pedagogicalNote) {
    text += "\n" + account.pedagogicalNote;
  }

  return text;
}

function markQuestionCompleted() {
  if (!currentAccount || questionCompleted) {
    return;
  }

  questionCompleted = true;
  totalQuestions += 1;
  totalEl.textContent = totalQuestions;

  const accountIndex = remainingAccounts.findIndex(
    account => account.name === currentAccount.name
  );

  if (accountIndex !== -1) {
    remainingAccounts.splice(accountIndex, 1);
  }
}

function finalizePendingWrongIfAny() {
  if (!currentAccount) {
    return;
  }

  if (pendingWrongOnSkip && !questionCompleted) {
    markQuestionCompleted();

    sessionDetails.push({
      name: currentAccount.name,
      outcome: "wrong",
      first: {
        type: firstAttemptType,
        balance: firstAttemptBalance,
        contra: firstAttemptContra
      },
      second: null,
      correct: correctClassification(currentAccount)
    });
  }

  pendingWrongOnSkip = false;
}


///////////////////////////////////////////////////////////////////////////////
// Questions, scoring, and feedback
///////////////////////////////////////////////////////////////////////////////

function serveNewQuestion() {
  finalizePendingWrongIfAny();

  if (!remainingAccounts.length) {
    currentAccount = null;
    accountNameEl.textContent = "No more accounts remaining.";

    feedbackEl.className = "feedback correct";
    feedbackEl.textContent =
      "All accounts in this level have been attempted. Change the practice level or start a new session.";
    feedbackEl.style.display = "block";

    setControlsEnabled(false);
    setExplanationEnabled(false);
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingAccounts.length);
  currentAccount = remainingAccounts[randomIndex];

  accountNameEl.textContent = currentAccount.name;
  attemptCountForCurrent = 0;

  clearSelections();
}

function submitAnswer() {
  if (!currentAccount || lockedForCurrent) {
    return;
  }

  const chosenType = selectedType;
  const chosenBalance = selectedBalance;
  const chosenContra = contraCheckbox.checked;

  if (!chosenType || !chosenBalance) {
    alert("Please select both account type and normal balance before submitting.");
    return;
  }

  attemptCountForCurrent += 1;

  const fullyCorrect =
    chosenType === currentAccount.type &&
    chosenBalance === currentAccount.normal_balance &&
    chosenContra === currentAccount.contra;

  if (attemptCountForCurrent === 1) {
    firstAttemptType = chosenType;
    firstAttemptBalance = chosenBalance;
    firstAttemptContra = chosenContra;

    // Explanation becomes available only after the first submitted attempt.
    setExplanationEnabled(true);

    if (fullyCorrect) {
      score += 1.0;

      feedbackEl.textContent =
        "Correct on the first attempt. Moving to the next account.";
      feedbackEl.className = "feedback correct";
      feedbackEl.style.display = "block";

      lockedForCurrent = true;
      setControlsEnabled(false);

      markQuestionCompleted();

      sessionDetails.push({
        name: currentAccount.name,
        outcome: "correct_first",
        first: {
          type: chosenType,
          balance: chosenBalance,
          contra: chosenContra
        },
        second: null,
        correct: correctClassification(currentAccount)
      });

      scoreEl.textContent = score.toFixed(1);

      setTimeout(serveNewQuestion, 900);
      return;
    }

    feedbackEl.textContent =
      "Not quite. Please try again or move to the next account.";
    feedbackEl.className = "feedback incorrect";
    feedbackEl.style.display = "block";

    pendingWrongOnSkip = true;
    return;
  }

  if (attemptCountForCurrent === 2) {
    const sameAsFirstAttempt =
      chosenType === firstAttemptType &&
      chosenBalance === firstAttemptBalance &&
      chosenContra === firstAttemptContra;

    if (sameAsFirstAttempt) {
      alert(
        "For the second attempt, please choose a different answer from the first one."
      );
      attemptCountForCurrent -= 1;
      return;
    }

    const outcome = fullyCorrect ? "correct_second" : "wrong";

    if (fullyCorrect) {
      score += 0.5;
      feedbackEl.textContent =
        "Correct on the second attempt (half credit). Moving to the next account.";
      feedbackEl.className = "feedback correct";
    } else {
      feedbackEl.textContent =
        "Not correct. Check the classification.\n" +
        classificationText(currentAccount);
      feedbackEl.className = "feedback incorrect";
    }

    feedbackEl.style.display = "block";

    lockedForCurrent = true;
    setControlsEnabled(false);

    markQuestionCompleted();

    sessionDetails.push({
      name: currentAccount.name,
      outcome,
      first: {
        type: firstAttemptType,
        balance: firstAttemptBalance,
        contra: firstAttemptContra
      },
      second: {
        type: chosenType,
        balance: chosenBalance,
        contra: chosenContra
      },
      correct: correctClassification(currentAccount)
    });

    pendingWrongOnSkip = false;
    scoreEl.textContent = score.toFixed(1);

    if (fullyCorrect) {
      setTimeout(serveNewQuestion, 1500);
    }
  }
}


///////////////////////////////////////////////////////////////////////////////
// Session reset and report
///////////////////////////////////////////////////////////////////////////////

function resetSession() {
  score = 0.0;
  totalQuestions = 0;
  sessionDetails.length = 0;
  sessionEnd = null;

  scoreEl.textContent = "0.0";
  totalEl.textContent = "0";

  resetRemainingAccounts();
  serveNewQuestion();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function reportItemHtml(detail) {
  const correct = detail.correct;
  const typeDisplay = getTypeDisplay(correct);

  return (
    "<li>" +
    escapeHtml(detail.name) +
    " – [" +
    escapeHtml(typeDisplay) +
    ", " +
    escapeHtml(correct.balance) +
    (correct.contra ? ", contra-account" : "") +
    "]</li>"
  );
}

function showReport() {
  if (!sessionDetails.length && !pendingWrongOnSkip) {
    alert("No completed questions to report yet. Answer at least one question first.");
    return;
  }

  // A first failed attempt that the student has skipped is recorded as wrong.
  finalizePendingWrongIfAny();

  sessionEnd = new Date();

  const wrongAnswers = sessionDetails.filter(
    detail => detail.outcome === "wrong"
  );

  const secondAttemptCorrect = sessionDetails.filter(
    detail => detail.outcome === "correct_second"
  );

  const percentage = totalQuestions
    ? ((score / totalQuestions) * 100).toFixed(1)
    : "0.0";

  let html = "<div class=\"report-meta\">";
  html +=
    "<p><strong>Name:</strong> " +
    escapeHtml(studentName || "Anonymous") +
    "</p>";
  html +=
    "<p><strong>Questions:</strong> " +
    totalQuestions +
    " from the " +
    escapeHtml(getDataSetLabel()) +
    " data set</p>";
  html +=
    "<p><strong>Score:</strong> " +
    score.toFixed(1) +
    " (" +
    percentage +
    "%)</p>";
  html +=
    "<p><strong>Completed:</strong> " +
    escapeHtml(sessionEnd.toLocaleString()) +
    "</p>";
  html +=
    "<p><strong>IP Address:</strong> " +
    escapeHtml(studentIp || "(not recorded)") +
    "</p>";
  html += "</div>";

  if (!wrongAnswers.length && !secondAttemptCorrect.length) {
    html += "<p><strong>All correct on the first attempt.</strong></p>";
  } else {
    if (wrongAnswers.length) {
      html +=
        "<p><strong>Questions answered incorrectly:</strong></p>" +
        "<ul>" +
        wrongAnswers.map(reportItemHtml).join("") +
        "</ul>";
    }

    if (secondAttemptCorrect.length) {
      html +=
        "<p><strong>Questions correct on second attempt (0.5 point each):</strong></p>" +
        "<ul>" +
        secondAttemptCorrect.map(reportItemHtml).join("") +
        "</ul>";
    }
  }

  reportContent.innerHTML = html;
  reportBackdrop.classList.add("show");
}

function closeReport() {
  reportBackdrop.classList.remove("show");
}


///////////////////////////////////////////////////////////////////////////////
// Explanation modal
///////////////////////////////////////////////////////////////////////////////

function showExplanation() {
  if (!currentAccount || explainBtnSmall.disabled) {
    return;
  }

  let html =
    "<p>" +
    escapeHtml(currentAccount.description || "No explanation available.") +
    "</p>";

  if (currentAccount.pedagogicalNote) {
    html +=
      "<p><strong>Note:</strong> " +
      escapeHtml(currentAccount.pedagogicalNote) +
      "</p>";
  }

  explanationContent.innerHTML = html;
  explanationBackdrop.classList.add("show");
}

function closeExplanation() {
  explanationBackdrop.classList.remove("show");
}


///////////////////////////////////////////////////////////////////////////////
// Account type info modal
///////////////////////////////////////////////////////////////////////////////

function showTypeInfo() {
  typeInfoContent.innerHTML =
    "<p><strong>Assets, Liabilities, and Equity</strong> are permanent accounts reported in the statement of financial position.</p>" +
    "<p><strong>Revenues and Expenses</strong> are temporary accounts included in profit or loss (P/L).</p>" +
    "<p><strong>Other Items</strong> don't belong in Assets, Liabilities, Equity, Revenues, or Expenses \u2014 this can include distributions to owners, OCI items, and accounts used in the closing process.</p>";

  typeInfoBackdrop.classList.add("show");
}

function closeTypeInfo() {
  typeInfoBackdrop.classList.remove("show");
}


///////////////////////////////////////////////////////////////////////////////
// Event listeners
///////////////////////////////////////////////////////////////////////////////

typeButtonsWrap.querySelectorAll(".segmented-button").forEach(button => {
  button.addEventListener("click", () => {
    if (lockedForCurrent) {
      return;
    }

    clearButtonSelection(typeButtonsWrap);
    button.classList.add("active");
    selectedType = button.dataset.type;
  });
});

balanceButtonsWrap.querySelectorAll(".segmented-button").forEach(button => {
  button.addEventListener("click", () => {
    if (lockedForCurrent) {
      return;
    }

    clearButtonSelection(balanceButtonsWrap);
    button.classList.add("active");
    selectedBalance = button.dataset.balance;
  });
});

submitBtn.addEventListener("click", submitAnswer);

nextBtn.addEventListener("click", () => {
  finalizePendingWrongIfAny();
  serveNewQuestion();
});

reportBtn.addEventListener("click", showReport);

continueSessionBtn.addEventListener("click", closeReport);

startNewSessionBtn.addEventListener("click", () => {
  closeReport();
  resetSession();
});

explainBtnSmall.addEventListener("click", showExplanation);

closeExplanationBtn.addEventListener("click", closeExplanation);

typeInfoBtn.addEventListener("click", showTypeInfo);

closeTypeInfoBtn.addEventListener("click", closeTypeInfo);

reportBackdrop.addEventListener("click", event => {
  if (event.target === reportBackdrop) {
    closeReport();
  }
});

explanationBackdrop.addEventListener("click", event => {
  if (event.target === explanationBackdrop) {
    closeExplanation();
  }
});

typeInfoBackdrop.addEventListener("click", event => {
  if (event.target === typeInfoBackdrop) {
    closeTypeInfo();
  }
});

difficultySelect.addEventListener("change", () => {
  resetSession();
});


///////////////////////////////////////////////////////////////////////////////
// App entry point called by login.js
///////////////////////////////////////////////////////////////////////////////

window.startApp = function(name, ip) {
  studentName = name;
  studentIp = ip;
  sessionStart = new Date();

  studentNameDisplay.textContent = "Signed in as: " + (studentName || "Anonymous");
  studentNameDisplay.classList.remove("hidden");

  loginView.classList.add("hidden");
  appView.classList.remove("hidden");

  resetSession();
};