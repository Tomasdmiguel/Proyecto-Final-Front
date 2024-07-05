/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { ICancha } from "@/interface/ISedes";
import Link from "next/link";
import { useSport } from "@/context/SportContext";

const CarruselC = ({ canchas }: { canchas: ICancha[] }) => {
  const { sport } = useSport();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize(); // Set initial viewport width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === canchas.length - 3 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? canchas.length - 3 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cardWidth = viewportWidth >= 768 ? "md:w-1/3" : "w-full";

  return (
    <div className="p-4 max-w-[100vw] bg-gray-100">
      <h1 className="text-4xl text-terciario font-bold mb-8 text-center">
        Canchas Disponibles
      </h1>
      <div className="relative overflow-x-hidden">
        <div
          className="flex items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {canchas.map((cancha) => (
            <div
              key={cancha.id}
              className="flex-none w-full h-fit md:w-1/3 px-2 my-2"
            >
              <div
                className={`${
                  sport == 2
                    ? "hover:shadow-md hover:shadow-blue-400"
                    : sport == 3
                    ? "hover:shadow-md hover:shadow-orange-500"
                    : "hover:shadow-md hover:shadow-main"
                } bg-white h-[50vh] rounded-lg shadow-lg overflow-hidden  transition duration-300 flex flex-col items-center `}
              >
                <img
                  src={cancha?.sede?.imgUrl}
                  alt="imgCancha"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 h-full w-full flex flex-col justify-end  space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                    {cancha?.name}
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">
                    {cancha.sport === 1
                      ? "Fútbol"
                      : cancha.sport === 2
                      ? "Padel"
                      : "Tenis"}
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    {cancha?.sede?.location}
                  </p>
                  <p className="text-xl font-semibold text-terciario mb-4">
                    Precio: ${cancha?.price}
                  </p>
                  <Link
                    href={`/sede/${cancha?.sede?.id}`}
                    className={`w-3/4 self-center flex justify-center border-2 border-white ${
                      sport == 2
                        ? "bg-blue-400 hover:bg-terciario-white  hover:border-blue-400 hover:text-blue-400"
                        : sport == 3
                        ? "bg-orange-500 hover:bg-terciario-white  hover:border-orange-500 hover:text-orange-500"
                        : "bg-main hover:bg-terciario-white  hover:border-main hover:text-main"
                    } text-white py-2 px-4 rounded-full transition duration-300`}
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2  text-white text-4xl z-10 ${
            sport == 2
              ? "bg-blue-400"
              : sport == 3
              ? "bg-orange-500"
              : "bg-main"
          } w-10 h-10 flex items-center justify-center rounded-full`}
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10  w-10 h-10 flex items-center justify-center rounded-full ${
            sport == 2
              ? "bg-blue-400"
              : sport == 3
              ? "bg-orange-500"
              : "bg-main"
          }`}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default CarruselC;
