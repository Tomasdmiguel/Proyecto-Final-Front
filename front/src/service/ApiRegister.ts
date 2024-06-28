import { IRegister } from "@/interface/IRegister";

//*Este modulo lo que hace es hacer la peticion a la BD para registrarse, esta funcion esta echa para que solo haga la peticion y despues del formulario  manejar los errores
export const FetchRegister = async (data: IRegister) => {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/auth/singup`, {
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
    return {message: "Registrado exitosamente"}; // Registro exitoso, devuelve un mensaje personalizado por mi(tomi) ya que no hay mensaje de éxito específico
  } catch (error:any) {
    return error.message; 
  }
};
