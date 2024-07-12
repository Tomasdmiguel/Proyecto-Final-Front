"use client";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";
import Link from "next/link";
import { deleteSede } from "@/service/Admin/DeletAdmin";
import { showErrorAlert, showSuccessAlert } from "@/helpers/alert.helper/alert.helper";

interface Sede {
  id: string; 
  name: string;
}

const MisSedes = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
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

  const handleDeleteSede = async (sedeId: string) => {
    try {
      if (userData?.token) {


        await deleteSede(userData.token, sedeId);

        const updatedSedes = sedes.filter((sede) => sede.id !== sedeId);
        setSedes(updatedSedes);
        showSuccessAlert("Eliminado correctamente");
      } else {
        showErrorAlert("Si quieres borrar la sede, primero tiene que borrar las canchas que tiene creada")
        console.error("Token de usuario no disponible.");
      }
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
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
                  <Link
                    href={`/editar/${sede.id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Editar
                  </Link>
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
    </div>
  );
};

export default MisSedes;
