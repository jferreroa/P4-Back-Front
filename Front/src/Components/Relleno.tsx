import styled from '@emotion/styled';
import React, { FC, useState } from 'react'

type RellenoProps = {
    changeText: (text: { username: string, pass: string }) => void;
};

const Relleno: FC<RellenoProps> = ({ changeText }) => {
    const [texto, setTexto] = useState<string>("")
    const [texto2, setTexto2] = useState<string>("")

    return (
        <div className="relleno">
            <form>
                <Input placeholder='Nombre' value={texto} type="text" onChange={(e) => setTexto(e.target.value)} />
                <Input  placeholder="Descripción" value={texto2} type="text" onChange={(e) => setTexto2(e.target.value)} />
            </form>
            <MiBoton visibilidad={Boolean(texto) || Boolean(texto2)} onClick={() => {changeText({ username: texto, pass: texto2 }) }}>Insertar</MiBoton>
        </div>
    )
}


type StyledBoton = {
    visibilidad: boolean;
    
}
const MiBoton = styled.button<StyledBoton>`
    visibility:${(props: any) => (props.visibilidad ? "visible"  : "hidden")};;
    background-color: papayawhip ;
    color:  black;
    width: auto;
    height: 32px;
    align-self:center;
    border-radius: 5px;
    &:hover {
        background-color: green;
        cursor:pointer
    }
`

const Input = styled.input`
  /* display: flex; */
  /* flex-wrap: wrap; */
  padding: 0.5em;
  margin: 0.5em;
  color:  Black;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
 font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

`


export default Relleno