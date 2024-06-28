import { ILogin } from "@/interface/ILogin";
import Swal from "sweetalert2";

const apiKey = process.env.NEXT_PUBLIC_API_URL;

// Esta función realiza la petición al API de login y devuelve el token
export const ApiLogin = async (data: ILogin) => {
  try {
    const response = await fetch(`${apiKey}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fallo en logearse, Incorrect password or email",
        timer: 3000,
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
