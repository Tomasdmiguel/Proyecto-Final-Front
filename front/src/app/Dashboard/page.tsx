import React from "react";
import imgUsuario from "@/assets/user_profile_man-256.webp";
export default function Dashboard() {
  return (
    <div className="bg-main flex flex-col justify-center items-center w-full p-4 gap-24 ">
      <div className=" bg-[#F5F7F8] p-8 rounded-lg shadow-xl w-[60%] text-terciario mt-10 text-xl flex flex-row gap-36">

        <div className="space-y-8 space-x-4">
        <h1 className="text-3xl font-Marko text-black">Bienvenido, User!</h1>
        <p className="hover:font-black duration-300 ease-in-out">Nombre: <span className="hover:text-main">User</span></p>
        <p className="hover:font-black duration-300 ease-in-out">Correo electronico: <span className="hover:text-main">User@mail.com</span></p>
        <p className="hover:font-black duration-300 ease-in-out">Numero: <span className="hover:text-main">123456</span></p>
        <p className="hover:font-black duration-300 ease-in-out">Nombre de usuario: <span className="hover:text-main">Usuario321</span></p>
        <button className="hover:bg-main text-main text-base md:text-lg p-2 rounded-lg border-2 border-main hover:text-terciario-white duration-300 ease-in-out"> Cerrar sesion</button>
        </div>

        <div className="">
          <img src={imgUsuario.src} alt="" />
        </div>

      </div>
      
      <div className=" bg-white p-8 rounded-lg shadow-lg space-y-2 space-x-10 w-[60%] text-black">

        <h1 className="text-3xl font-bold text-black">Canchas Reservadas</h1>
        <p className="text-lg text-gray-400">Esta es la sección de tus canchas reservadas.</p>

        <div className="flex flex-col gap-16 text-2xl">
          <div className="w-full max-h-60 rounded-sm shadow-xl hover:shadow-terciario hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6">
            <h2 className="font-Marko font-bold text-3xl">Reserva 1</h2>
            <p>Hora: 12:00 pm</p>
            <p>Lugar: Cancha falsa 2</p>
            <p>Costo: 3000$</p>
          </div>
          <div className="w-full max-h-60 rounded-sm shadow-xl hover:shadow-terciario hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6">
          <h2 className="font-Marko font-bold text-3xl">Reserva 2</h2>
            <p>Hora: 10:00 pm</p>
            <p>Lugar: Cancha falsa 2</p>
            <p>Costo: 3000$</p>
          </div>
        </div>

      </div>
    </div>
  );
}