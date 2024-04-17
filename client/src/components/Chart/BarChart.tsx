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

interface lineChartProps {
  historyIncome: Array<{ year: number; incomePerMonth: number[] }>;
  year: number;
}

const BarsChart: React.FC<lineChartProps> = ({ historyIncome, year }) => {
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.9)`;

  var meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  var midata = {
    labels: meses,
    datasets: [
      {
        label: "Ingresos",
        data: historyIncome.find((inc) => inc.year === year)?.incomePerMonth,
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
          color: "rgba(0,0,0, 0.4)",
        },
        ticks: {
          color: "rgba(0,0,0, 0.8)",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0, 0.4)",
        },
        ticks: {
          color: "rgba(0,0,0, 0.8)",
        },
      },
    },
  };

  return <Bar data={midata} options={options} />;
};

export default BarsChart;
