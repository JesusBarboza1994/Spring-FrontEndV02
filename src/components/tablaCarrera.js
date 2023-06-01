import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';

const Td = styled.td`
  text-align: center;
  width: 40px;
  border: 1px solid grey;

`
const Input = styled.input`
  width:50px;
  height:18px;
  color:black;
  background-color: #adc5fff1;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const Th3 = styled.th`
  height: 80px;
  font-size: 14px;
  border: 1px solid grey;
  
`
const Button1 = styled.button`
  width:125px;
  height:40px;
  margin:10px 14px;
  border-radius:8px;
`

export default function TablaCarrera(props) {

    const setStateCCargas = props.setStateCC

    const {puntos1, setPuntos1, puntos2, setPuntos2} = useAuth();
    
    const [carreras, setCarreras] = useState([
        { id: 1, Carrera: "" },
        { id: 2, Carrera: "" },
        { id: 3, Carrera: "" },
        { id: 4, Carrera: "" },
        { id: 5, Carrera: "" }
    ])

    carreras[0].Carrera = props.Fuerzas[0]/props.RigidezReal
    carreras[1].Carrera = props.Fuerzas[1]/props.RigidezReal
    carreras[2].Carrera = props.Fuerzas[2]/props.RigidezReal
    carreras[3].Carrera = props.Fuerzas[3]/props.RigidezReal

    carreras[4].Carrera = props.data.N*props.data.d //Agregar condicional para vueltas parciales

    return(
        <div style={{backgroundColor: "black"}}>
            <table>
                <thead>
                    <tr style={{backgroundColor: "#5B5B5B", color:"white"}}>
                        <td colSpan="2" align="center">
                            <Th3>Carrera (mm)</Th3>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {carreras.map((punto, indice) => (
                        <tr key={punto.id} style={{color:"white"}}>
                            <Td>
                                {"S"+(punto.id)}
                            </Td>
                            <Td>
                                {punto.Carrera}
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
  }