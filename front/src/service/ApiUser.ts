const apiKey = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserById = async (id: string | undefined) => {
  try {
    const response = await fetch(`${apiKey}/user/${id}`, {
      method: "GET",
      next: { revalidate: 0 },
    });

    const user = await response.json();
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};



export const fetchUser = async () => {
  try {
    const response = await fetch(`${apiKey}/user`, {
      method: "GET",
      next: { revalidate: 0 },
    });

    const user = await response.json();
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};
