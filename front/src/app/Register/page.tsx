//* Ruta para registrarse muestra el componente FormRegister
import FormRegister from "@/components/Register/FormRegister";
const rutaFormRegister = () => {
  return (
    <main>
      <div className="bg-main-color flex justify-center items-center min-h-screen p-4 ">
        <FormRegister/>
      </div>
    </main>
  );
};

export default rutaFormRegister;
