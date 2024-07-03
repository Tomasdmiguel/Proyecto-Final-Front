export const FetchCanchaById = async (id: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiKey}/cancha/${id}`, {
      method: "GET",
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error(
        `Error al obtener la cancha con ID ${id}. Status: ${res.status}`
      );
    }

    const sede = await res.json();
    return sede;
  } catch (error: any) {
    throw new Error(`Error en FetchCanchaById: ${error.message}`);
  }
};
