import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { SimulationData } from "./componentes/SimulationData";
import { CalcParam } from "./componentes/CalculatedParameters";
import { WeightTolerance } from "./componentes/WeightTolerance";
import { Textarea } from "./componentes/Textarea";
//import { KLineal } from "./Klineal";
import { useAuth } from "./context/auth-context";



const Form = styled.form`
  display:flex;
  grid-template-columns: auto, auto, auto;
  gap:6px;
  
  width: 480px;
  background: #9656fc64;
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
  font-size: 14px;
  border: 1px solid grey;
  
`
const Th2 = styled.th`
  width: 120px;
  text-align: left;
  font-size: 14px;
  letter-spacing: 1px;
  padding:10px;
  border: 1px solid grey;
  color: white;
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

//Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
const Input3 = styled.input`
  width:50px;
  background-color:black;
  color: white;
  margin:5px;
  text-align: center;
  border:none;
`

const Th3 = styled.th`
  height: 80px;
  font-size: 14px;
  border: 1px solid grey;
  
`
const Th4 = styled.th`
  width: 20px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  padding:10px;
  border: 1px solid grey;
  color: white;
`

const Input2 = styled.input`
  width:80px;
  background-color:black;
  color: gray;
  margin:5px;
  text-align: center;
  border:none;
`
const Label2 = styled.label`
  color: white;
  margin: 5px;
  height:15px;
  display: block;
  width: 40px;
  background-color:black;
  line-height: 15px;
`

const Tbody = styled.tbody`
  color: white;
  display: flex;
  flex-direction: column-reverse;
