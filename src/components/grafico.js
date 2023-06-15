import React from 'react';
import { Line } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
import { LinearScale, PointElement, LineElement, Chart } from "chart.js";

Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

export default function ScatterPlot ({puntos, slope, intercept}) {

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
        borderColor: 'rgba(255,0,0,1)',
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
        type: "linear",
        position: 'bottom',
      },
    },
  };

  return(
    <div>
        <Line data={data} options={options} />;
    </div>
  ) 
}
