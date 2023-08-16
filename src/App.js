import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import "@fontsource/inter";
import { SimulationData } from "./components/SimulationData";
import { CalcParam } from "./components/CalculatedParameters";
import { WeightTolerance } from "./components/WeightTolerance";
import { Textarea } from "./components/Textarea";
import { Switch, breadcrumbsClasses } from "@mui/material";
import ProcessTable from "./components/processTable";
import TablaControlDeCargas from "./components/tablaControlDeCargas";
import TablaCarrera from "./components/tablaCarrera";
import LongTable from "./components/longTable";
import ProbarFuerza from "./components/probarFuerza";
import GraficoControlCargas from "./components/graficoControlCargas";

import { useAuth } from './context/auth-context';
import { calculateLinearRegression, generatePointForChart } from "./utils/chart-utils";
import { isNullLiteral } from "@babel/types";
import { colors } from "./styles/colors";
import ControlDeCargasSimuladas from "./components/ControlDeCargasSimuladas";

const Form = styled.form`
  display:flex;
  grid-template-columns: auto, auto, auto;
  justify-content: center;
  row-gap: 6px;
  width: 500px;
  color:white;
`
const Div = styled.div`
  display:flex;
  aling-items: center;
  width:125px;
  height:40px;
  margin:3px 16px 14px 16px;
  background: black;
  border:2px solid gray;
  border-radius:8px;
  
`
const Input = styled.input`
  width:40px;
  height:18px;
  color:white;
  background-color: black;
  margin: 9px;
  font-family:"ABeeZee";
  font-size: 12px;
  border-style:inset;
  border-radius: 4px;
  text-align: left;
     
`
const DivCalculo = styled.div`
  width:40px;
  height:18px;
  color: white;
  background-color: black;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:outset;
`
const Label = styled.label`
  height: 20px;
  width: 60px;
  display:block;
  background-color:black;
  margin-top:8px;
  margin-left: 10px;
  font-family:"ABeeZee";
  font-size: 13px;
  color: ${colors.grey};
            
`
const DivSimulForm = styled.div`
  display:flex;
  grid-template-columns: auto, auto, auto;
  flex-wrap: wrap;
  justify-content: center;
  row-gap:none;
  margin-bottom:20px;
  margin-top: 10px;
  margin-left: 50px;
  width: 500px;
  height: 255px;
  background-color: #363636;  
  border-radius:8px;     

`
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
const Button = styled.button`
  width:125px;
  height:40px;
  margin:3px 12px;
  border-radius:8px;
  background-color: #fc1221c5;
  color: white;
  
`
const Length_table = styled.table`
  background-color: black; 
  width:500px;
  //height:270px;
  font-family: "ABeeZee";
  border-collapse: collapse;
  color: grey;
  border: 2px solid grey;
  //border-radius: 8px;
          
`

const Input8 = styled.input`
  width:42px;
  height:18px;
  color:white;
  background-color: black;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 12px;
  border-style:inset;
  border-radius: 4px;
     
`
const Th = styled.th`
  width: 180px;
  height: 70px;
  //writing-mode: vertical-lr;
  //text-orientation: upright;
  font-size: 14px;
  border: 1px solid grey;
  letter-spacing: 1px;
  //border-radius: 8px;
  
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
const Td = styled.td`
  text-align: center;
  //width: 55px;
  border: 1px solid grey;
  
`
// const Table2 = styled.table`
//   width:210px;
//   height:210px;
//   font-family: "ABeeZee";
//   border: 2px solid grey;
//   border-collapse: collapse;
//   color: grey;

// `
const Select = styled.select`
  background-color: black;
  color: white;
  font-family:"ABeeZee";
  font-size: 13px;
  border: 0px;
  margin-left: 0px;

`
const H1 = styled.h1`
 
 color: white;
 font-size: 22px;
 margin-left: 50px;
 margin-top: 20px;
 font-family:"Inter";
 font-style: italic;
`

const H2 = styled.h2`
color: white;
font-size: 18px;
margin-top: 40px;
font-family:"Inter";
font-style: italic;
`

const Canvas = styled.canvas`
 background-color: white;
 width: 500px;
 height: 300px;
 margin-bottom:20px;
 margin-top: 20px;
 margin-left: 50px;
 border-radius: 8px;
`


