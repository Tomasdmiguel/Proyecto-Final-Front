"use client";
import React from "react";
import ChatGlobal from "@/components/ChatGlobal/ChatGlobal";
import ChatFutbol from "@/components/ChatFutbol/ChatFutbol";
import ChatPadel from "@/components/ChatPadel/ChatPadel";
import ChatTenis from "@/components/ChatTenis/ChatTenis";
import { useSport } from "@/context/SportContext";

export default function Chat() {
  const { sport, handleSport } = useSport();

  return (
    <div
      className={`flex flex-row h-[85vh] w-screen bg-terciario-white ${
        sport == 2
          ? "text-blue-400"
          : sport == 3
          ? "text-orange-500"
          : "text-main"
      }`}
    >
      <div
        className={`w-1/4 border-r-2 text-terciario-white ${
          sport === 2
            ? "bg-blue-400 border-blue-400"
            : sport === 3
            ? "bg-orange-500 border-orange-500"
            : "bg-main border-main"
        }`}
      >
        <div className="pt-4 text-center h-full">
          <div className="h-[10%] flex items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">Chats</h2>
          </div>
          <div className="flex flex-col bg-terciario-white h-[90%]">
            <button
              onClick={() => handleSport(0)}
              className={` font-medium p-3 ${
                sport === 2
                  ? "text-blue-400"
                  : sport === 3
                  ? "text-orange-500"
                  : sport == 1
                  ? "text-main"
                  : "bg-slate-200 text-main"
              } hover:bg-slate-200  ease-in-out duration-150`}
            >
              Global
            </button>
            <button
              onClick={() => handleSport(1)}
              className={`bg-terciario-white font-medium p-3 ${
                sport === 2
                  ? "text-blue-400"
                  : sport === 3
                  ? "text-orange-500"
                  : sport == 1
                  ? "text-main bg-slate-200"
                  : " text-main"
              }  hover:bg-slate-200  ease-in-out duration-150`}
            >
              Fútbol
            </button>
            <button
              onClick={() => handleSport(2)}
              className={`bg-terciario-white font-medium p-3 ${
                sport === 2
                  ? "text-blue-400 bg-slate-200"
                  : sport === 3
                  ? "text-orange-500"
                  : sport == 1
                  ? "text-main "
                  : " text-main"
              }  hover:bg-slate-200  ease-in-out duration-150`}
            >
              Padel
            </button>
            <button
              onClick={() => handleSport(3)}
              className={`bg-terciario-white font-medium p-3 ${
                sport === 2
                  ? "text-blue-400"
                  : sport === 3
                  ? "text-orange-500 bg-slate-200"
                  : sport == 1
                  ? "text-main "
                  : " text-main"
              }  hover:bg-slate-200  ease-in-out duration-150`}
            >
              Tenis
            </button>
          </div>
        </div>
      </div>
      {sport == 1 ? (
        <ChatFutbol />
      ) : sport == 2 ? (
        <ChatPadel />
      ) : sport == 3 ? (
        <ChatTenis />
      ) : (
        <ChatGlobal />
      )}
    </div>
  );
}
