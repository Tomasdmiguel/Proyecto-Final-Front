import { ISede } from "@/interface/ISedes";
import { FetchSedeById } from "@/service/ApiSedeById";

const sedebyid = async ({ params }: { params: { sedeId: string } }) => {
  try {
    const sedeId = params.sedeId;
    const sede: ISede = await FetchSedeById(sedeId);

    if (!sede || !sede.canchas) {
      return (
        <div className="bg-terciario-white min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold text-terciario">
            No se encontraron canchas para esta sede
          </h1>
        </div>
      );
    }

    return (
      <div className="bg-terciario-white min-h-screen">
        <h1 className="text-terciario text-2xl sm:text-3xl text-center font-bold mb-4">
          {sede.name}
        </h1>
        <p className="text-terciario text-lg font-bold text-center">
          {sede.location}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {sede.canchas.map(
            ({
              id,
              price,
              sport,
              type,
              player,
              time,
              techado,
              imgUrl,
              name,
            }) => (
              <div
                key={id}
                className="bg-main flex flex-col justify-center items-center w-full p-4 "
              >
                <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-black space-y-8  transform transition-transform duration-300 hover:scale-105">
                  <h1 className="font-Marko font-bold text-2xl sm:text-3xl text-center">
                    {name}
                  </h1>
                  <div className="flex items-center justify-center">
                    <h3>
                      {sport === 1 ? (
                        <span className="text-lg font-bold">Fútbol</span>
                      ) : sport === 2 ? (
                        <span className="text-lg font-bold">Padel</span>
                      ) : (
                        <span className="text-base">Tenis</span>
                      )}
                    </h3>
                  </div>
                  <p className="text-xl font-bold">${price}</p>
                  <p>Jugadores: {player}</p>
                  <p>Techado: {techado ? "Sí" : "No"}</p>
                  <p>Tipo: {type}</p>
                  {/* <p className="text-terciario">Turno: {time}</p> */}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="bg-terciario-white min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-terciario">
          Error al obtener la sede
        </h1>
      </div>
    );
  }
};

export default sedebyid;
