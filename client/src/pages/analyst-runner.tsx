import { useState } from 'react';
import AnalystRunnerGame from '../components/AnalystRunnerGame';
import AnalystRunnerAnalytics from '../components/AnalystRunnerAnalytics';

export function AnalystRunnerSection() {
  const [score, setScore] = useState(0);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);

  function handleJump(responseTime: number) {
    setResponseTimes(prev => [...prev, responseTime]);
  }

  return (
    <section id="analyst-runner-section" className="w-full bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Analyst Runner Game & Analytics</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Play the Analyst Runner game and see your jump response time analytics update in real time! Jump over obstacles, rack up your score, and analyze your gameplay instantly.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-1 min-w-[320px] bg-white rounded-lg shadow-lg p-4">
            <AnalystRunnerGame onScoreUpdate={setScore} onJump={handleJump} />
          </div>
          <div className="flex-1 min-w-[320px] bg-white rounded-lg shadow-lg p-4">
            <AnalystRunnerAnalytics responseTimes={responseTimes} />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">How to Play</h3>
          <ul className="text-gray-600 space-y-1">
            <li>Press <b>SPACE</b> or <b>UP ARROW</b> to jump over low (blue) obstacles</li>
            <li>Hold <b>DOWN ARROW</b> or <b>S</b> to duck under high (orange) obstacles</li>
            <li>Click the game to focus. After game over, click again to restart.</li>
            <li>Watch your jump response time in the dashboard</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function AnalystRunner() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <AnalystRunnerSection />
    </div>
  );
} 