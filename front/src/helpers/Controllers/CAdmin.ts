import { addAdmin } from "@/interface/IAdmin";
import Swal from "sweetalert2";

export const CAdmin = (data: addAdmin): boolean => {
  const { password, confirmPassword } = data;
  
 
  const emptyField = Object.keys(data).find((key) => {
    const value = data[key as keyof addAdmin];
    
    if (key === "imgUrl") {
      return false;
    }

    return (
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && value === 0)
    );
  });

  if (emptyField) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: `El campo ${emptyField} no puede estar vacío`,
      timer: 3000,
    });
    return false;
  }
  
  
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coinciden.",
      timer: 3000,
    });
    return false;
  }
  
  return true;
};