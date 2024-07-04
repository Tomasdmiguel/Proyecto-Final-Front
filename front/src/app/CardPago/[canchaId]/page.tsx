'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { ICancha } from "@/interface/ISedes";
import { FetchCanchaById } from "@/service/ApiGetCanchaById";


const Product = ({ params }: { params: { canchaId: string } }) => {

    const [cancha, setCancha] = useState<ICancha>();

  useEffect(() => {
    const fetchCanchaById = async () => {
      const canchaId = params.canchaId;
      const cancha: ICancha = await FetchCanchaById(canchaId);
      setCancha(cancha);
    };
    fetchCanchaById();
  });
    

  const [preferenceId, setPreferenceid] = useState("");
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY as string, {
    locale: "es-AR",
  });
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const createPreferenceDto = {
    title: cancha?.name,
    sport: cancha?.sport,
    price: cancha?.price,
  };

  const createPreference = async () => {
    try {
      const response = await axios.post(
        `${apiKey}/mercado-pago/create_preference`,
        createPreferenceDto
      );
      const { preferenceId } = response.data;
      return preferenceId;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const url = await createPreference();
    if (url) 
      setPreferenceid(url)
  };

  return (
    <article className="p-8 bg-slate-800 rounded-xl text-white border border-slate-600">
      <div className="w-56 rounded-xl overflow-hidden">
        <img
          src={cancha?.imgUrl}
          alt="Hamburguesa deliciosa"
        />
      </div>
      <div className="space-y-2 mt-2">
        <h3 className="text-3xl font-bold">{createPreferenceDto.title}</h3>
        <p className="text-xl font-semibold mb-2">${createPreferenceDto.price}</p>
        {preferenceId !== "" ? (
              <Wallet
              initialization={{ preferenceId: preferenceId }}
              customization={{
                texts: { valueProp: "practicality" },
              }}
              />
        ): 
        
        <button
          className="py-2 w-full bg-emerald-600 rounded-xl"
          onClick={handleBuy}
        >
          Comprar
        </button>
        }
       
      </div>
    </article>
  );
};

export default Product;