//*Este modulo FormSede es un componente del cliente que lo que hace es crear la sede, esta opcion solamente la va a tener un usuario admin (Los usuarios admin son cuentas creadas por nostros)
"use client"
import { useState } from "react"

const FormSede = () => {
const [datoSede, setdatoSede] = useState({
    name: "",
    location: "",
    describe: "",
    img: "",

    
})
//*Funcion que guarda los cambios
const hanldeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const {value, name} = event.target
    setdatoSede({
        ...datoSede,
        [name]: value, 
    })

}
//*Funcion que envia el formulario
const handleSubmit = () => {

}


return (
    <div>
        
            <form >
                        <div>

                            <label htmlFor="name">
                                name
                            </label>
                            <input type="text"
                            name="name"
                            value={datoSede.name}
                            placeholder="Escribi tu nombre"
                            onChange={hanldeChange}
                            />

                        </div>

                        <div>
                            <label htmlFor="location">
                                Locacion
                            </label>
                            <input type="text"
                            name="location"
                            value={datoSede.location}
                            placeholder="Ponga su locacion"
                            onChange={hanldeChange}
                            />
                        </div>


                        <div>
                            <label htmlFor="describe">
                                Descripcion
                            </label>
                            <input type="text"
                            name="describe"
                            value={datoSede.describe}
                            placeholder="Descripcion"
                            onChange={hanldeChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="img">
                                Imagen
                            </label>
                            <input type="image"
                            name="img"
                            value={datoSede.img}
                            placeholder="Imagen"
                            onChange={hanldeChange}
                            />
                        </div>
                    <button type="submit">
                        Crear sede
                    </button>
            </form>
    </div>
)

}

export default FormSede;