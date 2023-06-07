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
import { useAuth } from './context/auth-context';
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
  height:380px;
  font-family: "ABeeZee";
  border: 2px solid grey;
  border-collapse: collapse;
  color: grey;
      
`
const Input8 = styled.input`
  width:50px;
  height:18px;
  color:black;
  background-color: #cadefc;
  margin:5px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const Th = styled.th`
  width: 100px;
  height: 170px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  font-size: 13px;
  border: 1px solid grey;
  
`
const Th2 = styled.th`
  width: 120px;
  text-align: left;
  font-size: 13px;
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
const Table2 = styled.table`
  width:210px;
  height:210px;
  font-family: "ABeeZee";
  border: 2px solid grey;
  border-collapse: collapse;
  color: grey;

`
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

  //const {filas, setFilas, data1, setData1, data, setData, data2, setData2} = useAuth();
    
  const [data4, setData4] = useState({
    K:"",      
    F:"",         
    L:"",        
  })

  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const {filas, setFilas, data1, setData1, data, setData, data2, setData2, processTableStage1, setProcessTableStage1, processTableStage2, setProcessTableStage2, controlCargas, setControlCargas, kControlCargas, setKControlCargas, bControlCargas, setBControlCargas} = useAuth();

  const [puntosCCGrafica, setPuntosCCGrafica] = useState([
    { x: 0, y: 0},
    { x: 0, y: 0}
  ])
  const [regLinealCCGrafica, setRegLinealCCGrafica] = useState([])

  const [lineaCC, setLineaCC] = useState({
    k:0,      
    b:0          
  })

  const [fuerzas, setFuerzas] = useState([340.5,498.31,622.89])

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
 
  const [valuetab, setValuetab] = useState({
  Linst: 0,
  Lcarga: 0,
  Lmax: 0,
  L4: 0,
  Lbloqueo: 0
  });

  const [carrera, setCarrera] = useState({
    carrCarga: "",
    carrMax: "",
    carrL4: "",
    carrLc: "",
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    sc: "",
    Finst: "",
    Fcarg: "",
    Fmax: "",
    F4: "",
    TauK1: "",
    TauK2: "",
    TauK3: "",
    TauK4: "",
    TauKC: "",
    Compres1: "",
    Compres2: "",
    Compres3: "",
    Compres4: "",
  })
 
  useEffect(() => {
    let extremo1 = type1
    let extremo2 = type2
    setData({...data,
      Ext1: extremo1, Ext2: extremo2
    })

    console.log("Extremos actualizados")
    console.log(data)

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

  useEffect(() => {
    let Lbloq=0;
    if(data.Ext1=="TASE" && data.Ext2=="TASE" || data.Ext1=="TCSE" && data.Ext2=="TCSE" || data.Ext1=="TCSE" && data.Ext2=="TASE" || data.Ext1=="TASE" && data.Ext2=="TCSE"){
      Lbloq=(Number(data.N)+1)*Number(data.d);
      
    }else if(data.Ext1=="TASE" && data.Ext2=="TAE" || data.Ext1=="TCSE" && data.Ext2=="TAE" || data.Ext1=="TASE" && data.Ext2=="TCE" || data.Ext1=="TCSE" && data.Ext2=="TCE" ||
      data.Ext2=="TASE" && data.Ext1=="TAE" || data.Ext2=="TCSE" && data.Ext1=="TAE" || data.Ext2=="TASE" && data.Ext1=="TCE" || data.Ext2=="TCSE" && data.Ext1=="TCE"){
      Lbloq=(Number(data.N)+1)*Number(data.d)-0.5*Number(data.d);

    }else{
      Lbloq=(Number(data.N)+1)*Number(data.d)-Number(data.d);
    }
        
    setValuetab({...valuetab,
    Lbloqueo: Lbloq.toFixed(1)
    })

  }, [data.Ext1, data.Ext2])
  

  useEffect(() => {
    let s1=data.L0-valuetab.Linst;
    let s2=data.L0-valuetab.Lcarga;
    let s3=data.L0-valuetab.Lmax;
    let s4=data.L0-valuetab.L4;
    let sc=data.L0-valuetab.Lbloqueo;

    let F1=0; let F2=0; let F3=0; let F4=0;
    let Tau1=0; let Tau2=0; let Tau3=0; let Tau4=0; let TauC=0;
    let Compr1=0; let Compr2=0; let Compr3=0; let Compr4=0;


    if (s1<filas.Xc1){
      F1=Number(((filas.Keq1*s1+filas.b1)/9.81).toFixed(1)); 
    }else if(s1<filas.Xc2){
      F1=Number(((filas.Keq2*s1+filas.b2)/9.81).toFixed(1));
    }else{
      F1=Number(((filas.Keq3*s1+filas.b3)/9.81).toFixed(1));
    }

    if (s2<filas.Xc1){
      F2=Number(((filas.Keq1*s2+filas.b1)/9.81).toFixed(1)); 
    }else if(s2<filas.Xc2){
      F2=Number(((filas.Keq2*s2+filas.b2)/9.81).toFixed(1));
    }else{
      F2=Number(((filas.Keq3*s2+filas.b3)/9.81).toFixed(1));
    }

    if (s3<filas.Xc1){
      F3=Number(((filas.Keq1*s3+filas.b1)/9.81).toFixed(1)); 
    }else if(s3<filas.Xc2){
      F3=Number(((filas.Keq2*s3+filas.b2)/9.81).toFixed(1));
    }else{
      F3=Number(((filas.Keq3*s3+filas.b3)/9.81).toFixed(1));
    }

    if (s4<filas.Xc1){
      F4=Number(((filas.Keq1*s4+filas.b1)/9.81).toFixed(1)); 
    }else if(s4<filas.Xc2){
      F4=Number(((filas.Keq2*s4+filas.b2)/9.81).toFixed(1));
    }else{
      F4=Number(((filas.Keq3*s4+filas.b3)/9.81).toFixed(1));
    }

    Tau1=Number(((8*data2.Dmedio*F1*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)).toFixed(1));
    Tau2=Number(((8*data2.Dmedio*F2*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)).toFixed(1));
    Tau3=Number(((8*data2.Dmedio*F3*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)).toFixed(1));
    Tau4=Number(((8*data2.Dmedio*F4*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)).toFixed(1));
    TauC=Number(((8*data2.Dmedio*filas.Fc3*9.81)/(3.14*Math.pow(data.d,3))*((4*data2.C-1)/(4*data2.C-4)+0.615/data2.C)).toFixed(1));

    Compr1=Number((s1/(data.L0-valuetab.Lbloqueo)).toFixed(2))*100;
    Compr2=Number((s2/(data.L0-valuetab.Lbloqueo)).toFixed(2))*100;
    Compr3=Number((s3/(data.L0-valuetab.Lbloqueo)).toFixed(2))*100;
    Compr4=Number((s4/(data.L0-valuetab.Lbloqueo)).toFixed(2))*100;
  
    setCarrera({...carrera,
      carrCarga : (valuetab.Linst-valuetab.Lcarga).toFixed(1),
      carrMax: (valuetab.Linst-valuetab.Lmax).toFixed(1),
      carrL4: (valuetab.Linst-valuetab.L4).toFixed(1),
      carrLc: (valuetab.Linst-valuetab.Lbloqueo).toFixed(1),
      // s1: (data.L0-valuetab.Linst),
      // s2: (data.L0-valuetab.Lcarga),
      // s3: (data.L0-valuetab.Lmax),
      // s4: (data.L0-valuetab.L4),
      // sc: (data.L0-valuetab.Lbloqueo),
      Finst: F1,
      Fcarg: F2,
      Fmax: F3,
      F4: F4,
      TauK1: Tau1,
      TauK2: Tau2,
      TauK3: Tau3,
      TauK4: Tau4,
      TauKC: TauC,
      Compres1: Compr1,
      Compres2: Compr2,
      Compres3: Compr3,
      Compres4: Compr4,
    }) 
  }, [valuetab.Linst, valuetab.Lcarga, valuetab.Lmax, valuetab.L4,])

  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  useEffect(() => {
    
    let array1 = JSON.parse(JSON.stringify(controlCargas))
    let array2 = []

    array1.map((punto, indice) => {
      let dato = {x: punto.Def, y: punto.Fuerza}
      if (indice>0){
        array2.push(dato)
      }
    });

    setPuntosCCGrafica(array2)

    let regresionLineal = calculateLinearRegression(array2)
    setRegLinealCCGrafica(regresionLineal)

  }, [controlCargas])

  function calculateLinearRegression(data) {
    let sumX = data.reduce((acc, point) => acc + point.x, 0);
    let sumY = data.reduce((acc, point) => acc + point.y, 0);
    let sumXY = data.reduce((acc, point) => acc + point.x * point.y, 0);
    let sumXSquared = data.reduce((acc, point) => acc + point.x ** 2, 0);
    let n = data.length;

    let slope = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX ** 2);
    let intercept = (sumY - slope * sumX) / n;

    setKControlCargas(slope)
    setBControlCargas(intercept)

    let linea = {k: slope, b: intercept}


    console.log("data puntos")
    console.log(data)

    setLineaCC(linea)
    console.log("RegresionLineal")
    console.log(lineaCC)
    console.log(linea)
  
    let regressionLine = data.map(point => ({
      x: point.x,
      y: slope * point.x + intercept,
    }));

    console.log("regressionLine")
    console.log(regressionLine)
  
    return regressionLine;
  }

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
  function handleTab(e){
    setValuetab({...valuetab, [e.target.id]:e.target.value});
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
        <Table1>
          <tr style={{backgroundColor: "#5B5B5B", color:"white",}}>
            <Th> </Th>
            <Th>LONGITUD</Th>
            <Th>CARRERA</Th>
            <Th>LL-G</Th>
            <Th>FUERZA</Th>
            <Th>ESFUERZO</Th>
            <Th>%COMPRES.</Th>
          </tr>
          <tr>
            <Th2>L instalada</Th2>
            <Td>
            <Input8 type="number" value={valuetab.Linst} id={"Linst"}  onChange={(e) => handleTab(e)}/>     
            </Td>
            <Td>-</Td>
            <Td>333</Td>
            <Td>{carrera.Finst}</Td>
            <Td>{carrera.TauK1}</Td>
            <Td>{carrera.Compres1}%</Td>
          </tr>
          <tr>
            <Th2>L carga</Th2>
            <Td>
            <Input8 type="number" value={valuetab.Lcarga} id={"Lcarga"}  onChange={(e) => handleTab(e)}/>
            </Td>
            <Td>{carrera.carrCarga}</Td>
            <Td>333</Td>
            <Td>{carrera.Fcarg}</Td>
            <Td>{carrera.TauK2}</Td>
            <Td>{carrera.Compres2}%</Td>
          </tr>
          <tr>
            <Th2>L maxima</Th2>
            <Td>
            <Input8 type="number" value={valuetab.Lmax} id={"Lmax"}  onChange={(e) => handleTab(e)}/>
            </Td>
            <Td>{carrera.carrMax}</Td>
            <Td>333</Td>
            <Td>{carrera.Fmax}</Td>
            <Td>{carrera.TauK3}</Td>
            <Td>{carrera.Compres3}%</Td>
          </tr>
          <tr>
            <Th2>L4</Th2>
            <Td>
            <Input8 type="number" value={valuetab.L4} id={"L4"}  onChange={(e) => handleTab(e)}/>
            </Td>
            <Td>{carrera.carrL4}</Td>
            <Td>333</Td>
            <Td>{carrera.F4}</Td>
            <Td>{carrera.TauK4}</Td>
            <Td>{carrera.Compres4}%</Td>
          </tr>
          <tr>
            <Th2>L bloqueo</Th2>
            <Td>{valuetab.Lbloqueo}</Td>
            <Td>{carrera.carrLc}</Td>
            <Td>333</Td>
            <Td>{filas.Fc3}</Td>
            <Td>{carrera.TauKC}</Td>
            <Td>100%</Td>
          </tr>
        </Table1> 
      </div>

      <div>
        <div style={{display:"flex", justifyContent:"center",paddingTop:94,}}>
          {/* <Table2 >
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
    
    {/* <TablaCarrera/> */}
    
   </div>   
  );
}

export default App;

