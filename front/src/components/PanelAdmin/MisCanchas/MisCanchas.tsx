"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";
import { ICancha, ISede } from "@/interface/ISedes";
import { deleteCancha } from "@/service/Admin/DeletAdmin";
import { updateCancha } from "@/service/Admin/EditAdmin";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { IFormCancha } from "@/interface/IFormCancha";
import { pausarTurnos } from "@/service/Admin/PausarTurnos";
import { ICanchaUpdate } from "@/interface/ICanchaUpdate";

const MisCanchas = () => {
  const [sedes, setSedes] = useState<ISede[]>([]);
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

  const handleDeleteCancha = async (canchaId: string) => {
    try {
      if (userData?.token) {
        await deleteCancha(canchaId);

        const updatedSedes = sedes.map((sede) => ({
          ...sede,
          canchas: sede?.canchas?.filter((cancha) => cancha.id !== canchaId),
        }));
        setSedes(updatedSedes);
        showSuccessAlert("Se elimino la cancha correctamente");
      } else {
        showErrorAlert("No se pudo realizar la accion");
      }
    } catch (error) {
      showErrorAlert(
        "Para hacer esto debes primero Pausar los turnos de esta cancha"
      );
      console.error("Error al eliminar la cancha:", error);
    }
  };

  const handlePausar = async (canchaId: string) => {
    try {
      if (userData?.token) {
        await pausarTurnos(canchaId);
        showSuccessAlert("Se ha pausado los turnos correctamente");
      } else {
        showErrorAlert("No se pudo realizar la accion");
      }
    } catch (error: any) {
      showErrorAlert("No se pudieron pausar los turnos");
      console.error("Error al pausar los turnos:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFile, setFile] = useState<File | null>(null);
  const [UpdateId, setUpdateId] = useState<string>("");
  const [updateCanchaData, setupdateCancha] = useState<any>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const handleUpdateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setupdateCancha({
      ...updateCanchaData,
      [name]: value,
    });
  };
  const handleEstadoCancha = (cancha: any) => {
    if (cancha) {
      setUpdateId(cancha.id);
      setupdateCancha(cancha);
      setIsModalOpen(true);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("upi", UpdateId);
    console.log("ud", userData);
    console.log("upcada", updateCanchaData);

    try {
      if (userData?.token && UpdateId) {
        const updatedCancha = await updateCancha(
          UpdateId,
          userData,
          updateCanchaData
        );

        if (updatedCancha) {
          showSuccessAlert("La cancha se actualizó correctamente");
          setIsModalOpen(false);
        } else {
          showErrorAlert("Hubo un problema al actualizar la cancha");
        }
      }
    } catch (error) {
      console.error("Error al actualizar la cancha:", error);
      showErrorAlert("Hubo un error al actualizar la cancha");
    }
  };

  return (
    <div className="container mx-auto p-6 pb-20">
      <h1 className="text-3xl font-extrabold mb-8 text-terciario-white">
        Mis Canchas
      </h1>
      {sedes.length > 0 ? (
        <div className="bg-white  h-[80vh] shadow-lg rounded-lg p-8 overflow-y-auto">
          <ul className="space-y-8">
            {sedes.map((sede) => (
              <div key={sede.id}>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  {sede.name}
                </h2>
                {sede?.canchas?.map((cancha) => (
                  <div
                    key={cancha.id}
                    className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {cancha.name}
                    </h3>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleEstadoCancha(cancha)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handlePausar(cancha.id)}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Pausar
                      </button>
                      <button
                        onClick={() => handleDeleteCancha(cancha.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No tienes sedes registradas.</p>
      )}
      {isModalOpen && (
        <div className="space-y-4">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Editar Cancha
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleUpdateChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Horario de apertura
                  </label>
                  <input
                    type="time"
                    value={updateCanchaData.timeopen}
                    name="timeopen"
                    onChange={handleUpdateChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Horario de cierre
                  </label>
                  <input
                    type="time"
                    value={updateCanchaData.timeclose}
                    name="timeclose"
                    onChange={handleUpdateChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Precio por jugador
                  </label>
                  <input
                    type="number"
                    value={updateCanchaData.price}
                    name="price"
                    onChange={handleUpdateChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Archivo (Imagen de la Cancha):
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
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Actualizar Cancha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisCanchas;
