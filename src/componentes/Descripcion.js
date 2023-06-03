function codalttv(){  //codifica el resorte acorde a los datos presentados en la hoja de diseño
 
    //var tipor = hojaMedidas.getRange(215, 7).getValue(); // tipo de resorte extraido del OnEdit().
   
    //var cont=24;                                             //contador de columna base a partir de la cual se extraerán los datos
    data.d 
    data.Dext
    //dext2
    tablaToler.valor
    var tolerdext1=SResMod.getRange(9,cont+2).getValue();    //tolerancia 
    var lo=roundToTwo(SResMod.getRange(12,cont+1).getValue());      //se redondea el valor dado que al ser suma lo reconoce con varios decimales   

    var tolerlo=SResMod.getRange(12,cont+2).getValue();      //tolerancia 
    coef.toler_L0
    data.N          
    //var acabado=SResMod.getRange(13,cont).getValue();        //tipos de terminales
    // var cantMP=SResMod.getRange(19,cont+28).getValue();      //cant. de MP 
    // var material=SResMod.getRange(19,cont+30).getValue();    //tipo de MP 
     
       
    //datos necesarios de extremos para codificación (si no se quiere mantener idéntico al original se debe modificar en la pestaña seguimiento)
    data.Dint1
    data.Dint2
    data.Luz1 
    data.Vtas1 
    data.Luz2 
    data.Vtas2
   
    var ext11 = Sseguimiento.getRange(21,8).getValue();      //descripción de terminales de resorte para codificar 
    var ext12 = Sseguimiento.getRange(22,8).getValue();
    var ext13 = Sseguimiento.getRange(21,9).getValue();
    var ext14 = Sseguimiento.getRange(22,9).getValue();
    var ext21 = Sseguimiento.getRange(21,12).getValue();
    var ext22 = Sseguimiento.getRange(22,12).getValue();
    var ext23 = Sseguimiento.getRange(21,14).getValue();
    var ext24 = Sseguimiento.getRange(22,14).getValue();
   
    if(ext13 == "-"){
      ext13 = "";                
    }
    if(ext14 == "-"){
      ext14 = "";               
    }
    if(ext23 == "-"){
      ext23 = "";                
    }
    if(ext24 == "-"){
      ext24 = "";
    }
   
    var sentN = Sseguimiento.getRange(14,3).getValue();
    switch(sentN){
      case "Derecha":
        sentN = "";
       break;
      case "Izquierda":
        sentN = "(IZQ)";
       break;
      case "Derecha e Izquierda":
        sentN = "(DER / IZQ)";
       break
      case "":
        Browser.msgBox("Seleccionar sentido de espiras")
       break;
    }
    
   
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
       var residuo2 = data.Vtas2;
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
    //var mensaje3="";  //indica si el resorte requerirá plano o no
    //var mensaje4="" ////especifica dentro de los demás mensajes si es o no progresivo
    //var cantMP;
    // if (transicion!=0){
    //   var mensaje4="Prog."; 
    //   var mensaje3="Resorte progresivo, REQUIERE PLANO"
    // }
    //  if (ext13=="inclinado"|| ext14=="descentrado"||ext23=="inclinado"||ext24=="descentrado"){ 
    //   var mensaje3="REQUIERE PLANO"
    // }
   
    
   
    if(tipor == "Resorte cónico"){
      mensaje = "Res Susp. " + material + " " + data.d  + " x " + data.Dext + " - " + (dext2) + " x " + data.L0 + toler_L0+ " x " + n + " " + (sentN) +"\n";
    }else{
      if(data.Dint1 != "" && data.Dint1!=" " && data.Dint1 != "-" && data.Dint2 != "" && data.Dint2!=" " && data.Dint2 != "-"){
        mensaje = "Res Susp. " + (mensaje4) + (material) + " "  + data.d  + " x " + data.Dext + tablaToler.valor + " / " + data.Dint1 + " - " + data.Dint2 + " x " + data.L0 + toler_L0 + " x " + n + " " + (sentN) +"\n";
       }
      if((data.Dint1 != "" && data.Dint1!=" " && data.Dint1 != "-") && (data.Dint2 == "" || data.Dint2==" " || data.Dint2 == "-")){
        mensaje = "Res Susp. " + mensaje4 + material + " "  + data.d  + " x " + data.Dext + tolerdata.Dext + " / " + data.Dint1 + " x " + data. + tolerdata. +" x " + n + " " + sentN +"\n";  
       }
      if((data.Dint2 != "" && data.Dint2!=" " && data.Dint2 != "-") && (data.Dint1 == "" || data.Dint1==" " || data.Dint1 == "-")){
        mensaje = "Res Susp. " + mensaje4 + material + " "  + data.d  + " x " + data.Dext + tolerdata.Dext + " / " + data.Dint2 + " x " + data. + tolerdata. +" x " + n + " " + sentN +"\n";  
       }
      if((data.Dint2 == "" || data.Dint2==" " || data.Dint2 == "-") && (data.Dint1 == "" || data.Dint1==" " || data.Dint1 == "-")){
        mensaje = "Res Susp. " + mensaje4 + material + " "  + data.d  + " x " + data.Dext + tolerdata.Dext + " x " + data. + tolerdata. + " x " + n  + " " + sentN +"\n";  
       }
    }  
   
    var detalleterminales1=""; //especifica descripción de tipo de terminales para extremo 1
    var detalleterminales2=""; //especifica descripción de tipo de terminales para extremo 2
    var incparentesis=[0,0,0,0,0,0];         //reserva el vector de valores aceptados
    var parentesis1=[];      //reserva el tipo de terminal para los valores aceptados
    var parentesis2=[];      //reserva el tipo de terminal para los valores aceptados
    for (i=0;i<6;i++){
     if (ext12!="" && ext12!="-" && i==0){
       incparentesis[i]=1;
       parentesis1.push(" "+ ext12);}
     if (ext13!="" && ext13!="-" && i==1){
       incparentesis[i]=1;
       parentesis1.push(" "+ ext13);}
     if (ext14!="" && ext14!="-" && i==2){
       incparentesis[i]=1;
       parentesis1.push(" "+ ext14);}
     if (ext22!="" && ext22!="-" && i==3){
       incparentesis[i]=1;
       parentesis2.push(" "+ ext22);}
     if (ext23!="" && ext23!="-" && i==4){
       incparentesis[i]=1;
       parentesis2.push(" "+ ext23);}
     if (ext24!="" && ext24!="-" && i==5){
       incparentesis[i]=1;
       parentesis2.push(" "+ ext24);} 
    }
    
   
      detalleterminales1="(" + (parentesis1.toString()).substring(1) + ")";
      detalleterminales2="(" + (parentesis2.toString()).substring(1) + ")";
    
   
    
    if(data.Dint1 != "" && data.Dint1!=" " && data.Dint1 != "-" && n1!="" && n1!=0 && n1!=0.0){
     if (data.Luz1 !=0 ){
       if(data.Dint1 > data.Dext - 2*data.d ){
        mensaje += ext11 + " L= " + data.Luz1 + "mm c/ " + n1 + "vta. amp. a " + data.Dint1 + "mm int " +  detalleterminales1 + "\n";  
       }else{
        mensaje += ext11 + " L= " + data.Luz1 + "mm c/ " + n1 + "vta. red. a " + data.Dint1 + "mm int " +  detalleterminales1 + "\n";  
       }
     } else {
       if(data.Dint1 > data.Dext - 2*data.d ){
        mensaje += ext11 + " c/ " + n1 + "vta. amp. a " + data.Dint1 + "mm int " + detalleterminales1 + "\n";  
       }else{
        mensaje += ext11 + " c/ " + n1 + "vta. red. a " + data.Dint1 + "mm int " + detalleterminales1 + "\n";  
       }
     }
    }else{
      if (data.Luz1 !=0 ){
       mensaje += ext11 + " L= " + data.Luz1 + "mm "+ detalleterminales1+ "\n";  
      } else {
       mensaje += ext11 + " " + detalleterminales1+ "\n";
      }
    }
   
    if(data.Dint2 != "" && data.Dint2!=" " && data.Dint2 != "-" && n2!="" && n2!=0 && n2!=0.0){
     if (data.Luz2 != 0){
      if(data.Dint2 > data.Dext - 2*data.d ){
        mensaje += ext21 + " L= " + data.Luz2 + "mm c/ " + n2 + "vta. amp. a " + data.Dint2 + "mm int " + detalleterminales2;  
       }else{
        mensaje += ext21 + " L= " + data.Luz2 + "mm c/ " + n2 + "vta. red. a " + data.Dint2 + "mm int " + detalleterminales2;  
       }
     } else {
      if(data.Dint2 > data.Dext - 2*data.d ){
        mensaje += ext21 + " c/ " + n2 + "vta. amp. a " + data.Dint2 + "mm int " + detalleterminales2;  
       }else{
        mensaje += ext21 + " c/ " + n2 + "vta. red. a " + data.Dint2 + "mm int " + detalleterminales2;  
       }
     }
    }else{
     if (data.Luz2 != 0){
       mensaje += ext21 + " L= " + data.Luz2 + "mm " + detalleterminales2;  
     } else {
       mensaje += ext21 + " " + detalleterminales2;  
     }
    }
   
    mensaje2 = cantMP + "kg de MP " + material + " al momento del diseño";  
    mensaje = mensaje + "\n" + mensaje3;
   
    SResMod.getRange(24,cont+16).setValue(mensaje);
    SResMod.getRange(28,cont+16).setValue(mensaje2);
    SResMod.getRange(27,cont+16).setValue(mensaje3);
    
   
   }