import { ISede } from "@/interface/ISedes";
import React from "react";

const CardSede = ({ name, location, description, id }: ISede) => {
  return (
    <div className="flex flex-col gap-16 text-2xl">
      <div className="w-full max-h-60 rounded-sm shadow-xl hover:shadow-terciario hover:bg-main hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6">
        <h2 className="font-Marko font-bold text-3xl">{name}</h2>
        <p>Dirección: {location}</p>
        <p>Descripción: {description}</p>
      </div>
    </div>
  );
};

export default CardSede;
