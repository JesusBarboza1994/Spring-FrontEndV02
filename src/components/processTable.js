import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';
import { colors } from "../styles/colors";

const Table2 = styled.table`
    
  font-family: "ABeeZee";
  border: 2px solid ${colors.grey};
  border-collapse: collapse;
  color: ${colors.grey};
  margin-top: 40px;

`

const Td = styled.td`
  text-align: center;
  width: 40px;
  border: 1px solid ${colors.grey};

`
const Table1 = styled.table`
  width: 520px;
  height:380px;
  font-family: "ABeeZee";
  border: 2px solid grey;
  border-collapse: collapse;
  color: grey;
      
`
const Input = styled.input`
  width:50px;
  height:18px;
  color:${colors.black};
  background-color: ${colors.purple};
  margin:8px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
     
`
const Input3 = styled.input`
  width:50px;
  background-color:${colors.black};
  color: ${colors.white};
  margin:5px;
  text-align: center;
  border:none;
`
const Th3 = styled.th`
  height: 70px;
  font-size: 14px;
  border: 1px solid grey;
  font-family:"ABeeZee";
  letter-spacing: 1px;
  padding-left: 5px;
  padding-right:5px;
  
`
const Th4 = styled.th`
  width: 20px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  padding:10px;
  border: 1px solid grey;
  color: ${colors.white};
`
const Input2 = styled.input`
  width:80px;
  background-color:${colors.black};
  color: ${colors.gray};
  margin:5px;
  text-align: center;
  border:none;
`
const Label2 = styled.label`
  color: ${colors.white};
  margin: 5px;
  height:15px;
  display: block;
  width: 40px;
  background-color:${colors.black};
  line-height: 15px;
`
const Tbody = styled.tbody`
  color: ${colors.white};
  display: flex;
  flex-direction: column-reverse;
`
const Button = styled.button`
  width:125px;
  height:40px;
  margin:3px 12px;
  border-radius:8px;
  background-color: ${colors.back};
  color: ${colors.white};
  
`
const Button1 = styled.button`
  width:125px;
  height:40px;
  margin:10px 14px;
  border-radius:8px;
`
const Button2 = styled.button`
  width:80px;
  height:80px;
  font-size:14px;
  border: none;
  background-color: #5B5B5B;
  font-family: "ABeeZee";
  font-weight: bold;
  color:white
`

const Button3 = styled.button`
  width:20px;
  height:80px;
  font-size:14px;
  border: none;
  background-color: #5B5B5B;
  font-family: "ABeeZee";
  font-weight: bold;
  color:white
`

/*export function calcularprocessTableStage1(){
        
    const {data, setData, processTableStage1, setProcessTableStage1, processTableStage2, setProcessTableStage2} = useAuth();

    let long1 = (Number(data.Luz2)+Number(data.d))*0.875
    let long2 = (Number(data.Luz1)+Number(data.d))*0.875
    let luz1 = long1/0.875 - Number(data.d)
    let luz2 = long2/0.875 - Number(data.d)
    let vtas1 = 0.875
    let vtas2 = 0.875
    
    let longLineaMedia = Number(data.L0)
    if (((data.Ext1 === "TASE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TCSE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TASE") && (data.Ext2 === "TCSE"))) {
        longLineaMedia = Number(data.L0) - Number(data.d)
    } else if (((data.Ext1 === "TAE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TCE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TAE") && (data.Ext2 === "TCE"))) {
        longLineaMedia = Number(data.L0) 
    } else {
        longLineaMedia = Number(data.L0) - Number(data.d)/2
    }

    let vtas3 = Number(data.N)-2*0.875
    let long3 = longLineaMedia-long1-long2-Number(data.d)
    let luz3 = (long3/vtas3)-Number(data.d)

    let luces = [luz1, luz2, luz3]
    let longitudes = [long1, long2, long3]
    let vueltas = [vtas1, vtas2, vtas3]

    setProcessTableStage1(processTableStage1.map((punto, indice) => {
      if (punto.id < 4) {
        return { ...punto, Luz: luces[indice], Long: longitudes[indice], Vtas: vueltas[indice] };
      }
      return punto;
    }));
}*/

