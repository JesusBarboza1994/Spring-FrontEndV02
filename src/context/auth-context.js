import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({children}){

  const [dimensions, setDimensions] = useState({
    d:"",        //alambre
    Dext:"",     //diam ext1
    Dext2:"",
    N:"",        //vueltas totales
    L0:"",      //longitud
    Luz1:"",
    Dint1:"",    //diam int1
    Vtas1:"",    //vts red1
    Ext1:"TASE",     //extremo1
    Luz2:"",
    Dint2:"",    //diam int2
    Vtas2:"",    //vts red2
    Ext2:"TASE",//extremo2
  })   //vts red2
   

  const [simulation_data, setSimulation_data] = useState({
    material:"",      
    deform:"",         //deformacion
    grado:"",        
  })

  const [calculated_data, setCalculated_data] = useState({
    C: 0,      
    Dmedio:"",         
    f:"",      
    Rel_d1:"",      
    Rel_d2:"",         
    Vt_red_VT:"",      

  })
  
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

  const [tablaToler,setTablaToler] = useState({
    valor: "",
   });

  const [coef, setCoef] = useState({
    af : 0,
    kf : 0,
    Q_Long : 0,
    toler_L0: 0,
  });
  
  const [descrip, setDescrip] = useState({
    descrip: "",
  });
  const [grado,setGrado] = useState(1); 
  
  const [kControlCargas, setKControlCargas] = useState(0)
  const [bControlCargas, setBControlCargas] = useState(0)
  const [l4, setL4] = useState(0)
  
  const [processTableStage1, setProcessTableStage1] = useState([
    { id: 1, Luz: "", Long: "", Vtas: "" },
    { id: 2, Luz: "", Long: "", Vtas: "" },
    { id: 3, Luz: "", Long: "", Vtas: "" }
  ])

  const [processTableStage2, setProcessTableStage2] = useState([
    { id: 1, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 2, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
    { id: 3, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" }
  ])

  const [controlCargas, setControlCargas] = useState([
    { id: 1, Fuerza: "", Long: "", Def: "" },
    { id: 2, Fuerza: "", Long: "", Def: "" },
    { id: 3, Fuerza: "", Long: "", Def: "" }
  ])

  const [stateButtonCalculateProcessTable, setStateButtonCalculateProcessTable] = useState(false);

  return(
    <AuthContext.Provider value={{
      filas,
      setFilas,
      dimensions,
      setDimensions,
      simulation_data,
      setSimulation_data,
      calculated_data,
      setCalculated_data,
      tablaToler,
      setTablaToler,
      coef,
      setCoef,
      descrip,
      setDescrip,
      grado,
      setGrado,
      processTableStage1,
      setProcessTableStage1,
      processTableStage2,
      setProcessTableStage2,
      controlCargas,
      setControlCargas,
      kControlCargas,
      setKControlCargas,
      bControlCargas,
      setBControlCargas,
      stateButtonCalculateProcessTable,
      setStateButtonCalculateProcessTable
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  return useContext(AuthContext);
}

export {AuthProvider, useAuth}