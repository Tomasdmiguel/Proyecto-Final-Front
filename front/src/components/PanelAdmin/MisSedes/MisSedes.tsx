import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";
import { updateSede } from "@/service/Admin/EditAdmin";
import { deleteSede } from "@/service/Admin/DeletAdmin";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

export interface Sede {
  id: string;
  name: string;
  location: string;
  description: string;
}

const libraries: "places"[] = ["places"];
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const MisSedes = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const { userData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState<string>("");
  const [updateSedeData, setUpdateSedeData] = useState<Sede>({
    id: "",
    name: "",
    location: "",
    description: "",
  });
  const [dataFile, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        if (userData?.userDb?.id) {
          const fetchedUser = await fetchUserById(userData.userDb.id);
          if (fetchedUser.sedes) {
            setSedes(fetchedUser.sedes);
          }
        }
      } catch (error) {
        console.error("Error fetching sedes:", error);
      }
    };

    fetchSedes();
  }, [userData]);

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setUpdateSedeData({
        ...updateSedeData,
        location: place.formatted_address || "",
      });
    }
  };

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleDeleteSede = async (sedeId: string) => {
    try {
      if (userData?.token) {
        await deleteSede(userData.token, sedeId);
        const updatedSedes = sedes.filter((sede) => sede.id !== sedeId);
        setSedes(updatedSedes);
        showSuccessAlert("Eliminado correctamente");
      } else {
        showErrorAlert(
          "Si quieres borrar la sede, primero tiene que borrar las canchas que tiene creada"
        );
      }
    } catch (error) {
      showErrorAlert(
        "Para borrar la sede no tiene que tener canchas registrada."
      );
      console.error("Error al eliminar la sede:", error);
    }
  };

  const handleEstadoSede = (id: string) => {
    const sedeToUpdate = sedes.find((sede) => sede.id === id);
    if (sedeToUpdate) {
      setUpdateId(id);
      setUpdateSedeData(sedeToUpdate);
      setIsModalOpen(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpdateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setUpdateSedeData({
      ...updateSedeData,
      [name]: value,
    });
  };

  const handleSubmitUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (userData?.token && updateId) {
        const updatedFields = Object.fromEntries(
          Object.entries(updateSedeData).filter(([_, value]) => value !== "")
        );
        await updateSede(
          updateId,
          userData,
          updatedFields,
          dataFile || undefined
        );
        showSuccessAlert("Actualizado correctamente");
        setIsModalOpen(false);

        const updatedSedes = sedes.map((sede) =>
          sede.id === updateId ? { ...sede, ...updatedFields } : sede
        );
        setSedes(updatedSedes);
      } else {
        showErrorAlert("Se requiere al menos un campo para actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar la sede:", error);
      showErrorAlert("Error al actualizar la sede");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries}
      onError={(e) => console.error("Error loading Google Maps script:", e)}
    >
      <div className="container mx-auto p-6">
        <h1 className="text-3xl text-terciario-white font-bold mb-6">
          Mis Sedes
        </h1>
        {sedes.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <ul className="space-y-4">
              {sedes.map((sede) => (
                <li
                  key={sede.id}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {sede.name}
                  </span>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEstadoSede(sede.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteSede(sede.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-300">No tienes sedes registradas.</p>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Editar Sede
              </h2>
              <form onSubmit={handleSubmitUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={updateSedeData.name}
                    onChange={handleUpdateChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripción:
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={updateSedeData.description}
                    onChange={handleUpdateChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ubicación:
                  </label>
                  <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={handlePlaceSelect}
                  >
                    <input
                      type="text"
                      name="location"
                      value={updateSedeData.location}
                      onChange={handleUpdateChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                    />
                  </Autocomplete>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Archivo (Imagen de la Sede):
                  </label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default MisSedes;
