"use client";
import { useSport } from "@/context/SportContext";
import Image from "next/image";
import Link from "next/link";

const SobreNosotros = () => {
  const { sport } = useSport();
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-[100vw] mx-auto px-4">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0">
                  <Image
                    className="w-full h-48 object-cover"
                    src="/icon.png"
                    alt="Equipo de Reserva Gol"
                    width={512}
                    height={256}
                  />
                </div>
                <div className="p-8 flex-grow">
                  <h2 className="text-2xl font-bold text-terciario mb-4">
                    ¿Quienes somos?
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Somos un equipo de siete desarrolladores Fullstack
                    apasionados por crear soluciones innovadoras para el mundo
                    del deporte. En &quot;Reserva Gol&quot;, hemos desarrollado
                    una plataforma web que revoluciona la forma de reservar
                    canchas para diversas actividades deportivas.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Nuestra misión es ofrecer una base completa de lugares
                    deportivos, brindando a los usuarios una manera sencilla y
                    eficiente de encontrar y reservar el espacio perfecto para
                    sus actividades favoritas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <div className="p-8 flex flex-col h-full">
                <h2 className="text-2xl font-bold text-terciario mb-4">
                  ¿Te gustaría que tu cancha esté en esta página?
                </h2>
                <li className="text-gray-700 text-lg leading-relaxed mb-6 flex-grow">
                  Unirse a nuestra plataforma ofrece numerosos beneficios para
                  los propietarios de canchas:
                  <ul className="list-disc list-inside">
                    <li>
                      Mayor visibilidad: Su sede deportiva será visible para
                      miles de usuarios potenciales.
                    </li>
                    <li>
                      Sistema de reservas eficiente: Automatice su proceso de
                      reservas y reduzca el trabajo administrativo.
                    </li>
                    <li>
                      Aumento de ingresos: Llegue a más clientes y maximice la
                      ocupación de sus instalaciones.
                    </li>
                    <li>
                      Gestión simplificada: Administre fácilmente sus reservas,
                      horarios y pagos desde una sola plataforma.
                    </li>
                    <li>
                      Fidelización de clientes: Ofrezca una experiencia de
                      reserva moderna y conveniente que hará que los usuarios
                      vuelvan.
                    </li>
                    <li>
                      Análisis y reportes: Obtenga información valiosa sobre el
                      uso de sus instalaciones para tomar decisiones informadas.
                    </li>
                    <li>
                      Soporte dedicado: Cuente con nuestro equipo para ayudarle
                      a optimizar su presencia en la plataforma.
                    </li>
                  </ul>
                  Al unirse a Reserva Gol, no solo mejorará la gestión de sus
                  canchas, sino que también formará parte de una comunidad
                  deportiva en crecimiento.
                </li>
                <div className="mt-auto">
                  <Link
                    href="/AddAdmin"
                    className={`inline-block border-2 border-white ${
                      sport == 2
                        ? "bg-blue-400 hover:bg-terciario-white  hover:border-blue-400 hover:text-blue-400"
                        : sport == 3
                        ? "bg-orange-500 hover:bg-terciario-white  hover:border-orange-500 hover:text-orange-500"
                        : "bg-main hover:bg-terciario-white  hover:border-main hover:text-main"
                    } text-white py-2 px-4 rounded-full hover:bg-opacity-80 transition duration-300`}
                  >
                    Regístrate como canchero
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;