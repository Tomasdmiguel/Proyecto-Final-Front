//*Este  es una ruta para poder mostrar el componente register
import FormRegister from "@/components/Register/FormRegister";
const rutaFormRegister = () => {
  return (
    <main>
      <div className="bg-main flex justify-center items-center min-h-screen p-4 ">
        <FormRegister />
      </div>
    </main>
  );
};

export default rutaFormRegister;
