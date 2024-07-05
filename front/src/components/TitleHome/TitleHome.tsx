"use client";
import { useSport } from "@/context/SportContext";
import React, { useState, useEffect } from "react";

const TitleHome: React.FC = () => {
  const { sport } = useSport();
  const [text, setText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const fullText = "Reserva Gol";

  useEffect(() => {
    let index = 0;
    let intervalId = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 150);

    // Limpia el intervalo cada 5 segundos
    const repeatIntervalId = setInterval(() => {
      clearInterval(intervalId); // Limpia el intervalo actual antes de comenzar otro
      index = 0; // Reinicia el índice para comenzar de nuevo
      intervalId = setInterval(() => {
        setText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          clearInterval(intervalId);
        }
      }, 150);
    }, 5000);

    // Limpia el intervalo de repetición cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
      clearInterval(repeatIntervalId);
    };
  }, [fullText]);

  return (
    <div
      className={`relative w-full h-64 overflow-hidden transition-colors duration-300 ease-in-out rounded-md
                  ${
                    isHovered && sport == 2
                      ? "bg-white shadow-lg shadow-blue-400"
                      : isHovered && sport == 3
                      ? "bg-white shadow-lg shadow-orange-500"
                      : isHovered
                      ? "bg-white shadow-lg shadow-main"
                      : sport == 3
                      ? "bg-orange-500"
                      : sport == 2
                      ? "bg-blue-400"
                      : "bg-main"
                  }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1
        className={`relative z-10 text-7xl font-bold tracking-wider text-center 
                    flex items-center justify-center h-full font-Marko transition-colors duration-300 ease-in-out
                    ${
                      isHovered && isHovered && sport == 2
                        ? "text-blue-400"
                        : isHovered && sport == 3
                        ? "text-orange-500"
                        : isHovered
                        ? "text-main"
                        : "text-terciario-white"
                    }`}
      >
        {text}
      </h1>
    </div>
  );
};

export default TitleHome;
