import { getSedes } from "@/service/ApiSedes";
import { ContainerSedes } from "../containerSedes/ContainerSedes";
import SobreNosotros from "../about/about";
import Carousel from "../carusel/Carusel";
import CarruselC from "../carruselCancha/carrusel";
import { getCanchas } from "@/service/ApiGetCanchas";

export const HomeContainer: React.FC = async () => {
  const sedes = await getSedes();
  const canchas = await getCanchas()
  return (
    <div className="min-h-[90vh] flex flex-col items-center space-y-16">
      <Carousel sedes={sedes} />
      <ContainerSedes sedes={sedes} />
      <CarruselC canchas={canchas}/> 
      <SobreNosotros/>
    </div>
  );
};

export default HomeContainer;
