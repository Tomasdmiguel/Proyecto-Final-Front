/* eslint-disable @next/next/no-img-element */
import HomeContainer from "@/components/homeContainer";
import SobreNosotros from "@/components/about/about";
export const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-terciario-white flex flex-col justify-center items-center p-10">
      <HomeContainer />
      <SobreNosotros/>
    </div>
  );
};

export default Home;
