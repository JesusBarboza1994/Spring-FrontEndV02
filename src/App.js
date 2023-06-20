import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";

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

const Form = styled.form`
  display:flex;
  grid-template-columns: auto, auto, auto;
  gap:6px;
  
  width: 480px;
  //background: #9656fc64;
  color:white;
`
const Div = styled.div`
  display:flex;
  aling-items: center;
  width:125px;
  height:40px;
  margin:6px 12px;
  background: black;
  border:2px solid gray;
  border-radius:8px;
  
`
const Input = styled.input`
  width:40px;
  height:18px;
  color:black;
  background-color: #adc5fff1;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const DivCalculo = styled.div`
  width:40px;
  height:18px;
  color:black;
  background-color: white;
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
const DivSimul = styled.div`
  display:flex;
  grid-template-columns: auto, auto, auto;
  flex-wrap: wrap;
  column-gap:8px;
  row-gap:none;
  margin-bottom:30px;
  margin-top: 10px;
  width: 480px;
  //background-color: #9656fc64;  
  background-color:#5B5B5B;
  border-radius:8px;        
`
const Paragraph = styled.p`
  block-size:1px;
  margin-left:15px;
  margin-bottom: 8px;
  font-family:"ABeeZee";
  font-size:11px;
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
  width: 520px;
  //height:270px;
  font-family: "ABeeZee";
  border-collapse: collapse;
  color: grey;
  border: 2px solid grey;
  //border-radius: 8px;
          
`

const Input8 = styled.input`
  width:50px;
  height:18px;
  color:black;
  background-color: #cadefc;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const Th = styled.th`
  width: 110px;
  height: 70px;
  //writing-mode: vertical-lr;
  //text-orientation: upright;
  font-size: 14px;
  border: 1px solid grey;
  letter-spacing: 1px;
  //border-radius: 8px;
  
`
const Th2 = styled.th`
  width: 150px;
  text-align: left;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 10px;
  border: 1px solid grey;
  color: grey;
`
const Td = styled.td`
  text-align: center;
  width: 40px;
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

  const {filas, data, setData, data2, setData2, controlCargas, setKControlCargas, setBControlCargas} = useAuth();

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
   <div className="App" style={{backgroundColor:"black", display:"flex"}}>
    
    <div style={{backgroundColor:"black"}}>
      
      <Form onSubmit={handleSubmit}>
        <div>
          <p style={{blockSize:2,marginLeft:14,fontFamily:"ABeeZee",fontSize:11, }}>Datos principales</p>
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
            <button style={{width:125,
                            height:40,
                            margin:"10px 14px",
                            borderRadius:8, 
                            backgroundColor: "#fc1221c5", color: "white"}}>Enviar</button>
        </div>

        <div>
          <p style={{blockSize:2,marginLeft:14,fontFamily:"ABeeZee",fontSize:11, }}>Extremo 1</p>
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
          <p style={{blockSize:2,marginLeft:14,fontFamily:"ABeeZee",fontSize:11, }}>Extremo 2</p>
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

      <DivSimul>
        <Paragraph style={{width: 480}}>Calculos teoricos</Paragraph>
        <Div>
            <Label>K</Label>
            <DivCalculo id={"K"}>{(!isNaN(filas.Keq3) && Number.isFinite(filas.Keq3) ) === true ? (filas.Keq3).toFixed(2) : ""}</DivCalculo>
        </Div>
        <Div>
            <Label>F</Label>
            <DivCalculo id={"F"}>{(!isNaN(filas.Fc3) && Number.isFinite(filas.Fc3) ) === true ? (filas.Fc3).toFixed(1) : ""}</DivCalculo> 
        </Div>
        <Div>
            <Label>L</Label>
            <DivCalculo id={"L"}>{(!isNaN(filas.Xc3) && Number.isFinite(filas.Xc3) && isNullLiteral(filas.Xc3)) === true ? (filas.Xc3).toFixed(1) : ""}</DivCalculo>
        </Div>
      </DivSimul>
    </div>

    <div style={{backgroundColor:"black", display:"flex", columnGap:50, marginTop:28, marginLeft: 28,}}>

      <div>
        <div style={{display:"flex", justifyContent:"center",paddingTop:94,}}>
          <LongTable/>
          <Table2 >
                <tr style={{height:30,backgroundColor: "#5B5B5B", color:"white"}}>
                  <th> F </th>
                  <th> L </th>
                  <th> d </th>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>123</Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
          </Table2> */}
          <TablaControlDeCargas L0={data.L0} />
        </div>

        <DivSimul> 
            <Paragraph style={{width: 480}}>Calculos reales</Paragraph>
            <Div>
                <Label>K</Label>
                <DivCalculo id={"K"}>{data4.K}</DivCalculo>
            </Div>
            <Div>
                <Label>F</Label>
                <DivCalculo id={"F"}>{data4.F}</DivCalculo>
            </Div>
            <Div>
                <Label>L</Label>
                <DivCalculo id={"L"}>{data4.L}</DivCalculo>
            </Div>
        </DivSimul>

      </div>  
    </div> 
    
    <ProcessTable medidasRes={data} extremo1={data.Ext1} extremo2={data.Ext2}/>
      
    <div style={{backgroundColor:'black'}}>
      <TablaControlDeCargas L0={data.L0} />
      <ProbarFuerza/>
    </div>
     
    <GraficoControlCargas puntos={puntosCCGrafica} slope={lineaCC.k} intercept={lineaCC.b} rSquared={lineaCC.r2}/>
     
   </div>   
  );
}

export default App;