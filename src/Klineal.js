// import styled from "@emotion/styled";
// import { useEffect, useState } from "react";
import { CalcParam } from "./CalculatedParameters";


export function KLineal(){
     
    const x = [CalcParam.filas.Xc1,CalcParam.filas.Xc2,CalcParam.filas.Xc3];
    const y = [CalcParam.filas.Fc1,CalcParam.filas.Fc2,CalcParam.filas.Fc3];
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
    );
    
}