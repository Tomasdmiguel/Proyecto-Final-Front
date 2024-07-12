"use client";
import { useState, useEffect } from "react";
import { fetchUser } from "@/service/ApiUser";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
interface IUserAprobacion {
  id: number;
  name: string;
  email: string;
  phone: string;
  rol: string;
  isActive: boolean;
}
const EstadisticasRol = () => {
  const [adminCount, setAdminCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users: IUserAprobacion[] = await fetchUser();
        setAdminCount(users.filter((user) => user.rol === "admin").length);
        setUserCount(users.filter((user) => user.rol === "user").length);
        setIsLoading(false);
      } catch (error: any) {
        setError("Error al obtener los datos de los usuarios.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieData = {
    labels: ["Administradores", "Usuarios"],
    datasets: [
      {
        label: "Distribución de Roles",
        data: [adminCount, userCount],
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: ["rgba(255, 159, 64, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Distribución de Roles
      </h3>
      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Pie data={pieData} />
      )}
    </div>
  );
};

export default EstadisticasRol;
