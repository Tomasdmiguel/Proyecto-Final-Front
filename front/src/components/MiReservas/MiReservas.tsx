"use client";
import { fetchUserById } from "@/service/ApiUser";
import { useEffect, useState } from "react";
import { fetchCancelarTurno } from "@/service/ApiCancelarTurno";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { ITurno } from "@/interface/ISedes";
import { IUser } from "@/interface/context";
import { useUser } from "@/context/UserContext";

const MiReservas = () => {
  const [usuario, setUsuario] = useState<IUser>();
  const { userData } = useUser();

  useEffect(() => {
    const fetchReservas = async () => {
      if (userData?.token) {
        try {
          const response = await fetchUserById(userData.userDb.id);
          setUsuario(response);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
      }
    };

    fetchReservas();
  }, [userData?.token, userData?.userDb.id]);

  const cancelarTurno = async (id: string) => {
    try {
      const result = await fetchCancelarTurno(userData, id);
      if (result.success) {
        showSuccessAlert("Turno cancelado");
      } else {
        showErrorAlert("Error al cancelar el turno");
      }
    } catch (error) {
      showErrorAlert("Error desconocido, intenta más tarde");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 space-x-10 w-[60%] text-black">
      <h1 className="text-3xl font-bold text-black">Mis Reservas</h1>
      <p className="text-lg text-gray-400">
        Esta es la sección de tus reservas.
      </p>

      {usuario?.userDb?.turnos && usuario.userDb.turnos.length > 0 ? (
        <div className="flex flex-col gap-16 text-2xl">
          {usuario.userDb.turnos.map((turno: ITurno, index: number) => (
            <div
              key={index}
              className="w-full max-h-60 rounded-sm shadow-xl hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-y-4"
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
                  className="bg-terciario text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-terciario duration-200 ease-in-out"
                >
                  Cancelar Reserva
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
