/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { ISede } from "@/interface/ISedes";
import Link from "next/link";

export const Carousel = ({ sedes }: { sedes: ISede[] }) => {
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
    <div className="relative w-full h-120 md:h-96 lg:h-104 aspect-w-16 aspect-h-9  rounded-lg">
      <div className="absolute inset-0 overflow-hidden  rounded-lg">
        <img
          src={sedes[currentIndex]?.imgUrl}
          alt={`Carousel ${currentIndex}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center  rounded-lg">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Sedes Disponibles</h2>
          <Link href={"/sedes"}>
            <button className="bg-white text-black px-4 py-2 rounded-full flex items-center">
              <span className="mr-2">Ver sedes</span>
            </button>
          </Link>
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
