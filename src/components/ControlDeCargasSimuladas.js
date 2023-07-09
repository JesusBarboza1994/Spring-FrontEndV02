import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';
import { colors } from "../styles/colors";

const Table2 = styled.table`
  width: 220px;  
  margin:10px 0px;
  background: black;
  font-family: "ABeeZee";
  border: 2px solid grey;
  border-collapse: collapse;
  color: grey;

`
const Table3 = styled.table`
  width: 220px;  
  margin:20px 0px;
  background: black;
  font-family: "ABeeZee";
  border: 2px solid ${colors.grey};
  border-collapse: collapse;
  color: ${colors.grey};

`

const Td = styled.td`
  height: 37.05px;
  text-align: center;
  width: 40px;
  border: 1px solid ${colors.grey};
  font-size: 13px;
    
`
const Input = styled.input`
  width:42px;
  height:18px;
  color:${colors.white};
  background-color: ${colors.black};
  margin:8px;
  font-family:"ABeeZee";
  font-size: 12px;
  border-style:inset;
  border-radius: 4px;   
`
const Th3 = styled.th`
  height: 70px;
  font-size: 14px;
  border: 1px solid ${colors.grey};
  font-family:"ABeeZee";
  letter-spacing: 1px;
  padding-left: 5px;
  padding-right:5px;
  
`
const H2 = styled.h2`
  color: white;
  font-size: 22px;
`
const Button1 = styled.button`
  width:100px;
  height:40px;
  margin:8px 0px 0px 8px;
  background-color: #363636; 
  border-radius: 6px;
  font-family:"ABeeZee";
  letter-spacing: 1px;
  font-size: 12px;
  color: white;
`

export default function ControlDeCargasSimuladas(props) {

    const {controlCargasSimuladas, setControlCargasSimuladas} = useAuth();

    const [puntosCS, setPuntosCS] = useState([
        { id: 1, Fuerza: "", Long: "" },
        { id: 2, Fuerza: "", Long: "" },
        { id: 3, Fuerza: "", Long: "" },
        { id: 4, Fuerza: "", Long: "" },
        { id: 5, Fuerza: "", Long: "" },
        { id: 6, Fuerza: "", Long: "" }
    ])
    
    const [deforms, setDeforms] = useState([
        { id: 1, Def: "" },
        { id: 2, Def: "" },
        { id: 3, Def: "" },
        { id: 4, Def: "" },
        { id: 5, Def: "" },
        { id: 6, Def: "" }
    ])

    

    return(

        <div>
            <Table2>
                <thead>
                    <tr style={{backgroundColor: colors.gray, color: colors.white,}}>
                    
                     <Th3 style={{width: 41}}>N°</Th3>
                     <Th3 style={{width: 63}}>F (kg)</Th3>
                     <Th3 style={{width: 63}}>L (mm)</Th3>
                     <Th3 >x (mm)</Th3>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Td>
                            1
                        </Td>
                        <Td>
                            100
                        </Td>
                        <Td>
                            000.0
                        </Td>
                        <Td>
                            000.0
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            2
                        </Td>
                        <Td>
                            200
                        </Td>
                        <Td>
                            0.0
                        </Td>
                        <Td>
                            0.0
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            3
                        </Td>
                        <Td>
                            300
                        </Td>
                        <Td>
                            0.0
                        </Td>
                        <Td>
                            0.0
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            4
                        </Td>
                        <Td>
                            400
                        </Td>
                        <Td>
                            0.0
                        </Td>
                        <Td>
                            0.0
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            5
                        </Td>
                        <Td>
                            500
                        </Td>
                        <Td>
                            0.0
                        </Td>
                        <Td>
                            0.0
                        </Td>
                    </tr>
                    <tr>
                        <Td>
                            6
                        </Td>
                        <Td>
                            600
                        </Td>
                        <Td>
                            0.0
                        </Td>
                        <Td>
                            0.0
                        </Td>
                    </tr>
                </tbody>
               
            </Table2>
            
        </div>
    )
}