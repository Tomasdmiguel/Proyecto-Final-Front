"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
// array para simular map de canchas
import { arrayClubes, arrayClubes2, arrayClubes3 } from "@/helpers/arrayClubes";

export const Home: React.FC = () => {
  const [sport, setSport] = useState<number>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFields = arrayClubes.filter((field) =>
    field.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredFields2 = arrayClubes2.filter((field) =>
    field.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredFields3 = arrayClubes3.filter((field) =>
    field.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSport = (n: number) => {
    setSport(n);
  };
  const closeSport = () => {
    setSport(0);
  };

  return (
    <div className="min-h-screen bg-main flex flex-col justify-center items-center">
      <div className="min-h-[90vh] min-w-[60vw] shadow-xl bg-emerald-500 rounded-lg p-4">
        <div className="flex flex-row w-full justify-around">
          <div
            className={`border-b-2 ease-in-out duration-100 p-2 hover:border-secundario ${
              sport == 1 ? "border-secundario" : "border-emerald-500 "
            }`}
          >
            <button onClick={() => handleSport(1)} className="sports-button">
              <img className="sports-img" src="/futbol.jpg" alt="futbol" />
              <h2 className="absolute text-main ">Fútbol</h2>
            </button>
          </div>
          <div
            className={`border-b-2 ease-in-out duration-100 p-2 hover:border-secundario ${
              sport == 2 ? "border-secundario" : "border-emerald-500 "
            }`}
          >
            <button onClick={() => handleSport(2)} className="sports-button">
              <img className="sports-img" src="/padel.png" alt="padel" />
              <h2 className="absolute self-center text-blue-400">Padel</h2>
            </button>
          </div>
          <div
            className={`border-b-2 ease-in-out duration-100 p-2 hover:border-secundario ${
              sport == 3 ? "border-secundario" : "border-emerald-500 "
            }`}
          >
            <button onClick={() => handleSport(3)} className="sports-button">
              <img className="sports-img" src="/tenis.jpg" alt="tenis" />
              <h2 className="absolute text-orange-500">Tenis</h2>
            </button>
          </div>
        </div>
        <div
          className={`p-4 mt-2 rounded-md bg-terciario-white flex flex-col justify-center items-center shadow-md ${
            sport == 1
              ? "text-main shadow-main"
              : sport == 2
              ? "text-blue-400 shadow-blue-400"
              : sport == 3
              ? "text-orange-500 shadow-orange-500"
              : "hidden absolute"
          }`}
        >
          <div className="flex flex-row justify-between w-full">
            <h1 className="font-bold text-4xl">
              {sport == 1 && "Fútbol"}
              {sport == 2 && "Padel"}
              {sport == 3 && "Tenis"}
            </h1>
            <button
              className={`border-2 py-2 px-3 rounded-full hover:text-terciario-white duration-300 ease-in-out ${
                sport == 1
                  ? "border-main hover:bg-main"
                  : sport == 2
                  ? "border-blue-400 hover:bg-blue-400"
                  : sport == 3
                  ? "border-orange-500 hover:bg-orange-500"
                  : "hidden absolute"
              }`}
              onClick={closeSport}
            >
              X
            </button>
          </div>

          <input
            className={`m-4 w-3/4 p-3 rounded border-2 focus:ring outline-0  font-semibold hover:shadow-md  ${
              sport == 1
                ? "ring-main border-main shadow-main"
                : sport == 2
                ? "ring-blue-400 border-blue-400 shadow-blue-400"
                : sport == 3
                ? "ring-orange-500 border-orange-500 shadow-orange-500"
                : "hidden absolute"
            }`}
            type="text"
            placeholder="Buscar cancha..."
            value={searchTerm}
            onChange={handleChange}
          />

          <div className="flex flex-col space-y-4 mt-4 w-full">
            {searchTerm && sport == 1
              ? filteredFields.map((field) => (
                  <div
                    key={field.id}
                    className="border-4 border-main p-2 rounded flex flex-row hover:cursor-pointer hover:bg-main hover:text-terciario-white ease-in-out duration-300"
                  >
                    <img
                      className="w-32 rounded-full"
                      src="/futbol.jpg"
                      alt=""
                    />
                    <div className="flex flex-col p-4 space-y-4 font-bold">
                      <h1 className="text-xl">{field.nombre} </h1>
                      <p>Ubicación: {field.ubicación} </p>
                      <p>Cantidad de canchas: {field.cantidadCanchas} </p>
                    </div>
                  </div>
                ))
              : sport == 1
              ? arrayClubes.map((cancha) => {
                  return (
                    <div
                      key={cancha.id}
                      className="border-4 border-main p-2 rounded flex flex-row hover:cursor-pointer hover:bg-main hover:text-terciario-white ease-in-out duration-300"
                    >
                      <img
                        className="w-32 rounded-full"
                        src="/futbol.jpg"
                        alt=""
                      />
                      <div className="flex flex-col p-4 space-y-4 font-bold">
                        <h1 className="text-xl">{cancha.nombre} </h1>
                        <p>Ubicación: {cancha.ubicación} </p>
                        <p>Cantidad de canchas: {cancha.cantidadCanchas} </p>
                      </div>
                    </div>
                  );
                })
              : searchTerm && sport == 2
              ? filteredFields2.map((field) => (
                  <div
                    key={field.id}
                    className="border-4 border-blue-500 p-2 rounded flex flex-row hover:cursor-pointer hover:bg-main hover:text-terciario-white ease-in-out duration-300"
                  >
                    <img
                      className="w-32 rounded-full"
                      src="/padel.png"
                      alt=""
                    />
                    <div className="flex flex-col p-4 space-y-4 font-bold">
                      <h1 className="text-xl">{field.nombre} </h1>
                      <p>Ubicación: {field.ubicación} </p>
                      <p>Cantidad de canchas: {field.cantidadCanchas} </p>
                    </div>
                  </div>
                ))
              : sport == 2
              ? arrayClubes2.map((cancha) => {
                  return (
                    <div
                      key={cancha.id}
                      className="border-4 border-blue-400 p-2 rounded flex flex-row hover:cursor-pointer hover:bg-blue-400 hover:text-terciario-white ease-in-out duration-300"
                    >
                      <img
                        className="w-32 rounded-full"
                        src="/padel.png"
                        alt=""
                      />
                      <div className="flex flex-col p-4 space-y-4 font-bold">
                        <h1 className="text-xl">{cancha.nombre} </h1>
                        <p>Ubicación: {cancha.ubicación} </p>
                        <p>Cantidad de canchas: {cancha.cantidadCanchas} </p>
                      </div>
                    </div>
                  );
                })
              : searchTerm && sport == 3
              ? filteredFields3.map((field) => (
                  <div
                    key={field.id}
                    className="border-4 border-orange-500 p-2 rounded flex flex-row hover:cursor-pointer hover:bg-orange-500 hover:text-terciario-white ease-in-out duration-300"
                  >
                    <img
                      className="w-32 rounded-full"
                      src="/tenis.jpg"
                      alt=""
                    />
                    <div className="flex flex-col p-4 space-y-4 font-bold">
                      <h1 className="text-xl">{field.nombre} </h1>
                      <p>Ubicación: {field.ubicación} </p>
                      <p>Cantidad de canchas: {field.cantidadCanchas} </p>
                    </div>
                  </div>
                ))
              : arrayClubes3.map((cancha) => {
                  return (
                    <div
                      key={cancha.id}
                      className="border-4 border-orange-500 p-2 rounded flex flex-row hover:cursor-pointer hover:bg-orange-500 hover:text-terciario-white ease-in-out duration-300"
                    >
                      <img
                        className="w-32 rounded-full"
                        src="/tenis.jpg"
                        alt=""
                      />
                      <div className="flex flex-col p-4 space-y-4 font-bold">
                        <h1 className="text-xl">{cancha.nombre} </h1>
                        <p>Ubicación: {cancha.ubicación} </p>
                        <p>Cantidad de canchas: {cancha.cantidadCanchas} </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
