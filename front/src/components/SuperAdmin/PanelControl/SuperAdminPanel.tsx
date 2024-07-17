"use client";
import React, { useEffect, useState } from "react";
import CardAprobacion from "../Aprobacion/CardAprobacion";
import BanearUser from "../BanearUser/BanearUser";

import Dashboard from "../CardPersonal/CardPersonal";
import Estadisticas from "../../Estadisticas/Estadisticas";
import { useSport } from "@/context/SportContext";
import { usePathname } from "next/navigation";

const SuperAdminPanel = () => {
  const [activeView, setActiveView] = useState("home");
  const { handleSport } = useSport();
  const pathname = usePathname();

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <Dashboard />;
      case "approve":
        return <CardAprobacion />;
      case "ban":
        return <BanearUser />;
      case "estadistica":
        return <Estadisticas />;

      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    const isPanel = pathname === "/SuperAdmin";
    if (isPanel) {
      handleSport(4);
    }
  }, [handleSport, pathname]);

  return (
    <div className="flex min-h-screen w-4/5 shadow-lg shadow-blue-600">
      <nav className="w-1/4 bg-gray-900 text-white flex flex-col border-r-2 border-blue-600">
        <h1 className="text-2xl font-bold py-6 px-3 border-b border-gray-700">
          Super Admin Panel
        </h1>
        <button
          className={`p-4 text-left ${
            activeView === "home" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveView("home")}
        >
          Informacion Personal
        </button>
        <button
          className={`p-4 text-left ${
            activeView === "approve" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveView("approve")}
        >
          Aprobar administrador
        </button>
        <button
          className={`p-4 text-left ${
            activeView === "ban" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveView("ban")}
        >
          Banear usuario
        </button>
        <button
          className={`p-4 text-left ${
            activeView === "estadistica" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          onClick={() => setActiveView("estadistica")}
        >
          Estadisticas de la web
        </button>
      </nav>

      <main className="flex-1 p-8">{renderView()}</main>
    </div>
  );
};

export default SuperAdminPanel;
