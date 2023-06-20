import styled from "@emotion/styled";
import "@fontsource/abeezee/400-italic.css";
import { DescripcionResorte } from "./Descripcion";
import { colors } from "../styles/colors";

export function Textarea(){
   const Paragraph = styled.p`
        block-size:1px;
        margin-left:15px;
        margin-bottom: 8px;
        font-family:"ABeeZee";
        font-size:11px;
        color: ${colors.white};  
        width: 148px;
    `
    let descripcion = DescripcionResorte()

 return(
    <div>  
        <Paragraph style={{width: 480}}>Descripcion</Paragraph>
        <div style={{
          
            width: 444, 
            height: 100, 
            margin:14,
            marginBottom: 0, 
            border:"2px solid grey",
            borderBottom: "1px solid grey",
            borderColor:colors.grey,
            backgroundColor:colors.black,
            color:colors.grey,
            fontFamily:"ABeeZee",
            fontSize: 16,
            padding:10,

         }} placeholder="Descripcion">
         {descripcion}
        </div>

        <textarea style={{
            width: 444,
            height: 20,
            marginLeft:14,
            marginTop: 0,
            border:"2px solid grey",
            borderTop:"1px solid grey",
            backgroundColor:colors.black,
            color:colors.grey,
            fontFamily:"ABeeZee",
            fontSize: 12,
            padding:10,
            }}placeholder="Datos adicionales">
        </textarea>    
    </div>  
    )
    
}   