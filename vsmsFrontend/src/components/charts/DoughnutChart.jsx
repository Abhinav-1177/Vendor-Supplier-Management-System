import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ labels, data, colors }) {
  return (
    <Doughnut
      data={{ labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }] }}
      options={{
        responsive: true, maintainAspectRatio: false, cutout: '65%',
        plugins: { legend: { position: 'bottom', labels: { padding: 10 } } },
      }}
    />
  );
}