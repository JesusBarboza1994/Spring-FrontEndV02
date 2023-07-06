import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';

const Td = styled.td`
  height: 36px;
  text-align: center;
  border: 1px solid grey;
  font-size: 13px;
`
const Input = styled.input`
  width:50px;
  height:18px;
  color: white;
  background-color: black;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 12px;
  border-style:inset;
  border-radius: 4px;  
`
const Th3 = styled.th`
  height: 80px;
  font-size: 14px;
  border: 1px solid grey;
  
`
const Th = styled.th`
    width: 180px;
    height: 70px;
    //writing-mode: vertical-lr;
    //text-orientation: upright;
    font-size: 14px;
    border: 1px solid grey;
    letter-spacing: 1px;
  
`
const Input1 = styled.input`
  width:42px;
  height:18px;
  color: white;
  background-color: black;
  margin:5px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
  border-radius: 4px;  
`
const Th2 = styled.th`
width: 200px;
height: 20px;
text-align: left;
font-size: 14px;
letter-spacing: 1px;
padding: 10px;
border: 1px solid grey;
color: grey;
`
const Table1 = styled.table`
background-color: black; 
width:500px;
//height:270px;
font-family: "ABeeZee";
border-collapse: collapse;
color: grey;
border: 2px solid grey;
      
`

