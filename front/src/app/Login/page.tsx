//* Este es la ruta para poder mostrar el componente FormLogin
import FormLogin from "@/components/Login/FormLogin";
const rutaFormLogin = () => {
  return (
    <main>
      <div className="bg-main-color flex justify-center items-center min-h-screen p-4 ">
        <FormLogin />
      </div>
    </main>
  );
};

export default rutaFormLogin;
