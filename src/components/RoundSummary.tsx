'use client';

import { useState } from 'react';
import { RoundData } from '@/types';
import ProgressCard from './ProgressCard';
import CheatSheet from './CheatSheet';

interface RoundSummaryProps {
  round: RoundData;
  userName: string;
  totalRounds: number;
  onNextRound: () => void;
  onRestart: () => void;
}

export default function RoundSummary({
  round,
  userName,
  totalRounds,
  onNextRound,
  onRestart,
}: RoundSummaryProps) {
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const correctCount = round.results.filter((r) => r.correct).length;
  const totalCount = round.results.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const hasNextRound = round.roundNumber < totalRounds;

  // Get weak words: the ones the user got wrong
  const wrongResults = round.results.filter((r) => !r.correct);
  const focusWords = wrongResults.slice(0, 10);

  const timeTaken = round.endTime
    ? Math.floor((round.endTime - round.startTime) / 1000)
    : 0;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  return (
    <div className="min-h-screen p-4 max-w-lg mx-auto">
      <div className="py-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Round {round.roundNumber} Complete
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {accuracy >= 80
            ? 'Great job!'
            : accuracy >= 60
              ? 'Good effort — keep practicing!'
              : 'Keep going — review the focus list below!'}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-emerald-600">
              {correctCount}/{totalCount}
            </p>
            <p className="text-xs text-gray-400">Score</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-600">{accuracy}%</p>
            <p className="text-xs text-gray-400">Accuracy</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-gray-700">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
            <p className="text-xs text-gray-400">Time</p>
          </div>
        </div>

        {/* Focus list */}
        {focusWords.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Focus List — Top {focusWords.length} words to review
            </h3>
            <div className="space-y-2">
              {focusWords.map((r) => (
                <div
                  key={r.word.id}
                  className="flex items-center justify-between py-2 px-3 bg-rose-50 rounded-lg"
                >
                  <span className="text-gray-700">{r.word.english}</span>
                  <span className="text-right">
                    <span className="font-chinese text-red-700 font-medium">
                      {r.word.hanzi}
                    </span>
                    <span className="text-amber-600 text-sm ml-2">
                      ({r.word.pinyin})
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shareable progress card */}
        <div className="mb-6">
          <ProgressCard round={round} userName={userName} />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          {hasNextRound && (
            <button onClick={onNextRound} className="btn-primary flex-1">
              Next Round
            </button>
          )}
          <button
            onClick={onRestart}
            className={`btn-secondary ${hasNextRound ? '' : 'flex-1'}`}
          >
            Restart Session
          </button>
        </div>

        {/* Cheat sheet toggle */}
        <div className="border-t pt-4">
          <button
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors w-full text-center"
          >
            {showCheatSheet ? 'Hide' : 'Show'} Learning Cheat Sheet
          </button>
          {showCheatSheet && (
            <div className="mt-4 animate-slide-up">
              <CheatSheet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
