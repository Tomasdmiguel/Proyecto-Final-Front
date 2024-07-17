"use client";

import Link from "next/link";

export const CancheroHome = () => {
  return (
    <div
      className="bg-cover bg-center w-full object-cover flex flex-col md:flex-row space-y-8 text-black md:space-y-0 md:space-x-8 lg:py-14 items-center justify-center p-6"
      style={{ backgroundImage: "url('/fondoblanco.png')" }}
    >
      <div className="w-1/5 absolute lg:static"></div>
      <div className="md:w-2/3 lg:2/5 p-4">
        <h1 className="uppercase text-3xl sm:text-2xl font-semibold text-black mb-4">
          ¿Quieres agregar tu complejo deportivo?
        </h1>
        <p className="text-gray-700 text-xl leading-relaxed mb-6">
          Te mostramos los beneficios de tener un canal online para gestionar tu
          club que permite a los usuarios reservar online.
        </p>
        <p className="text-gray-700 text-xl leading-relaxed mb-6">
          Dejanos tus datos de contacto así podemos ponernos en contacto
          contigo.
        </p>
      </div>
      <div className="md:w-1/3">
        <Link href="/AddAdmin">
          <button className="font-bebas-neue uppercase bg-black text-white border border-black hover:bg-white hover:text-black hover:border-700 px-10 py-5 font-bold rounded-xl transition duration-200 ease-in-out">
            Registrate aqui
          </button>
        </Link>
      </div>
    </div>
  );
};
