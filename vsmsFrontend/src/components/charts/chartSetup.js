// Register Chart.js pieces once. Every chart component imports this file.
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Tooltip, Legend, Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);

ChartJS.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
ChartJS.defaults.font.size = 11;
ChartJS.defaults.color = '#6b7a99';

export const GRID = '#e2e8f8';

export const baseScales = {
  x: { grid: { display: false } },
  y: { grid: { color: GRID } },
};