export default function LongTable() {

    const {data, processTableStage1, processTableStage2, kControlCargas, bControlCargas, l4, filas, data2} = useAuth();
    
    const nombreFilas = ["L instalada","L carga","L máxima","L4","L bloqueo"]

    //Linst, Lcarga, Lmax, L4, Lbloqueo
    const [inputLongTable, setInputLongTable] = useState([0,0,0,0,0]);

    const [carreraTotal, setCarreraTotal] = useState([0,0,0,0,0])
    const [fuerza, setFuerza] = useState([0,0,0,0,0])
    const [esfuerzo, setEsfuerzo] = useState([0,0,0,0,0])
    const [carreraParcial, setCarreraParcial] = useState([0,0,0,0,0])

    const [fuerzas, setFuerzas] = useState([469.7,795.5,1001.0])

    let Lmedio = 0
    if (((data.Ext1 === "TASE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TCSE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TASE") && (data.Ext2 === "TCSE"))) {
        Lmedio = Number(data.L0)-Number(data.d)
        inputLongTable[4]=(Number(data.N)+1)*Number(data.d) //Lbloqueo
    } else if (((data.Ext1 === "TAE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TCE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TAE") && (data.Ext2 === "TCE"))) {
        Lmedio = Number(data.L0)
        inputLongTable[4]=(Number(data.N)+1)*Number(data.d)-Number(data.d) //Lbloqueo
    } else {
        Lmedio = Number(data.L0)-Number(data.d)/2 
        inputLongTable[4]=(Number(data.N)+1)*Number(data.d)-0.5*Number(data.d) //Lbloqueo
    }

    function handleTab(e){
        let inputLongTableNuevo = [...inputLongTable]
        console.log("inputLongTableNuevo")
        console.log(inputLongTableNuevo)
        if (e.target.id == 0){
            inputLongTableNuevo[0] = e.target.value
            setInputLongTable(inputLongTableNuevo);
        }
        else if (e.target.id == 1){
            inputLongTableNuevo[1] = e.target.value
            setInputLongTable(inputLongTableNuevo);
        }
        else if (e.target.id == 2){
            inputLongTableNuevo[2] = e.target.value
            setInputLongTable(inputLongTableNuevo);
        }
        else if (e.target.id == 3){
            inputLongTableNuevo[3] = e.target.value
            setInputLongTable(inputLongTableNuevo);
        }
    }  
    
    useEffect(() => {
        let s1=data.L0-inputLongTable[0];
        let s2=data.L0-inputLongTable[1];
        let s3=data.L0-inputLongTable[2];
        let s4=data.L0-inputLongTable[3];
        let sc=data.L0-inputLongTable[4];
    
        let F1=0; let F2=0; let F3=0; let F4=0; let FC=0;
        let Tau1=0; let Tau2=0; let Tau3=0; let Tau4=0; let TauC=0;
        let Compr1=0; let Compr2=0; let Compr3=0; let Compr4=0; let ComprC=0;

        let contDec1 = processTableStage2.length-1 
        
        while (contDec1 >= 0) {
            if (s1<processTableStage2[contDec1].Xc){
                F1=(processTableStage2[contDec1].Keq*s1+processTableStage2[contDec1].b)/9.81
            }
            if (s2<processTableStage2[contDec1].Xc){
                F2=(processTableStage2[contDec1].Keq*s2+processTableStage2[contDec1].b)/9.81
            }
            if (s3<processTableStage2[contDec1].Xc){
                F3=(processTableStage2[contDec1].Keq*s3+processTableStage2[contDec1].b)/9.81
            }
            if (s4<processTableStage2[contDec1].Xc){
                F4=(processTableStage2[contDec1].Keq*s4+processTableStage2[contDec1].b)/9.81
            }

            contDec1 = contDec1 -1
        }

        FC = (processTableStage2[processTableStage2.length-1].Keq*sc+processTableStage2[processTableStage2.length-1].b)/9.81
    
        Tau1=(8*data2.Dmedio*F1*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)
        Tau2=(8*data2.Dmedio*F2*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)
        Tau3=(8*data2.Dmedio*F3*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)
        Tau4=(8*data2.Dmedio*F4*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)
        TauC=(8*data2.Dmedio*FC*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)
    
        Compr1=Number((s1/(data.L0-inputLongTable[4])).toFixed(2))*100;
        Compr2=Number((s2/(data.L0-inputLongTable[4])).toFixed(2))*100;
        Compr3=Number((s3/(data.L0-inputLongTable[4])).toFixed(2))*100;
        Compr4=Number((s4/(data.L0-inputLongTable[4])).toFixed(2))*100;
        ComprC=Number((sc/(data.L0-inputLongTable[4])).toFixed(2))*100;
        
        let carreraTotalNuevo = [s1,s2,s3,s4,sc]
        setCarreraTotal(carreraTotalNuevo)
        let fuerzaNuevo = [F1, F2, F3, F4, FC]
        setFuerza(fuerzaNuevo)
        let esfuerzoNuevo = [Tau1, Tau2, Tau3, Tau4, TauC]
        setEsfuerzo(esfuerzoNuevo)
        let carreraParcialNuevo = [Compr1,Compr2,Compr3,Compr4,ComprC]
        setCarreraParcial(carreraParcialNuevo)
        
    }, [inputLongTable[0], inputLongTable[1], inputLongTable[2], inputLongTable[3]])

    return(
        <div style={{backgroundColor: "black"}}>
            
            <Table1>
                <thead>
                    <tr style={{backgroundColor: "#5B5B5B", color:"white",}}>
                        <Th> </Th>
                        <Th style={{width: 90}}>Long (mm)</Th>
                        <Th style={{width: 80}}>X (mm)</Th>
                        <Th style={{width: 80}}>LL-G (mm)</Th>
                        <Th style={{width: 90}}>Fuerza (kg)</Th>
                        <Th style={{width: 90}}>Esf (MPa)</Th>
                        <Th style={{width: 60}}>Compr. (%)</Th>
                    </tr>
                </thead>
                <tbody>
                    {nombreFilas.map((fila, indice) => (
                        <tr style={{color:"white"}}>
                            <Td>
                                {fila}
                            </Td>
                            <Td>
                            {
                                indice > 3 ? ((!isNaN(inputLongTable[indice]) && Number.isFinite(inputLongTable[indice]) && (inputLongTable[indice] !== 0)) === true ? (inputLongTable[indice]).toFixed(2) : "") : <Input1 type="number" value={inputLongTable[indice]} id={indice} onChange={(e) => handleTab(e)}/>
                            }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(carreraTotal[indice]) && Number.isFinite(carreraTotal[indice])) === true ? (carreraTotal[indice]).toFixed(2) : ""
                                }
                            </Td>
                            <Td>
                                --
                            </Td>
                            <Td>
                                {
                                    (!isNaN(fuerza[indice]) && Number.isFinite(fuerza[indice])) === true ? (fuerza[indice]).toFixed(2) : ""
                                }
                            </Td>
                            <Td>
                                { 
                                    (!isNaN(esfuerzo[indice]) && Number.isFinite(esfuerzo[indice])) === true ? (esfuerzo[indice]).toFixed(2) : ""
                                }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(carreraParcial[indice]) && Number.isFinite(carreraParcial[indice])) === true ? (carreraParcial[indice]).toFixed(0) : ""
                                }%
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table1>

        </div>
    )
}