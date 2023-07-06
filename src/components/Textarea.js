import styled from "@emotion/styled";
import "@fontsource/abeezee/400-italic.css";
import { DescripcionResorte } from "./Descripcion";
import { colors } from "../styles/colors";

export function Textarea(){
   const Paragraph = styled.p`
        block-size:1px;
        margin-left: 84px;
        margin-bottom: 20px;
        font-family:"ABeeZee";
        font-size:12px;
        color: ${colors.white};  
        width: 148px;
    `
    let descripcion = DescripcionResorte()

 return(
    <div>  
        <Paragraph style={{width: 480}}>Descripcion</Paragraph>
        <div style={{
          
            width: 500, 
            height: 100, 
            marginLeft:50,
            marginBottom: 0, 
            border:"2px solid grey",
            borderRadius:8, 
            borderBottom: "1px solid grey",
            borderColor:colors.grey,
            backgroundColor:colors.black,
            color:colors.grey,
            fontFamily:"ABeeZee",
            fontSize: 14,
            padding:10,

         }} placeholder="Descripcion">
         {descripcion}
        </div>

        <textarea style={{
            width: 500,
            height: 40,
            marginLeft:50,
            marginTop: 0,
            border:"2px solid grey",
            borderRadius:8,
            borderTop:"1px solid grey",
            backgroundColor:colors.black,
            color:colors.grey,
            fontFamily:"ABeeZee",
            fontSize: 12,
            paddingLeft:30,
            }}placeholder="Datos adicionales">
        </textarea>    
    </div>  
    )
    
}   