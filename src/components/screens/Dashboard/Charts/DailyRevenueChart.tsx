/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useLang } from '@/hooks/useLang';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function DailyRevenueChart() {

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  let options = {
    // aspectRatio: 750 / 185,
    aspectRatio: (windowSize[0] * 550) / (235 * windowSize[1]),

    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      }
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    barThickness: 9,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000000',
          padding: 10,
          stepSize: 300,
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#000000',
          padding: 10,
          stepSize: 300,
        },
        border: {
          display: false
        }
      },
    },
  };

  const { isEnglish } = useLang()

  const labels = isEnglish ? ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'جمعة'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [300, 900, 200, 1000, 250, 1200, 1500],
        pointRadius: 0,
        borderColor: '#1061DB',
        tension: 0.4
      }
    ],
  };

  return <Line options={options} data={data} />;
}
