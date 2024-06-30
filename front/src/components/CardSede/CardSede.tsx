import { ISede } from "@/interface/ISedes";
import React from "react";

import Link from "next/link";

const CardSede = ({ name, location, description, id }: ISede) => {
  console.log(id)
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-lg sm:text-xl md:text-2xl">
      <div className="w-full rounded-md shadow-lg hover:bg-main hover:text-white hover:shadow-xl transition duration-300 ease-in-out p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
        <h2 className="font-Marko font-bold text-2xl sm:text-3xl">{name}</h2>
        <p>Dirección: {location}</p>
        <p>Descripción: {description}</p>
        <Link href={`/Sedecard/${id}`}>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-terciario text-terciario-white font-bold rounded-md hover:scale-105 transition duration-300 ease-in-out sm:mt-6 sm:px-6 sm:py-3 md:mt-8 md:px-8 md:py-4">
            Ver canchas
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardSede;
