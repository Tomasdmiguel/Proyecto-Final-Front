//*Este modulo login es un componente del cliente que lo que hace  es iniciarle secion al usuario
"use client";
import { useState } from "react";
import Link from "next/link";

const FormLogin = () => {
  const [data, setData] = useState({
    email: "",
    password:"",
   
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
  const handleSubmit = () => {};

  return (
    <div className="bg-main-color max-w-md w-full p-8 rounded-lg shadow-lg text ">
      <h1 className="text-terciario-color-white text-center text-3xl font-bold mb-6">
        CANCHITAS GOL
      </h1>

      <p className="text-secundario-color text-center mb-4">Inicia sesion a tu cuenta</p>

      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-terciario-color-white mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            placeholder="Escribi tu email"
            onChange={hanldeChange}
            className="w-full p-3    rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-terciario-color-white mb-2">
            Contraseña
          </label>
          <input
            type="text"
            name="password"
            value={data.password}
            placeholder="Escribe su contraseña"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario-color"
          />
        </div>


        <button
          type="submit"
          className="w-full border border-secundario-color text-terciario-color-white p-3 rounded-lg hover:bg-yellow-600">
          Iniciar sesion 
        </button>
      </form>

      <p className="text-terciario-color-white text-center mt-4">
        Si no tienes una cuenta 
        <br />
         <Link className="text-secundario-color" href="/Register">
          registrate
        </Link>
      </p>
    </div>
  );
};
export default FormLogin;
