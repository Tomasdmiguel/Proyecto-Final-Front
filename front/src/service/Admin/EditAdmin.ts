import { IUserSession } from "@/interface/context";
import { ICanchaUpdate } from "@/interface/ICanchaUpdate";
import { ICancha } from "@/interface/ISedes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateSede = async (
  id: string,
  userData: any,
  sede: any,
  file?: File
) => {
  try {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (sede.name) formData.append("name", sede.name);
    if (sede.description) formData.append("description", sede.description);
    if (sede.location) formData.append("location", sede.location);

    const response = await fetch(`${API_URL}/sede/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating sede:", error);
    throw error;
  }
};

export const updateCancha = async (
  id: string,
  userSession: IUserSession | null,
  cancha: any | null,
  file: File | null
) => {
  const formData = new FormData();

  try {
    if (file) {
      formData.append("file", file);
    }
    if (cancha.name) formData.append("name", cancha.name);
    if (cancha.timeopen) formData.append("timeopen", cancha.timeopen);
    if (cancha.timeclose) formData.append("timeclose", cancha.timeclose);
    if (cancha.price) formData.append("price", cancha.price);

    const response = await fetch(`${API_URL}/cancha/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${userSession?.token}`,
      },
      body: formData,
    });

    if (!response.status) {
      console.log(`Error: ${response.status}`);
      throw new Error(`Error: ${response.status}`);
    } else {
      console.log(`True: ${response.status}`);
    }
    return response.text();
  } catch (error) {
    console.error("Error updating cancha:", error);
    throw error;
  }
};
