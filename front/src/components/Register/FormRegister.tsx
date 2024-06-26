//*Este modulo es para registrar usuarios 
"use client";
import { useState } from "react";
import Link from "next/link";

const FormSede = () => {
  const [data, setData] = useState({
    email: "",
    user: "",
    phone: "",
    password:"",
    passwordMatch:""
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

      <p className="text-secundario-color text-center mb-4">Registro</p>

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
          <label htmlFor="user" className="block text-terciario-color-white mb-2">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="user"
            value={data.user}
            placeholder="Nombre de usuario"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="describe" className="block text-terciario-color-white mb-2">
            Numero telefonico
          </label>
          <input
            type="text"
            name="describe"
            value={data.phone}
            placeholder="numero telefonico"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario-color"
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

        <div className="mb-4">
          <label htmlFor="passwordMatch" className="block text-terciario-color-white mb-2">
            Contraseña
          </label>
          <input
            type="text"
            name="passwordMatch"
            value={data.password}
            placeholder="Escribe su contraseña nuevamente"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario-color"
          />
        </div>

        <button
          type="submit"
          className="w-full border  border-secundario-color text-terciario-color-white p-3 rounded-lg hover:bg-secundario-color">
          Registrarse
        </button>
      </form>

      <p className="text-terciario-color-white text-center mt-4">
        Si ya tienes una cuenta creada, inicia sesion
      </p>
        <Link className="text-secundario-color text-center" href="/Login">
          <p>Ingresa</p>
        </Link>
    </div>
  );
};
export default FormSede;
