import { IFormSede } from "@/interface/IFormSede";
import { IUser } from "@/interface/IUser";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchFormSede = async (file: File, data: IFormSede, userDB: IUser) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", data?.name);
    formData.append("location", data?.location);
    formData.append("description", data?.description);
    formData.append("user", userDB?.userDb?.id);
    
   

    const response = await fetch(`${apiUrl}/sede`, {
      method: "POST",
      headers: {
        "authorization":`Bearer ${userDB.token}`,
      },
      
      body: formData,
    });
    console.log("Token enviado:", userDB?.token);
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