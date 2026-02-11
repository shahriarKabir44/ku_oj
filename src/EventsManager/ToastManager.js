export default class ToastManager {
  static client = null;

  static subscribe({ showToast }) {
    this.client = { showToast };
  }

  static showSuccess(message) {
    if (this.client) {
      this.client.showToast(message, "success");
    }
  }

  static showError(message) {
    if (this.client) {
      this.client.showToast(message, "error");
    }
  }

  static showWarning(message) {
    if (this.client) {
      this.client.showToast(message, "warning");
    }
  }

  static showInfo(message) {
    if (this.client) {
      this.client.showToast(message, "info");
    }
  }
}
