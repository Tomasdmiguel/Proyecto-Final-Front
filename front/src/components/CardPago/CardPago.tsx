'use client'
import React, { useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";


const Product = () => {
  const [preferenceId, setPreferenceid] = useState("");
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY as string, {
    locale: "es-AR",
  });
  const apiKey = process.env.NEXT_PUBLIC_API_URL;

  const createPreferenceDto = {
    title: "hamburger",
    quantity: 1,
    price: 1000,
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
          src="https://d31npzejelj8v1.cloudfront.net/media/recipemanager/recipe/1687289598_doble-carne.jpg"
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