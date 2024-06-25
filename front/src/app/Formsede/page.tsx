//*Este componente importado es un formulario para crear una sede
import FormSede from "@/components/Form/Sede/FormSede"
const rutaFormsede = () => {
return(
        <main>
            <div>
                <h1>Canchitas gol</h1>
                <h2>Bienvenido, crea tu sede para que los jugadores puedan reservar turnos en tu cancha</h2>
            </div>
            <FormSede/>
            <div>
                <p>Si ya tienes una sede, dirígete a tu sede para crear tu cancha,</p>
                 <p>Ingresar</p>
                
            </div>
        </main>
)

}

export default rutaFormsede