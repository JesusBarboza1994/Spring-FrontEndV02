import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from "../context/auth-context";
import { colors } from "../styles/colors";
//import { CalculateOrReset3Points } from "./processTable"

import apiFetch from "../services/api-fetch";

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
    margin-left: 50px;
    width: 500px;
    height: 140px; 
    background-color:${colors.gray}; 
    border-radius:8px;      
  `
 const Paragraph = styled.p`
    block-size:1px;
    margin-left:30px;
    margin-bottom: 10px;
    font-family:"ABeeZee";
    font-size:12px;
    width: 138px;
    color: ${colors.white};  
  `
 const Div = styled.div`
    display:flex;
    aling-items: center;
    width:125px;
    height:40px;
    margin:6px 16px 6px 16px;
    background: ${colors.black};
    border:2px solid ${colors.gray}; 
    border-radius:8px;
    
  `
 const Select = styled.select`
    background-color: ${colors.black};
    color: ${colors.white};
    font-family:"ABeeZee";
    font-size: 13px;
    border: 0px;

  `
  const Label = styled.label`
    height: 20px;
    width: 65px;
    display:block;
    background-color:${colors.black};
    margin-top:12px;
    margin-left: 8px;
    font-family:"ABeeZee";
    font-size: 13px;
    color: gray;
              
  `
  const Input = styled.input`
    width:40px;
    height:18px;
    color:${colors.black};
    background-color: ${colors.purple};
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
    background-color: ${colors.back};
    color: ${colors.white};
    
  `

  //NUEVO---------------------------------------------------------------------------------------------------------------------------------------------------------
  const {data, data1, setData1, setStateButtonCalculateProcessTable, setSpringPoints3D} = useAuth();

  const iniciarFuncion = () => {
    setStateButtonCalculateProcessTable(true);
  };
  //NUEVO----------------------------------------------------------------------------------------------------------------------------------------------------------
  const [mater,setMater] = useState("");

  function handleSimulacion(e){
    setData1({...data1, [e.target.id]:e.target.value})
    console.log(data1)
  }

  function handleListaMP(e){
    setMater(e.target.value)
  }


  // Prueba API ------------------------------------------------------------------------------------------------------------------------------------------

  async function createSpring() {

    let endpoint = 'create-spring/';
    let requestBody = {
      "wire":Number(data.d),
      "diam_ext1":Number(data.Dext),
      "diam_ext2":Number(data.Dext2),
      "diam_int1":Number(data.Dint1),
      "diam_int2":Number(data.Dint2),
      "length":Number(data.L0),
      "coils":Number(data.N),
      "coil_direction":"Derecha",
      "end1":data.Ext1,
      "luz1":Number(data.Luz1),
      "coils_red_1":Number(data.Vtas1),
      "coils_amp_1":0,
      "detail1_end1":"-",
      "detail2_end1":"-",
      "detail3_end1":"-",
      "eccentricity1":0,
      "end2":data.Ext2,
      "luz2":Number(data.Luz1),
      "coils_red_2":Number(data.Vtas1),
      "coils_amp_2":0,
      "detail1_end2":"-",
      "detail2_end2":"-",
      "detail3_end2":"-",
      "eccentricity2":0,
      "grade":Number(data1.grado)
    };

    try {
      const response = await apiFetch(endpoint, {
        method: 'POST', 
        body: requestBody, 
      });

      console.log('Resorte creado exitosamente:', response);
      setSpringPoints3D(response)
      
    } catch (error) {
      console.error('Error al crear el resorte:', error.message);
      
    }
  }

  async function simulateSpring() {

    let endpoint = 'simulate-spring/';
    let requestBody = {
      "wire":Number(data.d),
      "diam_ext1":Number(data.Dext),
      "diam_ext2":Number(data.Dext2),
      "diam_int1":Number(data.Dint1),
      "diam_int2":Number(data.Dint2),
      "length":Number(data.L0),
      "coils":Number(data.N),
      "coil_direction":"Derecha",
      "end1":data.Ext1,
      "luz1":Number(data.Luz1),
      "coils_red_1":Number(data.Vtas1),
      "coils_amp_1":0,
      "detail1_end1":"-",
      "detail2_end1":"-",
      "detail3_end1":"-",
      "eccentricity1":0,
      "end2":data.Ext2,
      "luz2":Number(data.Luz1),
      "coils_red_2":Number(data.Vtas1),
      "coils_amp_2":0,
      "detail1_end2":"-",
      "detail2_end2":"-",
      "detail3_end2":"-",
      "eccentricity2":0,
      "grade":Number(data1.grado)
    };

    try {
      const response = await apiFetch(endpoint, {
        method: 'POST', 
        body: requestBody, 
      });

      console.log('Resorte simulado exitosamente:', response);
      //codigo para simular esfuerzos
      
    } catch (error) {
      console.error('Error al simular el resorte:', error.message);
      
    }
  }

  // Prueba API ------------------------------------------------------------------------------------------------------------------------------------------


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
        <div style={{display: "flex",}}>
          <Paragraph>Datos de simulacion</Paragraph>
          <Paragraph></Paragraph>
          <Paragraph style={{textAlign: "center",}}>nodos</Paragraph>
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
          <Label style={{color: colors.red}}>x</Label>
          <Input  value={data1.x} id={"x"} onChange={(e) => handleSimulacion(e)}/>
        </Div>
        
        <Div>
          <Label style={{color: colors.red}}>grado</Label>
          <Input  value={data1.grado} id={"grado"} onChange={(e) => handleSimulacion(e)}/>
        </Div>
        <div style={{display: "flex",columnGap:10,width:"100%", marginLeft: 10}}>
          <Button onClick={createSpring}>Modelar</Button>
          <Button onClick={simulateSpring}>Simular</Button>
          <Button onClick={iniciarFuncion}>Calcular</Button>

        </div>
                                
      </DivSimul>
  )
}