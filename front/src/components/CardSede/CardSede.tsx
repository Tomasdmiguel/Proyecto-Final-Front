/* eslint-disable @next/next/no-img-element */
import { ISede } from "@/interface/ISedes";
import React from "react";

import Link from "next/link";
import { useSport } from "@/context/SportContext";

const CardSede = ({ name, location, description, id }: ISede) => {
  const { sport } = useSport();
  return (
    <div
      className={`
        ${
          sport == 2
            ? "hover:bg-blue-400 shadow-blue-400"
            : sport == 3
            ? "hover:bg-orange-500 shadow-orange-500"
            : "hover:bg-main shadow-main"
        }
        w-full min-h-fit font-Marko text-lg flex flex-col rounded-md shadow-lg hover:text-white hover:shadow-xl  transition duration-300 ease-in-out p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8`}
    >
      <h2 className=" font-bold text-2xl sm:text-3xl">{name}</h2>
      <p>Dirección: {location}</p>
      <p>Descripción: {description}</p>

      <Link
        href={`/sede/${id}`}
        className="px-4 py-2 w-fit self-end bg-terciario text-terciario-white font-bold rounded-md  transition duration-300 ease-in-out sm:mt-6 sm:px-6 sm:py-3 md:mt-8 md:px-8 md:py-4 hover:bg-terciario-white hover:text-terciario hover:shadow-sm hover:shadow-terciario"
      >
        Ver canchas
      </Link>
    </div>
  );
};

export default CardSede;
