//*Este modulo es pára crear una cancha cuando ya tengas una sede creada
"use client";
import { useState } from "react";
import Link from "next/link";

const FormCancha = () => {
  const [data, setData] = useState({
    sport: "",
    timeopen: "",
    timeclose: "",
    type: "",
    price: "",
    player: "",
    techado: "",
    img: "",
  });

  //*Funcion que guarda los cambios
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    const { value, name } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

  //*Funcion que envia el formulario
  const handleSubmit = () => {};

  return (
    <div className="bg-main max-w-md w-full p-8 rounded-lg shadow-lg">
      <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
        CANCHITAS GOL
      </h1>

      <p className="text-secundario text-center mb-4">Crea tu cancha</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="sport" className="block text-terciario-white mb-2">
            Deporte
          </label>
          <select
            name="sport"
            value={data.sport}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg text-black">
            <option value="">Selecciona que deporte</option>
            <option value={1}>Fotbol</option>
            <option value={2}>Padel</option>
            <option value={3}>Tenis</option>
          </select>
        </div>
        <div className="mb-4">

          <label htmlFor="time" className="block text-terciario-white mb-2">
            Horario de apertura
          </label>
          <input className="text-black" type="time" value={data.timeopen} name="timeopen" onChange={handleChange} />

          <label htmlFor="timeclose" className="block text-terciario-white mb-2">
            Horario de cierre
          </label>
          <input className="text-black" type="time" value={data.timeclose} name="timeclose" onChange={handleChange} />

        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-terciario-white mb-2">
            Tipo de cancha
          </label>
          <select
            name="type"
            value={data.type}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg text-black">
            <option value="">Tipo de cancha</option>
            <option value={1}>Sintetico</option>
            <option value={2}>Pasto</option>
            <option value={3}>futsal</option>
            <option value={4}>cemento</option>
            <option value={5}>ladrillo</option>
          </select>
          
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-terciario-white mb-2">
            Precio por hora
          </label>
          <input
          
            type="number"
            name="price"
            value={data.price}
            placeholder="Escribi el precio por hora"
            onChange={handleChange}
            className=" text-black w-full p-3 rounded-lg bg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="player" className="block text-terciario-white mb-2">
            Cantidad de jugadores
          </label>
          <input
            type="number"
            name="player"
            value={data.player}
            placeholder="Escribi la cantidad de jugadores"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="techado" className="block text-terciario-white mb-2">
            Techado
          </label>
          <select
            name="techado"
            value={data.techado}
            onChange={handleChange}
            className=" text-black w-full p-3 rounded-lg bg">
            <option value="">Selecciona una opción</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="img" className="block text-terciario-white mb-2">
            Imagen
          </label>
          <input
            type="url"
            name="img"
            value={data.img}
            placeholder="URL de la imagen"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-terciario"
          />
        </div>

        <button
          type="submit"
          className="w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600">
          Crear
        </button>
      </form>

      <p className="text-terciario-white text-center mt-4">
        Si no tienes sede para crear cancha
        <br />
        <Link className="text-secundario" href="/Formsede">
          Registrala
        </Link>
      </p>
    </div>
  );
};
export default FormCancha;
