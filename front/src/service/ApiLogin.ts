import { ILogin } from "@/interface/ILogin";


const apiKey = process.env.NEXT_PUBLIC_API_URL;

// Esta función realiza la petición al API de login y devuelve el token
export const fetchLogin = async (data: ILogin) => {
  try {
    const response = await fetch(`${apiKey}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      const errorMessage = await response.text();
      return { success: false, message: errorMessage || "Fallo en logearse, Contraseña o Email no existe" };
    }
  } catch (error: any) {
    return { success: false, message: error.message || "Error desconocido, intenta más tarde" };
  }
};