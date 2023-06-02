import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({children}){
  //const [drill, setDrill] = useState("Hola")
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

  const [data2, setData2] = useState({
    C: "",      
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

  return(
    <AuthContext.Provider value={{
      filas,
      setFilas,
      data,
      setData,
      data2,
      setData2
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  return useContext(AuthContext);
}

export {AuthProvider, useAuth}