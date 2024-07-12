import { useEffect, useState } from "react";
import { fetchEstadisticasTurnos } from "@/service/Admin/EstadisticasTurno";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { EstadisticasTurnosData } from "@/interface/IEstadisticasTurnos";

ChartJS.register(ArcElement, Tooltip, Legend);

const EstadisticasTurnos = () => {
  const [estadisticas, setEstadisticas] = useState<EstadisticasTurnosData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEstadisticasTurnos();

        const transformedData: EstadisticasTurnosData[] = data.map((item) => ({
          year: item.year,
          month: item.month,
          libres: item.libres || 0,
          ocupados: item.ocupados || 0,
          pendientes: item.pendientes || 0,
        }));
        setEstadisticas(transformedData);
        setIsLoading(false);
      } catch (error) {
        setError("Error al obtener las estadísticas de turnos.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const prepareChartData = () => {
    const dataByMonth: Record<string, number[]> = {};
    const estadosReserva = ["libres", "ocupados", "pendientes"];

    estadosReserva.forEach((estado) => {
      dataByMonth[estado] = new Array(12).fill(0);
    });

    estadisticas.forEach((estadistica) => {
      const { month, libres, ocupados, pendientes } = estadistica;
      dataByMonth["libres"][month - 1] += libres;
      dataByMonth["ocupados"][month - 1] += ocupados;
      dataByMonth["pendientes"][month - 1] += pendientes;
    });

    const datasets = estadosReserva.map((estado, index) => ({
      label: estado,
      data: dataByMonth[estado],
      backgroundColor: `rgba(${index * 100}, ${index * 100}, ${
        index * 100
      }, 0.6)`,
      borderColor: `rgba(${index * 100}, ${index * 100}, ${index * 100}, 1)`,
      borderWidth: 1,
    }));

    return {
      labels: Array.from({ length: 12 }, (_, i) => i + 1),
      datasets: datasets,
    };
  };

  return (
    <div className="p-6 col-span-2 min-h-fit bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Estadísticas de Turnos
      </h2>
      {isLoading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className=" min-h-fit gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Gráfico de Barras Apilado por Estado de Reserva
            </h3>
            <Bar
              data={prepareChartData()}
              options={{
                indexAxis: "x",
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EstadisticasTurnos;
