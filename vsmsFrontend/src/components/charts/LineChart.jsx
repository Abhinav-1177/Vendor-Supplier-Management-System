import { Line } from 'react-chartjs-2';
import { baseScales } from './chartSetup';

// Single-series area line, like the demo's revenue charts
export default function LineChart({ labels, data, label = '', color = '#00d4aa' }) {
  return (
    <Line
      data={{
        labels,
        datasets: [{
          label, data,
          borderColor: color, backgroundColor: `${color}14`,
          borderWidth: 2.5, fill: true, tension: 0.4,
          pointBackgroundColor: color, pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 5,
        }],
      }}
      options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: baseScales }}
    />
  );
}