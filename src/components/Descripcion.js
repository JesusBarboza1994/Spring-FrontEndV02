import { useEffect } from "react";
import { useAuth } from "../context/auth-context";

export function DescripcionResorte(){  //codifica el resorte acorde a los datos presentados en la hoja de diseño

  const {data, data1,tablaToler,coef, descrip, setDescrip,grado} = useAuth();
         
 
  
  
  //Se convierte el numero de vueltas (v.totales: "n") a fracción en texto.
  var residuo = data.N*8 % 8;
  var entero = (data.N*8-residuo)/8; 
  var fraccion; 

  switch (residuo){
    case 0: fraccion = ""; break;
    case 1: fraccion = "1/8"; break;
    case 2: fraccion = "1/4"; break;
    case 3: fraccion = "3/8"; break;
    case 4: fraccion = "1/2"; break;
    case 5: fraccion = "5/8"; break;
    case 6: fraccion = "3/4"; break;
    case 7: fraccion = "7/8"; break;
  }
  var n;
  if(fraccion !=""){
    n = entero + "." + fraccion;
  }else{
    n = entero;
  }
  
      
  //Se convierte el numero de vueltas amp/red del extremo 1 ("n1") a fracción en texto.
  var residuo1 = data.Vtas1*8 % 8;
  var entero1 = (data.Vtas1*8-residuo1)/8; 
  var fraccion1; 
  switch (residuo1){
    case 0: fraccion1 = ""; break;
    case 1: fraccion1 = "1/8"; break;
    case 2: fraccion1 = "1/4"; break;
    case 3: fraccion1 = "3/8"; break;
    case 4: fraccion1 = "1/2"; break;
    case 5: fraccion1 = "5/8"; break;
    case 6: fraccion1 = "3/4"; break;
    case 7: fraccion1 = "7/8"; break;
  }
  var n1;
  if(fraccion1 !=""){
    if (entero1 != 0){
      n1 = entero1 + "." + fraccion1;
    } else {
      n1 = fraccion1;
    }
  }else{
    if (entero1 != 0){
      n1 = entero1;
    } else {
      n1 = "";
    }
  }
   
  //Se convierte el numero de vueltas amp/red del extremo 2 ("n2") a fracción en texto.
  var residuo2 = data.Vtas2*8 % 8;
  var entero2 = (data.Vtas2*8-residuo2)/8; 
  var fraccion2; 
  switch (residuo2){
    case 1: fraccion2 = "1/8"; break;
    case 2: fraccion2 = "1/4"; break;
    case 3: fraccion2 = "3/8"; break;
    case 4: fraccion2 = "1/2"; break;
    case 5: fraccion2 = "5/8"; break;
    case 6: fraccion2 = "3/4"; break;
    case 7: fraccion2 = "7/8"; break;
    }
    var n2;
  if(fraccion2 !=""){
    if (entero2 != 0){
      n2 = entero2 + "." + fraccion2;
    } else {
      n2 = fraccion2;
    }
  }else{
    if (entero2 != 0){
      n2 = entero2;
    } else {
      n2 = "";
    }
  }
   
  var mensaje;   //código de producto
  //var mensaje2;  //especifica cant. de MP al momento del diseño
  var mensaje3="";  //indica si el resorte requerirá plano o no
  var mensaje4="" ////especifica dentro de los demás mensajes si es o no progresivo
 
  
   
  if(data.Dext2 != ""){
    mensaje = "Res Susp. " + data1.Mater + " " + data.d  + " x " + data.Dext + " - " + data.Dext2 + " x " + data.L0 + " " + "(+/-" + coef.toler_L0 + ")"+ " x " + n + "\n";
  }else{
    if(data.Dint1 != "" && data.Dint1!=" " && data.Dint1 != "-" && data.Dint2 != "" && data.Dint2!=" " && data.Dint2 != "-"){
      mensaje = "Res Susp. " + mensaje4 + data1.Mater + " "  + data.d  + " x " + data.Dext + " " + "(+/-" + tablaToler.valor + ")" + " / " + data.Dint1 + " - " + data.Dint2 + " x " + data.L0 + " " + "(+/-" + coef.toler_L0 + ")" + " x " + n + "\n";
      }
    if((data.Dint1 != "" && data.Dint1!=" " && data.Dint1 != "-") && (data.Dint2 == "" || data.Dint2==" " || data.Dint2 == "-")){
      mensaje = "Res Susp. " + mensaje4 + data1.Mater + " "  + data.d  + " x " + data.Dext + + " " + "(+/-" + tablaToler.valor + ")" + " / " + data.Dint1 + " x " + data.L0 + " " + "(+/-" + coef.toler_L0 + ")" +" x " + n + "\n";  
      }
    if((data.Dint2 != "" && data.Dint2!=" " && data.Dint2 != "-") && (data.Dint1 == "" || data.Dint1==" " || data.Dint1 == "-")){
      mensaje = "Res Susp. " + mensaje4 + data1.Mater + " "  + data.d  + " x " + data.Dext + + " " + "(+/-" + tablaToler.valor + ")" + " / " + data.Dint2 + " x " + data.L0 + " " + "(+/-" + coef.toler_L0 + ")" +" x " + n +"\n";  
      }
    if((data.Dint2 == "" || data.Dint2==" " || data.Dint2 == "-") && (data.Dint1 == "" || data.Dint1==" " || data.Dint1 == "-")){
      mensaje = "Res Susp. " + mensaje4 + data1.Mater + " "  + data.d  + " x " + data.Dext + + " " + "(+/-" + tablaToler.valor + ")" + " x " + data.L0 + " " + "(+/-" + coef.toler_L0 + ")" + " x " + n  +"\n";  
      }
  }  
  useEffect(() => {

  if(data.d >0 && data.Dext >0 && data.N >0 && data.L0 >0)
    
  setDescrip({...descrip, descrip: mensaje })
          
 }, [grado])


  //return mensaje
        
}