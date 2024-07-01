'use client'
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

export default function CardPago () {

    const handleComprar = () => {
        Swal.fire({
            icon: "success",
            title: "Se realizo el pago correctamente",
          });
    }

    return (
    <div className="bg-[url(https://donpotrero.com/img/posts/2/medidas_lg.jpg)] flex flex-col justify-center items-center w-full p-4 h-screen">
      <div className="bg-[#F5F7F8] p-8 rounded-sm shadow-xl w-[32vw] text-terciario text-xl items-center">
          <p className="mb-6 font-semibold text-main text-3xl">Aqui se realizara el pago de tu cancha</p>
        <div className="space-y-10 space-x-6">
          <h1 className="text-2xl font-Marko text-black">
          Pago para agendar cancha "Nombre de la cancha", aqui puedes revisar los detalles de la cancha que vas a alquilar, como lo son el nombre, direccion de la cancha, precio, Etc. Revisa que todo este correcto para confirmar el pago
          </h1>
          
          <ol className="text-2xl">
            Detalles:
          </ol>
          <li>
          Direccion: "direccion ficticia"
          </li>
          <li>
          Nombre:  "nombre de cancha"
          </li>
          <li>
          Hora: 12:00 pm 
          </li>
          <li>
          Dia: 14 julio 2024
          </li>
          <li>
          Precio: 2000
          </li>

          {/* IGNOREN ESTE ERROR ES NADA MAS LA FLECHA Q SE VE EN LA VISTA */}
          <p className="mt-10 text-xl items-center hover:font-black duration-300 ease-in-out">
            <Link href={"/Terminos"}>
            Terminos de seguridad para el pago <span></span>
            </Link>
          </p>

        </div>
          <button
          className="text-black md:text-lg p-3 rounded-lg border border-x-2 border-y-2 border-secundario hover:shadow-md hover:bg-secundario duration-200 ease-in-out mt-8 w-[8vw]"
          onClick={handleComprar}
        >
          Realizar pago!
        </button>
        </div>
        </div>


    )
}