# Account Classification

A browser-based practice app for introductory financial accounting students. It helps students classify accounts by account type, normal balance, and contra-account status.

## Learning objectives

After using this app, students should be able to:

- Classify an account as **Assets**, **Liabilities**, **Equity**, **Revenues**, **Expenses**, or **Other Items**.
- Identify an account's normal balance as **Debit** or **Credit**.
- Identify contra-accounts.
- Distinguish profit-or-loss accounts from special items such as dividends, other comprehensive income (OCI), and the income-summary account.

## Features

- Three selectable data sets:
  - **Basic** — introductory account set
  - **Extended Only** — advanced/extended account set
  - **Basic + Extended** — combined account set
- Random account questions without repetition within a session.
- First-attempt scoring of 1.0 point and second-attempt scoring of 0.5 point.
- One additional attempt after an incorrect first answer.
- Optional explanation available after the student submits a first attempt.
- An info button next to "Account type" explaining the classification categories: permanent accounts (Assets, Liabilities, Equity) vs. temporary accounts (Revenues, Expenses), and what "Other Items" covers.
- Session report with:
  - Student name
  - Data set used
  - Questions attempted
  - Score and percentage
  - Completion date and time
  - IP address when available
  - Incorrect and second-attempt-correct items
  - Internal subtype where applicable, such as `Other Items (Dividend)` or `Other Items (OCI)`
- Continue the current session or start a new session from the report dialog.

## Account classification scheme

The app uses two levels of classification.

| Student-facing category | Internal `type` | Typical examples |
|---|---|---|
| Assets | `Asset` | Cash, Inventory, Accounts Receivable, PP&E |
| Liabilities | `Liability` | Accounts Payable, Borrowings, Lease Liability |
| Equity | `Equity` | Share Capital, Retained Earnings |
| Revenues | `Revenue` | Sales, Service Revenue, Interest Income |
| Expenses | `Expense` | Cost of Goods Sold, Salaries Expense, Rent Expense |
| Other Items | `Other` | Dividends, OCI items, Income Summary |

Some accounts in `Other Items` have an additional internal `subtype`.

| Account or item | `type` | `subtype` | Normal balance |
|---|---|---|---|
| Dividends | `Other` | `Dividend` | Debit |
| OCI gain | `Other` | `OCI` | Credit |
| OCI loss | `Other` | `OCI` | Debit |
| Income Summary | `Other` | `Income-Summary` | Usually Credit in this exercise data |

The `subtype` supports feedback and reporting. Students classify these accounts using the visible **Other Items** category rather than selecting a separate subtype.

Contra status is modeled as a separate Boolean flag (`contra: true`), not as a separate account-type category. For example, Accumulated Depreciation is an Asset contra-account with a Credit normal balance.

## Project files

```text
.
├── index.html
├── app.js
├── chartOfAccounts.js
├── login.js
├── README.md
└── accounts.html        (backup copy of index.html; not part of the deployed app)
```

| File | Purpose |
|---|---|
| `index.html` | Main HTML page, UI structure, responsive styling, report dialog, and explanation dialog |
| `app.js` | Question selection, answers, scoring, session state, report display, and explanation behavior |
| `chartOfAccounts.js` | Account master data and classifications |
| `login.js` | Name/password entry and app startup |
| `README.md` | Project overview and maintenance guide |
| `accounts.html` | Backup/reference copy of `index.html`; not deployed, not loaded by any script |

## Local use

For a quick local check, open `index.html` in a modern web browser.

For more consistent browser behavior, especially if you later add modules or external data, run a local web server from the project folder:

