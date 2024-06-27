import { IRegister } from "@/interface/IRegister";
import Swal from "sweetalert2";

export const CRegister = (data: IRegister) => {
  const { email, user, phone, password, passwordMatch } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d+$/;

  // Verifica si algún campo está vacío
  const emptyField = Object.keys(data).find(
    (key) => data[key as keyof IRegister].trim() === ""
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
  } else if (!phoneRegex.test(phone)) {
    // Verifica la validación del número de teléfono
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Número de teléfono no válido.",
      timer: 3000,
    });
    return;
  } else if (password !== passwordMatch) {
    // Verifica que las contraseñas coincidan
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coinciden.",
      timer: 3000,
    });
    return;
  } else {
    // Si todas las validaciones pasan, muestra esta alerta
    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Tu registro es válido.",
      timer: 3000,
    });
    return true;
  }

};
