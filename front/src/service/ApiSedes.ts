const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getSedes() {
  try {
    const res = await fetch(`${apiUrl}/sede`, {
      method: "GET",
      next: { revalidate: 3600 },
    });
    const sedes = await res.json();
    return sedes;
  } catch (error: any) {
    throw new Error(error);
  }
}
