import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-4xl  text-main-color font-bold text-black-600 mb-4">
        Esta pagina no existe
      </h1>
      <p className="text-xl text-main-color mb-8">
        Vuelve a intentarlo mas tarde
      </p>
      <Link href="/">
        <a className="border border-secundario-color hover:bg-main-color text-white font-bold py-2 px-4 rounded">
          Ir a la página principal
        </a>
      </Link>
    </div>
  );
}
