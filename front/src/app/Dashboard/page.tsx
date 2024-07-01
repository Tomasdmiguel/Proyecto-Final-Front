/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import imgUsuario from "@/assets/user_profile_man-256.webp";
import { useRouter } from "next/navigation";
import { ISede } from "@/interface/ISedes";
import { IUserSession } from "@/interface/context";
import Swal from "sweetalert2";
import { useSport } from "@/context/SportContext";

export default function Dashboard() {
  const { sport } = useSport();
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [sede, setSedes] = useState<ISede[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("usuarioSesion");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }
  }, []);

  // Función para cerrar sesión
  const handleLogOut = () => {
    localStorage.removeItem("usuarioSesion");
    Swal.fire({
      icon: "success",
      title: "Se cerró sesión exitosamente",
    });
    router.push("/Login");
  };

  // Función para redirigir a la creación de sede
  const handleCreate = () => {
    router.push("/Formsede");
  };

  const handleCreateCancha = () => {
    router.push("/FormCancha");
  };

  return (
    <div
      className={` ${
        sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
      } flex flex-col justify-center items-center w-full p-4 gap-24 `}
    >
      <div className="bg-[#F5F7F8] p-8 rounded-lg shadow-xl w-[60%] text-terciario mt-10 text-xl flex flex-row items-center justify-evenly">
        <div className="space-y-8 space-x-4">
          <h1 className="text-3xl font-Marko text-black">
            Bienvenido, {userData?.userDb.name || userData?.userDb.displayName}!
          </h1>
          <p className="hover:font-black duration-300 ease-in-out">
            Nombre:{" "}
            <span
              className={`${
                sport == 2
                  ? "hover:text-blue-400"
                  : sport == 3
                  ? "hover:text-orange-500"
                  : "hover:text-main"
              } `}
            >
              {userData?.userDb.name}
            </span>
          </p>
          <p className="hover:font-black duration-300 ease-in-out">
            Correo electrónico:{" "}
            <span
              className={`${
                sport == 2
                  ? "hover:text-blue-400"
                  : sport == 3
                  ? "hover:text-orange-500"
                  : "hover:text-main"
              } `}
            >
              {userData?.userDb.email}
            </span>
          </p>
          <p className="hover:font-black duration-300 ease-in-out">
            Número:{" "}
            <span
              className={`${
                sport == 2
                  ? "hover:text-blue-400"
                  : sport == 3
                  ? "hover:text-orange-500"
                  : "hover:text-main"
              } `}
            >
              {userData?.userDb.phone}
            </span>
          </p>
          <div className="w-full flex justify-end items-end">
            <button
              className={` ${
                sport == 2
                  ? "hover:bg-blue-400 border-blue-400 text-blue-400"
                  : sport == 3
                  ? "hover:bg-orange-500 border-orange-500 text-orange-500"
                  : "hover:bg-main border-main text-main"
              }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
              onClick={handleLogOut}
            >
              Cerrar sesion
            </button>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`fill-none ${
            sport == 2
              ? "stroke-blue-400"
              : sport == 3
              ? "stroke-orange-500"
              : "stroke-main"
          }`}
          width="352"
          height="252"
          viewBox="0 0 24 24"
          stroke-width="1.5"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 space-x-10 w-[60%] text-black">
        <h1 className="text-3xl font-bold text-black">Mis sedes</h1>
        <p className="text-lg text-gray-400">
          Esta es la sección de tus sedes creadas.
        </p>

        <div className="flex flex-col gap-16 text-2xl">
          {userData?.userDb?.sedes?.map((sede) => (
            <div
              key={sede.name}
              className={`w-full max-h-60 rounded-sm shadow-xl  ${
                sport == 2
                  ? "hover:bg-blue-400"
                  : sport == 3
                  ? "hover:bg-orange-500"
                  : "hover:bg-main"
              } hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6`}
            >
              <h2 className="font-Marko font-bold text-3xl">{sede.name}</h2>
              <p>Dirección: {sede.location}</p>
              <p>Descripción: {sede.description}</p>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-row items-end justify-end space-x-6 px-6">
          <button
            className={` ${
              sport == 2
                ? "hover:bg-blue-400 border-blue-400 text-blue-400"
                : sport == 3
                ? "hover:bg-orange-500 border-orange-500 text-orange-500"
                : "hover:bg-main border-main text-main"
            }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
            onClick={handleCreate}
          >
            Crear sede
          </button>
          <button
            className={` ${
              sport == 2
                ? "hover:bg-blue-400 border-blue-400 text-blue-400"
                : sport == 3
                ? "hover:bg-orange-500 border-orange-500 text-orange-500"
                : "hover:bg-main border-main text-main"
            }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
            onClick={handleCreateCancha}
          >
            Crear Cancha
          </button>
        </div>
      </div>
    </div>
  );
}
