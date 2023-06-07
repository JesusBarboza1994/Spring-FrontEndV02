import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';

const Td = styled.td`
  text-align: center;
  width: 30px;
  border: 1px solid grey;
  font-family:"ABeeZee";
  

`
const Input = styled.input`
  width:50px;
  height:18px;
  color:black;
  background-color: #adc5fff1;
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const Th3 = styled.th`
  height: 80px;
  font-size: 13px;
  border: 1px solid grey;
  font-family:"ABeeZee";
  
  
`
const Button1 = styled.button`
  width:125px;
  height:40px;
  margin:10px 14px;
  border-radius:8px;
`

export default function TablaControlDeCargas(props) {

    const {controlCargas, setControlCargas} = useAuth();
    
    const fuerzas = props.Fuerzas

    const [puntosCC, setPuntosCC] = useState([
        { id: 1, Fuerza: "", Long: "" },
        { id: 2, Fuerza: "", Long: "" },
        { id: 3, Fuerza: "", Long: "" }
    ])
    
    const [defs, setDefs] = useState([
        { id: 1, Def: "" },
        { id: 2, Def: "" },
        { id: 3, Def: "" }
    ])

    const L0 = Number(props.L0)

    const addRow = () => {
        setPuntosCC([...puntosCC, { id: puntosCC.length + 1, Fuerza: "", Long: "" }])
        setDefs([...defs, { id: defs.length + 1, Def: "" }])
    };

    const deleteRow = () => {
        if (puntosCC.length>3){
            setPuntosCC(puntosCC.slice(0, -1))
            setDefs(defs.slice(0, -1))
        }
    };

    function handleInputControlCargas(e){

        const arreglo = e.target.id.split(',')
        
        let puntosCCAux = JSON.parse(JSON.stringify(puntosCC))
        puntosCCAux.map((punto) => {

            if (arreglo[1] === "Fuerza"){
                console.log("mod de fuerza")
                if (punto.id === Number(arreglo[0])) {
                    punto.Fuerza = Number(e.target.value)
                }
            }
            else if (arreglo[1] === "Long"){
                if (punto.id === Number(arreglo[0])) {
                    punto.Long = Number(e.target.value)
                }
            }

        })

        setPuntosCC(puntosCCAux)

    }

    useEffect(() => {
        
        let puntosCCGlob = []
        let defsAux = JSON.parse(JSON.stringify(defs))
        let puntoCC = {}
        defsAux.map((punto, indice) => {

            punto.Def = Number(L0 - puntosCC[indice].Long)

            //Actualizacion de datos de variable en App.js
            puntoCC = { id: (indice+1), Fuerza: puntosCC[indice].Fuerza, Long: puntosCC[indice].Long, Def: punto.Def }
            puntosCCGlob.push(puntoCC)

        })

        setDefs(defsAux)

        setControlCargas(puntosCCGlob)

    }, [puntosCC])

    return(
        <div style={{backgroundColor: "black"}}>
            <table>
                <thead>
                    <tr style={{backgroundColor: "#5B5B5B", color:"white",}}>
                        <Th3>Punto</Th3>
                        <Th3>Fuerza (kg)</Th3>
                        <Th3>Longitud (mm)</Th3>
                        <Th3>Deformación (mm)</Th3>
                    </tr>
                </thead>
                <tbody>
                    {puntosCC.map((punto, indice) => (
                        <tr key={punto.id} style={{color:"white"}}>
                            <Td>
                                {punto.id}
                            </Td>
                            <Td>
                                <Input value={punto.Carga} type="number" id={punto.id+",Fuerza"} onChange={(e) => handleInputControlCargas(e)}/>
                            </Td>
                            <Td>
                                <Input value={punto.Longitud} type="number" id={punto.id+",Long"} onChange={(e) => handleInputControlCargas(e)}/>
                            </Td>
                            <Td>
                                {
                                    (!isNaN(defs[indice].Def) && Number.isFinite(defs[indice].Def)) === true ? (defs[indice].Def).toFixed(1) : ""
                                }
                            </Td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    
                        <div style={{display: "flex", }}  >
                            <Button1 onClick={deleteRow} disabled={puntosCC.length === 3}>Eliminar última fila</Button1>
                            <Button1 onClick={addRow}>Agregar fila</Button1> 
                        </div>
                    
                </tfoot>
            </table>
        </div>
    )
  }