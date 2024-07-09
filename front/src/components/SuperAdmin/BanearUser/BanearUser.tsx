"use client"
import { useState, useEffect } from "react";
import { IUserAprobacion } from "@/interface/IUserAprobacion";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { fetchCancelarCanchero } from "@/service/Superadmin/CancelarCanchero";
import { fetchUser } from "@/service/ApiUser";

const BanearUser = () => {
  const [usuarios, setUsuarios] = useState<IUserAprobacion[]>([]);
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("userSession");
    if (user) {
      setUserSession(JSON.parse(user));
    }

    const fetchData = async () => {
      try {
        const response = await fetchUser();
        setUsuarios(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const cancelar = async (id: number) => {
    try {
      const result = await fetchCancelarCanchero(userSession, id);
      if (result.success) {
        showSuccessAlert("Usuario baneado correctamente");
        // Actualizar la lista de usuarios después de la cancelación
        setUsuarios((prev) => prev.filter((user) => user.id !== id));
      } else {
        showErrorAlert("Error al banear el usuario");
      }
    } catch (error) {
      showErrorAlert("Error desconocido, intenta más tarde");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Banear Usuarios
      </h2>

      {usuarios.length > 0 ? (
        usuarios.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between"
          >
            <div>
              <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
              <h2 className="text-gray-600">Email: {user.email}</h2>
              <h2 className="text-gray-600">Celular: {user.phone}</h2>
              <h2 className="text-gray-600">Rol: {user.rol}</h2>
            </div>
            <div>
              <button
                onClick={() => cancelar(user.id)}
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Banear
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay usuarios</p>
      )}
    </div>
  );
};

export default BanearUser;