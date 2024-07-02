import { getSedes } from "@/service/ApiSedes";
import { ContainerSedes } from "../containerSedes/ContainerSedes";
import Carousel from "../carusel/Carusel";

export const HomeContainer: React.FC = async () => {
  const sedes = await getSedes();
  return (
    <div className="min-h-[90vh]">
      <Carousel sedes={sedes} />
      <ContainerSedes sedes={sedes} />
    </div>
  );
};

export default HomeContainer;
