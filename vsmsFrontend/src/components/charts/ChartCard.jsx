import './chartSetup';
import { Card } from '../ui';

// Wraps any chart in a titled card with a fixed height
export default function ChartCard({ title, actions, height = 220, className, children }) {
  return (
    <Card title={title} actions={actions} className={className}>
      <div style={{ position: 'relative', height }}>{children}</div>
    </Card>
  );
}