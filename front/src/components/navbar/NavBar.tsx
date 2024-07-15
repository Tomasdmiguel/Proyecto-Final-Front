/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
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
    setTimeout(() => {
      window.location.reload();
    }, 125);
  };

  // Estado para controlar el menú en responsive
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para toggle el estado del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="inset-x-0 top-0 z-50 bg-white px-10 overflow-hidden">
      {!isAdminPanel && (
        <nav className="flex items-center justify-between p-3 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1 items-center">
            <Link href="/" className="-m-1.5 p-1.5">
              <img className="h-20 w-auto hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out" src="logo2.png" alt="Your Company Logo" />
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12 flex-grow justify-center">
            <Link href="/sedes" className="text-xl font-semibold leading-6 text-gray-900">Sedes</Link>
            {userData?.token && (
              <Link href="/Chat" className="text-xl font-semibold leading-6 text-gray-900">Chat</Link>
            )}
          </div>

          <div className="flex lg:hidden">
            <button type="button" onClick={toggleMenu} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 gap-x-4 lg:justify-end">
            {userData?.userDb.rol === "superadmin" ? (
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
            ) : userData?.userDb.rol === "user" ||
              userData?.userDb.rol === "admin" ||
              userData?.token ? (
              <div className="flex items-center space-x-10 px-5">
                <Link
                  href="/Dashboard"
                  className={`duration-300 ease-in-out ${""}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-none stroke-main hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
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
                <Link href="/AddAdmin" className="py-2 px-5 rounded-xl font-medium text-black text-center border border-gray-900 hover:bg-gray-900 hover:text-white duration-150 block md:py-3 md:inline">Suma tu cancha</Link>
                <Link href='/Login' className="py-2 px-5 rounded-xl font-medium text-white text-center bg-gray-900 hover:bg-white border border-gray-900 hover:text-gray-900 hover:border hover:border-gray-900 active:bg-gray-800 duration-150 block md:py-3 md:inline">Ingresa</Link>
              </div>
            )}
          </div>
        </nav>
      )}
      {/* Mobile menu, show/hide based on menu open state. */}
      {menuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          {/* Background backdrop, show/hide based on slide-over state. */}
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="logo2.png" alt="Your Company Logo" />
              </Link>
              <button type="button" onClick={toggleMenu} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link href="/sedes" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Sedes</Link>
                  {userData?.token && (
                    <Link href="/Chat" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Chat</Link>
                  )}
                </div>
                <div className="py-6">
                  <Link href="/Login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Ingresa</Link>
                  <Link href="/AddAdmin" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={toggleMenu}>Suma tu cancha</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
