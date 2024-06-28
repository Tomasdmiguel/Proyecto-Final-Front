import { IRegister } from "@/interface/IRegister";
import Swal from "sweetalert2";

//* Este módulo lo que hace es hacer la petición a la BD para registrarse. Esta función está hecha para que solo haga la petición y después el formulario maneje los errores.
const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const FetchRegister = async (data: IRegister) => {
  try {
    const response = await fetch(`${apiKey}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return { success: true, message: "Registrado exitosamente" }; // Registro exitoso, devuelve un mensaje personalizado
  } catch (error: any) {
    return { success: false, message: error.message }; // Manejo de errores consistente
  }
};
