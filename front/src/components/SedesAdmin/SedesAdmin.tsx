"use client";
import { useSport } from "@/context/SportContext";
import { useUser } from "@/context/UserContext";
import { ISede } from "@/interface/ISedes";
import { IUserSession } from "@/interface/context";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SedesAdmin = ({ sedes }: { sedes: ISede[] }) => {
  const { sport } = useSport();
  const { userData } = useUser();

  const filteredSedes = sedes?.filter(
    (sede: ISede) => sede?.user?.id === userData?.userDb.id
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-4 space-x-10 w-[60%] text-black">
      <h1 className="text-3xl font-bold text-black">Mis sedes</h1>
      <p className="text-lg text-gray-400">
        Esta es la sección de tus sedes creadas.
      </p>
      <div className="flex flex-col gap-16 text-2xl">
        {filteredSedes.map((sede) => (
          <div
            key={sede.name}
            className={`w-full max-h-60 rounded-sm shadow-xl  ${
              sport == 2
                ? "hover:bg-blue-400"
                : sport == 3
                ? "hover:bg-orange-500"
                : "hover:bg-main"
            } hover:text-white ease-in-out duration-300 p-4 space-x-4 space-y-6`}
          >
            <h2 className="font-Marko font-bold text-3xl">{sede?.name}</h2>
            <p>Dirección: {sede?.location}</p>
            <p>Descripción: {sede?.description}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row items-end justify-end space-x-6 px-12">
        <Link
          href={"/Formsede"}
          className={` ${
            sport == 2
              ? "hover:bg-blue-400 border-blue-400 text-blue-400"
              : sport == 3
              ? "hover:bg-orange-500 border-orange-500 text-orange-500"
              : "hover:bg-main border-main text-main"
          }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
        >
          Crear sede
        </Link>
        <Link
          className={` ${
            sport == 2
              ? "hover:bg-blue-400 border-blue-400 text-blue-400"
              : sport == 3
              ? "hover:bg-orange-500 border-orange-500 text-orange-500"
              : "hover:bg-main border-main text-main"
          }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
          href={`/FormCancha/${userData?.userDb?.id}`}
        >
          Crear Cancha
        </Link>
      </div>
    </div>
  );
};
export default SedesAdmin;
