"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

export default function Succes() {
  const router = useRouter();

  const handleTerminar = () => {
    Swal.fire({
      icon: "error",
      title: "Algo salio mal. Intentalo nuevamente!",
    });
    router.push("/sedes");
  };

  return (
    <div className="bg-[url(https://wallpapers.com/images/hd/radiant-football-stadium-je7h4j4e0nw2xk0m.jpg)] bg-no-repeat bg-cover flex flex-col justify-center items-center w-full p-4 h-screen">
      <div className="bg-[#F5F7F8] p-8 rounded-lg shadow-xl w-[32vw] text-terciario text-xl items-center">
        <p className="mb-6 font-semibold text-red-600 text-3xl text-center">
          Ocurrio un error en el proceso de pago!
        </p>
        <div className="space-y-10 space-x-6">
          <h1 className="text-2xl text-black">
            El proceso de pago tuvo un error, vuelve a intertarlo, si el error
            persiste no dude en consultar a mantenimiento.
          </h1>
        </div>
        <button
          className="text-black md:text-lg p-3 rounded-lg border border-x-2 border-y-2 border-secundario hover:shadow-md hover:bg-secundario duration-200 ease-in-out mt-8 w-[10vw]"
          onClick={handleTerminar}
        >
          Volver a intentar!
        </button>
      </div>
    </div>
  );
}
