const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const pausarTurnos = async (id: string): Promise<void> =>{
    try {
        const response = await fetch(`${API_URL}/cancha/eliminacion/pausa/cancha/${id}`, {
          method: "GET",
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error eliminando los turnos: ${errorData.message}`);
        }
    
        console.log("Turnos eliminados correctamente");
      } catch (error) {
        console.error("Error eliminando turnos:", error);
        throw error;
      }
}