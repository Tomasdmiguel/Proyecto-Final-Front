/* eslint-disable @next/next/no-img-element */
"use client";

import {
  arrayCanchas,
  arrayCanchas2,
  arrayCanchas3,
  arrayClubes,
  arrayClubes2,
  arrayClubes3,
} from "@/helpers/arrayClubes";
import { ISede } from "@/interface/context";
import { getSedes } from "@/service/ApiSedes";
import { useEffect, useState } from "react";

const DetailSede = ({ params }: { params: { sedeId: string } }) => {
  const [Sede, setSede] = useState<ISede>();
  const [sport, setSport] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      const sedes: ISede[] = await getSedes();
      const sede = await sedes.find((s) => s.id.toString() === params.sedeId);
      if (!sede) {
        //   const sede2 = await arrayClubes2.find(
        //     (s) => s.id.toString() === params.sedeId
        //   );
        //   console.log(sede2);

        //   if (!sede2) {
        //     const sede3 = await arrayClubes3.find(
        //       (s) => s.id.toString() === params.sedeId
        //     );
        //     if (!sede3) {
        throw new Error("Sede no encontrada");
        //     } else {
        //       setSede(sede3);
        //       setSport(3);
        //     }
        //   } else {
        //     setSede(sede2);
        //     setSport(2);
        //   }
      } else {
        setSede(sede);
        setSport(1);
      }
    };
    fetchData();
  }, [params.sedeId]);
  return (
    <div
      className={`${
        sport == 1
          ? "bg-main"
          : sport == 2
          ? "bg-blue-400"
          : sport == 3
          ? "bg-orange-500"
          : "hidden absolute"
      } min-h-screen text-terciario-white font-medium flex justify-center p-8`}
    >
      <div className="min-h-[90vh] border-2 border-terciario-white bg-terciario-white min-w-[80vw] lg:min-w-[50vw] rounded-lg flex items-center justify-start flex-col pb-4">
        <div
          className={`p-2 rounded flex flex-row ease-in-out duration-300 w-full ${
            sport == 1
              ? "bg-main"
              : sport == 2
              ? "bg-blue-400"
              : sport == 3
              ? "bg-orange-500"
              : "hidden absolute"
          }`}
        >
          <img
            className="w-32 rounded-full"
            src={`${
              sport == 1
                ? "/futbol.jpg"
                : sport == 2
                ? "/padel.png"
                : sport == 3
                ? "/tenis.jpg"
                : ""
            }`}
            alt=""
          />
          <div className="flex flex-col p-4 space-y-4 font-bold">
            <h1 className="text-xl">{Sede?.name} </h1>
            <p>Ubicación: {Sede?.location} </p>
            <p>Descripción: {Sede?.description} </p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 p-4 w-full">
          {sport == 1
            ? Sede?.canchas?.map(
                ({ id, price, sport, type, player, time, techado, imgUrl }) => {
                  return (
                    <div
                      key={id}
                      className="border-4 border-main p-2 rounded flex flex-row items-center text-main hover:cursor-pointer hover:bg-main hover:text-terciario-white ease-in-out duration-300 w-full"
                    >
                      <img
                        className="h-32 rounded-full"
                        src="/futbol.jpg"
                        alt=""
                      />
                      <div className="flex flex-col p-4 space-y-4 font-bold">
                        <h1 className="text-2xl">Jugadores(total): {player}</h1>
                        <p className="text-xl">${price} </p>
                        <p>Tipo: {type} </p>
                        <p>Turno: {time}</p>
                      </div>
                    </div>
                  );
                }
              )
            : sport == 2
            ? arrayCanchas2.map(({ id, jugadores, tipo, nombre }) => {
                return (
                  <div
                    key={id}
                    className="border-4 border-blue-400 p-2 rounded flex flex-row text-blue-400 hover:cursor-pointer hover:bg-blue-400 hover:text-terciario-white ease-in-out duration-300 w-full"
                  >
                    <img
                      className="w-32 rounded-full"
                      src="/padel.png"
                      alt=""
                    />
                    <div className="flex flex-col p-4 space-y-4 font-bold">
                      <h1 className="text-xl">{nombre} </h1>
                      <p>Jugadores(total): {jugadores} </p>
                      <p>Tipo: {tipo} </p>
                    </div>
                  </div>
                );
              })
            : sport == 3
            ? arrayCanchas3.map(({ id, jugadores, tipo, nombre }) => {
                return (
                  <div
                    key={id}
                    className="border-4 border-orange-500 p-2 rounded flex flex-row text-orange-500 hover:cursor-pointer hover:bg-orange-500 hover:text-terciario-white ease-in-out duration-300 w-full"
                  >
                    <img
                      className="w-32 rounded-full"
                      src="/tenis.jpg"
                      alt=""
                    />
                    <div className="flex flex-col p-4 space-y-4 font-bold">
                      <h1 className="text-xl">{nombre} </h1>
                      <p>Jugadores(total): {jugadores} </p>
                      <p>Tipo: {tipo} </p>
                    </div>
                  </div>
                );
              })
            : "absolute hidden"}
        </div>
      </div>
    </div>
  );
};

export default DetailSede;
