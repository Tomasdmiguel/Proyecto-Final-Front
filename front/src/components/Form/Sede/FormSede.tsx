//*Este modulo FormSede es un componente del cliente que lo que hace es crear la sede, esta opcion solamente la va a tener un usuario admin (Los usuarios admin son cuentas creadas por nostros)
"use client";
import { useState } from "react";

const FormSede = () => {
  const [datoSede, setdatoSede] = useState({
    name: "",
    location: "",
    describe: "",
    img: "",
  });
  //*Funcion que guarda los cambios
  const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setdatoSede({
      ...datoSede,
      [name]: value,
    });
  };
  //*Funcion que envia el formulario
  const handleSubmit = () => {};

  return (
    <div className="bg-main-color max-w-md w-full p-8 rounded-lg shadow-lg text ">
      <h1 className="text-white text-center text-3xl font-bold mb-6">
        CANCHITAS GOL
      </h1>

      <p className="text-yellow-500 text-center mb-4">
        Bienvenido, crea tu sede para que los jugadores puedan reservar turnos
        en tu cancha
      </p>

      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={datoSede.name}
            placeholder="Escribi tu nombre"
            onChange={hanldeChange}
            className="w-full p-3    rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-white mb-2">
            Locacion
          </label>
          <input
            type="text"
            name="location"
            value={datoSede.location}
            placeholder="Ponga su locacion"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="describe" className="block text-white mb-2">
            Descripcion
          </label>
          <input
            type="text"
            name="describe"
            value={datoSede.describe}
            placeholder="Descripcion"
            onChange={hanldeChange}
            className="w-full p-3  rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="img" className="block text-white mb-2">
            Imagen
          </label>
          <input
            type="text"
            name="img"
            value={datoSede.img}
            placeholder="Imagen"
            onChange={hanldeChange}
            className="w-full p-3   rounded-lg bg-terciario-color"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600"
        >
          Crear sede
        </button>
      </form>

      <p className="text-white text-center mt-4">
        Si ya tienes una sede creada, ingresa para crear tu cancha{" "}
        <a href="#" className="text-yellow-500">
          Ingresa
        </a>
      </p>
    </div>
  );
};
export default FormSede;
