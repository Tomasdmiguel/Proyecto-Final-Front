import { IFormCancha } from "@/interface/IFormCancha";
import Swal from "sweetalert2";
export const CCancha = (data: IFormCancha) => {
  
  
    const emptyField = Object.keys(data).find((key) => {
    const value = data[key as keyof IFormCancha];
    return (
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && value === 0)
    );
  });

  if (emptyField) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `No puede estar vacío o ser cero ningun campo.`,
      timer: 3000,
    });
    return;
  }else {
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
