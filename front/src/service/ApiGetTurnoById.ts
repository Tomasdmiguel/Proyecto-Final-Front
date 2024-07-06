export const FetchTurnoById = async (id: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiKey}/turno/${id}`, {
      method: "GET",
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error(
        `Error al obtener la turno con ID ${id}. Status: ${res.status}`
      );
    }

    const turno = await res.json();
    return turno;
  } catch (error: any) {
    throw new Error(`Error en FetchTurnoById: ${error.message}`);
  }
};
