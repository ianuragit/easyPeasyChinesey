'use client';

import { useGameState } from '@/hooks/useGameState';
import Landing from '@/components/Landing';
import GameRound from '@/components/GameRound';
import RoundSummary from '@/components/RoundSummary';

export default function Home() {
  const game = useGameState();

  if (game.phase === 'landing') {
    return <Landing onStart={game.startGame} />;
  }

  if (game.phase === 'playing' && game.currentRound && game.currentWord) {
    return (
      <GameRound
        round={game.currentRound}
        currentCardIndex={game.currentCardIndex}
        isRevealed={game.isRevealed}
        currentWord={game.currentWord}
        correctCount={game.correctCount}
        wrongCount={game.wrongCount}
        settings={game.settings}
        onReveal={game.revealCard}
        onAnswer={game.answerCard}
      />
    );
  }

  if (game.phase === 'summary' && game.currentRound) {
    return (
      <RoundSummary
        round={game.currentRound}
        userName={game.settings.userName}
        totalRounds={game.totalRounds}
        onNextRound={game.nextRound}
        onRestart={game.restartSession}
      />
    );
  }

  return null;
}
