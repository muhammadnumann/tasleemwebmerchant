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
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const defaultDay = [{ date_day: 'sat' }, { date_day: 'sun' }, { date_day: 'mon' }, { date_day: 'tue' }, { date_day: 'wed' }, { date_day: 'thu' }, { date_day: 'fri' }]
export const ArabicDay = { sat: 'السبت', sun: 'الأحد', mon: 'الاثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس', fri: 'جمعة' }

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
        barPercentage: 0.1,
        barThickness: 12,
        maxBarThickness: 9,
        minBarLength: 2,
        label: 'Total Order',
        data: (data1?.daily_sales || defaultDay).map((val: any) => val?.total_orders),
        backgroundColor: '#1061DB',
      },
      {
        barPercentage: 0.1,
        barThickness: 12,
        maxBarThickness: 9,
        minBarLength: 2,
        label: 'Total Sales',
        data: (data1?.daily_sales || defaultDay).map((val: any) => val?.total_sales),
        backgroundColor: '#D84E00',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
