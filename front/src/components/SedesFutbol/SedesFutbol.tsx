/* eslint-disable @next/next/no-img-element */
import { useSport } from "@/context/SportContext";
import { ISede } from "@/interface/ISedes";
import Link from "next/link";
import { useState } from "react";

export const SedesFutbol = ({ sedes }: { sedes: ISede[] }) => {
  const { sport, closeSport } = useSport();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSede = sedes.filter((sede) =>
    sede.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`p-4 mt-2 rounded-md flex flex-col justify-center items-center shadow-md space-y-4 text-terciario-white w-full ${
        sport == 1 || sport == 2 || sport == 3 ? "flex" : "hidden absolute"
      }`}
    >
      <div className="flex flex-row justify-between w-full">
        <h1 className="font-bold text-4xl">Fútbol</h1>
        <button
          className="border-2 py-2 px-3 rounded-full border-terciario-white duration-300 ease-in-out 
             hover:bg-terciario-white hover:text-main
          "
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
      {searchTerm
        ? filteredSede?.map(
            ({ id, name, location, description, canchas ,imgUrl}) => {
              return (
                <Link
                  href={`/sede/${id}`}
                  key={id}
                  className="border-4 w-full text-terciario-white border-terciario-white p-2 rounded flex flex-row items-center hover:cursor-pointer hover:bg-terciario-white hover:text-main ease-in-out duration-300"
                >
                  <img className="size-40 rounded-full" src={imgUrl} alt="" />
                  <div className="flex flex-col p-4 space-y-4 font-bold">
                    <h1 className="text-xl">{name} </h1>
                    <p>Ubicación: {location} </p>
                    <p>Descripción: {description} </p>
                  </div>
                </Link>
              );
            }
          )
        : sedes &&
          sedes?.map(({ id, name, location, description, imgUrl, canchas }) => {
            return (
              <Link
                href={`/sede/${id}`}
                key={id}
                className="border-4 w-full text-terciario-white border-terciario-white p-2 rounded flex flex-row items-center hover:cursor-pointer hover:bg-terciario-white hover:text-main ease-in-out duration-300"
              >
                <img className="size-40 rounded-full" src={imgUrl} alt="" />
                <div className="flex flex-col p-4 space-y-4 font-bold">
                  <h1 className="text-xl">{name} </h1>
                  <p>Ubicación: {location} </p>
                  <p>Descripción: {description} </p>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default SedesFutbol;
