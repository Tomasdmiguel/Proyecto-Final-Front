import React from "react";

const MiReservas = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 space-x-10 w-[60%] text-black">
      <h1 className="text-3xl font-bold text-black">Mis Reservas</h1>
      <p className="text-lg text-gray-400">
        Esta es la sección de tus reservas.
      </p>
      <div className="flex flex-col gap-16 text-2xl">
        <div
          className={`w-full max-h-60 rounded-sm shadow-xl hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6`}>
          <h2 className="font-Marko font-bold text-3xl">Deporte</h2>
          <p>Hora: 10:00 AM</p>
          <p>Dirección: Calle Falsa 123</p>
          <p>Duración: 1 hora</p>
        </div>
      </div>
      <div className="w-full flex flex-row items-end justify-end space-x-6 px-12">
        <button className="bg-blue-400 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 duration-200 ease-in-out">
          Cancelar Reserva
        </button>
      </div>
    </div>
  );
};

export default MiReservas;
