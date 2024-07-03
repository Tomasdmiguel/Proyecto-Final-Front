import { IFormCancha } from "@/interface/IFormCancha";
import { IUser } from "@/interface/IUser";
const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchFormCancha = async (
  file: File,
  data: IFormCancha,
  userDB: IUser
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sedeName", data.sedeName);
    formData.append("sport", data.sport.toString());
    formData.append("timeopen", data.timeopen);
    formData.append("timeclose", data.timeclose);
    formData.append("type", data.type);
    formData.append("price", data.price.toString());
    formData.append("player", data.player.toString());
    formData.append("techado", data.techado.toString());
    formData.append("user", userDB.userDb.id);

    const response = await fetch(`${apiKey}/cancha`, {
      method: "POST",
      body: formData,
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
