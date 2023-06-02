import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';

const Td = styled.td`
  text-align: center;
  width: 40px;
  border: 1px solid grey;

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
const Button = styled.button`
  width:125px;
  height:40px;
  margin:3px 12px;
  border-radius:8px;
  background-color: #fc1221c5;
  color: white;
  
`
const Button1 = styled.button`
  width:125px;
  height:40px;
  margin:10px 14px;
  border-radius:8px;
`

export default function TablaDinamica(props) {

    const {data, setData, puntos1, setPuntos1, puntos2, setPuntos2} = useAuth();

    /*const [puntos1, setPuntos1] = useState([
        { id: 1, Luz: "", Long: "", Vtas: "" },
        { id: 2, Luz: "", Long: "", Vtas: "" },
        { id: 3, Luz: "", Long: "", Vtas: "" }
    ])
    
    const [puntos2, setPuntos2] = useState([
        { id: 1, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
        { id: 2, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" },
        { id: 3, Paso: "", K: "", Kinv: "", Keq: "", Xc: "", b: "", Fc: "" }
    ])*/

    const [puntos1Inv, setPuntos1Inv] = useState([])
    const [puntos2Inv, setPuntos2Inv] = useState([])

    function calcularPuntos1(){
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
    
    function handleButtonCalcular(){
        calcularPuntos1()
    }

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

        let array1 = JSON.parse(JSON.stringify(puntos1))
        let array2 = JSON.parse(JSON.stringify(puntos2))
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

        let puntosCalc = JSON.parse(JSON.stringify(puntos1))
        
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
                if (punto.id === Number(arreglo[0])) {
                    punto.Luz = Number(e.target.value)
                    punto.Long = Number(long)
                }
            }
            else if (arreglo[1] === "Vtas"){
                luz = (Number(puntos1[Number(arreglo[0])-1].Long)/Number(e.target.value)) - d
                if (punto.id === Number(arreglo[0])) {
                    punto.Vtas = Number(e.target.value)
                    punto.Luz = Number(luz)
                }
            }
            else if (arreglo[1] === "Long"){
                luz = Number(e.target.value)/puntos1[Number(arreglo[0])-1].Vtas - d
                if (punto.id === Number(arreglo[0])) {
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
        let longPuntoFinal = 0 

        if (((data.Ext1 === "TASE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TCSE") && (data.Ext2 === "TASE")) || ((data.Ext1 === "TASE") && (data.Ext2 === "TCSE"))) {
            longPuntoFinal = longTotal - sumaLongsParcial - d
        } else if (((data.Ext1 === "TAE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TCE") && (data.Ext2 === "TAE")) || ((data.Ext1 === "TAE") && (data.Ext2 === "TCE"))) {
            longPuntoFinal = longTotal - sumaLongsParcial 
        } else {
            longPuntoFinal = longTotal - sumaLongsParcial - d/2
        }
        
        let luzPuntoFinal = longPuntoFinal/vtaPuntoFinal - d

        puntos1Aux[puntos1Aux.length-1].Vtas = vtaPuntoFinal
        puntos1Aux[puntos1Aux.length-1].Long = longPuntoFinal
        puntos1Aux[puntos1Aux.length-1].Luz = luzPuntoFinal

        /*if (vtaPuntoFinal < 0) {
            alert("Advertencia: Número de vueltas negativo")
        }
        if (longPuntoFinal < 0) {
            alert("Advertencia: Longitud negativa")
        }
        if (luzPuntoFinal < 0) {
            alert("Advertencia: Luz negativa")
        }*/

        setPuntos1(puntos1Aux)
    }

    function calcularUltimoPunto(){
        let d = data.d
        let sumaVtasParcial = 0
        let sumaLongsParcial = 0
        let puntos1Aux = JSON.parse(JSON.stringify(puntos1))
        puntos1Aux.map((punto) => {

            if (punto.id < puntos1Aux.length) {
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

        puntos1Aux[puntos1Aux.length-1].Vtas = vtaPuntoFinal
        puntos1Aux[puntos1Aux.length-1].Long = longPuntoFinal
        puntos1Aux[puntos1Aux.length-1].Luz = luzPuntoFinal
        setPuntos1(puntos1Aux)

    }

    useEffect(() => {

        calcularPuntos2()

        let puntosAux = JSON.parse(JSON.stringify(puntos1))
        let puntosAux1 = JSON.parse(JSON.stringify(puntos1))
        let puntosInv = puntosAux.reverse()
        setPuntos1Inv(puntosInv)
        
    }, [puntos1])

    useEffect(() => {
        calcularPuntos1()
        calcularUltimoPunto()
        
    }, [data])

    useEffect(() => {

        let puntosAux = JSON.parse(JSON.stringify(puntos2))
        let puntosAux2 = JSON.parse(JSON.stringify(puntos2))
        let puntosInv = puntosAux.reverse()
        setPuntos2Inv(puntosInv)
        
    }, [puntos2])

    return(
        <div style={{backgroundColor: "black"}}>
            <Button onClick={handleButtonCalcular}>Calcular</Button>
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
                    {puntos1Inv.map((punto, indice) => (
                        <tr key={punto.id} style={{color:"white"}}>
                            <Td>
                                {punto.id}
                            </Td>
                            <Td>
                                {
                                    punto.id > 2 ? ((!isNaN(punto.Luz) && Number.isFinite(punto.Luz) && (punto.Luz !== 0)) === true ? (punto.Luz).toFixed(2) : "") : <Input value={punto.Luz} type="number" id={punto.id+",Luz"} onChange={(e) => handleInputPuntos1(e)} disabled={indice === (0)}/>
                                }
                            </Td>
                            <Td>
                                <Input value={punto.Long} type="number" id={punto.id+",Long"} onChange={(e) => handleInputPuntos1(e)} disabled={indice === (0)}/>
                            </Td>
                            <Td>
                                <Input value={punto.Vtas} type="number" id={punto.id+",Vtas"} onChange={(e) => handleInputPuntos1(e)} disabled={indice === (0)}/>
                            </Td>
                            <Td>
                                {
                                    (!isNaN(puntos2Inv[indice].Keq) && Number.isFinite(puntos2Inv[indice].Keq) && (puntos2Inv[indice].Keq !== 0)) === true ? (puntos2Inv[indice].Keq).toFixed(3) : ""
                                }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(puntos2Inv[indice].Xc) && Number.isFinite(puntos2Inv[indice].Xc) && (puntos2Inv[indice].Xc !== 0)) === true ? (puntos2Inv[indice].Xc).toFixed(3) : ""
                                }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(puntos2Inv[indice].Fc) && Number.isFinite(puntos2Inv[indice].Fc) && (puntos2Inv[indice].Fc !== 0)) === true ? (puntos2Inv[indice].Fc).toFixed(3) : ""
                                }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(puntos2Inv[indice].Paso) && Number.isFinite(puntos2Inv[indice].Paso) && (puntos2Inv[indice].Paso !== 0)) === true ? (puntos2Inv[indice].Paso).toFixed(2) : ""
                                }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(puntos2Inv[indice].K) && Number.isFinite(puntos2Inv[indice].K) && (puntos2Inv[indice].K !== 0)) === true ? (puntos2Inv[indice].K).toFixed(3) : ""
                                }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(puntos2Inv[indice].Kinv) && Number.isFinite(puntos2Inv[indice].Kinv) && (puntos2Inv[indice].Kinv !== 0)) === true ? (puntos2Inv[indice].Kinv).toFixed(4) : ""
                                }
                            </Td>
                            <Td>
                                {
                                    (!isNaN(puntos2Inv[indice].b) && Number.isFinite(puntos2Inv[indice].b)) === true ? (puntos2Inv[indice].b.toFixed(3)) : ""
                                }
                            </Td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="11" align="center">
                            <Button1 onClick={deleteRow} disabled={puntos1.length === 3}>Eliminar última fila</Button1>
                            <Button1 onClick={addRow}>Agregar fila</Button1> 
                            <Button1 onClick={orderRow}>Ordenar filas</Button1>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
  }