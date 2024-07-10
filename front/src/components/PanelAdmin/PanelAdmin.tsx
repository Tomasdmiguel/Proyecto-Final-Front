"use client";
import React, { useState } from "react";
import MisCanchas from "./MisCanchas/MisCanchas";
import MisSedes from "./MisSedes/MisSedes";
import MisEstadisticas from "./Estadisticas/MisEstadisticas";
import { useRouter } from "next/navigation";

const PanelAdmin = () => {
  const [activeView, setActiveView] = useState("estadistica");
  const router = useRouter();

  const renderView = () => {
    switch (activeView) {
      case "estadistica":
        return <MisEstadisticas />;
      case "mis_sedes":
        return <MisSedes />;
      case "mis_canchas":
        return <MisCanchas />;
      default:
        return <MisEstadisticas />;
    }
  };

  return (
    <div className="flex h-screen">
      <nav className="w-1/4 bg-gray-900 text-white flex flex-col">
        <h1 className="text-3xl font-bold p-6 border-b border-gray-700">Panel de Control</h1>
        <button
          className={`p-6 text-left ${
            activeView === "estadistica" ? "bg-gray-700" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveView("estadistica")}>
          Estadísticas de la Web
        </button>
        <button
          className={`p-6 text-left ${
            activeView === "mis_sedes" ? "bg-gray-700" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveView("mis_sedes")}>
          Mis Sedes
        </button>
        <button
          className={`p-6 text-left ${
            activeView === "mis_canchas" ? "bg-gray-700" : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveView("mis_canchas")}>
          Mis Canchas
        </button>
        <button
          className="p-6 text-left hover:bg-gray-800"
          onClick={() => router.back()}>
          Volver
        </button>
      </nav>

      <main className="flex-1 p-10 bg-gray-100">{renderView()}</main>
    </div>
  );
};

export default PanelAdmin;