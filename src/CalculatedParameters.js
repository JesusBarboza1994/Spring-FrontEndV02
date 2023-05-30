import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import App from "./App";

export function CalculatedParameters(){
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
  
  const [data2, setData2] = useState({
        C: "",      
        Dmedio:"",         
        f:"",      
        Rel_d1:"",      
        Rel_d2:"",         
        Vt_red_VT:"",      

    })

    useEffect(() => {
     setData2({...data2,
        C : ((App.data.Dext-App.data.d)/App.data.d).toFixed(2),
        Dmedio: (App.data.Dext - App.data.d), Rel_d1 : ((App.data.Dint1 + App.data.d)/(App.data.Dext - App.data.d)).toFixed(2),
        Rel_d2: ((App.data.Dint2 + App.data.d)/(App.data.Dext - App.data.d)).toFixed(2)})

    }, [App.data.d, App.data.Dext, App.data.Dint1, App.data.Dint2])


    useEffect(() => {
     setData2({...data2, Vt_red_VT : ((App.data.Vtas1+App.data.Vtas2)/App.data.N).toFixed(2) }) 

    }, [App.data.Vtas1, App.data.Vtas2, App.data.N])


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

    useEffect(() => {
        //const C = Number(((Number(data.Dext)-Number(data.d))/Number(data.d)).toFixed(2));
        const nvtas1 = 0.875;    //primera linea contando desde abajo por arriba (empieza con luz menor)
        const nvtas2 = 0.875;  
        const nvtas3 = Number(App.data.N) - (nvtas1 + nvtas2);  // Vueltas del cuerpo
        
        const long1 = Number(((Number(App.data.Luz2) + Number(App.data.d))*nvtas1).toFixed(1));
        const long2 = Number(((Number(App.data.Luz1) + Number(App.data.d))*nvtas2).toFixed(1));
        const long3 = Number((Number(App.data.L0) - (long1+long2)- Number(App.data.d)).toFixed(1));
        
        const paso1 = Number((long1/nvtas1).toFixed(2));
        const paso2 = Number((long2/nvtas2).toFixed(2));
        const paso3 = Number((long3/nvtas3).toFixed(2));
    
        const rigidez1 = 1/((78500*Math.pow(Number(App.data.d),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas1))); // N/mm
        const rigidez2 = 1/((78500*Math.pow(Number(App.data.d),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas2)));
        const rigidez3 = 1/((78500*Math.pow(Number(App.data.d),4))/(8*Math.pow(Number(data2.Dmedio),3)*Number(nvtas3)));
    
        const Keq1 = Number((1/(rigidez1+rigidez2+rigidez3)).toFixed(2));
        const Keq2 = Number((1/(rigidez2+rigidez3)).toFixed(2));
        const Keq3 = Number((1/rigidez3).toFixed(2));
    
        const Xc1 = Number(((paso1-Number(App.data.d))*Number(App.data.N)).toFixed(1));
        const Xc2 = Number(((paso2-Number(App.data.d))*(Number(App.data.N)-nvtas1)+(paso1*nvtas1)-nvtas1*Number(App.data.d)).toFixed(1));
        const Xc3 = Number(((paso3-Number(App.data.d))*(Number(App.data.N)-(nvtas1+nvtas2))+(paso1*nvtas1+paso2*nvtas2)-(nvtas1+nvtas2)*Number(App.data.d)).toFixed(1));
    
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
            // rigidez1: rigidez1,
            // rigidez2: rigidez2,
            // rigidez3: rigidez3,
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

    },[App.data.d, App.data.Dext, App.data.N, App.data.L0, App.data.Luz1, App.data.Luz2])

    return(
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
    );

}