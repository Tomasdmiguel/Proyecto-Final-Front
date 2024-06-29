//*Este modulo es pára crear una cancha cuando ya tengas una sede creada
"use client";
import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

//*Importacion para controlar el formulario
import { CCancha } from "@/helpers/Controllers/CCancha";
import { IFormCancha } from "@/interface/IFormCancha";

//*Importacion para crear una cancha peticion al back
import { fetchFormCancha } from "@/service/ApiFormCancha";

const FormCancha = () => {
  const router = useRouter();
  const [data, setData] = useState<IFormCancha>({
    sedeName: "",
    name: "",
    sport: 0,
    timeopen: "",
    timeclose: "",
    type: "",
    price: 0,
    player: 0,
    techado: false,
    imgUrl: "",
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (CCancha(data)) {
      try {
        const response = await fetchFormCancha(data);

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Se creó la cancha con éxito",
          });
          console.log("Cancha creada exitosamente");

          router.push("/Dashboard");
        } else {
          console.error(
            "Error al crear la cancha, la petición a la API fue buena pero por algo no se pudo crear:",
            response.message
          );
          Swal.fire({
            icon: "error",
            title: "Error al crear el formulario, revisa los datos",
            text: response.message,
          });
        }
      } catch (error) {
        console.error("Error inesperado:", error);
        Swal.fire({
          icon: "error",
          title: "Error inesperado",
          text: "Error desconocido, intenta más tarde",
        });
      }
    } else {
      // Se maneja el error de la validación si salió todo mal
      Swal.fire({
        icon: "warning",
        title: "Datos inválidos",
        text: "Por favor, revisa los datos e intenta nuevamente",
      });
    }
  };

  return (
    <div className="bg-main max-w-md w-full p-8 rounded-lg shadow-lg">
      <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
        CANCHITAS GOL
      </h1>

      <p className="text-secundario text-center mb-4">Crea tu cancha</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="sadeName"
              className="block text-terciario-white mb-2">
              Nombre de la sede
            </label>
            <input
              type="name"
              name="sedeName"
              value={data.sedeName}
              placeholder="Cancha 1"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-terciario"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-terciario-white mb-2">
              Nombre de la cancha
            </label>
            <input
              type="name"
              name="name"
              value={data.name}
              placeholder="Cancha 1"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-terciario"
            />
          </div>
          <label htmlFor="sport" className="block text-terciario-white mb-2">
            Deporte
          </label>
          <select
            name="sport"
            value={data.sport}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg text-black">
            <option value="">Selecciona que deporte</option>
            <option value={1}>Fútbol</option>
            <option value={2}>Padel</option>
            <option value={3}>Tenis</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-terciario-white mb-2">
            Horario de apertura
          </label>
          <input
            className="text-black"
            type="time"
            value={data.timeopen}
            name="timeopen"
            onChange={handleChange}
          />

          <label
            htmlFor="timeclose"
            className="block text-terciario-white mb-2">
            Horario de cierre
          </label>
          <input
            className="text-black"
            type="time"
            value={data.timeclose}
            name="timeclose"
            onChange={handleChange}
          />
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
            <option>Sintético</option>
            <option>Pasto</option>
            <option>Futsal</option>
            <option>Cemento</option>
            <option>Ladrillo</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-terciario-white mb-2">
            Precio por jugador
          </label>
          <input
            type="number"
            name="price"
            value={data.price}
            placeholder="Escribí el precio por hora"
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
            placeholder="Escribí la cantidad de jugadores"
            onChange={handleChange}
            className="  text-black w-full p-3 rounded-lg bg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="techado" className="block text-terciario-white mb-2">
            Techado
          </label>
          <select
            name="techado"
            value={String(data.techado)}
            onChange={handleChange}
            className=" text-black w-full p-3 rounded-lg bg">
            <option value="">Selecciona una opción</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="imgUrl" className="block text-terciario-white mb-2">
            Imagen
          </label>
          <input
            type="url"
            name="imgUrl"
            value={data.imgUrl}
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
