export default class ModalManager {
  static client = null;

  static subscribe({ showModal }) {
    this.client = { showModal };
  }

  static showConfirmation(
    message,
    title = "Confirmation",
    onConfirm = () => {},
    onCancel = () => {},
  ) {
    if (this.client) {
      this.client.showModal({
        title,
        message,
        type: "confirmation",
        onConfirm,
        onCancel,
        showConfirmButton: true,
        showCancelButton: true,
      });
    }
  }

  static showAlert(message, title = "Alert", onClose = () => {}) {
    if (this.client) {
      this.client.showModal({
        title,
        message,
        type: "alert",
        onConfirm: onClose,
        onCancel: onClose,
        showConfirmButton: true,
        showCancelButton: false,
      });
    }
  }
}
