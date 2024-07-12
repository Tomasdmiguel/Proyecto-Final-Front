"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";
import { deleteSede } from "@/service/Admin/DeletAdmin";
import { updateSede } from "@/service/Admin/EditAdmin";
import { showSuccessAlert } from "@/helpers/alert.helper/alert.helper";

interface Sede {
  id: number;
  name: string;
  location?: string;
  description?: string;
  imgUrl?: string;
}

const MisSedes = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSede, setCurrentSede] = useState<Sede | null>(null);
  const { userData } = useUser();

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

  const handleDeleteSede = async (sedeId: number) => {
    try {
      if (userData?.token) {
        await deleteSede(userData.token, sedeId.toString());

        const updatedSedes = sedes.filter((sede) => sede.id !== sedeId);
        setSedes(updatedSedes);
        showSuccessAlert("Eliminado correctamente");
      } else {
        console.error("Token de usuario no disponible.");
      }
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
    }
  };

  const handleEditSede = (sede: Sede) => {
    setCurrentSede(sede);
    setIsEditing(true);
  };

  const handleUpdateSede = async () => {
    if (currentSede && userData?.token) {
      try {
        await updateSede(currentSede.id, userData, currentSede);
        const updatedSedes = sedes.map((sede) =>
          sede.id === currentSede.id ? currentSede : sede
        );
        setSedes(updatedSedes);
        setIsEditing(false);
        showSuccessAlert("Sede actualizada correctamente");
      } catch (error) {
        console.error("Error updating sede:", error);
      }
    }
  };

  return (
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
                <span className="text-lg font-medium text-black">
                  {sede.name}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditSede(sede)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteSede(sede.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No tienes sedes registradas.</p>
      )}

      {isEditing && currentSede && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Editar Sede</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSede();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={currentSede.name}
                  onChange={(e) =>
                    setCurrentSede({ ...currentSede, name: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={currentSede.location || ""}
                  onChange={(e) =>
                    setCurrentSede({
                      ...currentSede,
                      location: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={currentSede.description || ""}
                  onChange={(e) =>
                    setCurrentSede({
                      ...currentSede,
                      description: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisSedes;
