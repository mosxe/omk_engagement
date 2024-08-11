import { Chart as ChartJS, ArcElement, Legend, Title, layouts } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'assets/images/Engagement/img_2.png';
import styles from './styles.module.scss';

const data = {
  labels: [0, 100],
  datasets: [
    {
      data: [61, 39],
      backgroundColor: ['rgba(2, 50, 74, 1)', 'rgba(208, 212, 217, 1)'],
      hoverBackgroundColor: ['rgba(2, 50, 74, 1)', 'rgba(208, 212, 217, 1)'],
      borderWidth: 0,
      cutout: '65%',
      circumference: 180,
      rotation: 270
    }
  ]
};

const options = {
  plugins: {
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

const centerDoughnutPlugin = {
  id: 'annotateDoughnutCenter',
  beforeDraw: (chart: any) => {
    const width = chart.width;
    const height = chart.height;
    const ctx = chart.ctx;

    ctx.restore();
    const fontSize = (height / 60).toFixed(2);
    ctx.font = fontSize + 'em Verdana';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(0, 50, 75, 1)';

    const text = '61%';
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
    const text = '2024 год';
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 1.1;

    ctx.fillText(text, textX, textY);
    ctx.save();

    chart.data.datasets.forEach((_, i: number) => {
      chart.getDatasetMeta(i).data.forEach((_, index: number) => {
        let x = 30;
        const y = 196;
        if (index > 0) {
          x = 352;
        }
        ctx.font = '12px Verdana';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(chart.data.labels[index], x, y);
      });
    });
  }
};

ChartJS.register(ArcElement, Legend, Title, centerDoughnutPlugin);

const EngagementResults = () => {
  return (
    <section className={styles['engagement-results']}>
      <div className={styles['engagement-results__header']}>
        <div className={styles['engagement-results__header_wrapper']}>
          <h2>Результаты исследования вовлеченности</h2>
        </div>
        <div className={styles['engagement-results__header_img']}>
          <img src={Image} alt='Картинка' />
        </div>
      </div>
      <div className={styles['engagement-results__wrapper']}>
        <h3>Результаты за 3 последних года</h3>
        <div>Сравнить с БЕ</div>
        <div className={styles['engagement-results__container']}>
          <div className={styles['engagement-results__chart']}>
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementResults;
