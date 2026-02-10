'use client';

import { useRef, useCallback } from 'react';
import { RoundData } from '@/types';

interface ProgressCardProps {
  round: RoundData;
  userName: string;
}

export default function ProgressCard({ round, userName }: ProgressCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const correctCount = round.results.filter((r) => r.correct).length;
  const totalCount = round.results.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const timeTaken = round.endTime
    ? Math.floor((round.endTime - round.startTime) / 1000)
    : 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#dc2626',
      });
      const link = document.createElement('a');
      link.download = `easy-peasy-chinesey-round-${round.roundNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    }
  }, [round.roundNumber]);

  return (
    <div>
      <div
        ref={cardRef}
        className="progress-card w-full max-w-sm mx-auto"
      >
        <div className="text-center">
          <h3 className="text-xl font-bold mb-0.5">Easy Peasy Chinese-y</h3>
          <p className="text-red-200 text-sm mb-4">
            English → Chinese Vocabulary Trainer
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 mb-4">
          <p className="text-lg font-semibold">{userName}</p>
          <p className="text-red-200 text-sm">
            Round {round.roundNumber} complete
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">
              {correctCount}/{totalCount}
            </p>
            <p className="text-xs text-red-200">Score</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">{accuracy}%</p>
            <p className="text-xs text-red-200">Accuracy</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-2xl font-bold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
            <p className="text-xs text-red-200">Time</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button onClick={handleDownload} className="btn-secondary text-sm">
          Download as PNG
        </button>
      </div>
    </div>
  );
}
