const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const crearTurnos = async () => {
    try {
         await fetch(`${API_URL}/turno/turnos/create`, {
            method: "GET",
          });
    } catch (error:any) {
        throw new Error(error);
    }
}