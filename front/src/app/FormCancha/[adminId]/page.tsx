import FormCancha from "@/components/formCancha/formCancha";
const rutaFormcancha = ({ params }: { params: { adminId: string } }) => {
  return (
    <main>
      <div className=" flex justify-center items-center min-h-screen">
        <FormCancha id={params.adminId} />
      </div>
    </main>
  );
};

export default rutaFormcancha;
