import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { useAuth } from '../context/auth-context';
import { colors } from "../styles/colors";

const DivSimul = styled.div`
  display:flex;
  //flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  //column-gap:5px;
  row-gap:none;
  margin-bottom:30px;
  margin-top: 40px;
  width: 236px;
  background-color: ${colors.gray};  
  border-radius:8px; 
`   
const Paragraph = styled.p`
  block-size:1px;
  margin-bottom: 15px;
  margin-top: 8px;
  font-family:"ABeeZee";
  font-size:12px;
  color: white;  
  width: 148px;
`
const Input8 = styled.input`
  width:40px;
  height:18px;
  color:white;
  background-color: black;
  margin:9px;
  font-family:"ABeeZee";
  font-size: 12px;
  border-style:inset;
  border-radius: 4px;
  text-align: left;
     
`
const Div = styled.div`
  display:flex;
  aling-items: center;
  width:100px;
  height:40px;
  margin:3px 7px;
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
  line-height: 18px; 
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

  const {dimensions, kControlCargas, bControlCargas} = useAuth();
  
  const [inputFuerza, setInputFuerza] = useState(0);
  const [long, setLong] = useState(0);
  const [def, setDef] = useState(0);

  function handleInputFuerza(e){

    setInputFuerza(Number(e.target.value))

    let defNuevo = (Number(e.target.value)-bControlCargas)/kControlCargas
    let longNuevo = (Number(dimensions.L0)-defNuevo).toFixed(1)

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