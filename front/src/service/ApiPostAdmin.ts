import { addAdmin, IUserDb, IUserSession } from "@/interface/IAdmin";

const apiKey = process.env.NEXT_PUBLIC_API_URL;

const ApiPostAdmin = async ( data:addAdmin) => {
  console.log(data);

  try {
    const response = await fetch(`${apiKey}/auth/signup/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
