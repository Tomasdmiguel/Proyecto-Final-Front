//*Este modulo login es un componente del cliente que lo que hace  es iniciarle secion al usuario
"use client";
import { useState } from "react";
import Link from "next/link";

//*Importacion de Controlador para este formulario
import { CLogin } from "@/helpers/Controllers/CLogin";

const FormLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    CLogin(data);
  };

  return (
    <div className="bg-main max-w-md w-full p-8 rounded-lg shadow-lg text ">
      <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
        CANCHITAS GOL
      </h1>

      <p className="text-secundario text-center mb-4">
        Inicia sesion a tu cuenta
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-terciario-white mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            placeholder="Escribi tu email"
            onChange={hanldeChange}
            className="w-full p-3    rounded-lg bg-terciario"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-terciario-white mb-2">
            Contraseña
          </label>
          <input
            type="text"
            name="password"
            value={data.password}
            placeholder="Escribe su contraseña"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario"
          />
        </div>

        <button
          type="submit"
          className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600">
          Iniciar sesion
        </button>
      </form>

      <p className="text-terciario-white text-center mt-4">
        Si no tienes una cuenta
        <br />
        <Link className="text-secundario" href="/Register">
          registrate
        </Link>
      </p>
    </div>
  );
};
export default FormLogin;
