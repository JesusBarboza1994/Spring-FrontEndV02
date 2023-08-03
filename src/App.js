import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
//import "@fontsource/inter.css";

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
import Spring3D from "./components/Spring3D";
import Spring3DLine from "./components/Spring3DLine";

import { useAuth } from './context/auth-context';
import { calculateLinearRegression, generatePointForChart } from "./utils/chart-utils";
import { isNullLiteral } from "@babel/types";

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
  margin:6px 16px 14px 16px;
  background: black;
  border:2px solid gray;
  border-radius:8px;
  
`
const Input = styled.input`
  width:40px;
  height:18px;
  color:white;
  background-color: black;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 12px;
  border-style:inset;
  border-radius: 4px;
     
`
const DivCalculo = styled.div`
  width:40px;
  height:18px;
  color:white;
  background-color: black;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:outset;
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
const DivSimulForm = styled.div`
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
const Table1 = styled.table`
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

`
const H2 = styled.h2`
  color: white;
  font-size: 22px;
`

const Canvas = styled.canvas`
 background-color: white;
 width: 500px;
 height: 300px;
 margin-bottom:20px;
 margin-top: 30px;
 margin-left: 50px;
 border-radius: 8px;
`


function App() {

  const [data3, setData3] = useState({
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

  const {filas, data, setData, data2, setData2, controlCargas, setKControlCargas, setBControlCargas,springPoints3D} = useAuth();

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
    setData({...data,
      Ext1: extremo1, Ext2: extremo2
    })

  }, [type1, type2])

  
  useEffect(() => {
    setData2({...data2,
      C : ((data.Dext-data.d)/data.d).toFixed(2),
      Dmedio: (data.Dext - data.d), Rel_d1 : ((data.Dint1 + data.d)/(data.Dext - data.d)).toFixed(2),
      Rel_d2: ((data.Dint2 + data.d)/(data.Dext - data.d)).toFixed(2)})

  }, [data.d, data.Dext, data.Dint1, data.Dint2])

  useEffect(() => {
    setData2({...data2, Vt_red_VT : ((data.Vtas1+data.Vtas2)/data.N).toFixed(2) }) 

  }, [data.Vtas1, data.Vtas2, data.N])

  useEffect(() => {
    setData3({...data3, LDA : Math.round((data.Dext-data.d)*data.N*3.14),  Dmedio: (data.Dext - data.d)})
  }, [data.d, data.Dext, data.N])

  useEffect(() => {
    setData3({...data3, Peso : (Math.pow(data.d/12.7,2)*data3.LDA/1000).toFixed(2)}) 
  }, [data.d, data3.LDA])

  
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
    setData({...data, [e.target.id]:e.target.value})
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(data)
  }
  function handlePrincipal(e){
    WeightTolerance.setData3({...WeightTolerance.data3, [e.target.id]:e.target.value})
    console.log(WeightTolerance.data3)
  }
  
  return (
  <div className="App" style={{backgroundColor:"#1A1A1A", display:"flex"}}>
    
    <div>
      <h1 style={{fontSize:22, marginLeft: 50, fontFamily:"Inter", color:"white"}}> Diseño de Resortes</h1>
      <DivSimulForm>
        <Form onSubmit={handleSubmit}>
          <div>
            <p style={{marginLeft:18,marginBottom: 6,fontFamily:"ABeeZee",fontSize:12, }}>Datos principales</p>
              <Div>
                <Label>d</Label>
                <Input  value={data.d} type="number" id={"d"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Dext</Label>
                <Input  value={data.Dext} type="number" id={"Dext"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>N</Label>
                <Input  value={data.N} type="number" id={"N"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>L0</Label>
                <Input  value={data.L0} type="number" id={"L0"} onChange={(e) => handleInput(e)}/>
              </Div>
              
          </div>

          <div>
            <p style={{marginLeft:18,marginBottom: 6,fontFamily:"ABeeZee",fontSize:12,}}>Extremo 1</p>
              <Div>
                <Label>Luz1</Label>
                <Input  value={data.Luz1} type="number" id={"Luz1"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Dint1</Label>
                <Input  value={data.Dint1} type="number" id={"Dint1"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Vtas1</Label>
                <Input  value={data.Vtas1} type="number" id={"Vtas1"} onChange={(e) => handleInput(e)}/>
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
            <p style={{marginLeft:18,marginBottom: 6,fontFamily:"ABeeZee",fontSize:12,}}>Extremo 2</p>
              <Div>
                <Label>Luz2</Label>
                <Input  value={data.Luz2} type="number" id={"Luz2"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Dint2</Label>
                <Input  value={data.Dint2} type="number" id={"Dint2"} onChange={(e) => handleInput(e)}/>
              </Div>
              <Div>
                <Label>Vtas2</Label>
                <Input  value={data.Vtas2} type="number" id={"Vtas2"} onChange={(e) => handleInput(e)}/>
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

      <CalcParam diam={data.d} 
            diamext1={data.Dext}
            diamint1={data.Dint1}
            diamint2={data.Dint2}
            vred1={data.Vtas1}
            vred2={data.Vtas2}
            numvts={data.N}
            longitud={data.L0}
            luz1={data.Luz1}
            luz2={data.Luz2}/>
       
      <WeightTolerance/>
      
      <Textarea/>

      <Canvas/>
    </div>

    <div style={{display:"flex", marginTop:58, marginLeft: 50,}}>
      <div>
        <LongTable/>
        <TablaControlDeCargas L0={data.L0} />
        <ProbarFuerza/>
      </div>
      
    </div> 

    <div style={{backgroundColor:"black", display:"flex", columnGap:50, marginTop:28, marginLeft: 28}}>


      <div style={{display:"flex", marginTop:58, marginLeft: 50}}>        
        <div>
          <ProcessTable medidasRes={data} extremo1={data.Ext1} extremo2={data.Ext2}/>
          
          <H2 style={{marginTop:40,}}>Caracteristica del Resorte</H2>
          

          <GraficoControlCargas puntos={puntosCCGrafica} slope={lineaCC.k} intercept={lineaCC.b} rSquared={lineaCC.r2}/>
          <div style={{backgroundColor:"white"}} >
            <Spring3D points={springPoints3D} wire={data.d}></Spring3D>
            <Spring3DLine points={springPoints3D} wire={data.d}></Spring3DLine>
          </div>
        </div>

      </div>

      
    
     
    </div> 
   
  </div>


  );
}

export default App;