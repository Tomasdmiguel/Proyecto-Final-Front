/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import imgUsuario from "@/assets/user_profile_man-256.webp";
import { useRouter } from "next/navigation";
import { ISede, IUserSession } from "@/interface/context";
import Swal from "sweetalert2";

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession>();
  const [sede, setSedes] = useState<ISede[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("usuarioSesion");
      setUserData(JSON.parse(userData!));
    }
  }, []);

  // Pongo un alert de momento para cerrar sesion
  const handleLogOut = () => {
    localStorage.removeItem("usuarioSesion");
    Swal.fire({
      icon: "success",
      title: "Se cerro secion exitosamente",
    });
    router.push("/Login");
  };

  const handleCreate = () => {
    router.push("/Formsede");
  };

  const handleCreateCancha = () => {
    router.push("/FormCancha");
  };

  return (
    <div className="bg-main flex flex-col justify-center items-center w-full p-4 gap-24 ">
      <div className="bg-[#F5F7F8] p-8 rounded-lg shadow-xl w-[60%] text-terciario mt-10 text-xl flex flex-row items-center justify-evenly">
        <div className="space-y-8 space-x-4">
          <h1 className="text-3xl font-Marko text-black">
            Bienvenido, {userData?.userDb.name}!
          </h1>
          <p className="hover:font-black duration-300 ease-in-out">
            Nombre:{" "}
            <span className="hover:text-main">{userData?.userDb.name}</span>
          </p>
          <p className="hover:font-black duration-300 ease-in-out">
            Correo electronico:{" "}
            <span className="hover:text-main">{userData?.userDb.email}</span>
          </p>
          <p className="hover:font-black duration-300 ease-in-out">
            Numero:{" "}
            <span className="hover:text-main">{userData?.userDb.phone}</span>
          </p>
          <button
            className="text-black md:text-lg p-3 rounded-lg border border-x-2 border-y-2 border-secundario hover:border-red-400 hover:shadow-md hover:shadow-black hover:bg-red-600 hover:text-white duration-200 ease-in-out"
            onClick={handleLogOut}
          >
            Cerrar sesion
          </button>
        </div>

        <img src={imgUsuario.src} alt="" className="w-[18vw]" />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg space-y-2 space-x-10 w-[60%] text-black">
        <h1 className="text-3xl font-bold text-black">Mis sedes</h1>
        <p className="text-lg text-gray-400">
          Esta es la sección de tus sedes creadas.
        </p>

        <div className="flex flex-col gap-16 text-2xl">
          {userData?.userDb.sedes.map((sede) => (
            <div
              key={sede.name}
              className="w-full max-h-60 rounded-sm shadow-xl hover:shadow-terciario hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6"
            >
              <h2 className="font-Marko font-bold text-3xl">{sede.name}</h2>
              <p>Dirección: {sede.location}</p>
              <p>Descripción: {sede.description}</p>
            </div>
          ))}
        </div>

        <button
          className="text-black md:text-lg p-3 rounded-lg border border-x-2 border-y-2 border-secundario hover:shadow-md hover:bg-secundario duration-200 ease-in-out mt-8 w-[8vw]"
          onClick={handleCreate}
        >
          Crear sede
        </button>
        <button
          className="text-black md:text-lg p-3 rounded-lg border border-x-2 border-y-2 border-secundario hover:shadow-md hover:bg-secundario duration-200 ease-in-out mt-8 w-[8vw]"
          onClick={handleCreateCancha}
        >
          Crear Cancha
        </button>
      </div>
    </div>
  );
}