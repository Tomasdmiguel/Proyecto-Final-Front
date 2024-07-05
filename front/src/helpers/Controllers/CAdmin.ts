import { addAdmin } from "@/interface/IAdmin";
import Swal from "sweetalert2";

export const CAdmin = (data:addAdmin) => {
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
      text: `No puede estar vacío`,
      timer: 3000,
    });
    return false;
  } else {
   
    return true;
  }
};
