const apiKey = process.env.NEXT_PUBLIC_API_URL;
export const PostRegistroGoogle = async(data:any) => {
    const { uid, email, displayName } = data;
    const dataGoogle =  {uid, email, displayName} 
    try {
      const response = await fetch(`${apiKey}/auth/authRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataGoogle),
      });
    console.log(dataGoogle);
      if (response.ok) {
        console.log("Usuario registrado correctamente");
        // Aquí puedes manejar cualquier lógica adicional después de registrar al usuario
      } else {
        const errorMessage = await response.text();
        console.error("Error al registrar usuario:", errorMessage);
        // Aquí puedes manejar el error en caso de que falle el registro
      }
    } catch (error:any) {
      console.error("Error inesperado:", error.message);
      // Aquí puedes manejar errores que ocurran durante la ejecución de la petición
    }
}