function App() {

  const [production_data, setProduction_data] = useState({
    LDA:"",      
    LDA_adic:"",         
    Peso:"",
    Dmedio:"",    
  })
    
  const [data4, setData4] = useState({
    K:"",      
    F:"",         
    L:"",        
  })

  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const {filas, dimensions, setDimensions, calculated_data, setCalculated_data, controlCargas, setKControlCargas, setBControlCargas} = useAuth();

  const [puntosCCGrafica, setPuntosCCGrafica] = useState([
    { x: 0, y: 0},
    { x: 0, y: 0}
  ])
  const [regLinealCCGrafica, setRegLinealCCGrafica] = useState([])

  const [lineaCC, setLineaCC] = useState({
    k:0,      
    b:0,
    r2:0          
  })

  //Renee-Fin-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [type1,setType1] = useState("TASE");
  const [type2,setType2] = useState("TASE");
  const [mater,setMater] = useState([
    "SHI-180",
    "SHI-165",
    "CRSI SAE 9254(REC)",
    "CRSI SAE 9254",
    "CRMN SAE 5160",
    "ACC",
    "ACC HS3 GALV",
    "BCC CAL.8-14",
    "CP DSR",
    "CP-DEINFRA",
    "FDSICR (DSR)",
    "FTO",
    "FTO-TWO (DSR)",
    "HD C-DSR",
    "HD CLASE B",
    "HD CLASE C",
    "INOX CLASE A-DSR",
    "INOX CLASE B-DSR",
    "INOX SANDVIK"
  ]);
  
  const [descrip, setDescrip] = useState({
    descrip: "",
  });
  
  const [coef, setCoef] = useState({
    af : 0,
    kf : 0,
    Q_Long : 0,
    toler_L0: 0,
  });
 
  useEffect(() => {
    let extremo1 = type1
    let extremo2 = type2
    setDimensions({...dimensions,
      Ext1: extremo1, Ext2: extremo2
    })

  }, [type1, type2])

  
  useEffect(() => {
    setCalculated_data({...calculated_data,
      C : ((dimensions.Dext-dimensions.d)/dimensions.d).toFixed(2),
      Dmedio: (dimensions.Dext - dimensions.d), Rel_d1 : ((dimensions.Dint1 + dimensions.d)/(dimensions.Dext - dimensions.d)).toFixed(2),
      Rel_d2: ((dimensions.Dint2 + dimensions.d)/(dimensions.Dext - dimensions.d)).toFixed(2)})

  }, [dimensions.d, dimensions.Dext, dimensions.Dint1, dimensions.Dint2])

  useEffect(() => {
    setCalculated_data({...calculated_data, Vt_red_VT : ((dimensions.Vtas1+dimensions.Vtas2)/dimensions.N).toFixed(2) }) 

  }, [dimensions.Vtas1, dimensions.Vtas2, dimensions.N])

  useEffect(() => {
    setProduction_data({...production_data, LDA : Math.round((dimensions.Dext-dimensions.d)*dimensions.N*3.14),  Dmedio: (dimensions.Dext - dimensions.d)})
  }, [dimensions.d, dimensions.Dext, dimensions.N])

  useEffect(() => {
    setProduction_data({...production_data, Peso : (Math.pow(dimensions.d/12.7,2)*production_data.LDA/1000).toFixed(2)}) 
  }, [dimensions.d, production_data.LDA])

  
  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  useEffect(() => {
    let arrayOfPoints = generatePointForChart(controlCargas)
    setPuntosCCGrafica(arrayOfPoints)
    setLineaCC(calculateLinearRegression(arrayOfPoints))

  }, [controlCargas])

  useEffect(() => {
    setKControlCargas(Number(lineaCC.k))
    setBControlCargas(Number(lineaCC.b))

  }, [lineaCC])
  

  //Renee-Fin-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

 
  function handleInput(e){
    setDimensions({...dimensions, [e.target.id]:e.target.value})
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(dimensions)
  }
  function handlePrincipal(e){
    WeightTolerance.setProduction_data({...WeightTolerance.production_data, [e.target.id]:e.target.value})
    console.log(WeightTolerance.production_data)
  }
  
  return (
  <div className="App" style={{backgroundColor:"#1A1A1A", display:"flex", columnGap: 80 }}>
    
    <div>
      <H1> Diseño de Resortes</H1>
      <DivSimulForm>
        <Form onSubmit={handleSubmit}>
          <div>
            <p style={{marginLeft:18,marginTop: 5, fontFamily:"ABeeZee",fontSize:12, }}>Datos principales</p>
              <Div>
                <Label>d</Label>
                <Input  value={dimensions.d} type="number" id={"d"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Dext</Label>
                <Input  value={dimensions.Dext} type="number" id={"Dext"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>N</Label>
                <Input  value={dimensions.N} type="number" id={"N"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>L0</Label>
                <Input  value={dimensions.L0} type="number" id={"L0"} onChange={(e) => handleInput(e)}/>
              </Div>
              
          </div>

          <div>
            <p style={{marginLeft:18,marginTop: 5, fontFamily:"ABeeZee",fontSize:12,}}>Extremo 1</p>
              <Div>
                <Label>Luz1</Label>
                <Input  value={dimensions.Luz1} type="number" id={"Luz1"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Dint1</Label>
                <Input  value={dimensions.Dint1} type="number" id={"Dint1"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Vtas1</Label>
                <Input  value={dimensions.Vtas1} type="number" id={"Vtas1"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Ext1</Label>
                <Select value={type1} id={"Ext1"} onChange={(e) => setType1(e.target.value)}>
                  <option value="TASE">TASE</option>
                  <option value="TCSE">TCSE</option>
                  <option value="TCE">TCE</option>
                  <option value="TAE">TAE</option>
                </Select>
              </Div>
          </div>
          
          <div>
            <p style={{marginLeft:18,marginTop: 5, fontFamily:"ABeeZee",fontSize:12,}}>Extremo 2</p>
              <Div>
                <Label>Luz2</Label>
                <Input  value={dimensions.Luz2} type="number" id={"Luz2"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Dint2</Label>
                <Input  value={dimensions.Dint2} type="number" id={"Dint2"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Vtas2</Label>
                <Input  value={dimensions.Vtas2} type="number" id={"Vtas2"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Ext2</Label>
                <Select  value={type2} id={"Ext2"} onChange={(e) => setType2(e.target.value)}>
                  <option value="TASE">TASE</option>
                  <option value="TCSE">TCSE</option>
                  <option value="TCE">TCE</option>
                  <option value="TAE">TAE</option>
                </Select>
              </Div>
          </div>
            
        </Form>
      </DivSimulForm>

      <SimulationData/>

      <CalcParam diam={dimensions.d} 
            diamext1={dimensions.Dext}
            diamint1={dimensions.Dint1}
            diamint2={dimensions.Dint2}
            vred1={dimensions.Vtas1}
            vred2={dimensions.Vtas2}
            numvts={dimensions.N}
            longitud={dimensions.L0}
            luz1={dimensions.Luz1}
            luz2={dimensions.Luz2}/>
       
      <WeightTolerance/>
      
      <Textarea/>
      <H1>Simulacion</H1>
      <Canvas/>
    </div>

    <div style={{display:"flex", marginTop:58, marginLeft: 50,}}>
      <div>
        <LongTable/>
        <div style={{display:"flex", gap: 200,}}>
         <H2>Cargas reales</H2>
         <H2>Cargas simuladas</H2>
        </div>
        
        <div style={{display:"flex", gap: 100,}}>
          <TablaControlDeCargas L0={dimensions.L0}/>
          <ControlDeCargasSimuladas/>
        </div>

        <div style={{display:"flex", gap: 70,}}>
          <ProbarFuerza/>
          <ProbarFuerza/>
        </div>
        
      </div>
      
    </div> 
    
    <div style={{display:"flex", marginTop:58, marginLeft: 50}}>        
      <div>
        <ProcessTable medidasRes={dimensions} extremo1={dimensions.Ext1} extremo2={dimensions.Ext2}/>
        
        <H2 style={{marginTop:40, marginBottom: 8 }}>Caracteristica del Resorte</H2>
        {/* <canvas style={{
           width: 500,
           height: 400, 
           background: "white",
           borderRadius: 8,
          //  marginTop: 30,
            }}>
              
        </canvas> */}

        <GraficoControlCargas puntos={puntosCCGrafica} slope={lineaCC.k} intercept={lineaCC.b} rSquared={lineaCC.r2}/>

      </div>

    </div>
         
     
  </div> 
   
  
  );
}

export default App;