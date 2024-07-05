const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCanchas() {
  try {
    const res = await fetch(`${apiUrl}/cancha`, {
      method: "GET",
      next: { revalidate: 0 },
    });
    const canchas = await res.json();
    return canchas;
  } catch (error: any) {
    throw new Error(error);
  }
}
