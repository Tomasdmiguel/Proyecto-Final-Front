import { IUserSession } from "@/interface/context";

const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchCancelarTurno = async (
  userData: IUserSession | null,
  id: string
) => {
  try {
    const response = await fetch(`${apiKey}/turno/${id}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${userData?.token}`,
      },
    });
    if (response.ok) {
      return { success: true, message: "Turno cancelado" };
    } else {
      const errorMessage = await response.text();
      return {
        success: false,
        message: errorMessage || "Fallo al cancelar turno",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error desconocido, intenta más tarde",
    };
  }
};
