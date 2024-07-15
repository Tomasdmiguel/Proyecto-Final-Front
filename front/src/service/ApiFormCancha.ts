import { IUserSession } from "@/interface/context";
import { IFormCancha } from "@/interface/IFormCancha";
const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchFormCancha = async (data: IFormCancha, userData:IUserSession) => {
  try {
    const response = await fetch(`${apiKey}/cancha`, {
      method: "POST",
      headers: {
        "authorization":`Bearer ${userData.token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return { success: true, message: "Cancha agregada exitosamente" };
    } else {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || "Fallo en crear la sede",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error desconocido, intenta más tarde",
    };
  }
};
