"use client"
import React, { useState, useEffect } from 'react';

const TitleHome: React.FC = () => {
  const [text, setText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const fullText = 'Reserva Gol';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className={`relative w-full h-64 overflow-hidden transition-colors duration-300 ease-in-out
                  ${isHovered ? 'bg-white' : 'bg-terciario'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1 
        className={`relative z-10 text-7xl font-bold tracking-wider text-center 
                    flex items-center justify-center h-full font-Marko transition-colors duration-300 ease-in-out
                    ${isHovered ? 'text-secundario' : 'text-terciario-white'}`}
      >
        {text}
      </h1>
    </div>
  );
};

export default TitleHome;