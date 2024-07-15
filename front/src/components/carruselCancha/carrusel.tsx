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
    <div className="p-4 max-w-[100vw] bg-gray-100 mx-20 md:mx-0 ">
      <h1 className="text-3xl font-bold font-bebas-neue text-terciario mb-4 capitalize m-10 pl-20">
        Canchas Disponibles
      </h1>
      <div className="relative overflow-x-hidden mx-20">
        <div
          className="flex items-center transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {canchas.map((cancha) => (
            <div
              key={cancha.id}
              className="flex-none w-full h-fit md:w-1/3 px-2 my-2"
            >
              <div className="bg-white h-[50vh] rounded-lg shadow-lg overflow-hidden transition duration-300 flex flex-col relative">
                <div className="relative w-full h-48">
                  <img src={cancha?.sede?.imgUrl} alt="imgCancha" className="w-full h-full object-cover" />
                  <p className="absolute bottom-2 right-2 text-xl font-bebas-neue text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                    {cancha.sport === 1 ?
                      "Fútbol" : cancha.sport === 2 ? "Padel" : "Tenis"}
                  </p>
                </div>
                <div className="h-full w-full flex flex-col justify-between p-4">
                  <h2 className="text-2xl font-bold text-gray-900 capitalize font-bebas-neue pl-4 pb-3">
                    {cancha?.name}
                  </h2>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6 text-gray-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                        <p className="text-xl text-gray-700 ">
                          &nbsp;{cancha?.player}
                        </p>
                      </div>
                      <div className="flex items-center">

                        <svg
                          className="h-5 w-5 text-gray-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 12a3 3 0 100-6 3 3 0 000 6z"
                          />
                        </svg>
                        <p className="text-xl text-gray-700 ">
                          {cancha?.sede?.location}
                        </p>
                      </div>

                    </div>
                    <div className="">
                      <p className="text-4xl font-bold font-bebas-neue text-terciario pr-4">
                        $ {cancha?.price}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/sede/${cancha?.sede?.id}`}
                    className="w-3/4 my-2 self-center flex justify-center border-2 border-gray-900 text-white text-lg py-1 px-4 bg-gray-900 rounded-3xl font-bebas-neue hover:bg-white hover:text-gray-900 transition-colors duration-300"
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-4xl p-4 transition-opacity opacity-0 hover:opacity-100"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-4xl p-4 transition-opacity opacity-0 hover:opacity-100"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default CarruselC;
