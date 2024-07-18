import { getSedes } from "@/service/ApiSedes";
import { ContainerSedes } from "../containerSedes/ContainerSedes";
import SobreNosotros from "../about/about";
import Carousel from "../carusel/Carusel";
import CarruselC from "../carruselCancha/carrusel";
import { getCanchas } from "@/service/ApiGetCanchas";
import TitleHome from "../TitleHome/TitleHome";
import { CancheroHome } from "../CancheroHome/CancheroHome";

export const HomeContainer = async () => {
  const sedes = await getSedes();
  const canchas = await getCanchas();
  return (
    <div className="flex flex-col items-center w-screen space-y-10  pb-8">
      <Carousel />
      <TitleHome />
      <ContainerSedes sedes={sedes} />
      <CarruselC canchas={canchas} />
      <CancheroHome />
      <SobreNosotros />
    </div>
  );
};

export default HomeContainer;
