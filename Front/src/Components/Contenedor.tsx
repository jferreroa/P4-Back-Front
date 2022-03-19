import React, { FC, useState } from 'react'
import Lista from './Lista'
import Relleno from './Relleno'

const Contenedor: FC = () => {


    const [personaje, setPersonaje] = useState<{ username: string, pass: string } | undefined>(undefined)
    return (
        <div className='Contenedor'>
            <Relleno key={1} changeText={setPersonaje} />
            <Lista key={2} texto={personaje} />
        </div>
    )
}

export default Contenedor
