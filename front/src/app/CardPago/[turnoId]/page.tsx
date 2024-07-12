/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { ICancha, ITurno } from "@/interface/ISedes";
import { FetchTurnoById } from "@/service/ApiGetTurnoById";
import { useSport } from "@/context/SportContext";

const Product = ({ params }: { params: { turnoId: string } }) => {
  const [turno, setTurno] = useState<ITurno | undefined>();
  const { sport } = useSport();

  useEffect(() => {
    const fetchTurnBy = async (turnoId: string) => {
      console.log("en el getid pasando el turno id");
      console.log(turnoId);
      try {
        const turno: ITurno = await FetchTurnoById(turnoId);
        setTurno(turno);
      } catch (error) {
        console.error("Error fetching turno:", error);
      }
    };

    if (params.turnoId) {
      fetchTurnBy(params.turnoId);
    }
  }, [params.turnoId]);

  const cancha = turno?.cancha;
  console.log("cancha:", cancha);

  const [preferenceId, setPreferenceId] = useState("");
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY as string, {
    locale: "es-AR",
  });

  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const createPreference = async () => {
    const createPreferenceDto = {
      title: cancha?.name,
      quantity: 2,
      price: cancha?.price,
    };

    const turnoId = {
      id: turno?.id,
    };

    try {
      const response = await axios.post(
        `${apiKey}/mercado-pago/create_preference`,
        {
          preference: createPreferenceDto,
          turno: turnoId,
        }
      );
      const { preferenceId } = response.data;
      return preferenceId;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const url = await createPreference();
    if (url) setPreferenceId(url);
  };

  return (
    <article
      className={` ${
        sport == 2 ? "bg-blue-400" : sport == 3 ? "bg-orange-500" : "bg-main"
      }
    relative p-8  min-h-[70vh] justify-center flex flex-col gap-20 items-center`}
    >
      <div className="flex flex-col  text-terciario min-h-[40vh] p-4 space-y-4 bg-terciario-white min-w-[50vw] max-w-[70vw] lg:min-w-[40vw]  rounded-lg">
        <img src={cancha?.imgUrl} alt={cancha?.name} />

        <h3 className="text-4xl capitalize font-bold">{cancha?.name}</h3>
        {cancha?.sport == 1 ? (
          <p className="text-2xl font-semibold text-main">Fútbol</p>
        ) : cancha?.sport == 2 ? (
          <p className="text-2xl font-semibold text-blue-400">Padel</p>
        ) : (
          <p className="text-2xl font-semibold text-orange-500">Tenis</p>
        )}
        <p className="text-2xl font-semibold">
          Precio:{" "}
          <span
            className={
              sport == 2
                ? "text-blue-400"
                : sport == 3
                ? "text-orange-500"
                : "text-main"
            }
          >
            ${cancha?.price}
          </span>
        </p>
        <p className="capitalize text-2xl font-semibold">
          Tipo:{" "}
          <span
            className={`font-medium text-xl ${
              sport == 2
                ? "text-blue-400"
                : sport == 3
                ? "text-orange-500"
                : "text-main"
            }`}
          >
            {cancha?.type}
          </span>
        </p>
        <p className="capitalize text-2xl font-semibold">
          Techada:{" "}
          <span
            className={`font-medium text-xl ${
              sport == 2
                ? "text-blue-400"
                : sport == 3
                ? "text-orange-500"
                : "text-main"
            }`}
          >
            {cancha?.techado ? "Sí" : "No"}
          </span>
        </p>

        {preferenceId !== "" ? (
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={{
              texts: { valueProp: "practicality" },
            }}
          />
        ) : (
          <button
            className="py-2 w-full bg-cyan-500 text-black ease-in-out duration-300 hover:text-white rounded-xl"
            onClick={handleBuy}
          >
            Reservar
          </button>
        )}
      </div>
    </article>
  );
};

export default Product;
