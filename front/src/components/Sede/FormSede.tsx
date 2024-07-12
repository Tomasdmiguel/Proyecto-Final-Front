"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { IUser } from "@/interface/IUser";
import { IFormSede } from "@/interface/IFormSede";
import { CSede } from "@/helpers/Controllers/CSede";
import { fetchFormSede } from "@/service/ApiFormSede";
import { useSport } from "@/context/SportContext";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const FormSede = () => {
  const [datoSede, setdatoSede] = useState<IFormSede>({
    name: "",
    location: "",
    description: "",
  });
  const [userData, setUserData] = useState<IUser | undefined>();
  const [dataFile, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { sport } = useSport();
  const route = useRouter();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");

      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }
  }, []);

  const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    setdatoSede({
      ...datoSede,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setdatoSede({
        ...datoSede,
        location: place.formatted_address || "",
      });
    }
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (CSede(datoSede)) {
      try {
        if (userData && dataFile) {
          const response = await fetchFormSede(dataFile, datoSede, userData);

          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "Se creó la sede con éxito",
            });
            console.log("Sede creada exitosamente");
            route.push("/Dashboard");
          } else {
            console.error(
              "Error al crear la sede, la petición a la API fue buena pero por algo no se pudo crear:",
              response.message
            );
            Swal.fire({
              icon: "error",
              title: "Error al crear el formulario, revisa los datos",
              text: response.message,
            });
          }
        } else {
          console.error(
            "Error: No se encontraron datos de usuario válidos o archivo."
          );
          Swal.fire({
            icon: "error",
            title: "Error de usuario",
            text: "No se encontraron datos de usuario válidos o archivo, intenta iniciar sesión nuevamente",
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
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <div className="bg-gray-700 max-w-md w-full p-8 rounded-lg shadow-lg text">
        <h1 className="text-terciario-white text-center text-3xl font-bold mb-6">
          RESERVA GOL
        </h1>

        <p className="text-secundario text-center mb-4">
          Bienvenido, crea tu sede para que los jugadores puedan ver tus canchas
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-terciario-white mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={datoSede?.name}
              placeholder="Escribi tu nombre"
              onChange={hanldeChange}
              className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-terciario-white mb-2"
            >
              Locacion
            </label>
            <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
              <input
                type="text"
                name="location"
                value={datoSede?.location}
                placeholder="Ponga su locacion"
                onChange={hanldeChange}
                className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
              />
            </Autocomplete>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-terciario-white mb-2"
            >
              Descripcion
            </label>
            <input
              type="text"
              name="description"
              value={datoSede?.description}
              placeholder="Descripcion"
              onChange={hanldeChange}
              className="w-full p-3 rounded-lg bg-white text-black focus:border-yellow-600"
            />
          </div>

          <div className="bg-terciario-white max-w-md w-full p-8 rounded-lg shadow-lg text">
            <div className="mb-6">
              <label htmlFor="img" className="block text-gray-700 mb-2">
                Imagen
              </label>
              <input
                type="file"
                name="file"
                placeholder="Imagen"
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg bg-gray-700 text-terciario-white focus:border-yellow-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full border border-secundario text-terciario-white p-3 rounded-lg hover:bg-yellow-600 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="spinner border-2 border-gray-200 border-t-2 border-t-teal-500 rounded-full w-4 h-4 animate-spin mr-2"></div>
                Cargando...
              </div>
            ) : (
              "Crear sede"
            )}
          </button>
        </form>

        <p className="text-terciario-white text-center mt-4">
          Si ya tienes una sede creada, ingresa para crear tu cancha.
        </p>
        <Link href="/FormCancha" className="text-secundario text-center">
          <p>Ingresa</p>
        </Link>
      </div>
    </LoadScript>
  );
};

export default FormSede;
