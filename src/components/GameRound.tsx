'use client';

import { useEffect, useCallback } from 'react';
import { RoundData, VocabWord, GameSettings } from '@/types';
import Flashcard from './Flashcard';
import Timer from './Timer';

interface GameRoundProps {
  round: RoundData;
  currentCardIndex: number;
  isRevealed: boolean;
  currentWord: VocabWord;
  correctCount: number;
  wrongCount: number;
  settings: GameSettings;
  onReveal: () => void;
  onAnswer: (correct: boolean) => void;
}

export default function GameRound({
  round,
  currentCardIndex,
  isRevealed,
  currentWord,
  correctCount,
  wrongCount,
  settings,
  onReveal,
  onAnswer,
}: GameRoundProps) {
  const totalCards = round.words.length;
  const progress = ((currentCardIndex) / totalCards) * 100;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!isRevealed) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onReveal();
        }
      } else {
        if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          onAnswer(true);
        } else if (e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          onAnswer(false);
        }
      }
    },
    [isRevealed, onReveal, onAnswer]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-lg mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-4 pt-2">
        <div className="text-sm">
          <span className="font-semibold text-red-700">
            Round {round.roundNumber}
          </span>
          <span className="text-gray-400 mx-2">·</span>
          <span className="text-gray-500">{settings.userName}</span>
        </div>
        <Timer startTime={round.startTime} stopped={false} />
      </header>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            Card {currentCardIndex + 1} / {totalCards}
          </span>
          <span>
            <span className="text-emerald-600">{correctCount}</span>
            {' / '}
            <span className="text-rose-500">{wrongCount}</span>
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center py-4">
        <Flashcard
          key={currentWord.id}
          word={currentWord}
          isRevealed={isRevealed}
          showPinyin={settings.showPinyin}
          showHanzi={settings.showHanzi}
          showSpanish={settings.showSpanish}
          onReveal={onReveal}
          onCorrect={() => onAnswer(true)}
          onWrong={() => onAnswer(false)}
        />
      </div>

      {/* Keyboard hints */}
      <div className="text-center text-xs text-gray-400 pb-4 hidden sm:block">
        {!isRevealed ? (
          <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-gray-500">Space</kbd> or <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-gray-500">Enter</kbd> to reveal</span>
        ) : (
          <span>
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-gray-500">R</kbd> Right · <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-gray-500">W</kbd> Wrong
          </span>
        )}
      </div>
    </div>
  );
}
