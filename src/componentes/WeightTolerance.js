import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from "../context/auth-context";
import { Switch, breadcrumbsClasses } from "@mui/material";

export function WeightTolerance(){
 const DivSimul = styled.div`
    display:flex;
    grid-template-columns: auto, auto, auto;
    flex-wrap: wrap;
    column-gap:8px;
    row-gap:none;
    margin-bottom:30px;
    margin-top: 10px;
    width: 480px;
    background-color: #9656fc64;         
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
  const {filas, setFilas, data, setData, data2, setData2, tablaToler, setTablaToler, coef, setCoef} = useAuth();

  const [data3, setData3] = useState({
      LDA:"",      
      LDA_adic:200,         
      Peso:"",
      Dmedio:"",    
  });

  const [grado,setGrado] = useState(1); 
  /*const [tablaToler,setTablaToler] = useState({
    valor: "",
  });

  const [coef, setCoef] = useState({
      af : 0,
      kf : 0,
      Q_Long : 0,
      toler_L0: 0,
  }); */

  const [boolSwitch,setBoolSwitch] = useState(false)
  function handleChange(){
      if (boolSwitch){
      setData3({...data3, LDA_adic: 200})
      }else{
          setData3({...data3, LDA_adic: 400})
      }
      setBoolSwitch(!boolSwitch)
      
  }

  useEffect(() => {
    setData3({...data3, LDA : Math.round((data.Dext-data.d)*data.N*3.14),  Dmedio: (data.Dext - data.d)})
  }, [data.d, data.Dext, data.N])
    
  useEffect(() => {
    setData3({...data3, Peso : (Math.pow(data.d/12.7,2)*(data3.LDA+data3.LDA_adic)/1000).toFixed(2)}) 
  }, [data3.LDA, data3.LDA_adic])


  //Tolerancias para Dext (DIN EN 15800)
  const tolerDiam = [
    [0.63, 0.05, 0.07, 0.1, 0.07, 0.1, 0.15, 0.1, 0.15, 0.2],
    [1, 0.05, 0.07, 0.1, 0.08, 0.1, 0.15, 0.15, 0.2, 0.3],
    [1.6, 0.07, 0.1, 0.15, 0.1, 0.15, 0.2, 0.2, 0.3, 0.4],
    [2.5, 0.1, 0.1, 0.15, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5],
    [4, 0.1, 0.15, 0.2, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6],
    [6.3, 0.15, 0.15, 0.2, 0.25, 0.3, 0.35, 0.5, 0.6, 0.7],
    [10, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.6, 0.7, 0.8],
    [16, 0.2, 0.25, 0.3, 0.35, 0.45, 0.5, 0.7, 0.9, 1],
    [25, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.8, 1, 1.2],
    [31.5, 0.25, 0.3, 0.35, 0.5, 0.6, 0.7, 1, 1.2, 1.5],
    [40, 0.3, 0.4, 0.5, 0.6, 0.8, 0.9, 1.2, 1.5, 1.8],
    [50, 0.4, 0.5, 0.6, 0.8, 1, 1.1, 1.5, 2, 2.3],
    [63, 0.5, 0.7, 0.8, 1, 1.2, 1.4, 1.8, 2.4, 2.8],
    [80, 0.6, 0.8, 0.9, 1.2, 1.5, 1.7, 2.3, 3, 3.5],
    [100, 0.7, 1, 1.1, 1.4, 1.9, 2.2, 2.8, 3.7, 4.4],
    [125, 0.9, 1.2, 1.4, 1.8, 2.3, 2.7, 3.5, 4.6, 5.4],
    [160, 1.2, 1.5, 1.7, 2.1, 2.9, 3.3, 4.2, 5.7, 6.6],
    [200, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];


  function TablaToler(){
    const dmedio = (data.Dext - data.d)
    if(dmedio === "" || dmedio <= 0) return -1;
    const linea = tolerDiam.findIndex((_rango, indice, arreglo)=>{
        return Number(dmedio)>=arreglo[indice][0] && Number(dmedio)<=arreglo[indice+1][0]
      });
    //console.log(linea);
  
    let C = ((data.Dext-data.d)/data.d).toFixed(2)
    let tolerBuscada=0;
    switch(grado){
    case "1":
      console.log("case1")
      if(C>=4 && C<8){
          tolerBuscada=tolerDiam[linea][1];
      }else if(C>=8 && C<=14){
          tolerBuscada=tolerDiam[linea][2];
      }else{
          tolerBuscada=tolerDiam[linea][3];
      }
      break;
    case "2":
      console.log("case2")
      if(C>=4 && C<8){
        tolerBuscada=tolerDiam[linea][4];
      }else if(C>=8 && C<=14){
        tolerBuscada=tolerDiam[linea][5];
      }else{
        tolerBuscada=tolerDiam[linea][6];
      }
      break;
    case "3":
      console.log("case3")
      if(C>=4 && C<8){
        tolerBuscada=tolerDiam[linea][7];
      }else if(C>=8 && C<=14){
        tolerBuscada=tolerDiam[linea][8];
      }else{
      tolerBuscada=tolerDiam[linea][9];
      }
      break;
    default:
      console.log("No entro a ninguno")
    }
    //console.log(tolerBuscada);
    return tolerBuscada
  }

  useEffect(() => {
    let Q_Long=0
    if(grado==1){
    Q_Long=0.63
    }else if(grado==2){
    Q_Long=1
    }else {
    Q_Long=1.6
    }
    
    let af = 65.92*Math.pow(Number(data.d),3.3)/Math.pow(data2.Dmedio,1.6)*(-0.84*Math.pow(0.1*data2.C,3)+3.781*Math.pow(0.1*data2.C,2)-4.244*(0.1*data2.C)+2.274);
    
    let kf = -1/(3*Math.pow((Number(data.N)-1.75),2))+8/(5*(Number(data.N)-1.75))+0.803;
    
    let toler=(kf*af*Q_Long/filas.Keq3).toFixed(1);

    
    let tolerancia = TablaToler()
    setTablaToler({...tablaToler,
    valor: tolerancia
    })

    setCoef({...coef, toler_L0: toler })
  }, [grado])

  
 return(
    <DivSimul style={{marginBottom:10,}}>
      <div style={{display: "flex",}}>
        <Paragraph style={{marginTop:9}}>Datos principales</Paragraph>
        <Paragraph style={{marginTop:4}}>Maq.Auto<Switch onChange= {handleChange} size="small"/>Torno</Paragraph>
        <Paragraph></Paragraph>
      </div>
      <Div>
        <Label>LDA</Label>
        <DivCalculo id={"LDA"}>{data3.LDA}</DivCalculo>
      </Div> 
      <Div>
        <Label>LDA adic</Label>
        <DivCalculo  id={"LDA adic"}>{data3.LDA_adic}</DivCalculo> {/* condicional */}
      </Div>
      <Div>
        <Label>Peso</Label>
        <DivCalculo id={"Peso"}>{data3.Peso}</DivCalculo>
      </Div>
      <div>
        <Paragraph style={{width: 480}}>Grado tolerancias</Paragraph>
        
      </div>    
      <Div>
        <Label>Grado</Label>
        <Select value={grado} id={"grado"} onChange={(e) => setGrado(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
      </Div>

      <Div>
        <Label>Dext={data.Dext}</Label>
        <DivCalculo>±{tablaToler.valor}</DivCalculo>
      </Div>
      
      <Div>
        <Label>L0={data.L0} </Label>
        <DivCalculo id={"toler_L0"}>±{coef.toler_L0}</DivCalculo>
      </Div>
   </DivSimul>
  )
  

}



