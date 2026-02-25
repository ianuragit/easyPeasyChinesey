'use client';

import { useState, useCallback } from 'react';
import { GameSettings, GamePhase, RoundData, WordResult, VocabWord } from '@/types';
import { vocabulary } from '@/data';

const WORDS_PER_ROUND = 50;
const MAX_ROUNDS = 10;

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>('landing');
  const [settings, setSettings] = useState<GameSettings>({
    userName: '',
    showPinyin: true,
    showHanzi: true,
    includeMeasureWords: false,
    showSpanish: false,
  });
  const [currentRound, setCurrentRound] = useState<RoundData | null>(null);
  const [roundHistory, setRoundHistory] = useState<RoundData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const totalRounds = Math.min(MAX_ROUNDS, Math.ceil(vocabulary.length / WORDS_PER_ROUND));

  const startGame = useCallback((gameSettings: GameSettings) => {
    setSettings(gameSettings);
    startRound(1);
  }, []);

  const startRound = useCallback((roundNumber: number) => {
    const startIdx = (roundNumber - 1) * WORDS_PER_ROUND;
    const endIdx = Math.min(startIdx + WORDS_PER_ROUND, vocabulary.length);
    const words = vocabulary.slice(startIdx, endIdx);

    const round: RoundData = {
      roundNumber,
      words,
      results: [],
      startTime: Date.now(),
    };

    setCurrentRound(round);
    setCurrentCardIndex(0);
    setIsRevealed(false);
    setPhase('playing');
  }, []);

  const revealCard = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const answerCard = useCallback(
    (correct: boolean) => {
      if (!currentRound) return;

      const word = currentRound.words[currentCardIndex];
      const result: WordResult = { word, correct };
      const updatedResults = [...currentRound.results, result];

      const nextIndex = currentCardIndex + 1;
      const isRoundComplete = nextIndex >= currentRound.words.length;

      if (isRoundComplete) {
        const completedRound: RoundData = {
          ...currentRound,
          results: updatedResults,
          endTime: Date.now(),
        };
        setCurrentRound(completedRound);
        setRoundHistory((prev) => [...prev, completedRound]);
        setPhase('summary');
      } else {
        setCurrentRound({ ...currentRound, results: updatedResults });
        setCurrentCardIndex(nextIndex);
        setIsRevealed(false);
      }
    },
    [currentRound, currentCardIndex]
  );

  const nextRound = useCallback(() => {
    if (!currentRound) return;
    const next = currentRound.roundNumber + 1;
    if (next <= totalRounds) {
      startRound(next);
    }
  }, [currentRound, totalRounds, startRound]);

  const restartSession = useCallback(() => {
    setPhase('landing');
    setCurrentRound(null);
    setRoundHistory([]);
    setCurrentCardIndex(0);
    setIsRevealed(false);
  }, []);

  const currentWord: VocabWord | null =
    currentRound && currentCardIndex < currentRound.words.length
      ? currentRound.words[currentCardIndex]
      : null;

  const correctCount = currentRound?.results.filter((r) => r.correct).length ?? 0;
  const wrongCount = currentRound?.results.filter((r) => !r.correct).length ?? 0;

  return {
    phase,
    settings,
    currentRound,
    currentCardIndex,
    isRevealed,
    currentWord,
    correctCount,
    wrongCount,
    totalRounds,
    roundHistory,
    startGame,
    startRound,
    revealCard,
    answerCard,
    nextRound,
    restartSession,
  };
}
