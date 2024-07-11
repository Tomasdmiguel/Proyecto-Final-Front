const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface EstadisticasTurnosData {
  year: number;
  month: number;
  libres: number;
  ocupados: number;
  pendientes: number;
}
export const fetchEstadisticasTurnos = async (): Promise<
  EstadisticasTurnosData[]
> => {
  try {
    const response = await fetch(`${API_URL}/turno/stats/turno`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener estadísticas de turnos");
    }

    const data: EstadisticasTurnosData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener estadísticas de turnos:", error);
    throw error;
  }
};
