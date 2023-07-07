import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';
import { colors } from "../styles/colors";

const DivSimul = styled.div`
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap:5px;
  row-gap:none;
  margin-bottom:30px;
  margin-top: 30px;
  width: 240px;
  background-color: ${colors.gray};  
  border-radius:8px; 
`   
const Paragraph = styled.p`
  block-size:1px;
  margin-left:15px;
  margin-bottom: 15px;
  font-family:"ABeeZee";
  font-size:12px;
  color: white;  
  width: 148px;
`
const Input8 = styled.input`
  width:42px;
  height:18px;
  color:white;
  background-color: black;
  margin:9px;
  font-family:"ABeeZee";
  font-size: 13px;
  border-style:inset;
  border-radius: 4px;
  text-align: left;
     
`
const Div = styled.div`
  display:flex;
  aling-items: center;
  width:100px;
  height:40px;
  margin:8px 6px;
  background: black;
  border:2px solid gray;
  border-radius:8px;  
  
`
const DivCalculo = styled.div`
  width:40px;
  height:18px;
  color:white;
  background-color: black;
  margin:9px;
  font-family:"ABeeZee";
  font-size: 12px;
  border-radius: 4px;
  border: 2px grey;
  border-style:outset;
`
const Label = styled.label`
  height: 20px;
  width: 30px;
  display:block;
  background-color:black;
  margin-top:8px;
  margin-left: 9px;
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
    <div>
      <DivSimul> 
          <Paragraph style={{width: '200px'}}>Punto de control</Paragraph>
          <div style={{display: 'flex', margin: 8,}}>
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