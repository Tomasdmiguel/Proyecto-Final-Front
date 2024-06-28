/* eslint-disable @next/next/no-img-element */
"use client";
import { useSport } from "@/context/SportContext";
import { ISede } from "@/interface/context";
import Link from "next/link";
import { useState } from "react";

export const ContainerSedes = ({ sedes }: { sedes: ISede[] }) => {
  const { sport, handleSport, closeSport } = useSport();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSede = sedes.filter((sede) =>
    sede.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`w-full min-w-[70vw] lg:min-w-[45vw] lg:w-[45vw] h-full ${
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
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-bold text-4xl">
            {sport == 1 && "Fútbol"}
            {sport == 2 && "Padel"}
            {sport == 3 && "Tenis"}
          </h1>
          <button
            className={`border-2 py-2 px-3 rounded-full border-terciario-white duration-300 ease-in-out ${
              sport == 1
                ? " hover:bg-terciario-white hover:text-main"
                : sport == 2
                ? "hover:bg-terciario-white hover:text-blue-400"
                : sport == 3
                ? "hover:bg-terciario-white hover:text-orange-500"
                : "hidden absolute"
            }`}
            onClick={closeSport}
          >
            X
          </button>
        </div>

        <input
          className={`m-4 w-3/4 p-3 rounded border-2 focus:ring  font-semibold hover:shadow-md  ${
            sport == 1
              ? "text-main outline-main"
              : sport == 2
              ? "text-blue-400 outline-blue-400"
              : sport == 3
              ? "text-orange-500 outline-orange-500"
              : "hidden absolute"
          }`}
          type="text"
          placeholder="Buscar .."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && sport == 1
          ? filteredSede.map(
              ({ id, name, location, description, imgUrl, canchas }) => {
                return (
                  <Link
                    href={`/sede/${id}`}
                    key={id}
                    className="border-4 max-w-[60vw] lg:max-w-[40vw] text-terciario-white border-terciario-white p-2 rounded flex flex-row items-center hover:cursor-pointer hover:bg-terciario-white hover:text-main ease-in-out duration-300"
                  >
                    <img
                      className="h-32 rounded-full"
                      src="/futbol.jpg"
                      alt=""
                    />
                    <div className="flex flex-col p-4 space-y-4 font-bold">
                      <h1 className="text-xl">{name} </h1>
                      <p>Ubicación: {location} </p>
                      <p>Descripción: {description} </p>
                    </div>
                  </Link>
                );
              }
            )
          : sport == 1 &&
            sedes &&
            sedes?.map(
              ({ id, name, location, description, imgUrl, canchas }) => {
                return (
                  <Link
                    href={`/sede/${id}`}
                    key={id}
                    className="border-4 max-w-[60vw] text-terciario-white border-terciario-white p-2 rounded flex flex-row items-center hover:cursor-pointer hover:bg-terciario-white hover:text-main ease-in-out duration-300"
                  >
                    <img
                      className="h-32 rounded-full"
                      src="/futbol.jpg"
                      alt=""
                    />
                    <div className="flex flex-col p-4 space-y-4 font-bold">
                      <h1 className="text-xl">{name} </h1>
                      <p>Ubicación: {location} </p>
                      <p>Descripción: {description} </p>
                    </div>
                  </Link>
                );
              }
            )}
      </div>
    </div>
  );
};
