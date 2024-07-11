"use client";
import { fetchCancelarTurno } from "@/service/ApiCancelarTurno";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { ITurno } from "@/interface/ISedes";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";

const MiReservas = () => {
  const [turnos, setTurnos] = useState<ITurno[]>();
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null); 
  const { userData } = useUser();

  useEffect(() => {
    const fetchTurnos = async () => {
      const user = await fetchUserById(userData?.userDb.id);
      setTurnos(user.turnos);
    };
    fetchTurnos();
  }, [userData?.userDb.id]);

  const cancelarTurno = async (id: string) => {
    setLoading(true); // Iniciar estado de carga
    setLoadingId(id); // Establecer el ID del turno en carga
    try {
      console.log(userData?.token);
      
      const result = await fetchCancelarTurno(userData, id);
      if (result.success) {
        showSuccessAlert("Turno cancelado");
      } else {
        showErrorAlert("Error al cancelar el turno");
      }
    } catch (error) {
      showErrorAlert("Error desconocido, intenta más tarde");
    } finally {
      setLoading(false);
      setLoadingId(null); 
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 space-x-10 min-w-[60vw] text-black">
      <h1 className="text-3xl font-bold text-black">Mis Reservas</h1>
      <p className="text-lg text-gray-400">
        Esta es la sección de tus reservas.
      </p>

      {/* {loading && <div className="flex justify-center items-center"><div className="spinner border-4 border-gray-200 border-t-4 border-t-teal-500 rounded-full w-8 h-8 animate-spin"></div></div>} */}

      {turnos && turnos.length > 0 ? (
        <div className="flex flex-col gap-16 text-2xl">
          {turnos.map((turno: ITurno, index: number) => (
            <div
              key={index}
              className="w-full rounded-sm shadow-xl hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-y-4"
            >
              <h2 className="font-Marko font-bold text-3xl">
                {turno?.cancha?.name}
              </h2>
              <p>Hora: {turno.time}</p>
              <p>Dirección: {turno?.cancha?.sede?.location}</p>
              <p>Duración: 1 Hora</p>

              <p>
                Estado de pago:{" "}
                {turno.status === "libre"
                  ? "Cancelado"
                  : turno.status === "ocupado"
                  ? "Reservado"
                  : turno.status === "pendiente"
                  ? "Pendiente"
                  : "Desconocido"}
              </p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => cancelarTurno(turno.id)}
                  className={`bg-terciario text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-terciario duration-200 ease-in-out ${loading && loadingId === turno.id ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={loading && loadingId === turno.id}
                >
                  {loading && loadingId === turno.id ? (
                    <div className="flex items-center">
                      <div className="spinner border-2 border-gray-200 border-t-2 border-t-teal-500 rounded-full w-4 h-4 animate-spin mr-2"></div>
                      Cargando...
                    </div>
                  ) : (
                    "Cancelar Reserva"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes reservas aún.</p>
      )}
    </div>
  );
};

export default MiReservas;
