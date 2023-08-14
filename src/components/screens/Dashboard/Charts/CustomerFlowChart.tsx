import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useLang } from '@/hooks/useLang';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function CustomerFlowChart() {
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
  const options = {
    // aspectRatio: 390 / 190,
    aspectRatio: ((windowSize[0] < 1024 ? windowSize[0] + 300 : windowSize[0]) * 350) / (290 * windowSize[1]),
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
          padding: 10
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#000000',
          padding: 10
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
        barPercentage: 0.1,
        barThickness: 12,
        maxBarThickness: 9,
        minBarLength: 2,
        label: 'Dataset 2',
        data: [6, 4, 5, 6, 7, 1, 2, 3],
        backgroundColor: '#1061DB',
      },
      {
        barPercentage: 0.1,
        barThickness: 12,
        maxBarThickness: 9,
        minBarLength: 2,
        label: 'Dataset 3',
        data: [2, 1, 3, 4, 6, 5, 7],
        backgroundColor: '#D84E00',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
