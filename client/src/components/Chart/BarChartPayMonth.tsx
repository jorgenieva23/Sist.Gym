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
  historyPayment: Array<{ year: number; gainsPerMonth: number[] }>;
  year: number;
}

const BarChartPayMonth: React.FC<lineChartProps> = ({
  historyPayment,
  year,
}) => {
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
  const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.9)`;

  var midata = {
    labels: meses,
    datasets: [
      {
        label: "Ingresos",
        data: historyPayment.find((inc) => inc.year === year)?.gainsPerMonth,
        fill: true,
        tension: 0.5,
        backgroundColor: randomColor,
      },
    ],
  };

  const gainsPerMonth =
    historyPayment.find((inc) => inc.year === year)?.gainsPerMonth || [];
  const maxValue = Math.max(...gainsPerMonth);

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
  return <Bar data={midata} options={options} />;
};

export default BarChartPayMonth;
