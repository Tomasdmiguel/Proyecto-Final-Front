/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Link from "next/link";

interface ISede {
  imgUrl: string;
}

const sedes: ISede[] = [
  {
    imgUrl:
      "https://www.parqueygrama.com/wp-content/uploads/2017/05/mantenimiento-grama-futbol.png",
  },
  {
    imgUrl:
      "https://media.gq.com.mx/photos/660b0d51a1f2991fdd335050/16:9/w_2560%2Cc_limit/Pa%25CC%2581del_1080225792.jpg",
  },
  {
    imgUrl:
      "https://media.pauta.cl/2023/09/arreglo-raquetas-pelotas-tenis-scaled-e1693844559891-1024x566.jpg",
  },
  {
    imgUrl:
      "https://larrytennis.com/cdn/shop/collections/articulos-tenis-bogota-larry-tennis_0af3cbf2-6f8b-43d6-a973-f281dc9b4074_1200x1200.jpg?v=1542409890",
  },
];

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : sedes.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < sedes.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[600px] rounded-b-lg overflow-hidden shadow-lg">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={sedes[currentIndex]?.imgUrl}
          alt={`Carousel ${currentIndex}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center  rounded-lg">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bebas-neue mb-4">Sedes Disponibles</h2>
          <div className="flex justify-start">
            <Link
              className={`bg-gray-900 bg-opacity-80 hover:bg-opacity-100 duration-300 ease-in-out  text-terciario-white px-4 py-2 rounded-full flex items-center flex-row`}
              href={"/sedes"}
            >
              <span className="mr-2">Sedes </span>
              <svg
                className="stroke-terciario-white w-7 h-7 fill-none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M15 16l4 -4" />
                <path d="M15 8l4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-4 transition-opacity opacity-100 sm:opacity-0 hover:opacity-100"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-4 transition-opacity sm:opacity-0 hover:opacity-100"
      >
        &#8250;
      </button>
    </div>
  );
};

export default function Page() {
  return <Carousel />;
}
