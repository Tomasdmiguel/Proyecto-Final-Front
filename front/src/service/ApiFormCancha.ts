import { IUserSession } from "@/interface/context";
import { IFormCancha } from "@/interface/IFormCancha";
const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchFormCancha = async (data: any, userData: IUserSession) => {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  if (data.file) {
    formData.append("file", data.file);
  }

  console.log(data);
  try {
    const response = await fetch(`${apiKey}/cancha`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${userData.token}`,
      },
      body: formData,
    });
    if (response.ok) {
      return { success: true, message: "Cancha agregada exitosamente" };
    } else {
      console.log("else-->", data);
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
