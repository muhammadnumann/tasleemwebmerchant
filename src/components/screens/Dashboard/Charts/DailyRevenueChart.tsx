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
import { useSelector } from 'react-redux';
import { ArabicDay, defaultDay } from './CustomerFlowChart';

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
          // stepSize: 300,
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
          // stepSize: 300,
        },
        border: {
          display: false
        }
      },
    },
  };
  const data1 = useSelector((state: any) => state?.Dashboard?.Data)
  const { isEnglish } = useLang()

  const labels = (data1?.daily_sales || defaultDay).map((val: any) => {
    const day: 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' = val.date_day.toLowerCase()
    return (isEnglish ? val?.date_day : ArabicDay[day])
  })


  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: (data1?.daily_sales || defaultDay).map((val: any) => val?.total_sales),
        pointRadius: 0,
        borderColor: '#1061DB',
        tension: 0.4
      }
    ],
  };

  return <Line options={options} data={data} />;
}
