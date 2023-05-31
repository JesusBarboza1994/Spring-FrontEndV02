import React, { useEffect, useRef } from 'react';
import Chart from 'chart';

const ScatterPlot = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Preparar los datos para Chart.js
      const chartData = {
        datasets: [
          {
            label: 'Puntos',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 5,
            showLine: false,
          },
          {
            label: 'Aproximación Lineal',
            data: calculateLinearRegression(data),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointRadius: 0,
            showLine: true,
          },
        ],
      };

      // Configurar y dibujar el gráfico
      new Chart(ctx, {
        type: 'scatter',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              type: 'linear',
              position: 'left',
            },
          },
        },
      });
    }
  }, [data]);

  const calculateLinearRegression = (data) => {
    // Implementa tu lógica para calcular la aproximación lineal aquí
  };

  return <canvas ref={chartRef} />;
};

export default ScatterPlot;
