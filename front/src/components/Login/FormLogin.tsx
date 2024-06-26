//*Este modulo FormSede es un componente del cliente que lo que hace es iniciar sesion
"use client";
import { useState } from "react";
import Link from "next/link";

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
  const handleSubmit = () => {};

  return (
    <div className="bg-main-color max-w-md w-full p-8 rounded-lg shadow-lg text ">
      <h1 className="text-terciario-color-white text-center text-3xl  mb-6">
        CANCHITAS GOL
      </h1>

      <p className="text-secundario-color text-center mb-4">Ingresa a tu cuenta</p>

      <form>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-terciario-color-white mb-2">
            Correo electronico
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            placeholder="example@gmail.com"
            onChange={hanldeChange}
            className="w-full p-3    rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-terciario-color-white mb-2">
            Locacion
          </label>
          <input
            type="text"
            name="password"
            value={data.password}
            placeholder="Contraseña"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario-color"
          />
        </div>
        <button
          type="submit"
          className="w-full border  border-secundario-color text-terciario-color-white p-3 rounded-lg hover:bg-secundario-color">
          iniciar sesion
        </button>
      </form>

      <p className="text-terciario-color-white text-center mt-4">
        Si no tienes una cuenta tienes que registrarte
      </p>
      <Link href="/Register" className="text-secundario-color text-center">
        <p>Registrarse</p>
      </Link>
    </div>
  );
};
export default FormLogin;
