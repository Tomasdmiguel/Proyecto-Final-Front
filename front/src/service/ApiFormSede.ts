import { IFormSede } from "@/interface/IFormSede";
const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchFormSede = async (data: IFormSede) => {
  try {
    const response = await fetch(`${apiKey}/sede`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return { success: true };
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
