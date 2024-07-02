'use client'
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import calendarIcon from "../../../public/calendar_747310.png"
import relojIcon from "../../../public/three-o-clock-clock_13435.png"
import dineroIcon from "../../../public/financial-advice_14677194.png"
import deporteIcon from "../../../public/sports_4163679.png"
import axios from "axios";
import SedeById from "@/app/sede/[sedeId]/page";

// export default function CardPago () {

//     const handleComprar = () => {
//         Swal.fire({
//             icon: "success",
//             title: "Se realizo el pago correctamente",
//           });
//     }

//     return (
//     <div className="bg-[url(https://donpotrero.com/img/posts/2/medidas_lg.jpg)] flex flex-col justify-center items-center w-full p-4 h-screen">
//       <div className="bg-[#F5F7F8] p-8 rounded-sm shadow-xl w-[32vw] text-terciario text-xl items-center">
//           <p className="mb-6 font-semibold text-main text-3xl">Aqui se realizara el pago de tu cancha</p>

//           <div className="flex flex-row gap-8 my-12 items-center text-center">

//           <div className="border border-secundario rounded-2xl p-2 w-[10vw] text-center text-main font-semibold">
//           UNA HORA
//           </div>
//           <div>
//           <p>Duracion del turno, no hay desponible otra duracion</p>
//           </div>

//           </div>

//           <div className="flex flex-row gap-12 justify-center items-center my-8">

//           <div className="border border-terciario p-4 rounded-full text-center text-base text-main font-semibold">
//             <img src={deporteIcon.src} alt="" 
//             className="w-12"
//             /> Futbol
//           </div>

//           <div className="border border-terciario p-4 rounded-full text-center text-base text-main font-semibold">
//             <img src={calendarIcon.src} alt="calendario" 
//             className="w-12"
//             />15/02
//           </div>

//           <div className="border border-terciario p-4 rounded-full text-center text-base text-main font-semibold">
//           <img src={relojIcon.src} alt="" 
//           className="w-12"
//           /> 12:00
//           </div>

//           <div className="border border-terciario p-4 rounded-full text-center text-base text-main font-semibold">
//           <img src={dineroIcon.src} alt="" 
//           className="w-12"
//           />$2000
//           </div>

//           </div>

//         <div className="space-y-10 space-x-6">
//           <h1 className="text-2xl font-Marko text-black">
//           Pago para agendar cancha "Nombre de la cancha", aqui puedes revisar los detalles de la cancha que vas a alquilar, como lo son el nombre, direccion de la cancha, precio, Etc. Revisa que todo este correcto para confirmar el pago
//           </h1>
          
//           <p className="mt-10 text-xl items-center hover:font-black duration-300 ease-in-out">
//             <Link href={"/Terminos"}>
//             Terminos de seguridad para el pago <span></span>
//             </Link>
//           </p>

//         </div>
//           <button
//           className="text-black md:text-lg p-3 rounded-lg border border-x-2 border-y-2 border-secundario hover:shadow-md hover:bg-secundario duration-200 ease-in-out mt-8 w-[8vw]"
//           onClick={handleComprar}
//         >
//           Realizar pago!
//         </button>
//         </div>
//         </div>

        


//     )
// }

const Product = () => {

  const productData = {
    title: "hamburger",
    quantity: 1,
    price: 1000,
  };

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/mercado-pago/create_preference",
        productData
      );
      const { redirectUrl } = response.data;
      return redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const url = await createPreference();
    if (url) window.location.href = url;
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
        <h3 className="text-3xl font-bold">{productData.title}</h3>
        <p className="text-xl font-semibold mb-2">${productData.price}</p>
        <button
          className="py-2 w-full bg-emerald-600 rounded-xl"
          onClick={handleBuy}
        >
          Comprar
        </button>
      </div>
    </article>
  );
};

export default Product;