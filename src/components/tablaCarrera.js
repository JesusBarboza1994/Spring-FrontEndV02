import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";

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
    
    const [carreras, setCarreras] = useState([
        { id: 1, Carrera: "" },
        { id: 2, Carrera: "" },
        { id: 3, Carrera: "" }
    ])

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