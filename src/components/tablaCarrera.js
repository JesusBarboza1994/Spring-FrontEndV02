import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';
import { colors } from "../styles/colors";

const Td = styled.td`
  text-align: center;
  width: 40px;
  border: 1px solid ${colors.grey};

`
const Input = styled.input`
  width:50px;
  height:18px;
  color:${colors.black};
  background-color: ${colors.purple};
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const Th3 = styled.th`
  height: 80px;
  font-size: 14px;
  border: 1px solid ${colors.grey};
  
`
const Button1 = styled.button`
  width:125px;
  height:40px;
  margin:10px 14px;
  border-radius:8px;
`

export default function TablaCarrera() {

    const {data, processTableStage1, setProcessTableStage1, processTableStage2, setProcessTableStage2, kControlCargas, bControlCargas, l4} = useAuth();
    
    const [carreras, setCarreras] = useState([
        { id: 1, Carrera: "" },
        { id: 2, Carrera: "" },
        { id: 3, Carrera: "" },
        { id: 4, Carrera: "" },
        { id: 5, Carrera: "" }
    ])

    const [fuerzas, setFuerzas] = useState([469.7,795.5,1001.0])

    carreras[0].Carrera = ((fuerzas[0]-bControlCargas)/kControlCargas)
    carreras[1].Carrera = ((fuerzas[1]-bControlCargas)/kControlCargas)
    carreras[2].Carrera = ((fuerzas[2]-bControlCargas)/kControlCargas)
    carreras[3].Carrera = data.L0 - l4


    if (((data.Ext1 === "TASE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TCSE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TASE") && (data.Ext2 === "TCSE"))) {
        carreras[4].Carrera = data.L0-((Number(data.N) +1)*Number(data.d))
    } else if (((data.Ext1 === "TAE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TCE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TAE") && (data.Ext2 === "TCE"))) {
        carreras[4].Carrera = data.L0-((Number(data.N) +1)*Number(data.d) - Number(data.d))  
    } else {
        carreras[4].Carrera = data.L0-((Number(data.N) +1)*Number(data.d) - 0.5*Number(data.d))  
    }

    return(
        <div style={{backgroundColor: colors.black}}>
            <table>
                <thead>
                    <tr style={{backgroundColor: colors.gray, color:colors.white}}>
                        <td colSpan="2" align="center">
                            <Th3>Carrera (mm)</Th3>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {carreras.map((punto, indice) => (
                        <tr key={punto.id} style={{color:colors.white}}>
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