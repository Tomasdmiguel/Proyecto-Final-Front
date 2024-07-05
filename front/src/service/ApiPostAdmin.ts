import { addAdmin, IUserDb, IUserSession } from "@/interface/IAdmin";

const apiKey = process.env.NEXT_PUBLIC_API_URL;

const ApiPostAdmin = async (userDb:IUserDb, data:addAdmin) => {
  const requestData = {
    // name: userDb.name,
    // email: userDb.email,
    id: userDb.id,
    birthdate: data.birthdate || userDb.birthdate,
    dni: data.dni || userDb.dni,
    phone: data.phone || userDb.phone,
    city: data.city || userDb.city,
    address: data.address || userDb.address,
  };
  console.log(requestData);

  try {
    const response = await fetch(`${apiKey}/auth/signup/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during the API request:", error);
    throw error;
  }
};

export default ApiPostAdmin;
