import Swal from "sweetalert2";
import { IFormSede } from "@/interface/IFormSede";

export const CSede = (data: IFormSede) => {
  const emptyField = Object.keys(data).find(key => {
    const value = data[key as keyof IFormSede];
    if (typeof value === "string") {
      return value.trim() === "";
    }
    return false;
  });

  if (emptyField) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `No puedes tener ningún campo vacío.`,
      timer: 3000,
    });
    return false;
  } else {
    return true;
  }
};