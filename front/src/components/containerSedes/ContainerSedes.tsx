/* eslint-disable @next/next/no-img-element */
"use client";
import { useSport } from "@/context/SportContext";
import { ICancha, ISede } from "@/interface/ISedes";
import SedesFutbol from "../SedesFutbol/SedesFutbol";
import SedesPadel from "../SedesPadel/SedesPadel";
import SedesTenis from "../SedesTenis/SedesTenis";

export const ContainerSedes = ({ sedes }: { sedes: ISede[] }) => {
  const { sport, handleSport } = useSport();

  const filteredSedesFutbol = sedes.filter((sede) =>
    sede?.canchas?.some((cancha: ICancha) => cancha.sport === 1)
  );
  const filteredSedesPadel = sedes.filter((sede) =>
    sede?.canchas?.some((cancha: ICancha) => cancha.sport === 2)
  );
  const filteredSedesTenis = sedes.filter((sede) =>
    sede?.canchas?.some((cancha: ICancha) => cancha.sport === 3)
  );

  return (
    <div
      className={`w-full md:w-[90vw] h-full font-bold shadow-xl rounded-lg flex flex-col items-center`}
    >
      <div className="flex flex-row w-full h-[7.5vh] justify-around">
        <button
          onClick={() => handleSport(1)}
          className={`h-full w-full  rounded-t-lg ${
            sport == 1 ? "bg-green-200 " : "bg-terciario-white"
          }`}
        >
          <h2 className="text-main uppercase ">Fútbol</h2>
        </button>

        <button
          onClick={() => handleSport(2)}
          className={`h-full w-full rounded-t-lg ${
            sport == 2 ? "bg-blue-200" : "bg-terciario-white"
          }`}
        >
          <h2 className="uppercase text-blue-400">Padel</h2>
        </button>

        <button
          onClick={() => handleSport(3)}
          className={`h-full w-full rounded-t-lg ${
            sport == 3 ? "bg-orange-200" : "bg-terciario-white"
          }`}
        >
          <h2 className="uppercase text-orange-500">Tenis</h2>
        </button>
      </div>
      <div
        className={`rounded-md flex flex-col justify-center items-center shadow-md space-y-4 text-terciario-white w-full ${
          (sport == 1 && "bg-green-200") || sport == 2 || sport == 3
            ? "flex"
            : "hidden absolute"
        }`}
      >
        {sport == 1 ? (
          <SedesFutbol sedes={filteredSedesFutbol} />
        ) : sport == 2 ? (
          <SedesPadel sedes={filteredSedesPadel} />
        ) : sport == 3 ? (
          <SedesTenis sedes={filteredSedesTenis} />
        ) : null}
      </div>
    </div>
  );
};
