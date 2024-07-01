/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img src="/icon.png" className="h-32 me-3" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                Reserva Gol
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Team Front
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://github.com/Tomasdmiguel" className=" ">
                    Tomas de Miguel
                  </a>
                </li>
                <li className="mb-4">
                  <a href="https://github.com/PabloSMeier" className="">
                    Pablo
                  </a>
                </li>
                <li>
                  <a href="https://github.com/AndresDelac" className="">
                    Andres De la Cruz
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Team Back
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="">
                    Javier
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#">Facundo</a>
                </li>
                <li className="mb-4">
                  <a href="#">Romina</a>
                </li>
                <li className="mb-4">
                  <a href="#">Marcos Gomez</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      </div>
    </footer>
  );
}
