import CardAprobacion from "@/components/SuperAdmin/Aprobacion/CardAprobacion";

const SuperAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Panel de control</h1>
        <CardAprobacion />
      </div>
    </div>
  );
};

export default SuperAdmin;