import React from 'react';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-2xl">
        <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-4">
          ¡Fuera de juego!
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Has perdido el balón!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Parece que has intentado un pase largo a una página que no existe en nuestro campo. 🏟️
        </p>
        <p className="text-lg text-gray-500 mb-8">
          ¿Qué tal si volvemos al terreno de juego principal?
        </p>
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-yellow-400 hover:to-red-500 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:-rotate-3"
        >
          ¡Volver al campo! ⚽🏀🎾
        </Link>
      </div>
    </div>
  );
}