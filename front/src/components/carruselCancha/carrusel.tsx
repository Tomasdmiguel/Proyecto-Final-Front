/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { ICancha } from "@/interface/ISedes";
import Link from "next/link";

const CarruselC = ({ canchas }: { canchas: ICancha[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === canchas.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? canchas.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-4xl text-terciario font-bold mb-8 text-center">
        Canchas Disponibles
      </h1>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {canchas.map((cancha) => (
            <div key={cancha.id} className="flex-none w-full md:w-1/3 px-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <img
                  src={cancha.sede.imgUrl}
                  alt="imgCancha"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {cancha.name}
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">
                    {cancha.sport === 1
                      ? "Fútbol"
                      : cancha.sport === 2
                      ? "Padel"
                      : "Tenis"}
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    {cancha.sede.location}
                  </p>
                  <p className="text-xl font-semibold text-terciario mb-4">
                    Precio: ${cancha.price}
                  </p>
                  <Link href={`/sede/${cancha.sede.id}`}>
                    <button
                      type="button"
                      className="w-full bg-terciario text-white py-2 px-4 rounded-full hover:bg-opacity-80 transition duration-300"
                    >
                      Reservar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 bg-black bg-opacity-50 w-10 h-10 flex items-center justify-center rounded-full"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 bg-black bg-opacity-50 w-10 h-10 flex items-center justify-center rounded-full"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default CarruselC;
