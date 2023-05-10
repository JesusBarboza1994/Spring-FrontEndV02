import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { Switch, breadcrumbsClasses } from "@mui/material";

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
  width:420px;
  height:380px;
  font-family: "ABeeZee";
  border: 2px solid grey;
  border-collapse: collapse;
  color: grey;
    
`
const Table2 = styled.table`
  width:210px;
  height:210px;
  font-family: "ABeeZee";

  border: 2px solid grey;
  border-collapse: collapse;
  color: grey;

`

const Th = styled.th`
  height: 170px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  font-size: 14px;
  border: 1px solid grey;
  
`
const Th2 = styled.th`
  width: 100px;
  text-align: left;
  font-size: 14px;
  letter-spacing: 1px;
  padding:10px;
  border: 1px solid grey;
  color: white;
`
const Td = styled.td`
  text-align: center;
  width: 30px;
  border: 1px solid grey;

`

const Select = styled.select`
  background-color: black;
  color: white;
  font-family:"ABeeZee";
  font-size: 13px;
  border: 0px;

`

//Renee-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

//Renee-----------------------------------------------------------------------------------------------------------------------------------------------------------------------


function App() {
    
  const [data, setData] = useState({
    d:"",        //alambre
    Dext:"",     //diam ext1
    N:"",        //vueltas totales
    L0:"",      //longitud
    Luz1:"",
    Dint1:"",    //diam int1
    Vtas1:"",    //vts red1
    Ext1:"",     //extremo1
    Luz2:"",
    Dint2:"",    //diam int2
    Vtas2:"",    //vts red2
    Ext2:"",     //extremo2
  })

  const [data1, setData1] = useState({
    Mater:"",      
    x:"",         //deformacion
    grado:"",        
  })

  const [data2, setData2] = useState({
    C: "",      
    Dmedio:"",         
    f:"",      
    Rel_d1:"",      
    Rel_d2:"",         
    Vt_red_VT:"",      

  })

  const [data3, setData3] = useState({
    LDA:"",      
    LDA_adic:200,         
    Peso:"",
    Dmedio:"",    
  })

  const [data4, setData4] = useState({
    K:"",      
    F:"",         
    L:"",        
  })

  //Renee-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [data5, setData5] = useState({
    Luz1:"",      
    Luz2:"",         
    Luz3:"",
    Long1:"",
    Long2:"",
    Long3:"",
    Vtas1:"",
    Vtas2:"",
    Vtas3:""        
  })

  const [puntos1, setPuntos1] = useState([
    { id: 1, Luz: "", Long: "", Vtas: "" },
    { id: 2, Luz: "", Long: "", Vtas: "" },
    { id: 3, Luz: "", Long: "", Vtas: "" },
    { id: 4, Luz: "", Long: "", Vtas: "" },
    { id: 5, Luz: "", Long: "", Vtas: "" }
  ])

  const [puntos2, setPuntos2] = useState([
    { id: 1, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 2, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 3, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 4, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 5, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" }
  ])

  const [data6, setData6] = useState({
    Paso1:"",      
    Paso2:"",         
    Paso3:"",
    K1:"",
    K2:"",
    K3:"",
    Kinv1:"",
    Kinv2:"",
    Kinv3:"",
    Keq1:"",      
    Keq2:"",         
    Keq3:"",
    Xc1:"",
    Xc2:"",
    Xc3:"",
    Fc1:"",
    Fc2:"",
    Fc3:"",
    b1:"",
    b2:"",
    b3:""
  })

  //Renee-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [type1,setType1] = useState(["TASE","TCSE","TCE","TAE"]);
  const [type2,setType2] = useState(["TASE","TCSE","TCE","TAE"]);
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
  
  const [grado,setGrado] = useState(1); 
  const [tablaToler,setTablaToler] = useState({
    valor: ""
  });
  
  const [coef, setCoef] = useState({
    af : 0,
    kf : 0,
    Q_Long : 0,
    toler_L0: 0,
  });

  const [filas, setFilas] = useState({ 
    nvtas1: "",
    nvtas2: "",
    nvtas3: "",
    long1: "",
    long2: "", 
    long3: "",
    paso1: "",
    paso2: "",
    paso3: "",
    // rigidez1: rigidez1,
    // rigidez2: rigidez2,
    // rigidez3: rigidez3,
    Keq1: "",
    Keq2: "",
    Keq3: "",
    Xc1: "",
    Xc2: "",
    Xc3: "",
    Fc1: "",
    Fc2: "",
    Fc3: "",
});
 
const [valuetab, setValuetab] = useState({
Linst: 0,
Lcarga: 0,
Lmax: 0,
L4: 0,
Lbloqueo: 0

});

   
  //Renee-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  function handleButtonCalcular(){
    let prueba = 2
    switch (true){
      case (prueba<4):
        console.log("Menor que 4")
        break;
      case (prueba>4):
        console.log("Mayor que 4")
        break;
      default:
        console.log("Default")
    }

    console.log("Holaaaaaaaaa");
    let luz1 = Number((parseFloat(data.Luz1)).toFixed(2))
    let luz2 = Number((parseFloat(data.Luz2)).toFixed(2))
    let long1 = Number((parseFloat(data.Luz1)+parseFloat(data.d)).toFixed(2))
    let long2 = Number((parseFloat(data.Luz2)+parseFloat(data.d)).toFixed(2))
    let vtas1 = 0.875
    let vtas2 = 0.875
    let vtas3 = Number((parseFloat(data.N)-2*0.875).toFixed(3))
    let long3 = Number((parseFloat(data.L0)-long1-long2-parseFloat(data.d)).toFixed(2))
    let luz3 = Number(((long3/vtas3)-parseFloat(data.d)).toFixed(2))
    /*let luz3 = 0
    console.log("Extremos")
    console.log(data.Ext1)
    console.log(data.Ext2)
    if((data.Ext1 == "TASE" || data.Ext1 == "TCSE") && (data.Ext2 == "TASE" || data.Ext2 == "TCSE")){
      luz3 = Number(((long3/vtas3)-parseFloat(data.d)).toFixed(2))
    }
    else if ((data.Ext1 == "TASE" || data.Ext1 == "TCSE") || (data.Ext2 == "TASE" || data.Ext2 == "TCSE")){
      luz3 = Number(((long3/vtas3)-(parseFloat(data.d)/2)).toFixed(2))
    }
    else {
      luz3 = Number((long3/vtas3).toFixed(2))
    }*/

    setData5({...data5,
      Luz1 : luz1,
      Luz2 : luz2,
      Long1 : long1,
      Long2 : long2,
      Vtas1 : vtas1,
      Vtas2 : vtas2,
      Vtas3 : vtas3,
      Long3 : long3,
      Luz3 : luz3
  
    })

    let luces = [luz1, luz2, luz3]
    let longitudes = [long1, long2, long3]
    let vueltas = [vtas1, vtas2, vtas3]

    let d = Number(data.d)
    let Dext = Number(data.Dext)
    let Dm = Dext-d
    let N = Number(data.N)

    let paso1 = long1/vtas1
    let paso2 = long2/vtas2
    let paso3 = long3/vtas3
    
    let k1 = (78500*(Math.pow(data.d,4)))/(8*(Math.pow(Dm,3))*vtas1)
    let k2 = (78500*(Math.pow(data.d,4)))/(8*(Math.pow(Dm,3))*vtas2)
    let k3 = (78500*(Math.pow(data.d,4)))/(8*(Math.pow(Dm,3))*vtas3)
    let kinv1 = Math.pow(k1,-1)
    let kinv2 = Math.pow(k2,-1)
    let kinv3 = Math.pow(k3,-1)

    let keq1 = Math.pow(kinv1+kinv2+kinv3,-1)
    let keq2 = Math.pow(kinv2+kinv3,-1)
    let keq3 = Math.pow(kinv3,-1)

    let xc1 = (paso1-d)*N
    let xc2 = (paso2-d)*(N-vtas1)+paso1*vtas1-vtas1*d
    let xc3 = (paso3-d)*(N-(vtas1+vtas2))+(paso1*vtas1+paso2*vtas2)-(vtas1+vtas2)*d

    let b1 = 0
    let b2 = (keq1-keq2)*xc1+b1
    let b3 = (keq2-keq3)*xc2+b2

    let fc1 = (keq1*xc1+b1)/9.81
    let fc2 = (keq2*xc2+b2)/9.81
    let fc3 = (keq3*xc3+b3)/9.81

    let pasos = [Number(paso1.toFixed(3)), Number(paso2.toFixed(3)), Number(paso3.toFixed(3))]
    let ks = [Number(k1.toFixed(3)), Number(k2.toFixed(3)), Number(k3.toFixed(3))]
    let kinvs = [Number(kinv1.toFixed(3)), Number(kinv2.toFixed(3)), Number(kinv3.toFixed(3))]
    let keqs = [Number(keq1.toFixed(3)), Number(keq2.toFixed(3)), Number(keq3.toFixed(3))]
    let xcs = [Number(xc1.toFixed(3)), Number(xc2.toFixed(3)), Number(xc3.toFixed(3))]
    let bs = [Number(b1.toFixed(3)), Number(b2.toFixed(3)), Number(b3.toFixed(3))]
    let fcs = [Number(fc1.toFixed(3)), Number(fc2.toFixed(3)), Number(fc3.toFixed(3))]

    setPuntos1(puntos1.map((punto, indice) => {
      if (punto.id < 4) {
        return { ...punto, Luz: luces[indice], Long: longitudes[indice], Vtas: vueltas[indice] };
      }
      return punto;
    }));
    
  }
  //Renee-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

  
  //Tolerancias para Lo y F
  // if(grado==1){
  //   coef.Q_Long=0.63
  // }else if(grado==2){
  //   coef.Q_Long=1
  // }else {
  //   coef.Q_Long=1.6
  // }
  // console.log(coef.Q_Long)

  // const af = 65.92*Math.pow(Number(data.d),3.3)/Math.pow(data2.Dmedio,1.6)*(-0.84*Math.pow(0.1*filas.C,3)+3.781*Math.pow(0.1*filas.C,2)-4.244*(0.1*filas.C)+2.274);
  // const kf = -1/(3*Math.pow((Number(data.N)-1.75),2))+8/(5*(Number(data.N)-1.75))+0.803;
  //const toler_L0 = (kf*af*Q_Long/filas.Keq3).toFixed(1);
  //const toler_F = Q_Long*(af*kf+1.5*AG16*9.81/100)/9.81; 
  
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


  //calculo de la rigidez, fuerza y deformacion, mas la tolerancias
  useEffect(() => {
   //const C = Number(((Number(data.Dext)-Number(data.d))/Number(data.d)).toFixed(2));
   const nvtas1 = 0.875;    //primera linea contando desde abajo por arriba (empieza con luz menor)
   const nvtas2 = 0.875;  
   const nvtas3 = Number(data.N) - (nvtas1 + nvtas2);  // Vueltas del cuerpo
   
   const long1 = Number((Number(data.Luz2) + Number(data.d)).toFixed(2));
   const long2 = Number((Number(data.Luz1) + Number(data.d)).toFixed(2));
   const long3 = Number((Number(data.L0)- (long1+long2)-Number(data.d)).toFixed(2));
   
   const paso1 = Number((long1/nvtas1).toFixed(2));
   const paso2 = Number((long2/nvtas2).toFixed(2));
   const paso3 = Number((long3/nvtas3).toFixed(2));

   const rigidez1 = 1/((78500*Math.pow(Number(data.d),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas1))); // N/mm
   const rigidez2 = 1/((78500*Math.pow(Number(data.d),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas2)));
   const rigidez3 = 1/((78500*Math.pow(Number(data.d),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas3)));

   const Keq1 = Number((1/(rigidez1+rigidez2+rigidez3)).toFixed(2));
   const Keq2 = Number((1/(rigidez2+rigidez3)).toFixed(2));
   const Keq3 = Number((1/rigidez3).toFixed(2));

   const Xc1 = Number(((paso1-Number(data.d))*Number(data.N)).toFixed(1));
   const Xc2 = Number(((paso2-Number(data.d))*(Number(data.N)-nvtas1)+(paso1*nvtas1)-nvtas1*Number(data.d)).toFixed(1));
   const Xc3 = Number(((paso3-Number(data.d))*(Number(data.N)-(nvtas1+nvtas2))+(paso1*nvtas1+paso2*nvtas2)-(nvtas1+nvtas2)*Number(data.d)).toFixed(1));

   const b1 = 0;
   const b2 = (Keq1-Keq2)*Xc1+b1;
   const b3 = (Keq2-Keq3)*Xc2+b2;
   console.log(b3);
   
   const Fc1 = Number(((Keq1*Xc1+b1)/9.81).toFixed(1));
   const Fc2 = Number(((Keq2*Xc2+b2)/9.81).toFixed(1));
   const Fc3 = Number(((Keq3*Xc3+b3)/9.81).toFixed(1));


    setFilas({...filas,
      
      nvtas1: nvtas1,
      nvtas2: nvtas2,
      nvtas3: nvtas3,
      long1: long1,
      long2: long2, 
      long3: long3,
      paso1: paso1,
      paso2: paso2,
      paso3: paso3,
      // rigidez1: rigidez1,
      // rigidez2: rigidez2,
      // rigidez3: rigidez3,
      Keq1: Keq1,
      Keq2: Keq2,
      Keq3: Keq3,
      Xc1: Xc1,
      Xc2: Xc2,
      Xc3: Xc3,
      Fc1: Fc1,
      Fc2: Fc2,
      Fc3: Fc3,
          
     })

    let Q_Long=0
    if(grado==1){
      Q_Long=0.63
    }else if(grado==2){
      Q_Long=1
    }else {
      Q_Long=1.6
    }
    console.log(Q_Long)

    let af = 65.92*Math.pow(Number(data.d),3.3)/Math.pow(data2.Dmedio,1.6)*(-0.84*Math.pow(0.1*data2.C,3)+3.781*Math.pow(0.1*data2.C,2)-4.244*(0.1*data2.C)+2.274);
    
    let kf = -1/(3*Math.pow((Number(data.N)-1.75),2))+8/(5*(Number(data.N)-1.75))+0.803;
    
    let toler=(kf*af*Q_Long/Keq3).toFixed(1);
    console.log(toler)
    console.log(Keq3)
    
    let tolerancia = TablaToler()
    setTablaToler({...tablaToler,
      valor: tolerancia
    })
   setCoef({...coef, toler_L0: toler })
  }, [grado])

  useEffect(() => {
    
    let Lbloq=0;
    if(data.Ext1=="TASE" && data.Ext2=="TASE"){
      Lbloq=(data.N+1)*data.d;
    }else if(data.Ext1!=="TASE" && data.Ext2=="TASE" || data.Ext1=="TASE" && data.Ext2!=="TASE"){
      Lbloq=(data.N+1)*data.d-0.5*data.d;
    }else{
      Lbloq=(data.N+1)*data.d-data.d;
    }
    console.log(Lbloq);
    

    setValuetab({...valuetab,
      
      Lbloqueo: Lbloq
      
    }, [data.Ext1, data.Ext2])
  })
  


  //Funcion para busqueda de tolerancia para Dext
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

 
 function handleInput(e){
    setData({...data, [e.target.id]:e.target.value})
    
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log(data)
  }
  function handleSimulacion(e){
    setData1({...data1, [e.target.id]:e.target.value})
    console.log(data1)
  }
  
  function handlePrincipal(e){
    setData3({...data3, [e.target.id]:e.target.value})
    console.log(data3)
  }

  function handleTab(e){
    setValuetab({...valuetab, [e.target.id]:e.target.value});
  }
 

  const [boolSwitch,setBoolSwitch] = useState(false)
  function handleChange(){
    if (boolSwitch){
       setData3({...data3, LDA_adic: 200})
    }else{
        setData3({...data3, LDA_adic: 400})
    }
    setBoolSwitch(!boolSwitch)
    
  }
    
  return (
   <div className="App" style={{backgroundColor:"black", gap: 100, display:"flex"}}>
    
    <div>
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

      <DivSimul>
        <div style={{display: "flex",}}>
          <Paragraph>Datos de simulacion</Paragraph>
          <Paragraph></Paragraph>
          <Paragraph>nodos</Paragraph>
        </div>
      
        <Div style={{width:138}}>
          
          <Select style={{color: "white",borderRadius:8,}} id={"Mater"} onChange={(e) => setMater(e.target.value)}>
          
            <option style={{color: "#EE7272"}}>Mater</option>
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
        <div style={{display: "flex",columnGap:12,width:"100%",justifyContent:"flex-end", marginRight: 8}}>
          <Button>Simular</Button>
          <Button>Calcular</Button>
        </div>
                                
      </DivSimul>

      
      <DivSimul>
      <Paragraph style={{width: 480}}>Parametros calculados</Paragraph>
      <Div>
          <Label>C</Label>              
          <DivCalculo id={"C"}> {data2.C} </DivCalculo>
      </Div>
      <Div>
          <Label>D medio</Label>
          <DivCalculo id={"Dmedio"}> {data2.Dmedio} </DivCalculo>
      </Div>
      <Div>
          <Label>f</Label>
          <DivCalculo id={"f"}>{data2.f}</DivCalculo>
      </Div>
      <Div>
          <Label>Rel.d1</Label>
          <DivCalculo id={"Rel.d1"}>{data2.Rel_d1}</DivCalculo>
      </Div>
      <Div>
          <Label>Rel.d2</Label>
          <DivCalculo id={"Rel.d2"}>{data2.Rel_d2}</DivCalculo>
      </Div>
      <Div>
          <Label>Vt.red/VT</Label>
          <DivCalculo id={"Vt.red/VT"}>{data2.Vt_red_VT}</DivCalculo>
      </Div>

      </DivSimul>

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

      <div>  
        <Paragraph style={{width: 480}}>Descripcion</Paragraph>
        <textarea style={{
          
                      width: 444, 
                      height: 160, 
                      margin:14,
                      marginBottom: 0, 
                      border:"2px solid grey",
                      borderBottom: "1px solid grey",
                      borderColor:"grey",
                      backgroundColor:"black",
                      color:"grey",
                      fontFamily:"ABeeZee",
                      fontSize: 16,
                      padding:10,

                    }} placeholder="Descripcion"></textarea>
          <textarea style={{
                      width: 444,
                      height: 20,
                      marginLeft:14,
                      marginTop: 0,
                      border:"2px solid grey",
                      borderTop:"1px solid grey",
                      backgroundColor:"black",
                      color:"grey",
                      fontFamily:"ABeeZee",
                      fontSize: 12,
                      padding:10,
                      }}placeholder="Datos adicionales"></textarea>
        
      </div>

      <DivSimul>
        <Paragraph style={{width: 480}}>Calculos teoricos</Paragraph>
        <Div>
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


    <div style={{display:"flex", columnGap:50, marginTop:28,}}>
     <Table1>
        <tr style={{backgroundColor: "#5B5B5B", color:"white"}}>
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
           <Input type="number" value={valuetab.Linst} id={"Linst"}  onChange={(e) => handleTab(e)}/>     
          </Td>
          <Td>-</Td>
          <Td>345</Td>
          <Td>456</Td>
          <Td>567</Td>
          <Td>678</Td>
        </tr>
        <tr>
          <Th2>L carga</Th2>
          <Td>
           <Input type="number" value={valuetab.Lcarga} id={"Lcarga"}  onChange={(e) => handleTab(e)}/>
          </Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
        <tr>
          <Th2>L maxima</Th2>
          <Td>
           <Input type="number" value={valuetab.Lmax} id={"Lmax"}  onChange={(e) => handleTab(e)}/>
          </Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
        <tr>
          <Th2>L4</Th2>
          <Td>
           <Input type="number" value={valuetab.L4} id={"L4"}  onChange={(e) => handleTab(e)}/>
          </Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
        <tr>
          <Th2>L bloqueo</Th2>
          <Td>{valuetab.Lbloqueo}</Td>
          <Td>2</Td>
          <Td>3</Td>
          <Td>4</Td>
          <Td>5</Td>
          <Td>6</Td>
        </tr>
      </Table1> 
      

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
    
    <div>
       <button onClick={TablaToler}> toler </button>


    </div>
      

   </div>   
  );
}

export default App;
