/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSport } from "@/context/SportContext";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const { userData } = useUser();
  const { sport, handleSport } = useSport();
  const pathname = usePathname();
  const router = useRouter();

  const isAdminPanel = pathname === "/PanelAdmin";
  const isSuperAdminPanel = pathname === "/SuperAdmin";

  const redirect = () => {
    if (isAdminPanel) {
      router.push("/Dashboard");
    } else {
      router.push("/");
    }
    handleSport(0);
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleMenu2 = () => {
    setMenuOpen(!menuOpen);
    handleSport(4);
  };

  return (
    <header
      className={`inset-x-0 ${
        sport == 2
          ? "border-blue-400 text-blue-400 bg-terciario-white"
          : sport == 3
          ? "border-orange-500 text-orange-500 bg-terciario-white"
          : sport == 4
          ? "border-blue-600 text-blue-600 bg-gray-900"
          : "border-main text-main bg-terciario-white"
      } top-0 min-w-screen border-b-2 z-50 px-10 overflow-hidden`}
    >
      {!isAdminPanel && !isSuperAdminPanel ? (
        <nav
          className="flex items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center">
            <Link href="/" className="-m-1.5 p-1.5">
              <img
                className="h-20 w-auto hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                src="/logo2.png"
                alt="Your Company Logo"
              />
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12 flex-grow justify-center">
            <Link
              href="/sedes"
              className="text-xl font-semibold leading-6 text-gray-900"
            >
              Sedes
            </Link>
            {userData?.token && (
              <Link
                href="/Chat"
                className="text-xl font-semibold leading-6 text-gray-900"
              >
                Chat
              </Link>
            )}
            <Link
              href="#about"
              className="text-xl font-semibold leading-6 text-gray-900"
            >
              About
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 gap-x-4 lg:justify-end">
            {userData?.userDb?.rol === "superadmin" ? (
              <Link
                href="/SuperAdmin"
                className="hover:font-black p-2 text-2xl duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-none stroke-main"
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
            ) : userData?.userDb?.rol === "user" ||
              userData?.userDb?.rol === "admin" ||
              userData?.token ? (
              <div className="flex items-center space-x-10 px-5">
                <Link
                  href="/Dashboard"
                  className={`duration-300 ease-in-out ${""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`fill-none ${
                      sport == 2
                        ? "stroke-blue-400"
                        : sport == 3
                        ? "stroke-orange-500"
                        : "stroke-main"
                    } hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out`}
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
              <div className="hidden lg:flex lg:flex-1 gap-x-4 lg:justify-end">
                <Link
                  href="/AddAdmin"
                  className={` ${
                    sport == 2
                      ? "hover:bg-blue-400 border-blue-400 text-blue-400"
                      : sport == 3
                      ? "hover:bg-orange-500 border-orange-500 text-orange-500"
                      : "hover:bg-main border-main text-main"
                  }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
                >
                  Suma tu cancha
                </Link>
                <Link
                  href="/Login"
                  className={` ${
                    sport == 2
                      ? "hover:bg-blue-400 border-blue-400 text-blue-400"
                      : sport == 3
                      ? "hover:bg-orange-500 border-orange-500 text-orange-500"
                      : "hover:bg-main border-main text-main"
                  }  md:text-lg p-3 rounded-lg border border-x-2 border-y-2  font-semibold  hover:text-white duration-200 ease-in-out`}
                >
                  Ingresa
                </Link>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <div className="grid w-full grid-cols-3 py-6 px-10">
          <div></div>
          <div className="flex items-center justify-center">
            <Link href={"/"}>
            <img
              src="/logo2w.png"
              alt="Company Logo"
              className="w-[15vh] rounded-full"
            />
            </Link>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
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

      {menuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="/logo2.png"
                  alt="Your Company Logo"
                />
              </Link>
              <button
                type="button"
                onClick={toggleMenu}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/sedes"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Sedes
                  </Link>
                  {userData?.token && (
                    <Link
                      href="/Chat"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={toggleMenu}
                    >
                      Chat
                    </Link>
                  )}
                </div>
                <div className="py-6">
                  {userData?.userDb?.rol === "superadmin" ? (
                    <Link
                      href="/SuperAdmin"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={toggleMenu2}
                    >
                      Panel de control
                    </Link>
                  ) : userData?.userDb?.rol === "user" ||
                    userData?.userDb?.rol === "admin" ||
                    userData?.token ? (
                    <Link
                      href="/Dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={toggleMenu}
                    >
                      Perfil
                    </Link>
                  ) : (
                    <div>
                      <Link
                        href="/Login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={toggleMenu}
                      >
                        Ingresa
                      </Link>
                      <Link
                        href="/AddAdmin"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={toggleMenu}
                      >
                        Suma tu cancha
                      </Link>
                    </div>
                  )}
                  <Link
                    href="#about"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
