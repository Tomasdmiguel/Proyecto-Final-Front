"use client";
import { useState, useEffect } from "react";
import { fetchUserAprobacion } from "@/service/Superadmin/ApiUsuarios";
import { IUserAprobacion } from "@/interface/IUserAprobacion";
import { fetchAprobarCanchero } from "@/service/Superadmin/AprobarCanchero";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { fetchCancelarCanchero } from "@/service/Superadmin/CancelarCanchero";

const CardAprobacion: React.FC = () => {
  const [userAprobacion, setUserAprobacion] = useState<IUserAprobacion[]>([]);
  const [userSession, setuserSession] = useState<any>([]);

  useEffect(() => {
    const user = localStorage.getItem("userSession");
    if (user) {
      setuserSession(JSON.parse(user));
    }
    const fetchData = async () => {
      try {
        const data = await fetchUserAprobacion();
        setUserAprobacion(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const aprobar = async (id: number) => {
    try {
      const result = await fetchAprobarCanchero(userSession, id);
      if (result.success) {
        showSuccessAlert("Aprobado");
        setUserAprobacion((prev) => prev.filter((user) => user.id !== id));
      } else {
        showErrorAlert("Error al aprobarlo");
      }
    } catch (error) {
      showErrorAlert("Error desconocido, intenta más tarde");
    }
  };

  const cancelar = async (id:number) => {
    try {
      const result = await fetchCancelarCanchero(userSession, id);
      if (result.success) {
        showSuccessAlert("Denegado correctamente");
        setUserAprobacion((prev) => prev.filter((user) => user.id !== id));
      } else {
        showErrorAlert("Error al cancelar");
      }
    } catch (error) {
      showErrorAlert("Error desconocido, intenta más tarde");
    }
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Aprobación para ser cancheros
      </h2>

      {userAprobacion.length > 0 ? (
        userAprobacion.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
              <h2 className="text-gray-600">Email: {user.email}</h2>
              <h2 className="text-gray-600">Celular: {user.phone}</h2>
            </div>
            <div>
              <button
                onClick={() => {
                  aprobar(user.id);
                }}
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition duration-300">
                Aprobar
              </button>
              <button
              onClick={() => {
                cancelar(user.id);
              }}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                Rechazar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay usuarios para aprobar</p>
      )}
    </div>
  );
};

export default CardAprobacion;
