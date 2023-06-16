import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from "../context/auth-context";
//import { CalculateOrReset3Points } from "./processTable"

export function SimulationData(){
  
  const DivSimul = styled.div`
    display:flex;
    grid-template-columns: auto, auto, auto;
    flex-wrap: wrap;
    justify-content: center;
    //column-gap:8px;
    row-gap:none;
    margin-bottom:20px;
    margin-top: 10px;
    margin-left: 30px;
    width: 500px;
    height: 140px;
    background-color: #363636;
    border-radius:8px;      
  `
 const Paragraph = styled.p`
    block-size:1px;
    margin-left:30px;
    margin-bottom: 10px;
    font-family:"ABeeZee";
    font-size:12px;
    color: white;  
    width: 148px;
  `
 const Div = styled.div`
    display:flex;
    aling-items: center;
    width:125px;
    height:40px;
    margin:6px 16px 6px 16px;
    background: black;
    border:2px solid gray;
    border-radius:8px;
    
  `
 const Select = styled.select`
    background-color: black;
    color: white;
    font-family:"ABeeZee";
    font-size: 13px;
    border: 0px;

  `
  const Label = styled.label`
    height: 20px;
    width: 65px;
    display:block;
    background-color:black;
    margin-top:12px;
    margin-left: 8px;
    font-family:"ABeeZee";
    font-size: 13px;
    color: gray;
              
  `
  const Input = styled.input`
    width:40px;
    height:18px;
    color:white;
    background-color: black;
    margin:8px;
    font-family:"ABeeZee";
    font-size: 12px;
    border-radius: 4px;
    border-style:inset;
      
  `
const Button = styled.button`
    width:125px;
    height:40px;
    margin:3px 12px;
    border-radius:8px;
    background-color: #fc1221c5;
    color: white;
    
  `
  const {data1, setData1} = useAuth();

  const [mater,setMater] = useState("");

  function handleSimulacion(e){
    setData1({...data1, [e.target.id]:e.target.value})
    console.log(data1)
  }

  function handleListaMP(e){
    setMater(e.target.value)
  }

  useEffect(() => {
    let material = mater
    setData1({...data1,
       Mater: material
    })
    console.log(material)
    console.log(data1)

    let mostrarMP = data1.Mater
    console.log(mostrarMP)
  }, [mater])

  return(
    <DivSimul>
        <div style={{display: "flex", marginLeft: 30,}}>
          <Paragraph>Datos de simulacion</Paragraph>
          <Paragraph></Paragraph>
          <Paragraph>nodos</Paragraph>
        </div>
      
        <Div style={{width:138}}>
          
          <Select style={{color: "white",borderRadius:8,}} id={"Mater"} value={mater} onChange={(e) => handleListaMP(e)}>
            <option style={{color: "#EE7272"}}>Seleccionar MP</option>
            <option value="SHI-165">SHI-165</option>
            <option value="SHI-180">SHI-180</option>
            <option value="CRSI SAE 9254(REC)">CRSI SAE 9254(REC)</option>
            <option value="CRSI SAE 9254">CRSI SAE 9254</option>
            <option value="CRMN SAE 5160">CRMN SAE 5160</option>
            <option value="ACC">ACC</option>
            <option value="HS3 GALV">HS3 GALV</option>
            <option value="BCC CAL.8-14">BCC CAL.8-14</option>
            <option value="CP DSR">CP DSR</option>
            <option value="CP-DEINFRA">CP-DEINFRA</option>
            <option value="FDSICR (DSR)">FDSICR (DSR)</option>
            <option value="FTO">FTO</option>
            <option value="FTO-TWO (DSR)">FTO-TWO (DSR)</option>
            <option value="HD C-DSR">HD C-DSR</option>
            <option value="HD CLASE B">HD CLASE B</option>
            <option value="HD CLASE C">HD CLASE C</option>
            <option value="INOX CLASE A-DSR">INOX A-DSR</option>
            <option value="INOX CLASE B-DSR">INOX B-DSR</option>
            <option value="INOX SANDVIK">INOX SANDVIK</option>
                          
          </Select>
        </Div>
        
        <Div style={{marginLeft: 0}}>
          <Label style={{color: "#EE7272"}}>x</Label>
          <Input  value={data1.x} id={"x"} onChange={(e) => handleSimulacion(e)}/>
        </Div>
        
        <Div>
          <Label style={{color: "#EE7272"}}>grado</Label>
          <Input  value={data1.grado} id={"grado"} onChange={(e) => handleSimulacion(e)}/>
        </Div>
        <div style={{display: "flex",columnGap:170,width:"100%", marginLeft: 16}}>
          <Button>Simular</Button>
          
          <Button>Calcular</Button>
        </div>
                                
      </DivSimul>
  )
}