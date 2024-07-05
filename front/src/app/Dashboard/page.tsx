/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ISede } from "@/interface/ISedes";
import { IUserSession } from "@/interface/context";
import { useSport } from "@/context/SportContext";
import { getSedes } from "@/service/ApiSedes";
import SedesAdmin from "@/components/SedesAdmin/SedesAdmin";
import MiReservas from "@/components/MiReservas/MiReservas";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const { userData, logOut } = useUser();
  const { sport } = useSport();
  const router = useRouter();
  const [sedes, setSedes] = useState<ISede[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!userData?.token) {
        router.push("/");
        showErrorAlert(
          "Error",
          "No puede acceder al dashboard sin estar logeado"
        );
      } else {
        const Sedes = await getSedes();
        setSedes(Sedes);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [userData]);

  // Función para cerrar sesión
  const handleLogOut = () => {
    showConfirmationAlert(
      "¿Está seguro?",
      "¿Quiere cerrar sesión?",
      () => {
        logOut();
        showSuccessAlert("Se cerró sesión exitosamente");
        router.push("/Login");
      },
      () => {
        showErrorAlert("Cierre de sesión cancelada");
      }
    );
  };

  // Función para redirigir a la creación de sede

  return (
    <div
      className={` ${
        sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
      } flex flex-col justify-center items-center w-full p-4 gap-24 min-h-[85vh]`}
    >
      <div className="bg-[#F5F7F8] p-8 rounded-lg shadow-xl w-[60%] text-terciario mt-10 text-xl flex flex-row items-center justify-evenly">
        <div className="space-y-8 w-3/5">
          <h1 className="text-3xl font-Marko text-black">
            Bienvenido, {userData?.userDb.name || userData?.userDb.displayName}!
          </h1>
          {userData?.userDb?.name && (
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
          )}
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
          {userData?.userDb.phone && (
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
          )}
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

        <div className="w-2/5 flex justify-center">
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
      </div>
      {userData?.userDb?.rol === "admin" ? (
        <SedesAdmin sedes={sedes} />
      ) : (
        <MiReservas />
      )}
    </div>
  );
}