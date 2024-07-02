import FormCancha from "@/components/formCancha/formCancha";
const rutaFormcancha = ({ params }: { params: { adminId: string } }) => {
  return (
    <main>
      <div className="bg-main flex justify-center items-center min-h-screen p-4 ">
        <FormCancha id={params.adminId} />
      </div>
    </main>
  );
};

export default rutaFormcancha;
