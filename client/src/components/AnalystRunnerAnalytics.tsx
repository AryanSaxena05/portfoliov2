import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalystRunnerAnalyticsProps {
  responseTimes: number[];
}

export default function AnalystRunnerAnalytics({ responseTimes }: AnalystRunnerAnalyticsProps) {
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    if (responseTimes.length > timeLabels.length) {
      const now = new Date();
      setTimeLabels(prev => [...prev, now.toLocaleTimeString()]);
    }
    // Keep only last 10 data points
    if (responseTimes.length > 10) {
      setTimeLabels(prev => prev.slice(-10));
    }
  }, [responseTimes]);

  const last10Times = responseTimes.slice(-10);
  const last10Labels = timeLabels.slice(-10);
  const avgResponse = last10Times.length > 0 ? (last10Times.reduce((a, b) => a + b, 0) / last10Times.length) : 0;
  const lastResponse = last10Times.length > 0 ? last10Times[last10Times.length - 1] : 0;

  const data = {
    labels: last10Labels,
    datasets: [
      {
        label: 'Response Time (ms)',
        data: last10Times,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Jump Response Time (ms)'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <Line data={data} options={options} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700">Last Response Time</h3>
          <p className="text-2xl font-bold text-blue-900">{lastResponse} ms</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Avg Response Time</h3>
          <p className="text-2xl font-bold text-green-900">
            {avgResponse.toFixed(1)} ms
          </p>
        </div>
      </div>
    </div>
  );
} 