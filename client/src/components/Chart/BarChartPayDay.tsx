import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BarChartPayDayProps {
  historyPayments: Array<{
    month?: string;
    year: number;
    gainsPerDay: number[];
  }>;
}

const BarChartPayDay: React.FC<BarChartPayDayProps> = ({ historyPayments }) => {
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.9)`;

  const currentMonthData = historyPayments[0];

  const daysInMonth = currentMonthData.gainsPerDay.length;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const maxValue = Math.max(...currentMonthData.gainsPerDay);

  const data = {
    labels: days,
    datasets: [
      {
        label: currentMonthData.month,
        data: currentMonthData.gainsPerDay,
        fill: true,
        tension: 0.5,
        backgroundColor: randomColor,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0, 0.2)",
        },
        ticks: {
          color: "rgba(0,0,0, 0.8)",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0, 0.2)",
        },
        ticks: {
          color: "rgba(0,0,0, 0.8)",
        },
        max: maxValue * 1.2,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChartPayDay;
