import { Chart as ChartJS, ArcElement, Legend, Title } from 'chart.js';
import { Doughnut as DoughnutJS } from 'react-chartjs-2';
import Skeleton from './Skeleton';

ChartJS.register(ArcElement, Legend, Title);

type Props = {
  id: string;
  percent: number;
  title: string;
  size?: 'large' | 'small';
};

const Doughnut = ({ percent, title, id, size = 'large' }: Props) => {
  const options = {
    plugins: {
      datalabels: {
        display: false
      },
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const plugin = {
    id: id,
    beforeDraw: (chart: any) => {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      ctx.restore();

      const sizeHeight = size === 'large' ? 60 : 100;
      const fontSize = (height / sizeHeight).toFixed(2);
      ctx.font = fontSize + 'em Verdana';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(0, 50, 75, 1)';

      const text = `${percent}%`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 1.64;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
    afterDraw: (chart: any) => {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;

      ctx.restore();
      const fontSize = (height / 200).toFixed(2);
      ctx.font = fontSize + 'em Verdana';
      ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(141, 142, 145, 1)';
      const textX = Math.round((width - ctx.measureText(title).width) / 2);
      const sizeY = size === 'large' ? 1.1 : 1.2;
      const textY = height / sizeY;

      ctx.fillText(title, textX, textY);
      ctx.save();

      chart.data.datasets.forEach((_: any, i: number) => {
        chart.getDatasetMeta(i).data.forEach((_: any, index: number) => {
          let x = size === 'large' ? 30 : 8;
          const y = size === 'large' ? 230 : 130;
          const text = index === 0 ? 0 : 100;
          if (index > 0) {
            x = size === 'large' ? 352 : 170;
          }
          ctx.font = '12px Verdana';
          ctx.fillStyle = 'rgba(141, 142, 145, 1)';
          ctx.fillText(text, x, y);
        });
      });
    }
  };

  const data = {
    labels: [percent, 100],
    datasets: [
      {
        data: [percent, 100 - percent],
        backgroundColor: ['rgba(2, 50, 74, 1)', 'rgba(208, 212, 217, 1)'],
        hoverBackgroundColor: ['rgba(2, 50, 74, 1)', 'rgba(208, 212, 217, 1)'],
        borderWidth: 0,
        cutout: '65%',
        circumference: 180,
        rotation: 270
      }
    ]
  };

  return <DoughnutJS data={data} options={options} plugins={[plugin]} />;
};

export default Doughnut;

export { Skeleton };
