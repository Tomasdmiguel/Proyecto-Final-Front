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
      className={`w-full min-w-[70vw] lg:min-w-[45vw] lg:w-[45vw] h-full font-Marko ${
        sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
      } p-6  shadow-xl rounded-lg space-y-4 flex flex-col items-center`}
    >
      <div className="flex flex-row w-full justify-around">
        <div
          className={`border-b-2 ease-in-out duration-100 p-2 hover:border-secundario ${
            sport == 1
              ? "border-secundario"
              : sport == 2
              ? "border-blue-400"
              : sport == 3
              ? "border-orange-500"
              : "border-main "
          }`}
        >
          <button onClick={() => handleSport(1)} className="sports-button">
            <img className="sports-img" src="/futbol.jpg" alt="futbol" />
            <h2 className="absolute text-main ">Fútbol</h2>
          </button>
        </div>
        <div
          className={`border-b-2 ease-in-out duration-100 p-2 hover:border-secundario ${
            sport == 1
              ? "border-main"
              : sport == 2
              ? " border-secundario"
              : sport == 3
              ? "border-orange-500"
              : "border-main "
          }`}
        >
          <button onClick={() => handleSport(2)} className="sports-button">
            <img className="sports-img" src="/padel.png" alt="padel" />
            <h2 className="absolute self-center text-blue-400">Padel</h2>
          </button>
        </div>
        <div
          className={`border-b-2 ease-in-out duration-100 p-2 hover:border-secundario ${
            sport == 1
              ? "border-main"
              : sport == 2
              ? " border-blue-400"
              : sport == 3
              ? " border-secundario"
              : "border-main "
          }`}
        >
          <button onClick={() => handleSport(3)} className="sports-button">
            <img className="sports-img" src="/tenis.jpg" alt="tenis" />
            <h2 className="absolute text-orange-500">Tenis</h2>
          </button>
        </div>
      </div>
      <div
        className={`p-4 mt-2 rounded-md flex flex-col justify-center items-center shadow-md space-y-4 text-terciario-white w-full ${
          sport == 1 || sport == 2 || sport == 3 ? "flex" : "hidden absolute"
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