```bash
cd "/Users/jinhan/Dropbox/Courses/Fin Acc/App/ChartOfAccounts/UNDER DEVELOPMENT"
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Stop the server with `Control + C` in Terminal.

## GitHub Pages deployment

1. Ensure the main page is named `index.html`.
2. Ensure these files are in the same deployed folder:

   ```text
   index.html
   app.js
   chartOfAccounts.js
   login.js
   ```

3. Confirm the script order at the bottom of `index.html` is exactly:

   ```html
   <script src="chartOfAccounts.js"></script>
   <script src="app.js"></script>
   <script src="login.js"></script>
   ```

   `chartOfAccounts.js` must load first because it defines `getAccountsFromChart()`. `app.js` must load before `login.js` because `login.js` calls `window.startApp()`.

4. Commit and push the update:

   ```bash
   git add index.html app.js chartOfAccounts.js login.js README.md
   git commit -m "Update account classification practice app"
   git push origin main
   ```

5. In the GitHub repository, open **Settings → Pages** and verify that GitHub Pages is deployed from the correct branch and folder.

6. After deployment, test the live page using a private/incognito browser window or a hard refresh. This avoids testing a cached old JavaScript file.

## Before class: test checklist

- [ ] The login screen appears and accepts the intended password.
- [ ] The account type buttons show: Assets, Liabilities, Equity, Revenues, Expenses, and Other Items.
- [ ] The normal-balance choices show Debit and Credit.
- [ ] The contra-account checkbox is usable.
- [ ] Basic shows only Basic accounts.
- [ ] Extended Only shows only Extended accounts.
- [ ] Basic + Extended shows accounts from both sets.
- [ ] A first-attempt correct answer adds 1.0 point.
- [ ] A correct second attempt adds 0.5 point.
- [ ] A repeated identical second answer is rejected.
- [ ] An incorrect account is reported with its correct classification.
- [ ] Dividends, OCI items, and Income Summary appear as Other Items and show their subtype in the report when applicable.
- [ ] The explanation button is unavailable before the first submitted attempt and available afterwards.
- [ ] The explanation opens in its own dialog and can be closed.
- [ ] The info button next to "Account type" opens its own dialog with the current wording and can be closed independently of the explanation dialog.
- [ ] Report shows the student name, data set, question count, score, completion time, and IP field if available.
- [ ] Report offers Continue and Start new session.
- [ ] Continue preserves the active score and remaining accounts.
- [ ] Start new session resets the score and question count.
- [ ] The footer displays only: `© 2026 Jinhan Pae. All rights reserved.`

## Maintenance notes

### Add or edit an account

Edit `chartOfAccounts.js`. Each account should follow this structure:

```javascript
{
  name: "Cash",
  type: "Asset",
  normal_balance: "Debit",
  contra: false,
  level: "basic",
  description: "Currency on hand and demand deposits available for immediate use."
}
```

For an Other Items account, add `subtype` and, where helpful, `pedagogicalNote`:

```javascript
{
  name: "Dividends",
  type: "Other",
  subtype: "Dividend",
  normal_balance: "Debit",
  contra: false,
  level: "basic",
  description: "Distributions of profit to shareholders; reduces retained earnings but is not an expense.",
  pedagogicalNote: "Dividends are distributions to owners, not expenses."
}
```

### Edit the account-type info text

The wording shown by the "ⓘ" button next to "Account type" is not stored in `chartOfAccounts.js`. It is a static string inside `showTypeInfo()` in `app.js`. To update it, edit the `typeInfoContent.innerHTML` assignment directly.

Keep this wording non-revealing: it should describe the *categories* (e.g., permanent vs. temporary accounts, or what "Other Items" broadly covers) without naming specific account examples that appear in the quiz data — especially accounts like Income Summary, where naming it directly would give away the answer.

### Keep these values consistent

| Field | Allowed values |
|---|---|
| `type` | `Asset`, `Liability`, `Equity`, `Revenue`, `Expense`, `Other` |
| `normal_balance` | `Debit`, `Credit` |
| `contra` | `true`, `false` |
| `level` | `basic`, `extended` |
| `subtype` | Optional; for example `Dividend`, `OCI`, `Income-Summary` |

### Avoid duplicate account names

The question-removal logic identifies the current account by `name`. Therefore, every account name should be unique across the full data file, including Basic and Extended sets.

In the browser console, you can check duplicates with:

```javascript
const nameCounts = {};

getAccountsFromChart().forEach(account => {
  nameCounts[account.name] = (nameCounts[account.name] || 0) + 1;
});

console.table(
  Object.entries(nameCounts)
    .filter(([, count]) => count > 1)
    .map(([name, count]) => ({ name, count }))
);
```

An empty table means there are no exact duplicate account names.

## Academic-use note

This is a client-side educational practice application. The displayed session report is useful for learning and self-review, but it should not be treated as tamper-proof evidence for high-stakes grading. A browser user can alter client-side display data through developer tools. For graded, verifiable submissions, add an authenticated server-side or LMS-based submission process.

## License and attribution

© 2026 Jinhan Pae. All rights reserved.