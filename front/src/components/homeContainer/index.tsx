import { getSedes } from "@/service/ApiSedes";
import { ContainerSedes } from "../containerSedes/ContainerSedes";

export const HomeContainer: React.FC = async () => {
  const sedes = await getSedes();
  return (
    <div className="min-h-[90vh]">
      <ContainerSedes sedes={sedes} />
    </div>
  );
};

export default HomeContainer;
