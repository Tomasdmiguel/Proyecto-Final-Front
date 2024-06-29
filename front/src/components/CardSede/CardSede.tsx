import { ISede } from "@/interface/ISedes";
import React from "react";

const CardSede = ({ name, location, description, id }: ISede) => {
  return (
    <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 text-lg sm:text-xl md:text-2xl">
      <div className="w-full max-h-60 rounded-sm shadow-xl hover:shadow-terciario hover:bg-main hover:text-white ease-in-out duration-300 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8">
        <h2 className="font-Marko font-bold text-2xl sm:text-3xl">{name}</h2>
        <p>Dirección: {location}</p>
        <p>Descripción: {description}</p>
      </div>
    </div>
  );
};

export default CardSede;
