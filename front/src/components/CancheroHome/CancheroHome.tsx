'use client';

import Link from "next/link";

export const CancheroHome = () => {

    return (
        <div className="relative bg-cover bg-center w-full h-[400px] object-cover flex flex-col md:flex-row space-y-8 text-black md:space-y-0 md:space-x-8 items-center justify-center mt-20"
            style={{ backgroundImage: "url('/fondoblanco.png')" }}>
            <div className="flex-1 pl-20 md:pl-20 md:p-20">
                <div className="p-20">
                    <h1 className="font-bebas-neue uppercase text-3xl sm:text-2xl font-semibold text-black mb-4">
                        ¿Quieres agregar tu complejo deportivo?
                    </h1>
                    <p className="text-gray-700 font-bebas-neue text-xl leading-relaxed mb-6">
                        Te mostramos los beneficios de tener un canal online para gestionar tu club que permite a los usuarios reservar online.
                    </p>
                    <p className="text-gray-700 font-bebas-neue text-xl leading-relaxed mb-6">
                        Dejanos tus datos de contacto así podemos ponernos en contacto contigo.
                    </p>
                </div>

            </div>
            <div className="p-6 md:p-8 flex-1 flex items-center justify-center">
                <Link href="/AddAdmin">
                    <button className="font-bebas-neue uppercase bg-black text-white border border-black hover:bg-white hover:text-black hover:border-700 px-10 py-5 font-bold rounded-xl transition duration-200 ease-in-out">
                        Registrate aqui
                    </button>
                </Link>
            </div>
        </div >
    )
}