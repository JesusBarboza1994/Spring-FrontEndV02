import React from 'react';
import { Line } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
import { LinearScale, PointElement, LineElement, Chart } from "chart.js";


// Se deben registrar todos lo elementos que se van a utilizar
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

export default function GraficoControlCargas ({puntos, slope, intercept, rSquared}) {

  let datos = JSON.parse(JSON.stringify(puntos))
  // Datos de ejemplo con coordenadas
  const data = {
    datasets: [
      {
        label: 'Puntos',
        data: datos,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: 'Aproximación Lineal',
        data: [],
        type: 'line',
        fill: false,
        borderColor: 'rgba(0,0,255,1)',
        lineTension: 0,
        pointRadius: 0,
      },
    ],
  };

  // Calcular los puntos de la aproximación lineal
  const startPoint = datos[0].x; // Punto de inicio (valor x)
  const endPoint = datos[datos.length-1].x; // Punto de fin (valor x)

  for (let x = startPoint; x <= endPoint; x++) {
    const y = slope * x + intercept;
    data.datasets[1].data.push({ x, y });
  }

  // Opciones de configuración del gráfico
  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        scaleLabel: {
          display: true,
          labelString: 'Def (mm)',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: 'Fuerza (kg)',
        },
      },
    },
  };

  return(
    <div style={{height:"380px", width:"600px", backgroundColor:'white', borderRadius: 8 }}>
        <h3 style={{textAlign:'center', fontFamily: "Inter"}}>Gráfico Control de Cargas</h3>
        <h4 style={{textAlign:'center'}}>
            {
                (!isNaN(slope) && Number.isFinite(slope) && !isNaN(intercept) && Number.isFinite(intercept) && !isNaN(rSquared) && Number.isFinite(rSquared)) === true ? ( "k = "+(Number(slope)).toFixed(2)+", b = "+(Number(intercept)).toFixed(2)+", R2 = "+ (Number(rSquared)).toFixed(3) ) : ("k = , b = , R2 = ")
            }
        </h4>
        <Scatter data={data} options={options} />
    </div>
  ) 
}
