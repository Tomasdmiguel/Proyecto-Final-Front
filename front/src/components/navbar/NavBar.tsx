/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import imgUsuario from "@/assets/user_profile_man-256.webp";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>();

  //Cada vez que el nav se carge va intentar traer el userSession y setearlo dentro de este estado local del componente
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("usuarioSesion");
      setUserData(JSON.parse(userData!));
    }
  }, [pathname]);

  return (
    <nav className="flex flex-row justify-center items-center h-[15vh] w-full p-2 bg-terciario-white">
      <div className="flex flex-row justify-around items-center lg:max-w-[60vw]">
        <Link href={"/"}>
          <div>
            <img
              src="/logoPagina.png"
              alt="Companny Logo"
              className=" w-[12vh]"
            />
          </div>
        </Link>

        <div className="px-5">
          <ul className="max-w-[768px] flex flex-row items-center space-x-10 text-xl ">
            <li>
              <Link
                href={"/"}
                className="text-main hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href={"/"}
                className="text-main hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Mis reservas
              </Link>
            </li>

            <li>
              <Link
                href={"/Sedeuser"}
                className="text-main hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                Mis sedes
              </Link>
            </li>
          </ul>
        </div>
        
        {userData?.token ? (
          <Link
            href={"/Dashboard"}
            className="text-main hover:font-black p-2 text-2xl duration-300 ease-in-out"
          >
            <img src={imgUsuario.src} alt="" className="h-10" />
          </Link>
        ) : (
          <div>
            <Link href={"/Login"}>
              <button className="hover:bg-main text-main text-base md:text-lg p-2 rounded-lg border-2 border-main hover:text-terciario-white duration-300 ease-in-out">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
