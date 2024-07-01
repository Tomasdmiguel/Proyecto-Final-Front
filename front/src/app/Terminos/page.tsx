import React from "react";
import Link from "next/link";

export default function Terminos () {
    return (
        <div className="bg-main flex flex-col justify-center items-center w-full p-4 h-screen">
            <div className="bg-[#F5F7F8] p-8 rounded-sm shadow-xl w-[25vw] text-terciario text-xl items-center">

            <div className="space-y-10 space-x-6 ">

            <h1>Terminos de compra:</h1>
            <p className="text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae molestiae omnis neque sequi exercitationem. Cupiditate ipsam incidunt culpa aperiam, impedit quibusdam sequi. Eum suscipit distinctio fugit libero ducimus laboriosam voluptatem.
            Qui quas quia libero nobis minima dolorem architecto ea fugiat, aut, quam quo ex, laudantium quis ipsam iure provident autem culpa reiciendis? Hic culpa, laudantium natus veritatis maiores odio consequuntur.</p>
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