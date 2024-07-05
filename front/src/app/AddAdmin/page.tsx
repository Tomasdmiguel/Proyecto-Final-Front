import FormAdmin from "@/components/FormAdmin/FormAdmin"

const AddAdmin = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b bg-main flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Agregar Nuevo Canchero
                    </h2>
                    <p className="mt-2 text-sm text-red-900">
                        Este sector esta en produccion, todavia no esta funcional para ser canchero
                    </p>
                </div>
                <FormAdmin />
            </div>
        </div>
    )
}

export default AddAdmin
// Complete el formulario para registrarte como un nuevo canchero