"use client";
import { fetchUserById } from "@/service/ApiUser";
import { useEffect, useState } from "react";

const MiReservas = () => {
  const [userSession, setUserSession] = useState<any>();
  const [usuario, setUsuario] = useState<any>();

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      setUserSession(JSON.parse(userSession));
    }
  }, []);

  useEffect(() => {
    const fetchReservas = async () => {
      if (userSession?.userDb) {
        try {
          const response = await fetchUserById(userSession.userDb.id);
          setUsuario(response);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
      }
    };

    fetchReservas();
  }, [userSession?.userDb]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 space-x-10 w-[60%] text-black">
      <h1 className="text-3xl font-bold text-black">Mis Reservas</h1>
      <p className="text-lg text-gray-400">
        Esta es la sección de tus reservas.
      </p>

      {usuario?.turnos && usuario.turnos.length > 0 ? (
   <div className="flex flex-col gap-16 text-2xl">
   {usuario.turnos.map((turno: any, index: number) => (
     <div
       key={index}
       className="w-full max-h-60 rounded-sm shadow-xl hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-y-4">
       <h2 className="font-Marko font-bold text-3xl">{turno?.cancha?.name}</h2>
       <p>Hora: {turno.time}</p>
       {/* <p>Dirección: {turno?.cancha?.sede?.location}</p> */}
       <p>Duración: 1 Hora</p>
       <p>Estado de pago: {turno.status} </p>
       <div className="flex justify-end mt-4">
         <button className="bg-terciario text-white p-3 rounded-lg font-semibold hover:bg-white hover:text-terciario duration-200 ease-in-out">
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
