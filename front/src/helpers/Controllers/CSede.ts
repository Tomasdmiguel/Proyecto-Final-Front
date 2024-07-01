import Swal from "sweetalert2";
import { IFormSede } from "@/interface/IFormSede";

export const CSede = (data: IFormSede) => {
  const emptyField = Object.keys(data).find(
    (key) => data[key as keyof IFormSede].trim() === ""
  );

  if (emptyField) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `No podes tener ningun campo vacio.`,
      timer: 3000,
    });
    return;
  } else {
    // Si todas las validaciones pasan, muestra esta alerta
    // Swal.fire({
    //   icon: "success",
    //   title: "Registro exitoso",
    //   text: "Tu sede ha sido registrada correctamente.",
    //   timer: 3000,
    // });
    return true;
  }
};
