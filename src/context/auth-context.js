import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({children}){

  const [data, setData] = useState({
    d:"",        //alambre
    Dext:"",     //diam ext1
    N:"",        //vueltas totales
    L0:"",      //longitud
    Luz1:"",
    Dint1:"",    //diam int1
    Vtas1:"",    //vts red1
    Ext1:"TASE",     //extremo1
    Luz2:"",
    Dint2:"",    //diam int2
    Vtas2:"",    //vts red2
    Ext2:"TASE",     //extremo2
  })
// Rigidez obtenida del control de cargas
  const [kCCargas, setkCCargas] = useState(0)
  const [bCCargas, setbCCargas] = useState(0)
  const [l4, setL4] = useState(0)
  
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

  const [controlCargas, setControlCargas] = useState([
    { id: 1, Fuerza: "", Long: "", Def: "" },
    { id: 2, Fuerza: "", Long: "", Def: "" },
    { id: 3, Fuerza: "", Long: "", Def: "" }
  ])

  return(
    <AuthContext.Provider value={{
      data,
      setData,
      puntos1,
      setPuntos1,
      puntos2,
      setPuntos2,
      controlCargas,
      setControlCargas,
      kCCargas,
      setkCCargas,
      bCCargas,
      setbCCargas
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  return useContext(AuthContext);
}

export {AuthProvider, useAuth}