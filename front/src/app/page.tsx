/* eslint-disable @next/next/no-img-element */
import HomeContainer from "@/components/homeContainer";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-terciario-white flex flex-col justify-center items-center p-10">
      <HomeContainer />
    </div>
  );
};

export default Home;
