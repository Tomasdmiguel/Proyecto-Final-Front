"use client";
import Image from "next/image";

const SobreNosotros = () => {
  return (
    <section
      id="about"
      className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 items-center justify-center p-10 lg:px-52"
    >
      <Image
        className="w-1/2 h-auto object-cover"
        src="/icon.png"
        alt="Equipo de Reserva Gol"
        width={512}
        height={256}
      />

      <div>
        <h2 className="font-bebas-neue uppercase text-3xl sm:text-2xl font-semibold text-black mb-4">
          ¿Quienes somos?
        </h2>
        <p className="text-gray-700 font-bebas-neue text-xl leading-relaxed mb-4">
          Somos un equipo de siete desarrolladores Fullstack apasionados por
          crear soluciones innovadoras para el mundo del deporte. En
          &quot;Reserva Gol&quot;, hemos desarrollado una plataforma web que
          revoluciona la forma de reservar canchas para diversas actividades
          deportivas.
        </p>
        <p className="text-gray-700 font-bebas-neue text-xl leading-relaxed mb-6">
          Nuestra misión es ofrecer una base completa de lugares deportivos,
          brindando a los usuarios una manera sencilla y eficiente de encontrar
          y reservar el espacio perfecto para sus actividades favoritas.
        </p>
      </div>
    </section>
  );
};

export default SobreNosotros;
