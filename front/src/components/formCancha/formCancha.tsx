"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { CCancha } from "@/helpers/Controllers/CCancha";
import { IFormCancha } from "@/interface/IFormCancha";
import { fetchFormCancha } from "@/service/ApiFormCancha";
import { ISede } from "@/interface/ISedes";
import { IUserSession } from "@/interface/context";
import { getSedes } from "@/service/ApiSedes";

const FormCancha = ({ id }: { id: string }) => {
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
  });
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [userSedes, setUserSedes] = useState<ISede[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }
    const fetchSedes = async () => {
      const Sedes = await getSedes();
      setUserSedes(Sedes);
    };
    fetchSedes();
  }, []);

  const filteredSedes = userSedes?.filter(
    (sede: ISede) => sede?.user?.id === id
  );

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (CCancha(data) && userData) {
      try {
        const response = await fetchFormCancha(data, userData);

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
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Datos inválidos",
        text: "Por favor, revisa los datos e intenta nuevamente",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex bg-white h-full shadow-lg overflow-hidden w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url(createCancha.png)`,
          }}
        ></div>

        <div
          className="w-full lg:w-1/2 flex flex-col justify-center items-center"
          style={{ backgroundImage: `url(fondoCreateForm.png)` }}
        >
          <div className=" p-8 lg:w-1/2 justify-center align-middle flex flex-col">
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label
                  htmlFor="sedeName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Sede
                </label>
                <select
                  name="sedeName"
                  value={data.sedeName}
                  onChange={handleChange}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                >
                  <option value="">Selecciona una sede</option>
                  {filteredSedes?.map((sede) => (
                    <option key={sede.name} value={sede.name}>
                      {sede.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre de la cancha
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Cancha 1"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <label
                  htmlFor="sport"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Deporte
                </label>
                <select
                  name="sport"
                  value={data.sport}
                  onChange={handleChange}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                >
                  <option value="">Selecciona que deporte</option>
                  <option value={1}>Fútbol</option>
                  <option value={2}>Padel</option>
                  <option value={3}>Tenis</option>
                </select>
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label
                    htmlFor="timeOpen"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Horario de apertura
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="time"
                  name="timeopen"
                  value={data.timeopen}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label
                    htmlFor="timeClose"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Horario de cierre
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="time"
                  name="timeclose"
                  value={data.timeclose}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <label
                  htmlFor="type"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Tipo de cancha
                </label>
                <select
                  name="type"
                  value={data.type}
                  onChange={handleChange}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                >
                  <option value="">Tipo de cancha</option>
                  <option>Sintético</option>
                  <option>Pasto</option>
                  <option>Futsal</option>
                  <option>Cemento</option>
                  <option>Ladrillo</option>
                </select>
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <label
                  htmlFor="price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Precio por jugador
                </label>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  placeholder="Escribí el precio por hora"
                  onChange={handleChange}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label
                    htmlFor="player"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Cantidad de jugadores
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  type="number"
                  name="player"
                  value={data.player}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 flex flex-col justify-between">
                <label
                  htmlFor="techado"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Techado
                </label>

                <select
                  name="techado"
                  value={String(data.techado)}
                  onChange={handleChange}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* <button
                // type="submit"
                className="bg-blue-700 text-white font-bold py-3 px-4 w-full rounded hover:bg-blue-600 mt-8"

                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span className="ml-3">Cargando...</span>
                  </div>
                ) : (
                  "Crear"
                )}
              </button> */}

              <div className="mt-8">
                <button
                  disabled={loading}
                  className="bg-gray-900 text-white font-bold py-3 px-4 w-full rounded hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span className="ml-3">Creando cancha...</span>
                    </div>
                  ) : (
                    "Crear cancha"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCancha;
