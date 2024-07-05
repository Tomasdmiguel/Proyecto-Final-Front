// sweet alert
import Swal, { SweetAlertOptions } from "sweetalert2";
import "@sweetalert2/theme-bootstrap-4/bootstrap-4.scss";
// css alertas
import "./alert.helper.css";

const showAlert = (options: SweetAlertOptions) => {
  Swal.fire({
    ...options,
    customClass: {
      popup: "custom-alert",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
  });
};

export const showSuccessAlert = (title: string, text?: string) => {
  showAlert({
    title,
    text,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  showAlert({
    title,
    text,
    icon: "error",
    confirmButtonText: "OK",
  });
};

export const showConfirmationAlert = (
  title: string,
  text: string,
  confirmCallback: () => void,
  cancelCallback?: () => void
) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, estoy seguro",
    cancelButtonText: "No, cancelar",
    reverseButtons: true,
    customClass: {
      popup: "custom-alert",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallback();
    } else if (result.dismiss === Swal.DismissReason.cancel && cancelCallback) {
      cancelCallback();
    }
  });
};
