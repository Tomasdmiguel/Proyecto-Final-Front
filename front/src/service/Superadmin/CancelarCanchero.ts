import { IUserSession } from "@/interface/context";

const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchCancelarCanchero = async (userSession: IUserSession, id: number) => {
  try {
    const response = await fetch(`${apiKey}/user/${id}`, { 
      method: "delete",
      headers: {
        "Authorization": `Bearer ${userSession.token}`,  
      },
    });
    if (response.ok) {
      return { success: true, message: "Denegado exitosamente" };
    } else {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || "Fallo en cancelar usuario",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error desconocido, intenta más tarde",
    };
  }
};