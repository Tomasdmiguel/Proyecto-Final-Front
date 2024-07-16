"use client";
/* eslint-disable @next/next/no-img-element */
import { useSport } from "@/context/SportContext";
import React from "react";

export default function Footer() {
  const { sport } = useSport();
  return (
    <footer
      className={` border-t-2 ${
        sport === 2
          ? "border-blue-400 bg-terciario-white"
          : sport === 3
          ? "border-orange-500 bg-terciario-white"
          : sport === 4
          ? "border-blue-600 bg-gray-900"
          : "border-main bg-terciario-white text-terciario-white"
      }`}
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                className="h-20 w-auto hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                src="/logo2.png"
                alt="Your Company Logo"
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2
                className={`mb-6 text-sm font-semibold ${
                  sport === 4 ? "text-terciario-white" : "text-gray-900"
                } uppercase`}
              >
                Team Front
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/Tomasdmiguel"
                    target="blank"
                    className=" "
                  >
                    Tomas de Miguel
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://github.com/PabloSMeier"
                    target="blank"
                    className=""
                  >
                    Pablo Meier
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/AndresDelac"
                    target="blank"
                    className=""
                  >
                    Andres De la Cruz
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2
                className={`mb-6 text-sm font-semibold ${
                  sport === 4 ? "text-terciario-white" : "text-gray-900"
                } uppercase`}
              >
                Team Back
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/javi5456"
                    target="blank"
                    className=""
                  >
                    Javier Chang
                  </a>
                </li>
                <li className="mb-4">
                  <a target="blank" href="https://github.com/feka3">
                    Facundo Arriola
                  </a>
                </li>
                <li className="mb-4">
                  <a target="blank" href="https://github.com/romigentile">
                    Romina Gentile
                  </a>
                </li>
                <li className="mb-4">
                  <a target="blank" href="https://github.com/Marcos48149">
                    Marcos Gomez
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr
          className={`my-6  sm:mx-auto ${
            sport === 2
              ? "border-blue-400"
              : sport === 3
              ? "border-orange-500"
              : sport === 4
              ? "border-blue-600"
              : "border-main"
          } lg:my-8`}
        />
      </div>
    </footer>
  );
}
