"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { ICancha, ITurno } from "@/interface/ISedes";
import { FetchTurnoById } from "@/service/ApiGetTurnoById";



const Product = ({ params }: { params: { turnoId: string } }) => {
  const [turno, setTurno] = useState<ITurno | undefined>();

  useEffect(() => {
    const fetchTurnBy = async (turnoId: string) => {
      console.log('en el getid pasando el turno id');
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
    <article className="p-8 bg-main text-white flex flex-row gap-24 justify-center items-center h-[45vw]">
      <div className="w-[25vw] rounded-xl overflow-hidden">
        <img src={cancha?.imgUrl} alt={cancha?.name} />
      </div>
      <div className="space-y-2 mt-2">
        <div className="space-y-6 space-x-2">
        <h3 className="text-4xl font-bold text-white ">{cancha?.name}</h3>
        <p className="text-2xl font-semibold mb-2 text-secundario">{cancha?.price}</p>
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
            className="py-2 w-full bg-white text-black hover:bg-cyan-500 ease-in-out duration-300 hover:text-white rounded-xl"
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
