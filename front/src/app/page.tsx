"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
// array para simular map de canchas
import { arrayClubes, arrayClubes2, arrayClubes3 } from "@/helpers/arrayClubes";
export default function Home() {
  const [sport, setSport] = useState<number>();

  const handleSport = (n: number) => {
    setSport(n);
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
          className={`p-4 mt-2 rounded-md bg-slate-500 flex flex-col shadow-md ${
            sport == 1
              ? "text-emerald-500 shadow-main"
              : sport == 2
              ? "text-blue-400 shadow-blue-400"
              : sport == 3
              ? "text-orange-500 shadow-orange-500"
              : "hidden absolute"
          }`}
        >
          <h1 className="font-bold text-3xl">
            {sport == 1 && "Fútbol"}
            {sport == 2 && "Padel"}
            {sport == 3 && "Tenis"}
          </h1>

          <div className="flex flex-col space-y-4 mt-4">
            {sport == 1
              ? arrayClubes.map((cancha) => {
                  return (
                    <div
                      key={cancha.id}
                      className="border-2 border-emerald-500 p-2 rounded flex flex-row"
                    >
                      <img
                        className="w-32 rounded-full"
                        src="/futbol.jpg"
                        alt=""
                      />
                      <div className="flex flex-col p-4">
                        <h1>{cancha.nombre} </h1>
                        <p>Ubicación: {cancha.ubicación} </p>
                        <p>Cantidad de canchas: {cancha.cantidadCanchas} </p>
                      </div>
                    </div>
                  );
                })
              : sport == 2
              ? arrayClubes2.map((cancha) => {
                  return (
                    <div
                      key={cancha.id}
                      className="border-2 border-blue-400 p-2 rounded flex flex-row"
                    >
                      <img
                        className="w-32 rounded-full"
                        src="/padel.png"
                        alt=""
                      />
                      <div className="flex flex-col p-4">
                        <h1>{cancha.nombre} </h1>
                        <p>Ubicación: {cancha.ubicación} </p>
                        <p>Cantidad de canchas: {cancha.cantidadCanchas} </p>
                      </div>
                    </div>
                  );
                })
              : arrayClubes3.map((cancha) => {
                  return (
                    <div
                      key={cancha.id}
                      className="border-2 border-orange-500 p-2 rounded flex flex-row"
                    >
                      <img
                        className="w-32 rounded-full"
                        src="/tenis.jpg"
                        alt=""
                      />
                      <div className="flex flex-col p-4">
                        <h1>{cancha.nombre} </h1>
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
}
