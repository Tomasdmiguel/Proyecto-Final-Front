/* eslint-disable @next/next/no-img-element */
"use client";
import { ISede } from "@/interface/ISedes";
// interfaz de producto
// contexto global de menu hamburguesa
// hook de estado
import { useState } from "react";

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
    <div className="relative flex items-center justify-center w-full bg-white py-8">
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 text-6xl text-secondary p-2 rounded-full ml-4"
      >
        &#8249;
      </button>
      <div className="w-full flex justify-center">
        {sedes.map(({ imgUrl }, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            {index === currentIndex && (
              <img
                src={imgUrl}
                alt={`Carousel ${index}`}
                className="w-full max-h-56 md:h-96 md:max-h-screen "
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 z-10 text-6xl text-secondary p-2 rounded-full mr-4"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
