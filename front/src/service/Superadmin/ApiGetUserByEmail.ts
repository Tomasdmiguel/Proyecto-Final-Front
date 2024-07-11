export const FetchUserByEmail = async (email: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiKey}/user/email/obtiene/usuario/${email}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(
        `Error al obtener el usuario ${email}. Status: ${res.status}`
      );
    }

    const turno = await res.json();
    return turno;
  } catch (error: any) {
    throw new Error(`Error en FetchUserByEmail: ${error.message}`);
  }
};
