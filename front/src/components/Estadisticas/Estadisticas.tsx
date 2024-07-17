"use client";
import { useState, useEffect } from "react";
import { fetchUser } from "@/service/ApiUser";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import EstadisticasRol from "../SuperAdmin/EstadisticasRol/EstadisticasRol";
import EstadisticasTurnos from "../PanelAdmin/EstadisticasTurnos/EstadisticasTurnos";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface IUserAprobacion {
  id: number;
  name: string;
  email: string;
  phone: string;
  rol: string;
  isActive: boolean;
}

const Estadisticas = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [activeUserCount, setActiveUserCount] = useState<number>(0);
  const [inactiveUserCount, setInactiveUserCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users: IUserAprobacion[] = await fetchUser();
        setUserCount(users.length);
        setActiveUserCount(users.filter((user) => user.isActive).length);
        setInactiveUserCount(users.filter((user) => !user.isActive).length);
        setIsLoading(false);
      } catch (error: any) {
        setError("Error al obtener los datos de los usuarios.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("userSession");
    if (user) {
      setUserSession(JSON.parse(user));
    }
  }, []);

  const barData = {
    labels: ["Usuarios Totales"],
    datasets: [
      {
        label: "Cantidad de Usuarios",
        data: [userCount],
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ["Usuarios Activos", "Usuarios Inactivos"],
    datasets: [
      {
        label: "Distribución de Usuarios",
        data: [activeUserCount, inactiveUserCount],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-terciario-white mb-6">
        Estadísticas
      </h2>
      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-4 max-w-[25vw] rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Cantidad de Usuarios
            </h3>
            <Bar data={barData} />
          </div>
          <div className="bg-white p-4 max-w-[25vw] rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Distribución de Usuarios
            </h3>
            <Pie data={pieData} />
          </div>
          {userSession.userDb.rol === "superadmin" ? (
            <EstadisticasRol />
          ) : userSession.userDb.rol === "admin" ? (
            <EstadisticasTurnos />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Estadisticas;
