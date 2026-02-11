
## 1. File Upload Validation (Images + PDF Only)



- **File**: `src/routed/UserProfile/ContestCreation/CreateProblem/CreateProblem.jsx`



```javascript
function isValidFileType(file) {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ];
  return allowedTypes.includes(file.type);
}
```



 Files larger than 50MB are rejected
 Invalid file selections clear the input field


---
---

## 2. Notification System 



#### A. ToastManager (Event Manager)

- **Location**: `src/EventsManager/ToastManager.js`

- **Methods**:
  - `showSuccess(message)` - Green success notifications
  - `showError(message)` - Red error notifications
  - `showWarning(message)` - Orange warning notifications
  - `showInfo(message)` - Blue info notifications

#### B. Toast Component

- **Location**: `src/shared/Toast/Toast.jsx`
- **Material-UI**:  Snackbar + Alert
- Non-blocking notifications , Auto-dismiss after 6 seconds ,Top-right positioning, Click-to-dismiss 

#### C. ModalManager (Event Manager)

- **Location**: `src/EventsManager/ModalManager.js`
- **Methods**:
  - `showAlert(message, title, onClose)` - Information modals
  - `showConfirmation(message, title, onConfirm, onCancel)` - Confirmation dialogs

#### D. ConfirmationModal Component

- **Location**: `src/shared/ConfirmationModal/ConfirmationModal.jsx`
- **Material-UI**:  Dialog

- Blocking user interactions

### Global Integration

- Both Toast and ConfirmationModal are mounted globally in `src/App.jsx`
- Accessible from any component via static manager methods

---
---
---

## 3. Implementations

### Toaster Notifications (Non-blocking)



- **Files**: `NavBar.jsx`
- **Example**: `ToastManager.showError("Invalid credentials")`

---

- **Files**:
  - `CreateContest.jsx` 
  - `SubmitCode.jsx` 
- **Examples**:
  - `ToastManager.showError("Invalid input")`
  - `ToastManager.showError("Please choose a language")`
  - `ToastManager.showError("Please paste your code")`

---

- **Files**: `CreateProblem.jsx`
- **Examples**:
  - `ToastManager.showError("File too large (max 10MB)")`
  - `ToastManager.showError("Only PDF and image files are allowed")`
---
- **Files**: `CreateContest.jsx`
- **Example**: `ToastManager.showError("Contest name already exists!")`

---

- **Files**: `Global.js`
- **Example**: `ToastManager.showError("Error occurred!")`

---

- **Files**: `EditProblem.jsx`
- **Example**: `ToastManager.showSuccess("Rejudged Successfully!")`

---

- **Files**:
  - `ContestMessenger.jsx` - Message sending
  - `SubmissionsContainer.jsx` - Solution submission
  - `SubmitCode.jsx` - Code submission
- **Examples**:
  - `ModalManager.showAlert("you must log in first", "Authentication Required")`
  - `ModalManager.showAlert("you must log in first to submit solutions", "Authentication Required")`

---

## 4. Design Decision(When to Use Toasters vs Modals)

#### Toasters Are Used For (will be used for):

1. **Form Validation Errors** 
2. **Success Messages** 
3. **File Upload Errors** 
4. **Network Errors** 
5. **Duplicate Data Errors** 

These scenarios involve temporary information that users can quickly digest without disrupting their current task.

#### Modals Are Used For (will be used for):

1. **Authentication Requirements** 
2. **Action Confirmations** 
3. **Important Alerts** 

These scenarios require explicit user acknowledgment or represent blocking conditions where the user cannot proceed without taking specific action.
