import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';

const DivSimul = styled.div`
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap:8px;
  row-gap:none;
  margin-bottom:30px;
  margin-top: 10px;
  width: 310px;
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

export default function ProbarFuerza() {

    const {data, kControlCargas, bControlCargas} = useAuth();
    
    const [inputFuerza, setInputFuerza] = useState(0);
    const [long, setLong] = useState(0);
    const [def, setDef] = useState(0);

    function handleInputFuerza(e){

        setInputFuerza(Number(e.target.value))

        let defNuevo = (Number(e.target.value)-bControlCargas)/kControlCargas
        let longNuevo = Number(data.L0)-defNuevo

        setLong(longNuevo)
        setDef(defNuevo)

    }

    return(
        <div style={{backgroundColor: "black"}}>
            
            <DivSimul> 
                <Paragraph style={{width: '80px'}}>Calculos reales</Paragraph>
                <div style={{display: 'flex'}}>
                    <Div>
                        <Label>F</Label>
                        <Input8 type="number" value={inputFuerza} onChange={(e) => handleInputFuerza(e)}/>
                    </Div>
                    <Div>
                        <Label>L</Label>
                        <DivCalculo id={"L"}>{long}</DivCalculo>
                    </Div>
                </div>
                    
            </DivSimul>

        </div>
    )
}