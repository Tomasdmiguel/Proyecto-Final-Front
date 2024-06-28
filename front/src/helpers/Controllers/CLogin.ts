import { ILogin } from "@/interface/ILogin";
import Swal from "sweetalert2";

export const CLogin = (data: ILogin) => {
  const { email } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emptyField = Object.keys(data).find(
    (key) => data[key as keyof ILogin].trim() === ""
  );

  if (emptyField) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${emptyField} no puede estar vacío.`,
      timer: 3000,
    });
    return;
  } else if (!emailRegex.test(email)) {
    // Verifica la validación del email
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Correo electrónico no válido.",
      timer: 3000,
    });
    return;
  } else {
    // Si todas las validaciones pasan, muestra esta alerta
    // Swal.fire({
    //   icon: "success",
    //   title: "Registro exitoso",
    //   text: "Tu registro es válido.",
    //   timer: 3000,
    // });
    return true;
  }
};
