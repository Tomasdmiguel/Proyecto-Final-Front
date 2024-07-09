import React from "react";
import Link from "next/link";

export default function Terminos () {
    return (
        <div className="bg-main flex flex-col justify-center items-center w-full p-4 h-screen">
            <div className="bg-[#F5F7F8] p-8 rounded-sm shadow-xl w-[30vw] text-terciario text-xl items-center">

            <div className="space-y-10 space-x-6 ">

            <h1>Terminos de compra:</h1>
            <p className="text-left">En Reserva Gol, la seguridad de tus transacciones es nuestra prioridad. Al realizar tu reserva de canchas a través de Mercado Pago, te garantizamos una experiencia segura y confiable. Mercado Pago es una de las plataformas de pago más reconocidas y seguras de América Latina, utilizando avanzados sistemas de encriptación y medidas de seguridad que protegen tus datos personales y financieros. Además, cada transacción es monitoreada en tiempo real para prevenir cualquier actividad sospechosa. Con Reserva Gol y Mercado Pago, puedes disfrutar de la tranquilidad de saber que tu información está protegida y que tu experiencia de reserva será rápida, fácil y segura.</p>
            <p className="mt-10 text-xl text-secundario items-center hover:font-black duration-300 ease-in-out">
            <Link href={"/CardPago"}>
            Volver a la vista de pago
            </Link>
          </p>
            </div>
            </div>
        </div>
    )
}