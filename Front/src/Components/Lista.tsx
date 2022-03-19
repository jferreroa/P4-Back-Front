import React, { FC, useEffect, useState } from 'react'
import axios from 'axios';
import styled from '@emotion/styled';
import Personaje from "./Personaje";

type listaProps = {
    texto: { username: string, pass: string } | undefined
}
type PersonajeType = {
    username: string;
    registerDate: string;
    password: string

}
const Lista: FC<listaProps> = ({ texto }) => {
    const [personaje, setPersonaje] = useState<{ username: string, pass: string } | undefined>(undefined)
    const [dataDB, setDataDB] = useState<any>(undefined)



    useEffect(() => {
        if (texto) {
            setPersonaje({ username: texto.username, pass: texto!.pass })
        }
    }, [texto])


    useEffect(() => {
        if (personaje) {
            try {
                axios.post('http://localhost:4000/add', { Headers: { username: personaje.username, password: personaje.pass } }).then(() => {
                    axios.get("http://localhost:4000/list")
                        .then(res => {
                            setDataDB(res.data.usuarios)
                        })
                })
            } catch (error) {
                alert("Your file is being uploaded!")
                console.log(error)
            }
        }
    }, [personaje])


    return (
        <div className='Lista'>

            <div className='añadirYlistar'>
                <div className='añadido' key="añadido">
                    Personaje Añadido:
                    <div>{personaje && personaje.username}</div>
                    <div>{personaje && personaje.pass}</div>
                </div>

                <DivGenerico className='listado2' key="listado">
                    {dataDB && (
                        <div className='datadb' key="datadb" >
                            {dataDB.map((elem: PersonajeType) => (
                                <div className='PerLista' key={elem.username}>
                                    <Personaje
                                        key={elem.username}
                                        username={elem.username}
                                        pass={elem.password}
                                        registerDate={elem.registerDate}
                                        changeDBData={setDataDB}
                                        dataDB={dataDB}
                                    ></Personaje>
                                </div>

                            ))}
                        </div>
                    )}
                </DivGenerico>
            </div>

            <div className="boton-lista">
                <MiBoton visibilidad={(dataDB)} margin={"10px"} onClick={
                    async () => {
                        await axios.post("http://localhost:4000/remove")
                        setDataDB(undefined)
                        setPersonaje(undefined)
                    }
                }>
                    Borrar lista</MiBoton>
            </div>

        </div>

    )
}

export default Lista


type StyledBoton = {
    visibilidad: boolean;
    margin: string
}

const MiBoton = styled.button<StyledBoton>`
        
    margin:${(props: any) => (props.margin)};
    visibility:${(props: any) => (props.visibilidad ? "visible" : "hidden")};;
    background-color: papayawhip ;
    color:  black;
    width: auto;
    height: 40px;
    align-self:center;
    border-radius: 5px;
    opacity:0.9;
    
    &:hover {
        transition: 1s ease;
        -webkit-transform: scale(0.8);
        -ms-transform: scale(0.8);
        transform: scale(0.8);
        opacity:1;
        background-color: red;
        cursor:pointer
    }
`
const DivGenerico = styled.div`
  border: 1px solid black;
  background: rgb(34,193,195);
  background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(86,187,11,1) 20%, rgba(253,187,45,1) 100%);
`