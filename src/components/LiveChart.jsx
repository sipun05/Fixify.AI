// LiveChart.jsx
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, TimeScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LiveChart = () => {
  const chartRef = useRef(null);
  const labels = useRef([]);
  const dataPoints = useRef([]);

  useEffect(() => {
    const socket = new WebSocket('wss://api.example.com/realtime'); // Replace with your API URL

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const time = new Date(newData.timestamp);
      const value = newData.value;

      if (labels.current.length >= 20) {
        labels.current.shift();
        dataPoints.current.shift();
      }

      labels.current.push(time);
      dataPoints.current.push(value);

      if (chartRef.current) {
        chartRef.current.update();
      }
    };

    return () => socket.close();
  }, []);

  const chartData = {
    labels: labels.current,
    datasets: [
      {
        label: 'Live Data',
        data: dataPoints.current,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} ref={chartRef} />;
};

export default LiveChart;
