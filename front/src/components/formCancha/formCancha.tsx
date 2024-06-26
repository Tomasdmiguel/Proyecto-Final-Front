//*Este modulo es pára crear una cancha cuando ya tengas una sede creada 
"use client";
import { useState } from "react";
import Link from "next/link";

const FormCancha = () => {
  const [data, setData] = useState({
    sport: "",
    time: "",
    type: "",
    price: "",
    player: "",
    techado: "",
    img: ""
  });

  //*Funcion que guarda los cambios
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      <p className="text-secundario-color text-center mb-4">Crea tu cancha</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="sport" className="block text-terciario-color-white mb-2">
            Deporte
          </label>
          <input
            type="text"
            name="sport"
            value={data.sport}
            placeholder="Escribi el tipo de deporte"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-terciario-color-white mb-2">
            Horario de apertura
          </label>
          <input
            type="text"
            name="time"
            value={data.time}
            placeholder="Escribe el horario que abren y cierra el local"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-terciario-color-white mb-2">
            Tipo de cancha
          </label>
          <input
            type="text"
            name="type"
            value={data.type}
            placeholder="Escribi el tipo de cancha"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-terciario-color-white mb-2">
            Precio por hora
          </label>
          <input
            type="text"
            name="price"
            value={data.price}
            placeholder="Escribi el precio por hora"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="player" className="block text-terciario-color-white mb-2">
            Cantidad de jugadores
          </label>
          <input
            type="text"
            name="player"
            value={data.player}
            placeholder="Escribi la cantidad de jugadores"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario-color"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="techado" className="block text-terciario-color-white mb-2">
            Techado
          </label>
          <select
            name="techado"
            value={data.techado}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario-color"
          >
            <option value="">Selecciona una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="img" className="block text-terciario-color-white mb-2">
            Imagen
          </label>
          <input
            type="text"
            name="img"
            value={data.img}
            placeholder="URL de la imagen"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario-color"
          />
        </div>

        <button
          type="submit"
          className="w-full border border-secundario-color text-terciario-color-white p-3 rounded-lg hover:bg-yellow-600"
        >
          Crear
        </button>
      </form>

      <p className="text-terciario-color-white text-center mt-4">
        Si no tienes sede para crear cancha 
        <br />
        <Link className="text-secundario-color" href="/Formsede">
          Registrala
        </Link>
      </p>
    </div>
  );
};
export default FormCancha;
