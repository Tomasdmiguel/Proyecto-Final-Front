"use client";
import React, { useState, useRef } from "react";
import { ICancha } from "@/interface/ISedes";
import Link from "next/link";

const CarruselC = ({ canchas }: { canchas: ICancha[] }) => {
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(canchas.length / itemsPerPage);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
      containerRef.current?.scrollBy({
        left: containerRef.current?.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
      containerRef.current?.scrollBy({
        left: -containerRef.current?.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-terciario font-bold mb-4 text-center">
        Canchas Disponibles
      </h1>
      <div className="relative">
        <button
          onClick={handlePrev}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full ${
            page === 0 ? "hidden" : ""
          }`}>
          &#9664;
        </button>
        <div
          ref={containerRef}
          className="overflow-hidden flex space-x-4"
          style={{ scrollSnapType: "x mandatory" }}>
          {canchas
            .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
            .map((cancha) => (
              <div key={cancha.id} className="flex-none w-80 scroll-snap-start">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4">
                    <h1 className="text-xl font-bold text-gray-900">
                      {cancha.name}
                    </h1>
                    <div className="mt-4">
                      <img
                        src={cancha.sede.imgUrl}
                        alt="imgCancha"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg text-gray-700">
                        {cancha.sport === 1 && "Fútbol"}
                        {cancha.sport === 2 && "Padel"}
                        {cancha.sport === 3 && "Tenis"}
                      </h3>
                      <h3 className="text-lg text-gray-700">
                        Precio:{cancha.price}
                      </h3>
                    </div>
                    <Link href={`/CardPago/${cancha.id}`}>
                      <button
                        type="button"
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                        Reservar
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={handleNext}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full ${
            page === totalPages - 1 ? "hidden" : ""
          }`}>
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default CarruselC;
