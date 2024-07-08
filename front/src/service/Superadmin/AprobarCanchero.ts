import { IUserSession } from "@/interface/context";

const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchAprobarCanchero = async (userSession:IUserSession,id: number) => {
  try {
    const response = await fetch(`${apiKey}/user/canchero/{id}`, {
      method: "delete",
      headers: {
        "authorization":`Bearer ${userSession.token}`,
      },
    });
    if (response.ok) {
      return { success: true, message: "Aprobado" };
    } else {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || "Fallo en aprobacion",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error desconocido, intenta más tarde",
    };
  }
};