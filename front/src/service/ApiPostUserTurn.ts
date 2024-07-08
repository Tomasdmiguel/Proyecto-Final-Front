import { IUserSession } from "@/interface/context";

const apiKey = process.env.NEXT_PUBLIC_API_URL;
export const FetchUserTurn = async (turnoId: string, user: IUserSession) => {
  try {
    const response = await fetch(`${apiKey}/turno`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ turnoId, userId: user.userDb.id }),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error desconocido, intenta más tarde",
    };
  }
};
