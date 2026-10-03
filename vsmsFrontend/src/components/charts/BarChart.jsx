import { Bar } from 'react-chartjs-2';
import { baseScales } from './chartSetup';

// datasets: [{ label, data, color }]  (color can be a single colour or an array, one per bar)
export default function BarChart({ labels, datasets, showLegend }) {
  return (
    <Bar
      data={{
        labels,
        datasets: datasets.map((d) => ({
          label: d.label, data: d.data, backgroundColor: d.color, borderRadius: 6, borderSkipped: false,
        })),
      }}
      options={{
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: showLegend ?? datasets.length > 1 } },
        scales: baseScales,
      }}
    />
  );
}