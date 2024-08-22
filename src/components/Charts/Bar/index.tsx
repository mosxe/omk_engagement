import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Legend,
  BarController
} from 'chart.js';
import { Bar as BarJS } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

type Props = {
  id: string;
  labels: string[];
  data: string[] | number[];
  title: string;
};

const Bar = ({ id, data, labels, title }: Props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Legend,
    ChartDataLabels
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // devicePixelRatio: window.devicePixelRatio || 1,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        border: {
          display: false,
          dash: [6, 6]
        },
        grid: {
          color: 'rgba(208, 212, 217, 1)',
          tickBorderDash: [0, 5]
        },
        ticks: {
          stepSize: 20,
          callback: function (value: number | string) {
            return value + '%';
          },
          font: {
            size: 14,
            color: 'rgba(141, 142, 145, 1)',
            family: "'Verdana', sans-serif",
            weight: 'normal' as const
          }
        }
      },
      //   {
      //     ticks: {
      //       fontColor: 'rgba(0, 50, 75, 1)',
      //       fontSize: 14,
      //       stepSize: 1,
      //       beginAtZero: true
      //     }
      //   }
      // ],
      x: {
        border: {
          display: false
        },
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(10, 20, 30, 1)',
          font: {
            size: 14,
            color: 'rgba(0, 50, 75, 1)',
            family: "'Verdana', sans-serif",
            weight: 'bold' as const,
            fontColor: 'rgba(10, 20, 30, 1)'
          }
        }
      }
    },
    plugins: {
      id: id,
      datalabels: {
        display: true,
        color: 'rgba(0, 50, 75, 1)',
        anchor: 'end' as const,
        align: 'end' as const,
        font: {
          size: 16,
          family: "'Verdana', sans-serif"
        }
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
        color: 'rgba(26, 34, 44, 1)',
        font: {
          size: 16,
          family: "'Verdana', sans-serif",
          weight: 'normal' as const
        },
        padding: { top: 0, left: 0, right: 0, bottom: 40 }
      }
    }
  };

  const dataChart = {
    labels: labels,
    datasets: [
      {
        data: data,
        borderColor: 'rgba(0, 50, 75, 1)',
        backgroundColor: 'rgba(0, 50, 75, 1)',
        barThickness: 80,
        barPercentage: 1
      }
    ]
  };

  return <BarJS data={dataChart} options={options} />;
};

export default Bar;
