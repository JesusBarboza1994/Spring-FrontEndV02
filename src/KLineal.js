import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import App from "./App";


export function KLineal(){
     
    const x = [App.filas.Xc1,App.filas.Xc2,App.filas.Xc3];
    const y = [App.filas.Fc1,App.filas.Fc2,App.filas.Fc3];
    const n=3; //cantidad de elementos dentro del array
    let x2=[];
    let yx=[];

    for(let i=0; i<3; i++){
        x2.push(Math.pow(x[i],2));
        yx.push(x[i]* y[i]);

    }

    const sumax=x.reduce((previousValue, currentValue) => {
    return previousValue+currentValue;
    },0);
    const sumay=y.reduce((previousValue, currentValue) => {
    return previousValue+currentValue;
    },0);
    const sumax2=x2.reduce((previousValue, currentValue) => {
    return previousValue+currentValue;
    },0);
    const sumayx=yx.reduce((previousValue, currentValue) => {
    return previousValue+currentValue;
    },0);

    const delta=sumax2*n-sumax*sumax;
    const deltaA=sumayx*n-sumay*sumax;
    const deltaB=sumax2*sumay-sumax*sumayx;

    let k=deltaA/delta;
    let b=deltaB/delta;

    console.log(sumax);
    console.log(sumay);
    console.log(sumax2);
    console.log(sumayx);
    console.log(k);
    console.log(b);
    
    return(
        <div>{k}</div>
    )
    
}