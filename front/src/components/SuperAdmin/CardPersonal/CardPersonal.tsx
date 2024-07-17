/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSport } from "@/context/SportContext";
import {
  showConfirmationAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@/helpers/alert.helper/alert.helper";
import { useUser } from "@/context/UserContext";

export default function Dashboard() {
  const { userData, logOut } = useUser();
  const { sport, handleSport } = useSport();
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!userData?.token) {
        router.push("/");
        showErrorAlert(
          "Error",
          "No puede acceder al dashboard sin estar logeado"
        );
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [userData, router]);

  // Función para cerrar sesión
  const handleLogOut = () => {
    showConfirmationAlert(
      "¿Está seguro?",
      "¿Quiere cerrar sesión?",
      () => {
        logOut();
        router.push("/Login");
        handleSport(0);
        setTimeout(() => {
          window.location.reload();
        }, 150);
        showSuccessAlert("Se cerró sesión exitosamente");
      },
      () => {
        showErrorAlert("Cierre de sesión cancelada");
      }
    );
  };

  return (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="md:flex flex-col p-8">
        <div className="w-full pb-4 flex items-center justify-center">
          <img
            className="w-[20vw] object-cover"
            src="/profile.png"
            alt="User avatar"
          />
        </div>
        <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
          Dashboard Personal
        </div>
        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Bienvenido, {userData?.userDb.name || userData?.userDb.displayName}!
        </h1>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <dl className="divide-y divide-gray-200">
            {userData?.userDb?.name && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Nombre completo
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.userDb.name}
                </dd>
              </div>
            )}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Correo electrónico
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userData?.userDb.email}
              </dd>
            </div>
            {userData?.userDb.phone && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Número de teléfono
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userData.userDb.phone}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      <div className="mb-10 flex justify-center">
        <button
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          onClick={handleLogOut}
        >
          <svg
            className="mr-2 -ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
