import React, { FC, useState } from 'react'
import styled from '@emotion/styled';
import axios from 'axios';
import _ from 'lodash';



type PersonajeType = {
    username: string;
    pass: string;
    registerDate: string,
    changeDBData: (arg0: any) => void;
    dataDB: undefined


}



const Personaje: FC<PersonajeType> = ({ username, pass, registerDate, changeDBData, dataDB }) => {//LUUK
    const [estadoBoton, setEstadoBoton] = useState<boolean>(false)

    const setEstadoDisntinto = () => {
        setEstadoBoton(!estadoBoton)
    }
    const debounces = _.debounce(setEstadoDisntinto, 500);

    return (

        <DivStyled onMouseEnter={() => { debounces() }} onMouseLeave={() => { setEstadoDisntinto() }} >
            <DivPersonajeStyled key={username}>
                {username}
                <div></div>
                {pass}
                <div>Registrado el: {registerDate}</div>
            </DivPersonajeStyled>
            <MiBoton visibilidad={estadoBoton} margin={"5px"} onClick={async () => {
                await axios.post('http://localhost:4000/removeOne', { Headers: { username: username } })
                const arr = changeDB(dataDB, username)
                changeDBData(arr)
            }}>Borrar</MiBoton>
        </DivStyled>
    )
}

const changeDB = (db: any, username: string) => {
    const newDB = db.filter((elem: any) => {
        return elem.username !== username
    })
    return newDB
}


const DivStyled = styled.div`
  display: flex;
  height: auto;
  width: auto;
  flex: 1 0 auto;
`

//le entrara
const DivPersonajeStyled = styled.div`
    margin: 10px;
    border-radius: 0.5rem;
    border: 3px black;
    background-color: papayawhip;
    flex: 1 0 auto;
    margin-left: 40px;
`


export default Personaje;





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