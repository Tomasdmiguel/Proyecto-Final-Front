"use client";
import { fetchCancelarTurno } from "@/service/ApiCancelarTurno";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { ITurno } from "@/interface/ISedes";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/ApiUser";
import { useSport } from "@/context/SportContext";

const MiReservas = () => {
  const { sport } = useSport();

  const [turnos, setTurnos] = useState<ITurno[]>();
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { userData } = useUser();
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTurnos = async () => {
      const user = await fetchUserById(userData?.userDb.id);
      setTurnos(user.turnos);
    };
    fetchTurnos();
  }, [userData?.userDb.id]);

  const cancelarTurno = (id: string) => {
    showConfirmationAlert(
      "¿Seguro?",
      "¿Desea cancelar el turno?",
      async () => {
        setLoading(true);
        setLoadingId(id);
        try {
          const result = await fetchCancelarTurno(userData, id);
          if (result.success) {
            setTimeout(() => {
              window.location.reload();
            }, 150);
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
      },
      () => {
        showErrorAlert("Turno no cancelado");
      }
    );
  };

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-lg space-y-4 w-[80vw] sm:w-[60vw] lg:w-[50vw] text-black border-2 ${
        sport == 2
          ? "border-blue-400"
          : sport == 3
          ? "border-orange-400"
          : "border-main"
      }`}
    >
      <h1 className="text-3xl font-bebas-neue font-semibold text-black">
        Mis Reservas
      </h1>
      <p className="text-lg text-gray-400">
        Esta es la sección de tus reservas.
      </p>

      {turnos && turnos.length > 0 ? (
        <div className="flex flex-col w-full space-y-6 text-2xl">
          {turnos.map((turno: ITurno, index: number) => (
            <div
              key={index}
              className={`border-2 rounded p-2  ${
                sport == 2
                  ? "border-blue-400"
                  : sport == 3
                  ? "border-orange-400"
                  : "border-main"
              } w-full`}
            >
              <div className="flex flex-row w-full justify-between">
                <h2 className="capitalize font-bold text-3xl">
                  {turno?.cancha?.name}
                </h2>
                <button onClick={() => toggleOpen(turno.id)}>
                  {openId !== turno.id ? (
                    <svg
                      className="duration-300 ease-in-out hover:cursor-pointer fill-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="16"
                      viewBox="0 0 40 23"
                    >
                      <path d="M20 23L0 2.99995L2.8 0.199951L20 17.4L37.2 0.199951L40 2.99995L20 23Z" />
                    </svg>
                  ) : (
                    <svg
                      className="duration-300 ease-in-out hover:cursor-pointer fill-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="16"
                      viewBox="0 0 40 23"
                      style={{ transform: "rotate(180deg)" }}
                    >
                      <path d="M20 23L0 2.99995L2.8 0.199951L20 17.4L37.2 0.199951L40 2.99995L20 23Z" />
                    </svg>
                  )}
                </button>
              </div>
              {openId === turno.id && (
                <div className="bg-white m-2 flex-col flex text-sm sm:flex-col sm:text-lg">
                  <p>
                    <strong>{turno?.cancha.sede.name}</strong>
                  </p>
                  <p>
                    <strong>Dia:</strong> {formatDate(turno.date)}
                  </p>
                  <p>
                    <strong>Hora:</strong> {turno.time}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {turno?.cancha?.sede?.location}
                  </p>
                  <p>
                    <strong>Duración:</strong> 1 Hora
                  </p>

                  <p>
                    <strong>Estado:</strong>{" "}
                    {turno.status === "libre"
                      ? "Cancelado"
                      : turno.status === "ocupado"
                      ? "Reservado"
                      : turno.status === "pendiente"
                      ? "Pendiente"
                      : "Desconocido"}
                  </p>

                  {turno.status != "libre" && (
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => cancelarTurno(turno.id)}
                        className={` ${
                          sport == 2
                            ? "hover:bg-blue-400 border-blue-400 text-blue-400"
                            : sport == 3
                            ? "hover:bg-orange-500 border-orange-500 text-orange-500"
                            : "hover:bg-main border-main text-main"
                        }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
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
                  )}
                </div>
              )}
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
