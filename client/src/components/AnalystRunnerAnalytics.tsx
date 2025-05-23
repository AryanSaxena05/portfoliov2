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
        borderColor: '#89CFF0',
        backgroundColor: 'rgba(137, 207, 240, 0.2)',
        tension: 0.1,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        border: {
          color: '#89CFF0'
        },
        grid: {
          color: 'rgba(137, 207, 240, 0.1)'
        },
        ticks: {
          font: {
            family: '"Press Start 2P"',
            size: 8
          },
          color: '#89CFF0',
          maxTicksLimit: 6,
          callback: function(value: any) {
            return value + 'ms';
          }
        }
      },
      x: {
        border: {
          color: '#89CFF0'
        },
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-[#0D1B2A] border-2 border-[#89CFF0] p-6 rounded-lg h-full flex flex-col">
      <h3 className="font-['Press_Start_2P'] text-[#FFB71F] text-lg mb-6">Response Times</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0D1B2A] border-2 border-[#89CFF0] p-4 rounded-lg flex flex-col justify-between">
          <h4 className="font-['Press_Start_2P'] text-[#89CFF0] text-xs mb-2">
            Last Jump
          </h4>
          <p className="font-['Press_Start_2P'] text-[#FFB71F] text-xl">
            {lastResponse.toFixed(0)}
            <span className="text-sm text-[#89CFF0] ml-1">ms</span>
          </p>
        </div>
        <div className="bg-[#0D1B2A] border-2 border-[#89CFF0] p-4 rounded-lg flex flex-col justify-between">
          <h4 className="font-['Press_Start_2P'] text-[#89CFF0] text-xs mb-2">
            Average
          </h4>
          <p className="font-['Press_Start_2P'] text-[#FFB71F] text-xl">
            {avgResponse.toFixed(0)}
            <span className="text-sm text-[#89CFF0] ml-1">ms</span>
          </p>
        </div>
      </div>

      <div className="flex-1 bg-[#0D1B2A] border-2 border-[#89CFF0] p-4 rounded-lg min-h-[200px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}