export default function ProcessTable(props) {

    const {data, setData, processTableStage1, setProcessTableStage1, processTableStage2, setProcessTableStage2, stateButtonCalculateProcessTable, setStateButtonCalculateProcessTable} = useAuth();

    const [processTableStage1Inv, setProcessTableStage1Inv] = useState([])
    const [processTableStage2Inv, setProcessTableStage2Inv] = useState([])

    const [pasoVisible, setPasoVisible] = useState(true)
    const [kEqVisible, setKEqVisible] = useState(true)
    const [xcVisible, setXcVisible] = useState(true)
    const [fcVisible, setFcVisible] = useState(true)
    const [kVisible, setKVisible] = useState(true)
    const [kInvVisible, setKInvVisible] = useState(true)
    const [bVisible, setBVisible] = useState(true)

    function calcularprocessTableStage1(){
        
        let long1 = (Number(data.Luz2)+Number(data.d))*0.875
        let long2 = (Number(data.Luz1)+Number(data.d))*0.875
        let luz1 = long1/0.875 - Number(data.d)
        let luz2 = long2/0.875 - Number(data.d)
        let vtas1 = 0.875
        let vtas2 = 0.875
        
        let longLineaMedia = Number(data.L0)
        if (((data.Ext1 === "TASE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TCSE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TASE") && (data.Ext2 === "TCSE"))) {
            longLineaMedia = Number(data.L0) - Number(data.d)
        } else if (((data.Ext1 === "TAE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TCE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TAE") && (data.Ext2 === "TCE"))) {
            longLineaMedia = Number(data.L0) 
        } else {
            longLineaMedia = Number(data.L0) - Number(data.d)/2
        }

        let vtas3 = Number(data.N)-2*0.875
        let long3 = longLineaMedia-long1-long2-Number(data.d)
        let luz3 = (long3/vtas3)-Number(data.d)

        let luces = [luz1, luz2, luz3]
        let longitudes = [long1, long2, long3]
        let vueltas = [vtas1, vtas2, vtas3]
    
        setProcessTableStage1(processTableStage1.map((punto, indice) => {
          if (punto.id < 4) {
            return { ...punto, Luz: luces[indice], Long: longitudes[indice], Vtas: vueltas[indice] };
          }
          return punto;
        }));
    }
    
    //NUEVO---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if (stateButtonCalculateProcessTable == true){
        calcularprocessTableStage1()
        setStateButtonCalculateProcessTable(false)
    }

    //NUEVO---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    function CalculateOrReset3Points(){
        calcularprocessTableStage1()
    }

    const addRow = () => {
        setProcessTableStage1([...processTableStage1, { id: processTableStage1.length + 1, Luz: "", Long: "", Vtas: "" }])
        setProcessTableStage2([...processTableStage2, { id: processTableStage2.length + 1, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" }])
    };

    const deleteRow = () => {
        if (processTableStage1.length>3){
        setProcessTableStage1(processTableStage1.slice(0, -1))
        setProcessTableStage2(processTableStage2.slice(0, -1))

        }
    };

    const orderRow = () => {

        let array1 = JSON.parse(JSON.stringify(processTableStage1))
        let array2 = JSON.parse(JSON.stringify(processTableStage2))
        let n = processTableStage2.length;
        let aux1 = []
        let aux2 = []

        // Algoritmo de burbuja
        for (let k = 1; k < n; k++) {
            for (let i = 0; i < (n - k); i++) {
                if (array2[i].Paso > array2[i + 1].Paso) {
                    aux1 = array1[i];
                    array1[i] = array1[i + 1];
                    array1[i + 1] = aux1;

                    aux2 = array2[i];
                    array2[i] = array2[i + 1];
                    array2[i + 1] = aux2;
                }
            }
        }

        let processTableStage1ordenado = []
        let processTableStage2ordenado = []

        let punto1 = {}
        let punto2 = {}

        for (let j = 0; j < n; j++) {
            punto1 = { id: j + 1, Luz: array1[j].Luz, Long: array1[j].Long, Vtas: array1[j].Vtas }
            punto2 = { id: j + 1, Paso: array2[j].Paso, K: array2[j].K, Kinv: array2[j].Kinv, Keq: array2[j].Keq, Xc: array2[j].Xc, b: array2[j].b, Fc: array2[j].Fc }
            processTableStage1ordenado.push(punto1)
            processTableStage2ordenado.push(punto2)
        }

        setProcessTableStage1(processTableStage1ordenado)
        setProcessTableStage2(processTableStage2ordenado)
        calcularprocessTableStage2()

    };

    function calcularprocessTableStage2() {

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

        let puntosCalc = JSON.parse(JSON.stringify(processTableStage1))

        let paso = 0
        let k = 0
        let kinv = 0
        
        for (let i = 0; i < puntosCalc.length; i++) {
            paso = puntosCalc[i].Long/puntosCalc[i].Vtas
            pasos.push(paso)
            
            k = (78500*(Math.pow(d,4)))/(8*(Math.pow(Dm,3))*puntosCalc[i].Vtas)
            ks.push(k)
            
            kinv = Math.pow(k,-1)
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

        let fc = 0

        for (let i = 0; i < keqs.length; i++){
            fc = Number(((keqs[i]*xcs[i]+bs[i])/9.81).toFixed(3))
            fcs.push(fc)
        }

        let puntosFinales = []
        let punto = {}
        for (let i = 0; i < fcs.length; i++){
            punto = { id: i+1, Paso: pasos[i], K: ks[i], Kinv: kinvs[i], Keq: keqs[i], Xc: xcs[i], b: bs[i], Fc: fcs[i] }
            puntosFinales.push(punto)
        }

        setProcessTableStage2(puntosFinales)
    }


    function handleInputProcessTableStage1(e){

        const arreglo = e.target.id.split(',')
        let luz = ""
        let d = Number(data.d)
        let sumaVtasParcial = 0;
        let sumaLongsParcial = 0;
        let processTableStage1Aux = JSON.parse(JSON.stringify(processTableStage1))
        processTableStage1Aux.map((punto) => {

            if (arreglo[1] === "Luz"){
                let long = (Number(e.target.value)+d)*processTableStage1[Number(arreglo[0])-1].Vtas
                if (punto.id === Number(arreglo[0])) {
                    punto.Luz = Number(e.target.value)
                    punto.Long = Number(long)
                }
            }
            else if (arreglo[1] === "Vtas"){
                luz = (Number(processTableStage1[Number(arreglo[0])-1].Long)/Number(e.target.value)) - d
                if (punto.id === Number(arreglo[0])) {
                    punto.Vtas = Number(e.target.value)
                    punto.Luz = Number(luz)
                }
            }
            else if (arreglo[1] === "Long"){
                luz = Number(e.target.value)/processTableStage1[Number(arreglo[0])-1].Vtas - d
                if (punto.id === Number(arreglo[0])) {
                    punto.Long = Number(e.target.value)
                    punto.Luz = Number(luz)
                }
            }

            if (punto.id < processTableStage1Aux.length) {
                sumaVtasParcial = sumaVtasParcial + Number(punto.Vtas)
                sumaLongsParcial = sumaLongsParcial + Number(punto.Long)
            }

        })

        let vtasTotal = data.N
        let longTotal = data.L0
        let vtaPuntoFinal = vtasTotal - sumaVtasParcial
        let longPuntoFinal = 0 

        if (((data.Ext1 === "TASE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TCSE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TASE") && (data.Ext2 === "TCSE"))) {
            longPuntoFinal = longTotal - sumaLongsParcial - d
        } else if (((data.Ext1 === "TAE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TCE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TAE") && (data.Ext2 === "TCE"))) {
            longPuntoFinal = longTotal - sumaLongsParcial 
        } else {
            longPuntoFinal = longTotal - sumaLongsParcial - d/2
        }
        
        let luzPuntoFinal = longPuntoFinal/vtaPuntoFinal - d

        processTableStage1Aux[processTableStage1Aux.length-1].Vtas = vtaPuntoFinal
        processTableStage1Aux[processTableStage1Aux.length-1].Long = longPuntoFinal
        processTableStage1Aux[processTableStage1Aux.length-1].Luz = luzPuntoFinal

        setProcessTableStage1(processTableStage1Aux)
    }
    // comentario
    function calcularUltimoPunto(){
        let d = data.d
        let sumaVtasParcial = 0
        let sumaLongsParcial = 0
        let processTableStage1Aux = JSON.parse(JSON.stringify(processTableStage1))
        processTableStage1Aux.map((punto) => {

            if (punto.id < processTableStage1Aux.length) {
                sumaVtasParcial = sumaVtasParcial + Number(punto.Vtas)
                sumaLongsParcial = sumaLongsParcial + Number(punto.Long)
            }
        })

        let vtasTotal = data.N
        let longTotal = data.L0
        let vtaPuntoFinal = vtasTotal - sumaVtasParcial
        let longPuntoFinal = 0 

        if (((data.Ext1 === "TASE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TCSE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TASE") && (data.Ext2 === "TCSE"))) {
            longPuntoFinal = longTotal - sumaLongsParcial - d
        } else if (((data.Ext1 === "TAE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TCE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TAE") && (data.Ext2 === "TCE"))) {
            longPuntoFinal = longTotal - sumaLongsParcial 
        } else {
            longPuntoFinal = longTotal - sumaLongsParcial - d/2
        }
        
        let luzPuntoFinal = longPuntoFinal/vtaPuntoFinal - d

        processTableStage1Aux[processTableStage1Aux.length-1].Vtas = vtaPuntoFinal
        processTableStage1Aux[processTableStage1Aux.length-1].Long = longPuntoFinal
        processTableStage1Aux[processTableStage1Aux.length-1].Luz = luzPuntoFinal
        setProcessTableStage1(processTableStage1Aux)

    }

    useEffect(() => {

        calcularprocessTableStage2()

        let puntosAux = JSON.parse(JSON.stringify(processTableStage1))
        let puntosAux1 = JSON.parse(JSON.stringify(processTableStage1))
        let puntosInv = puntosAux.reverse()
        setProcessTableStage1Inv(puntosInv)
        
    }, [processTableStage1])

    useEffect(() => {
        calcularprocessTableStage1()
        calcularUltimoPunto()
        
    }, [data])

    useEffect(() => {

        let puntosAux = JSON.parse(JSON.stringify(processTableStage2))
        let puntosAux2 = JSON.parse(JSON.stringify(processTableStage2))
        let puntosInv = puntosAux.reverse()
        setProcessTableStage2Inv(puntosInv)
        
    }, [processTableStage2])

    function visibleColumnPaso(){
        if (pasoVisible == true){
            setPasoVisible(false)
        }
        else{
            setPasoVisible(true)
        }

    }

    function visibleColumnKeq(){
        if (kEqVisible == true){
            setKEqVisible(false)
        }
        else{
            setKEqVisible(true)
        }

    }

    function visibleColumnXc(){
        if (xcVisible == true){
            setXcVisible(false)
        }
        else{
            setXcVisible(true)
        }

    }

    function visibleColumnFc(){
        if (fcVisible == true){
            setFcVisible(false)
        }
        else{
            setFcVisible(true)
        }

    }

    function visibleColumnK(){
        if (kVisible == true){
            setKVisible(false)
        }
        else{
            setKVisible(true)
        }

    }

    function visibleColumnKInv(){
        if (kInvVisible == true){
            setKInvVisible(false)
        }
        else{
            setKInvVisible(true)
        }

    }
    
    function visibleColumnB(){
        if (bVisible == true){
            setBVisible(false)
        }
        else{
            setBVisible(true)
        }

    }

    return(

        <div style={{backgroundColor: colors.black}}>
            {/* <Button onClick={CalculateOrReset3Points}>Calcular</Button> */}
            <Table2>
                <thead>
                    <tr style={{backgroundColor: colors.gray, color:colors.white}}>
                        <Th3>Punto</Th3>
                        <Th3>Luz</Th3>
                        <Th3>Long</Th3>
                        <Th3>N.Vtas</Th3>
                        <Th3>
                            {
                                pasoVisible ? <Button2 onClick={visibleColumnPaso}>Paso (mm)</Button2> : <Button3 onClick={visibleColumnPaso}>+</Button3>
                            }
                        </Th3>
                        <Th3>
                            {
                                kEqVisible ? <Button2 onClick={visibleColumnKeq}>Keq. (N/mm)</Button2> : <Button3 onClick={visibleColumnKeq}>+</Button3>
                            }
                        </Th3>
                        <Th3>  
                            {
                                xcVisible ? <Button2 onClick={visibleColumnXc}>Xc (mm)</Button2> : <Button3 onClick={visibleColumnXc}>+</Button3>
                            }
                        </Th3>
                        <Th3>
                            {
                                fcVisible ? <Button2 onClick={visibleColumnFc}>Fc (kg)</Button2> : <Button3 onClick={visibleColumnFc}>+</Button3>
                            }
                        </Th3>
                        <Th3>
                            {
                                kVisible ? <Button2 onClick={visibleColumnK}>K (N/mm)</Button2> : <Button3 onClick={visibleColumnK}>+</Button3>
                            }
                        </Th3>
                        <Th3>
                            {
                                bVisible ? <Button2 onClick={visibleColumnB}>b</Button2> : <Button3 onClick={visibleColumnB}>+</Button3>
                            }
                        </Th3>

                    </tr>
                </thead>
                <tbody>
                    {processTableStage1Inv.map((punto, indice) => (
                        <tr key={punto.id} style={{color:"grey"}}>
                            <Td>
                                {punto.id}
                            </Td>
                            <Td>
                                {
                                    punto.id > 2 ? ((!isNaN(punto.Luz) && Number.isFinite(punto.Luz) && (punto.Luz !== 0)) === true ? (punto.Luz).toFixed(2) : "") : <Input value={punto.Luz} type="number" id={punto.id+",Luz"} onChange={(e) => handleInputProcessTableStage1(e)} disabled={indice === (0)}/>
                                }
                            </Td>
                            <Td>
                                {
                                    punto.id < 3 ? ((!isNaN(punto.Long) && Number.isFinite(punto.Long) && (punto.Long !== 0)) === true ? (punto.Long).toFixed(2) : "") : <Input value={punto.Long} type="number" id={punto.id+",Long"} onChange={(e) => handleInputProcessTableStage1(e)} disabled={indice === (0)}/>
                                }
                            </Td>
                            <Td>
                                <Input value={punto.Vtas} type="number" id={punto.id+",Vtas"} onChange={(e) => handleInputProcessTableStage1(e)} disabled={indice === (0)}/>
                            </Td>
                            <Td>
                                {
                                    pasoVisible ? ((!isNaN(processTableStage2Inv[indice].Paso) && Number.isFinite(processTableStage2Inv[indice].Paso) && (processTableStage2Inv[indice].Paso !== 0)) === true ? (processTableStage2Inv[indice].Paso).toFixed(2) : "") : null
                                }
                            </Td>
                            <Td>
                                {
                                    kEqVisible ? ((!isNaN(processTableStage2Inv[indice].Keq) && Number.isFinite(processTableStage2Inv[indice].Keq) && (processTableStage2Inv[indice].Keq !== 0)) === true ? (processTableStage2Inv[indice].Keq).toFixed(2) : "") : null
                                }
                            </Td>
                            <Td>
                                {
                                    xcVisible ? ((!isNaN(processTableStage2Inv[indice].Xc) && Number.isFinite(processTableStage2Inv[indice].Xc) ) === true ? (processTableStage2Inv[indice].Xc).toFixed(2) : "") : null
                                }
                            </Td>
                            <Td>
                                {
                                    fcVisible ? ((!isNaN(processTableStage2Inv[indice].Fc) && Number.isFinite(processTableStage2Inv[indice].Fc) ) === true ? (processTableStage2Inv[indice].Fc).toFixed(2) : "") : null
                                }
                            </Td>
                            <Td>
                                {
                                    kVisible ? ((!isNaN(processTableStage2Inv[indice].K) && Number.isFinite(processTableStage2Inv[indice].K) && (processTableStage2Inv[indice].K !== 0)) === true ? (processTableStage2Inv[indice].K).toFixed(2) : "") : null
                                }
                            </Td>
                            <Td>
                                {
                                    bVisible ? ((!isNaN(processTableStage2Inv[indice].b) && Number.isFinite(processTableStage2Inv[indice].b)) === true ? (processTableStage2Inv[indice].b.toFixed(2)) : "") : null
                                }
                            </Td>
                        </tr>
                    ))}
                </tbody>
                                         
                      
            </Table2>
            <div style={{display: "flex"}}  >
              <Button1 onClick={deleteRow} disabled={processTableStage1.length === 3}>Eliminar última fila</Button1>
              <Button1 onClick={addRow}>Agregar fila</Button1> 
              <Button1 onClick={orderRow}>Ordenar filas</Button1>  
            </div>
        </div>
    )
  }