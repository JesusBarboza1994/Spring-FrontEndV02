import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from "../context/auth-context";
import { isNullLiteral } from "@babel/types";
import { colors } from "../styles/colors";

export function CalcParam({diam,diamext1,diamint1,diamint2,vred1,vred2,numvts,longitud,luz1,luz2}){
 const DivSimul = styled.div`
        display:flex;
        grid-template-columns: auto, auto, auto;
        flex-wrap: wrap;
        justify-content: center;
        //column-gap:8px;
        row-gap:none;
        margin-bottom:20px;
        margin-top: 10px;
        margin-left: 50px;
        width: 500px;
        height: 140px;
        background-color: ${colors.gray};
        border-radius:8px;        
    `
  const Paragraph = styled.p`
        block-size:1px;
        margin-left:30px;
        margin-bottom: 10px;
        font-family:"ABeeZee";
        font-size:12px;
        color: ${colors.white};  
        width: 148px;
    `
    const DivCalculo = styled.div`
        width:40px;
        height:18px;
        color:${colors.black};
        background-color: ${colors.white};
        margin:8px;
        font-family:"ABeeZee";
        font-size: 12px;
        border-radius: 4px;
        border: 2px grey;
        border-style:outset;
        

    `
  const Div = styled.div`
        display:flex;
        aling-items: center;
        width:125px;
        height:40px;
        background: ${colors.black};
        border:2px solid ${colors.gray};
        border-radius:8px;
        
    `
  const Label = styled.label`
        height: 20px;
        width: 65px;
        display:block;
        background-color:${colors.black};
        margin-top:12px;
        margin-left: 8px;
        font-family:"ABeeZee";
        font-size: 13px;
        color: ${colors.gray};
                
    `

    useEffect(() => {

        let dext = Number(diamext1)
        let d = Number(diam) //alambre
    
     setData2({...data2,
        C : ((dext-d)/d),
        Dmedio: (diamext1 - diam), 
        Rel_d1 : Number((diamint1 + diam)/(diamext1 - diam)),
        Rel_d2: Number((diamint2 + diam)/(diamext1 - diam)),
        Vt_red_VT : Number((vred1+vred2)/numvts)
    })

    }, [diam, diamext1, diamint1, diamint2, vred1, vred2, numvts])


    // useEffect(() => {
    //  setData2({...data2, Vt_red_VT : ((vred1+vred2)/numvts).toFixed(2) }) 

    // }, [vred1, vred2, numvts])

    const {filas, setFilas, data2, setData2} = useAuth();

    useEffect(() => {
        const nvtas1 = 0.875;    //primera linea contando desde abajo por arriba (empieza con luz menor)
        const nvtas2 = 0.875;  
        const nvtas3 = Number(numvts) - (nvtas1 + nvtas2);  // Vueltas del cuerpo
        
        const long1 = Number(((Number(luz2) + Number(diam))*nvtas1).toFixed(1));
        const long2 = Number(((Number(luz1) + Number(diam))*nvtas2).toFixed(1));
        const long3 = Number((Number(longitud) - (long1+long2)- Number(diam)).toFixed(1));
        
        const paso1 = Number((long1/nvtas1).toFixed(2));
        const paso2 = Number((long2/nvtas2).toFixed(2));
        const paso3 = Number((long3/nvtas3).toFixed(2));
    
        const rigidez1 = 1/((78500*Math.pow(Number(diam),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas1))); // N/mm
        const rigidez2 = 1/((78500*Math.pow(Number(diam),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas2)));
        const rigidez3 = 1/((78500*Math.pow(Number(diam),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas3)));
    
        const Keq1 = Number((1/(rigidez1+rigidez2+rigidez3)).toFixed(2));
        const Keq2 = Number((1/(rigidez2+rigidez3)).toFixed(2));
        const Keq3 = Number((1/rigidez3).toFixed(2));
    
        const Xc1 = Number(((paso1-Number(diam))*Number(numvts)).toFixed(1));
        const Xc2 = Number(((paso2-Number(diam))*(Number(numvts)-nvtas1)+(paso1*nvtas1)-nvtas1*Number(diam)).toFixed(1));
        const Xc3 = Number(((paso3-Number(diam))*(Number(numvts)-(nvtas1+nvtas2))+(paso1*nvtas1+paso2*nvtas2)-(nvtas1+nvtas2)*Number(diam)).toFixed(1));
    
        const b1 = 0;
        const b2 = Number(((Keq1-Keq2)*Xc1+b1).toFixed(1));
        const b3 = Number(((Keq2-Keq3)*Xc2+b2).toFixed(1));
        
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
            Keq1: Keq1,
            Keq2: Keq2,
            Keq3: Keq3,
            Xc1: Xc1,
            Xc2: Xc2,
            Xc3: Xc3,
            b1: b1,
            b2: b2,
            b3: b3,
            Fc1: Fc1,
            Fc2: Fc2,
            Fc3: Fc3,
                
        })

    },[diam, diamext1, numvts, longitud, luz1, luz2])
    console.log( data2)

    return(
       <DivSimul>
      <Paragraph style={{width: 480}}>Parametros calculados</Paragraph>
      <Div>
          <Label>C</Label>  
                   
          <DivCalculo id={"C"}>
            {(!isNaN(data2.C) && (data2.C > 0) ) === true ? (Number(data2.C)).toFixed(1): ""}
          </DivCalculo>
      </Div>
      <Div>
          <Label>D medio</Label>
          <DivCalculo id={"Dmedio"}>
             {(!isNaN(data2.Dmedio) && (data2.Dmedio > 0)) === true ? Number((data2.Dmedio)) : ""}
          </DivCalculo>
      </Div>
      <Div>
          <Label>f</Label>
          <DivCalculo id={"f"}>{data2.f}</DivCalculo>
      </Div>
      <Div>
          <Label>Rel.d1</Label>
          <DivCalculo id={"Rel.d1"}>
            {(!isNaN(data2.Rel_d1) && (data2.Rel_d1 > 0) && Number.isFinite(data2.Rel_d1)) === true ? (Number(data2.Rel_d1)).toFixed(1) : ""}
          </DivCalculo>
      </Div>
      <Div>
          <Label>Rel.d2</Label>
          <DivCalculo id={"Rel.d2"}>
            {(!isNaN(data2.Rel_d2) && (data2.Rel_d2 > 0) && Number.isFinite(data2.Rel_d2)) === true ? (Number(data2.Rel_d2)).toFixed(1) : ""}
          </DivCalculo>
      </Div>
      <Div>
          <Label>Vt.red/VT</Label>
          <DivCalculo id={"Vt.red/VT"}>
            {(!isNaN(data2.Vt_red_VT) && (data2.Vt_red_VT > 0) && Number.isFinite(data2.Vt_red_VT)) === true ? Number((data2.Vt_red_VT)) : ""}
          </DivCalculo>
      </Div>

      
      </DivSimul> 

      
    );

}