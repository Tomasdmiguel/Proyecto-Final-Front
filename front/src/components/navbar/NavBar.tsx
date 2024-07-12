/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import { useSport } from "@/context/SportContext";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
export default function NavBar() {
  const { userData } = useUser();
  const { sport } = useSport();
  const pathname = usePathname();
  const router = useRouter();

  // Verifica si la ruta actual es '/PanelAdmin'
  const isAdminPanel = pathname === "/PanelAdmin";
  const { handleSport } = useSport();

  const redirect = () => {
    router.push("/Dashboard");
    handleSport(0);
  };

  return (
    <nav
      className={`flex flex-row justify-center items-center h-[15vh] w-screen p-2  border-b-2 ${
        sport == 2
          ? "border-blue-400 text-blue-400 bg-terciario-white"
          : sport == 3
          ? "border-orange-500 text-orange-500 bg-terciario-white"
          : sport == 4
          ? "border-blue-600 text-blue-600 bg-gray-900"
          : "border-main text-main bg-terciario-white"
      }`}
    >
      {!isAdminPanel ? (
        <div className="flex flex-row justify-around items-center lg:max-w-[60vw]">
          <Link href={"/"}>
            <div>
              <img src="/icon.png" alt="Company Logo" className="w-[12vh]" />
            </div>
          </Link>

          <div className="px-5">
            <ul className="max-w-[768px] flex flex-row items-center space-x-10 text-xl ">
              <li>
                <Link
                  href={"/"}
                  className="hover:font-black p-2 text-2xl duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href={"/sedes"}
                  className="hover:font-black p-2 text-2xl duration-300 ease-in-out"
                >
                  Sedes
                </Link>
              </li>
            </ul>
          </div>

          {userData?.userDb.rol === "superadmin" ? (
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
                    : sport === 4
                    ? "stroke-blue-600"
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
          ) : userData?.userDb.rol === "user" ||
            userData?.userDb.rol === "admin" ||
            userData?.token ? (
            <div className=" flex flex-row items-center space-x-10 px-5">
              <Link href="/Chat">
                <svg
                  className={`fill-none ${
                    sport === 2
                      ? "stroke-blue-400"
                      : sport === 3
                      ? "stroke-orange-500"
                      : sport === 4
                      ? "stroke-blue-600"
                      : "stroke-main"
                  }`}
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1" />
                </svg>
              </Link>
              <Link
                href="/Dashboard"
                className={`duration-300 ease-in-out ${""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`fill-none ${
                    sport === 2
                      ? "stroke-blue-400"
                      : sport === 3
                      ? "stroke-orange-500"
                      : sport === 4
                      ? "stroke-blue-600"
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
            </div>
          ) : (
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
          )}
        </div>
      ) : (
        <div className="grid w-full grid-cols-3 p-6">
          <div></div>
          <div className="flex items-center justify-center">
            <img
              src="/icon2.jpg"
              alt="Company Logo"
              className="w-[12vh] rounded-full"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={redirect}
              className="bg-white space-x-2 text-center w-32 rounded-2xl h-12 relative font-sans text-black text-xl font-semibold group"
            >
              <div className="bg-blue-600 rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[120px] z-10 duration-500">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  ></path>
                  <path
                    fill="#000000"
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  ></path>
                </svg>
              </div>
              <p className="translate-x-2">Volver</p>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
