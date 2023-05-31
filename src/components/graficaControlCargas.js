import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import "@fontsource/abeezee/400-italic.css";
import { Scatter } from 'react-chartjs-2';
import Chart from 'chart';

export default function ScatterPlot(props) {

    const chartData = {
        datasets: [
          {
            label: 'Puntos',
            data: props.data,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
          {
            type: 'line',
            label: 'Aproximación lineal',
            data: props.linea,
            fill: false,
            borderColor: 'rgba(192,75,75,1)',
            tension: 0.1,
          },
        ],
    };
    
    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
        },
    };

    return(
        <div style={{backgroundColor: "black"}}>
            <Scatter data={chartData} options={options} />
        </div>
    )
  }

