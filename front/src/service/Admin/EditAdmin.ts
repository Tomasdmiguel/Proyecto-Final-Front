import { IUserSession } from "@/interface/IAdmin";
import { ICancha} from "@/interface/ISedes";
import { ISede } from "@/interface/ISedes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const updateSede = async (
  id: string,
  userData: IUserSession,
  sede: ISede
) => {
  try {
    const response = await fetch(`${API_URL}/sede/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(sede),
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
  id: number,
  userSession: IUserSession,
  cancha: ICancha
) => {
  try {
    const response = await fetch(`${API_URL}/cancha/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSession.token}`,
      },
      body: JSON.stringify(cancha),
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
