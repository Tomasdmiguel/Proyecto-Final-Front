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
    <article className="p-8 bg-slate-800 rounded-xl text-white border border-slate-600">
      <div className="w-56 rounded-xl overflow-hidden">
        <img src={cancha?.imgUrl} alt={cancha?.name} />
      </div>
      <div className="space-y-2 mt-2">
        <h3 className="text-3xl font-bold">{cancha?.name}</h3>
        <p className="text-xl font-semibold mb-2">${cancha?.price}</p>
        {preferenceId !== "" ? (
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={{
              texts: { valueProp: "practicality" },
            }}
          />
        ) : (
          <button
            className="py-2 w-full bg-emerald-600 rounded-xl"
            onClick={handleBuy}
          >
            Comprar
          </button>
        )}
      </div>
    </article>
  );
};

export default Product;