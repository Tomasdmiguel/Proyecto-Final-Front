//*Este modulo login es un componente del cliente que lo que hace  es iniciarle secion al usuario
"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
//*Importacion de Controlador para este formulario
import { CLogin } from "@/helpers/Controllers/CLogin";

//*Importacion de funcion para hacer peticiones para este form
import { fetchLogin } from "@/service/ApiLogin";

const FormLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const history = useRouter();
  //*Funcion que guarda los cambios
  const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //*Funcion que envia el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (CLogin(data)) {
      try {
        const response = await fetchLogin(data);

        if (response.success) {
          const {  token,userDb } = response.data;
          localStorage.setItem(
            "usuarioSesion",
            JSON.stringify({ token,userDb})
          );
          
          Swal.fire({
            icon: "success",
            title: "Login exitoso",
            text: "Sesión iniciada correctamente",
          });
          history.push('/')
        } else {
          Swal.fire({
            icon: "error",
            title: "Error de inicio de sesión",
            text: response.message,
          });
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Intenta más tarde",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Datos inválidos",
        text: "Por favor, revisa los datos e intenta nuevamente",
      });
    }
  };
  return (
<div className="bg-main max-w-md w-full p-8 rounded-lg shadow-lg text">
  <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
    RESERVA GOL
  </h1>

  <p className="text-secundario text-center mb-4">
    Inicia sesión en tu cuenta
  </p>

  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-terciario-white mb-2  focus:border-yellow-600">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={data.email}
        placeholder="Escribí tu email"
        onChange={hanldeChange}
        className="w-full p-3 rounded-lg bg-white text-black  focus:border-yellow-600 placeholder-black"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-terciario-white mb-2">
        Contraseña
      </label>
      <input
        type="password"
        name="password"
        value={data.password}
        placeholder="Escribe tu contraseña"
        onChange={hanldeChange}
        className="w-full p-3 rounded-lg bg-white text-black placeholder-black"
      />
    </div>

    <button
      type="submit"
      className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600">
      Iniciar sesión
    </button>
  </form>

  <p className="text-terciario-white text-center mt-4">
    Si no tienes una cuenta
    <br />
    <Link className="text-secundario" href="/Register">
      regístrate
    </Link>
  </p>
</div>

  );
};
export default FormLogin;
