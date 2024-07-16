"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

export default function Succes() {
  const router = useRouter();

  const handleTerminar = () => {
    Swal.fire({
      icon: "success",
      title: "Pago realizado correctamente!",
    });
    router.push("/Dashboard");
  };

  return (
    <div className="bg-[url(https://donpotrero.com/img/posts/2/medidas_lg.jpg)] flex flex-col justify-center items-center w-full p-4 h-screen">
      <div className="bg-[#F5F7F8] p-8 rounded-lg shadow-xl w-2/3 lg:w-[32vw] text-terciario text-xl items-center">
        <p className="mb-6 font-semibold text-main text-3xl text-center">
          El pago se realizo correctamente!
        </p>
        <div className="space-y-10 space-x-6">
          <h1 className="text-2xl text-black">
            El pago y el proceso se realizo correctamente, ahora puedes ver en
            la vista de tu usuario los detalles de la cancha que reservaste,
            como lo son hora, lugar y duracion del partido, recuerda llegar con
            buen tiempo de anticipacion. Disfruta de tu partido y gracias por
            elegir Reservas Gol
          </h1>

          <p className="mt-10 text-xl items-center hover:font-black duration-300 ease-in-out">
            <Link href={"/Terminos"}>Terminos de seguridad del pago</Link>
          </p>
        </div>
        <button
          className="text-black md:text-lg p-3 rounded-lg border border-x-2 border-y-2 border-secundario hover:shadow-md hover:bg-secundario duration-200 ease-in-out mt-8 w-fit"
          onClick={handleTerminar}
        >
          Terminar pago!
        </button>
      </div>
    </div>
  );
}
