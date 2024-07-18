"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";
import { ISede } from "@/interface/ISedes";
import { deleteCancha } from "@/service/Admin/DeletAdmin";
import { updateCancha } from "@/service/Admin/EditAdmin";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { pausarTurnos } from "@/service/Admin/PausarTurnos";
import { TurnoPausa } from "@/interface/TurnoPausa";

import { crearTurnos } from "@/service/Admin/CrearTurnos";

const MisCanchas = () => {
  const [sedes, setSedes] = useState<ISede[]>([]);
  const [turnos, setTurnos] = useState<TurnoPausa[]>([]);
  const { userData } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFile, setFile] = useState<File | null>(null);
  const [UpdateId, setUpdateId] = useState<string>("");
  const [updateCanchaData, setupdateCancha] = useState<any>({});
  const [isLoading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const fetchedTurnos: TurnoPausa[] = sedes.reduce(
          (acc: TurnoPausa[], sede) => {
            if (sede.canchas) {
              const turnosSede = sede.canchas.map((cancha) => ({
                id: cancha.id,
                isActive: false,
              }));
              acc.push(...turnosSede);
            }
            return acc;
          },
          []
        );
        setTurnos(fetchedTurnos);
      } catch (error) {
        console.error("Error fetching turnos:", error);
      }
    };

    fetchTurnos();
  }, [sedes]);

  const handleDeleteCancha = async (canchaId: string) => {
    if (!userData) {
      showErrorAlert("No se pudo realizar la acción, usuario no autenticado");
      return;
    }
    console.log(canchaId);
    try {
      const deleted = await deleteCancha(canchaId, userData);
      if (deleted) {
        const updated = sedes.map((sede) => ({
          ...sede,
          canchas: sede?.canchas?.filter((cancha) => cancha.id !== canchaId),
        }));
        console.log(updated);
        setSedes(updated);
        showSuccessAlert("Se eliminó la cancha correctamente");
      } else {
        showErrorAlert(
          "No se pudo realizar la acción, pausa la cancha y espera que los turnos reservados se completen"
        );
      }
    } catch (error) {
      showErrorAlert(
        "No se pudo realizar la acción, pausa la cancha y espera que los turnos reservados se completen"
      );
      console.error("Error al eliminar la cancha:", error);
    }
  };

  const handlePausar = async (canchaId: string, currentStatus: boolean) => {
    if (!userData) {
      showErrorAlert("No se pudo realizar la acción, usuario no autenticado");
      return;
    }

    try {
      const result = await pausarTurnos(canchaId, userData);
      if (result.success) {
        const newStatus = !currentStatus;
        const successMessage = newStatus
          ? "Turnos pausados correctamente"
          : "Turnos habilitados correctamente";
        showSuccessAlert(successMessage);

        const updatedTurnos = turnos.map((turno) =>
          turno.id === canchaId ? { ...turno, isActive: newStatus } : turno
        );
        setTurnos(updatedTurnos);
      } else {
        showErrorAlert("Hubo un error al pausar los turnos");
      }
    } catch (error: any) {
      showErrorAlert("Error al pausar los turnos");
    }
  };

  const handleCrearTurnos = async () => {
    try {
      setLoading(true);
      await crearTurnos();
      showSuccessAlert("Turnos creados");
    } catch (error: any) {
      showErrorAlert("Error al crear los turnos");
    } finally {
      setLoading(false);
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

    try {
      if (userData?.token || UpdateId || dataFile || userData) {
        const updatedCancha = await updateCancha(
          UpdateId,
          userData,
          updateCanchaData,
          dataFile
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
        <div className="bg-white h-[80vh] shadow-lg rounded-lg p-8 overflow-y-auto">
          <ul className="space-y-8">
            <button
              onClick={handleCrearTurnos}
              className={`text-white px-4 py-2 rounded-md transition duration-300 bg-green-500 hover:bg-green-600 ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
              ) : (
                "Crear turnos"
              )}
            </button>
            {sedes.map((sede) => (
              <div key={sede.id}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  {sede.name}
                </h2>

                {sede?.canchas?.map((cancha) => {
                  const turno = turnos.find((t) => t.id === cancha.id);
                  return (
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
                          onClick={() =>
                            handlePausar(cancha.id, turno?.isActive!)
                          }
                          type="button"
                          className={`${
                            turno?.isActive
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          } text-white px-4 py-2 rounded-md transition duration-300`}
                        >
                          {turno?.isActive ? "Habilitar" : "Pausar"}
                        </button>
                        <button
                          onClick={() => handleDeleteCancha(cancha.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No tienes sedes registradas.</p>
      )}
      {isModalOpen && (
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
                  value={updateCanchaData.name}
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
      )}
    </div>
  );
};

export default MisCanchas;
