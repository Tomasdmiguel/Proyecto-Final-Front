"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { ICancha, ITurno } from "@/interface/ISedes";
import { FetchTurnoById } from "@/service/ApiGetTurnoById";

const Product = ({ params }: { params: { turnoId: string } }) => {
  const [turno, setTurno] = useState<ITurno | undefined>();

  useEffect(() => {
    const fetchTurnById = async (turnoId: string) => {
      try {
        const turno: ITurno = await FetchTurnoById(turnoId);
        setTurno(turno);
      } catch (error) {
        console.error("Error fetching turno:", error);
      }
    };

    if (params.turnoId) {
      fetchTurnById(params.turnoId);
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
    <article className=" relative p-8 bg-main bg-no-repeat bg-cover justify-center flex flex-col gap-20 items-center">
      <div className="flex flex-col gap-20 justify-center items-center h-[40vw] bg-white w-[38vw] rounded-lg shadow-xl">
      <div className="w-[25vw] rounded-xl overflow-hidden">
        <img src={cancha?.imgUrl} alt={cancha?.name} />
      </div>
      <div className="space-y-2 mt-2 w-[25vw]">
        <div className="space-y-6 space-x-2">
        <h3 className="text-4xl font-bold text-black ">{cancha?.name}</h3>
        <p className="text-2xl font-semibold mb-2 text-secundario">${cancha?.price}</p>
        <p className="text-2xl font-semibold mb-2 text-black"></p>
        </div>
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
      </div>
    </article>
  );
};

export default Product;
