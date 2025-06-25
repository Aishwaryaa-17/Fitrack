import Swal from "sweetalert2";

export const showSuccess = (title, text) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#4a90e2",
  });
};

export const showError = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#d33",
  });
};

export const showConfirmation = async (title, text) => {
  return await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4a90e2",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};
