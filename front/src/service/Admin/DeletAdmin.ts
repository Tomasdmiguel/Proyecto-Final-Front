const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteCancha = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/cancha/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error eliminando la cancha: ${errorData.message}`);
    }

    console.log("Cancha eliminada correctamente");
    return true; 
  } catch (error) {
    console.error("Error eliminando la cancha:", error);
    throw error;
  }
};

export const deleteSede = async (token: string, id: string) => {
    try {
      const response = await fetch(`${API_URL}/sede/delete/sede/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`, 
        },
      });
      console.log(response);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error eliminando la sede: ${errorData.message}`);
      }
  
      console.log('Sede eliminada correctamente');
    } catch (error) {
      console.error('Error eliminando la sede:', error);
      throw error;
    }
  };