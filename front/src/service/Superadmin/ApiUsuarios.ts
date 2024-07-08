const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserAprobacion = async () => {
  try {
    const response = await fetch(`${apiKey}/user/cancheros`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