`

//Renee-Fin-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function App() {

  const {filas, setFilas, data1, setData1, data, setData, data2, setData2} = useAuth();
    
  const [data4, setData4] = useState({
    K:"",      
    F:"",         
    L:"",        
  })

  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [puntos1, setPuntos1] = useState([
    { id: 1, Luz: "", Long: "", Vtas: "" },
    { id: 2, Luz: "", Long: "", Vtas: "" },
    { id: 3, Luz: "", Long: "", Vtas: "" }
  ])

  const [puntos2, setPuntos2] = useState([
    { id: 1, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 2, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 3, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" }
  ])

  //Renee-Fin-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [type1,setType1] = useState(["TASE","TCSE","TCE","TAE"]);
  const [type2,setType2] = useState(["TASE","TCSE","TCE","TAE"]);
  
  const [descrip, setDescrip] = useState({
    descrip: "",
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

      

  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  function handleButtonCalcular(){
    
    let luz1 = Number((parseFloat(data.Luz2)).toFixed(2))
    let luz2 = Number((parseFloat(data.Luz1)).toFixed(2))
    let long1 = Number(((parseFloat(data.Luz2)+parseFloat(data.d))*0.875).toFixed(1))
    let long2 = Number(((parseFloat(data.Luz1)+parseFloat(data.d))*0.875).toFixed(1))
    let vtas1 = 0.875
    let vtas2 = 0.875
    let vtas3 = Number((parseFloat(data.N)-2*0.875).toFixed(3))
    let long3 = Number((parseFloat(data.L0)-long1-long2-parseFloat(data.d)).toFixed(1))
    let luz3 = Number(((long3/vtas3)-parseFloat(data.d)).toFixed(2))

    let luces = [luz1, luz2, luz3]
    let longitudes = [long1, long2, long3]
    let vueltas = [vtas1, vtas2, vtas3]

    setPuntos1(puntos1.map((punto, indice) => {
      if (punto.id < 4) {
        return { ...punto, Luz: luces[indice], Long: longitudes[indice], Vtas: vueltas[indice] };
      }
      return punto;
    }));
    
  }
  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

 
  useEffect(() => {
    let extremo1 = type1
    let extremo2 = type2
    setData({...data,
      Ext1: extremo1, Ext2: extremo2
    })
  }, [type1, type2])

 
  //Renee-Inicio-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const addRow = () => {
    setPuntos1([...puntos1, { id: puntos1.length + 1, Luz: "", Long: "", Vtas: "" }])
    setPuntos2([...puntos2, { id: puntos2.length + 1, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" }])
  };

  const deleteRow = () => {
    if (puntos1.length>3){
      setPuntos1(puntos1.slice(0, -1))
      setPuntos2(puntos2.slice(0, -1))

    }
  };

  const orderRow = () => {

    let array1 = puntos1
    let array2 = puntos2
    let n = puntos2.length;

    // Algoritmo de burbuja
    for (let k = 1; k < n; k++) {
      for (let i = 0; i < (n - k); i++) {
          if (array2[i].Paso > array2[i + 1].Paso) {
              let aux1 = array1[i];
              array1[i] = array1[i + 1];
              array1[i + 1] = aux1;

              let aux2 = array2[i];
              array2[i] = array2[i + 1];
              array2[i + 1] = aux2;
          }
      }
    }

    let puntos1ordenado = []
    let puntos2ordenado = []

    for (let j = 0; j < n; j++) {
      let punto1 = { id: j + 1, Luz: array1[j].Luz, Long: array1[j].Long, Vtas: array1[j].Vtas }
      let punto2 = { id: j + 1, Paso: array2[j].Paso, K: array2[j].K, Kinv: array2[j].Kinv, Keq: array2[j].Keq, Xc: array2[j].Xc, b: array2[j].b, Fc: array2[j].Fc }
      puntos1ordenado.push(punto1)
      puntos2ordenado.push(punto2)
    }

    setPuntos1(puntos1ordenado)
    setPuntos2(puntos2ordenado)
    calcularPuntos2()

  };

  function calcularPuntos2() {
    let d = Number(data.d)
    let Dext = Number(data.Dext)
    let Dm = Dext-d
    let N = 0
    
    let pasos = []
    let ks = []
    let kinvs = []
    let keqs = []
    let xcs = []
    let bs = []
    let fcs = []

    let puntosCalc = puntos1
    
    for (let i = 0; i < puntosCalc.length; i++) {
      let paso = puntosCalc[i].Long/puntosCalc[i].Vtas
      pasos.push(paso)
      
      let k = (78500*(Math.pow(d,4)))/(8*(Math.pow(Dm,3))*puntosCalc[i].Vtas)
      ks.push(k)
      
      let kinv = Math.pow(k,-1)
      kinvs.push(kinv)

      N = N + Number(puntosCalc[i].Vtas)
    }

    let contDec1 = kinvs.length-1 
    let aux1 = 0
    let keqAux = []
    while (contDec1 >= 0) {
      aux1 = aux1 + kinvs[contDec1]
      keqAux.push(Math.pow(aux1,-1))
      contDec1 = contDec1 -1
    }

    let contDec2 = keqAux.length-1
    while (contDec2 >= 0) {
      keqs.push(keqAux[contDec2])
      contDec2 = contDec2 -1
    }

    let sumas = [0]
    let sumaproductos = [0] // La suma de los productos de las vueltas y los pasos es igual a sumar las longitudes de cada punto
    let aux2 = 0
    let aux3 = 0
    for (let i = 0; i < puntosCalc.length; i++) {
      aux2 = aux2 + Number(puntosCalc[i].Vtas)
      aux3 = aux3 + Number(puntosCalc[i].Long)
      sumas.push(aux2)
      sumaproductos.push(aux3)
    }

    let xc = 0
    let b = 0
    for (let i = 0; i < puntosCalc.length; i++) {

      if (i == 0){
        xc = Number(((pasos[i]-d)*N).toFixed(4))
        b = 0
      }
      else{
        xc = (pasos[i]-d)*(N-sumas[i])+sumaproductos[i]-sumas[i]*d 
        b = (keqs[i-1]-keqs[i])*xcs[i-1]+bs[i-1]
      }
      xcs.push(xc) 
      bs.push(b)
    }

    for (let i = 0; i < keqs.length; i++){
      let fc = Number(((keqs[i]*xcs[i]+bs[i])/9.81).toFixed(3))
      fcs.push(fc)
    }

    let puntosFinales = []
    for (let i = 0; i < fcs.length; i++){
      let punto = { id: i+1, Paso: pasos[i], K: ks[i], Kinv: kinvs[i], Keq: keqs[i], Xc: xcs[i], b: bs[i], Fc: fcs[i] }
      puntosFinales.push(punto)
    }

    setPuntos2(puntosFinales)
  }

  function handleInputPuntos1(e){
    const arreglo = e.target.id.split(',')
    let luz = ""
    let d = Number(data.d)
    let sumaVtasParcial = 0;
    let sumaLongsParcial = 0;
    let puntos1Aux = JSON.parse(JSON.stringify(puntos1))
    puntos1Aux.map((punto) => {

      if (arreglo[1] === "Luz"){
        let long = (Number(e.target.value)+d)*puntos1[Number(arreglo[0])-1].Vtas
        if (punto.id == arreglo[0]) {
          punto.Luz = Number(e.target.value)
          punto.Long = Number(long)
        }
      }
      else if (arreglo[1] === "Vtas"){
        luz = (Number(puntos1[Number(arreglo[0])-1].Long)/Number(e.target.value)) - d
        if (punto.id == arreglo[0]) {
          punto.Vtas = Number(e.target.value)
          punto.Luz = Number(luz)
        }
      }
      else if (arreglo[1] === "Long"){
        luz = Number(e.target.value)/puntos1[Number(arreglo[0])-1].Vtas - d
        if (punto.id == arreglo[0]) {
          punto.Long = Number(e.target.value)
          punto.Luz = Number(luz)
        }
      }

      if (punto.id < puntos1Aux.length) {
        sumaVtasParcial = sumaVtasParcial + Number(punto.Vtas)
        sumaLongsParcial = sumaLongsParcial + Number(punto.Long)
      }

    })

    let vtasTotal = data.N
    let longTotal = data.L0
    let vtaPuntoFinal = vtasTotal - sumaVtasParcial
    let longPuntoFinal = longTotal - sumaLongsParcial - d
    let luzPuntoFinal = longPuntoFinal/vtaPuntoFinal - d

    puntos1Aux[puntos1Aux.length-1].Vtas = vtaPuntoFinal
    puntos1Aux[puntos1Aux.length-1].Long = longPuntoFinal
    puntos1Aux[puntos1Aux.length-1].Luz = luzPuntoFinal

    setPuntos1(puntos1Aux)
  }

  useEffect(() => {

    calcularPuntos2()
    
  }, [puntos1])

  //Renee-Fin-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
  
 //console.log(KLineal)



  

 
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
                            borderRadius:8,}}>Enviar</button>
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
          {
            console.log(filas)
          }
            <Label>K</Label>
            <DivCalculo id={"K"}>{filas.Keq3}</DivCalculo>
        </Div>
        <Div>
            <Label>F</Label>
            <DivCalculo id={"F"}>{filas.Fc3}</DivCalculo> 
        </Div>
        <Div>
            <Label>L</Label>
            <DivCalculo id={"L"}>{filas.Xc3}</DivCalculo>
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
          </Table2>
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

    <div style={{backgroundColor: "black"}}>
      <table>
        <thead>
          <tr style={{backgroundColor: "#5B5B5B", color:"white"}}>
            <Th3>Punto</Th3>
            <Th3>Luz</Th3>
            <Th3>Long</Th3>
            <Th3>N.Vtas</Th3>
            <Th3>Keq. (N/mm)</Th3>
            <Th3>Xc (mm)</Th3>
            <Th3>Fc (kg)</Th3>
            <Th3>Paso (mm)</Th3>
            <Th3>K (N/mm)</Th3>
            <Th3>K^-1</Th3>
            <Th3>b</Th3>
          </tr>
        </thead>
        <tbody>
          {puntos1.map((punto, indice) => (
            <tr key={punto.id} style={{color:"white"}}>
              <Th4>
                {punto.id}
              </Th4>
              <Td>
                {
                  punto.id > 2 ? ((!isNaN(punto.Luz) && Number.isFinite(punto.Luz) && (punto.Luz != 0)) === true ? (punto.Luz).toFixed(2) : "") : <Input value={punto.Luz} type="number" id={punto.id+",Luz"} onChange={(e) => handleInputPuntos1(e)}/>
                }
              </Td>
              <Td>
                <Input value={punto.Long} type="number" id={punto.id+",Long"} onChange={(e) => handleInputPuntos1(e)} disabled={indice === (puntos1.length-1)}/>
              </Td>
              <Td>
                <Input value={punto.Vtas} type="number" id={punto.id+",Vtas"} onChange={(e) => handleInputPuntos1(e)} disabled={indice === (puntos1.length-1)}/>
              </Td>
              <Td>
                {
                  (!isNaN(puntos2[indice].Keq) && Number.isFinite(puntos2[indice].Keq) && (puntos2[indice].Keq != 0)) === true ? (puntos2[indice].Keq).toFixed(3) : ""
                }
              </Td>
              <Td>
                {
                  (!isNaN(puntos2[indice].Xc) && Number.isFinite(puntos2[indice].Xc) && (puntos2[indice].Xc != 0)) === true ? (puntos2[indice].Xc).toFixed(3) : ""
                }
              </Td>
              <Td>
                {
                  (!isNaN(puntos2[indice].Fc) && Number.isFinite(puntos2[indice].Fc) && (puntos2[indice].Fc != 0)) === true ? (puntos2[indice].Fc).toFixed(3) : ""
                }
              </Td>
              <Td>
                {
                  (!isNaN(puntos2[indice].Paso) && Number.isFinite(puntos2[indice].Paso) && (puntos2[indice].Paso != 0)) === true ? (puntos2[indice].Paso).toFixed(2) : ""
                }
              </Td>
              <Td>
                {
                  (!isNaN(puntos2[indice].K) && Number.isFinite(puntos2[indice].K) && (puntos2[indice].K != 0)) === true ? (puntos2[indice].K).toFixed(3) : ""
                }
              </Td>
              <Td>
                {
                  (!isNaN(puntos2[indice].Kinv) && Number.isFinite(puntos2[indice].Kinv) && (puntos2[indice].Kinv != 0)) === true ? (puntos2[indice].Kinv).toFixed(4) : ""
                }
              </Td>
              <Td>
                {
                  (!isNaN(puntos2[indice].b) && Number.isFinite(puntos2[indice].b)) === true ? (puntos2[indice].b.toFixed(3)) : ""
                }
              </Td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <button style={{width:125, height:40, margin:"10px 14px",borderRadius:8,}} onClick={deleteRow} disabled={puntos1.length === 3}>Eliminar última fila</button>
              <button style={{width:125, height:40, margin:"10px 14px",borderRadius:8,}} onClick={addRow}>Agregar fila</button> 
              <button style={{width:125, height:40, margin:"10px 14px",borderRadius:8,}} onClick={orderRow}>Ordenar filas</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    
   </div>   
  );
}

export default App;
