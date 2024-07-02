import { IFormSede } from "@/interface/IFormSede";

import { IUser } from "@/interface/IUser";

const apiKey = process.env.NEXT_PUBLIC_API_URL;
//!PASAMOS EL FILE 
export const fetchFormSede = async (file:any, data: IFormSede, userDB:IUser ) => {
  try {
    const response = await fetch(`${apiKey}/sede`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file:file, data: data, userDB}),
    });
    console.log({ file:file, data: data, userDB: userDB})
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
