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
    <section id="analyst-runner-section" className="w-full bg-[#0D1B2A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['Press_Start_2P'] text-3xl text-[#FFB71F] drop-shadow-[0_2px_2px_rgba(255,183,31,0.3)] mb-4">
            Analyst Runner Game
          </h2>
          <p className="font-['Press_Start_2P'] text-sm text-[#89CFF0] max-w-2xl mx-auto leading-relaxed">
            Test your reflexes and analyze your performance!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-[1200px] mx-auto">
          <div className="w-full h-full flex flex-col">
            <AnalystRunnerGame onScoreUpdate={setScore} onJump={handleJump} />
          </div>
          <div className="w-full h-full flex flex-col">
            <AnalystRunnerAnalytics responseTimes={responseTimes} />
          </div>
        </div>

        <div className="mt-12 text-center bg-[#0D1B2A] border-2 border-[#89CFF0] p-6 rounded-lg max-w-2xl mx-auto">
          <h3 className="font-['Press_Start_2P'] text-[#FFB71F] text-lg mb-4">How to Play</h3>
          <ul className="text-[#89CFF0] space-y-3 font-['Press_Start_2P'] text-xs">
            <li>› Space/Up: Jump over blue blocks</li>
            <li>› Down/S: Duck under orange blocks</li>
            <li>› Click game to focus</li>
            <li>› Watch your response time!</li>
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