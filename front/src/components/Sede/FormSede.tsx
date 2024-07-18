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
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries}
      onError={(e) => console.error("Error loading Google Maps script:", e)}
    >
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex bg-white h-full shadow-lg overflow-hidden w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage: `url(createSede.png)`,
            }}
          ></div>
          <div
            className="w-full lg:w-1/2 flex flex-col justify-center items-center 2xl:pb-20 2xl:pr-20"
            style={{
              backgroundImage: `url(fondoCreateForm.png)`,
            }}
          >
            <div className="md:w-1/2 lg:w-1/2 justify-center align-middle flex flex-col">
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <h1 className="text-2xl font-bold text-center text-gray-700">
                    Crea tu sede
                  </h1>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    type="text"
                    name="name"
                    value={datoSede.name}
                    onChange={hanldeChange}
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Descripcion
                  </label>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                    type="text"
                    name="description"
                    value={datoSede.description}
                    onChange={hanldeChange}
                    required
                  />
                </div>

                <div className="mt-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ubicación
                    </label>
                  </div>
                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={handlePlaceSelect}
                  >
                    <input
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      type="text"
                      name="location"
                      value={datoSede.location}
                      onChange={hanldeChange}
                      required
                    />
                  </Autocomplete>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="img"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Imagen
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      required
                    />
                    <label
                      htmlFor="file"
                      className="inline-flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-blue-600 cursor-pointer"
                    >
                      Seleccionar archivo
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    disabled={loading}
                    className="bg-gray-900 text-white font-bold py-3 px-4 w-full rounded hover:bg-gray-700 transition duration-300 ease-in-out"
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="ml-3">Creando sede...</span>
                      </div>
                    ) : (
                      "Crear sede"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center w-full text-center">
                <Link
                  href={`/FormCancha/${userData?.userDb?.id}`}
                  className="text-xs text-gray-500 text-center w-full"
                >
                  Ya tienes la sede creada?
                  <span className="text-blue-700"> Crea tu cancha aqui.</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default FormSede;
