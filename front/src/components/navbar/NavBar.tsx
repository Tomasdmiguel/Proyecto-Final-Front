/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSport } from "@/context/SportContext";
import { useUser } from "@/context/UserContext";

export default function NavBar() {
  const { userData } = useUser();
  const { sport } = useSport();

  //Cada vez que el nav se carge va intentar traer el userSession y setearlo dentro de este estado local del componente

  return (
    <nav
      className={`flex flex-row justify-center items-center h-[15vh] w-full p-2 bg-terciario-white border-b-2 ${
        sport == 2
          ? "border-blue-400 text-blue-400"
          : sport == 3
          ? "border-orange-500 text-orange-500"
          : "border-main text-main"
      }
     `}
    >
      <div className="flex flex-row justify-around items-center lg:max-w-[60vw]">
        <Link href={"/"}>
          <div>
            <img src="/icon.png" alt="Companny Logo" className=" w-[12vh]" />
          </div>
        </Link>

        <div className="px-5">
          <ul className="max-w-[768px] flex flex-row items-center space-x-10 text-xl ">
            <li>
              <Link
                href={"/"}
                className=" hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>

            {/* <li>
              <Link
                href={"/"}
                className=" hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Mis reservas
              </Link>
            </li> */}

            <li>
              <Link
                href={"/sedes"}
                className=" hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Sedes
              </Link>
            </li>
          </ul>
        </div>

        {userData?.userDb.rol === "user" ||  userData?.userDb.rol === "admin"? (
  <div>
<ul className="max-w-[768px] flex flex-row items-center space-x-10 text-xl ">
  <Link
    href="/Dashboard"
    className="hover:font-black p-2 text-2xl duration-300 ease-in-out"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-none ${
        sport === 2
          ? "stroke-blue-400"
          : sport === 3
          ? "stroke-orange-500"
          : "stroke-main"
      }`}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  </Link>

  <Link 
  href={"/ChatGlobal"}
  > <svg xmlns="http://www.w3.org/2000/svg"
  className={`fill-none ${
    sport === 2
      ? "stroke-blue-400"
      : sport === 3
      ? "stroke-orange-500"
      : "stroke-main"
  }`}
  width="40"
  height="40"
  strokeWidth="1.5" 
  viewBox="0 0 640 512">
    
    <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/></svg>
    

  </Link>

  </ul>
  </div>

    
) : userData?.userDb.rol === "superadmin" ? (
  <Link
    href="/SuperAdmin"
    className="hover:font-black p-2 text-2xl duration-300 ease-in-out"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-none ${
        sport === 2
          ? "stroke-blue-400"
          : sport === 3
          ? "stroke-orange-500"
          : "stroke-main"
      }`}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </svg>
  </Link>
) : (
  <div>
    <Link
      href="/Login"
      className={`font-bold text-base md:text-lg p-2 rounded-lg border-2 hover:text-terciario-white duration-300 ease-in-out ${
        sport === 2
          ? "border-blue-400 text-blue-400 hover:bg-blue-400"
          : sport === 3
          ? "border-orange-500 text-orange-600 hover:bg-orange-500"
          : "border-main text-main hover:bg-main"
      }`}
    >
      Log In
    </Link>
  </div>
)}
      </div>
    </nav>
  );
}
