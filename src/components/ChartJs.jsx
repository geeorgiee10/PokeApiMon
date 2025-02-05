import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StatsChart = ({ stats }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!stats || stats.length === 0) {
      return;
    }
    
    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: stats.map((stat) => `${stat.stat.name.toUpperCase()}`),
      datasets: [
        {
          data: stats.map((stat) => stat.base_stat),
          backgroundColor: 'rgba(67, 148, 162, 0.2)', // color fondo
          borderColor: 'rgb(0, 10, 204)', // color borde
          borderWidth: 3,
          pointBackgroundColor: 'rgba(0, 10, 204, 1)', // color puntos del grafico
          pointBorderColor: 'rgba(255, 255, 255, 1)', // color de los bordes de los puntos
          pointBorderWidth: 2,
          pointRadius: 6, // tamaño de los puntos del grafico
          hoverBackgroundColor: 'rgba(1, 4, 184, 0.2)', // color del punto que sale al hacer hover
          hoverBorderColor: 'rgb(22, 1, 117)', // color del borde de los puntos al hacer hover
          hoverBorderWidth: 3,
          hoverRadius: 8, // tamaño que tendran los puntos alhacer hover
          tension: 0.5, // las curvas de las lineas del grafico
        },
      ],
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true, 
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.6)', //color de las lineas que salen del centro
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.6)', //color de las lineas que hacen el hexagono
            },
            ticks: {
              display: false,
              min: 0,
              max: 100,
            },
            pointLabels: {
              font: {
                size: 14, //tamaño de los titulos de los campos
                weight: 'bold',
              },
              color: 'rgb(246, 241, 241)',//color de los campos
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        plugins: {
          legend: {
            display: false, //sin leyenda en el grafico
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // color del fondo de la ventana con la informacion
            titleColor: 'rgba(255, 255, 255, 1)', // color del titulo de la ventana con la informacion
            bodyColor: 'rgba(255, 255, 255, 0.8)', // color del valor de la ventana con la informacion
            borderColor: 'rgb(255, 255, 255)', // color del borde de la ventana con la informacion
            borderWidth: 2,
          },
        },
        animation: {
          duration: 1000, // duración de la animacion
          easing: 'easeInOutQuad', // animacion al cambiar o generarse las stats
        },
      },
    });
  }, [stats]);

  return <canvas ref={chartRef} width="400" height="200" style={{maxWidth: '100%', height: 'auto'}}></canvas>; //devolver el canva con el grafico
};

export default StatsChart;
