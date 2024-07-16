const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const pausarTurnos = async (id: string) =>{
    try {
        const response = await fetch(`${API_URL}/cancha/eliminacion/pausa/cancha/${id}`, {
          method: "GET",
        });
    
        if (response.ok) {
         return { success: true, message: "Turnos eliminados correctamente"}
        } else {
          const errorMessage = await response.text();
          return { success: false, message: errorMessage ||"Error eliminando turnos"}
        }
        
      } catch (error: any) {
       return { success: false, message: error.message ||"ha ocurrido un error, intente mas tarde" }
      }
    }