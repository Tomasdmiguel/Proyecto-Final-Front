"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";
import { ISede } from "@/interface/ISedes";
import Link from "next/link";
import { deleteCancha } from "@/service/Admin/DeletAdmin";
import { showSuccessAlert } from "@/helpers/alert.helper/alert.helper";

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
      await deleteCancha(canchaId);

      const updatedSedes = sedes.map((sede) => ({
        ...sede,
        canchas: sede?.canchas?.filter((cancha) => cancha.id !== canchaId),
      }));
      setSedes(updatedSedes);
      showSuccessAlert("Se elimino correctamente");
    } catch (error) {
      console.error("Error al eliminar la cancha:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 pb-20">
      <h1 className="text-4xl font-extrabold mb-8 text-terciario-white">
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
                      <Link
                        href={`/editar/${cancha.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </Link>
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
    </div>
  );
};

export default MisCanchas;
