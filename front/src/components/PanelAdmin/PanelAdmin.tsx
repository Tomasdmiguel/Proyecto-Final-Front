"use client";
import React, { use, useEffect, useState } from "react";
import MisCanchas from "./MisCanchas/MisCanchas";
import MisSedes from "./MisSedes/MisSedes";
import Estadisticas from "../Estadisticas/Estadisticas";
import { useSport } from "@/context/SportContext";
import { usePathname } from "next/navigation";

const PanelAdmin = () => {
  const [activeView, setActiveView] = useState("estadistica");
  const { handleSport } = useSport();
  const pathname = usePathname();
  const renderView = () => {
    switch (activeView) {
      case "estadistica":
        return <Estadisticas />;
      case "mis_sedes":
        return <MisSedes />;
      case "mis_canchas":
        return <MisCanchas />;
      default:
        return <Estadisticas />;
    }
  };
  useEffect(() => {
    const isPanel = pathname === "/PanelAdmin";
    if (isPanel) {
      handleSport(4);
    }
  }, [handleSport, pathname]);

  return (
    <div className="flex min-h-screen w-4/5 shadow-lg shadow-blue-600">
      <nav className="w-1/4 bg-gray-900 text-white flex flex-col border-r-2 border-blue-600">
        <h1 className="text-3xl font-bold p-6 border-b border-gray-700">
          Panel de Control
        </h1>
        <button
          className={`p-6 text-left ${
            activeView === "estadistica" ? "bg-gray-700" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveView("estadistica")}
        >
          Estadísticas de la Web
        </button>
        <button
          className={`p-6 text-left ${
            activeView === "mis_sedes" ? "bg-gray-700" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveView("mis_sedes")}
        >
          Mis Sedes
        </button>
        <button
          className={`p-6 text-left ${
            activeView === "mis_canchas" ? "bg-gray-700" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveView("mis_canchas")}
        >
          Mis Canchas
        </button>
      </nav>

      <main className="flex-1 p-10">{renderView()}</main>
    </div>
  );
};

export default PanelAdmin;
