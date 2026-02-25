'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  startTime: number;
  stopped: boolean;
}

export default function Timer({ startTime, stopped }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (stopped) return;

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, stopped]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <span className="font-mono text-gray-600 tabular-nums" aria-label={`Time elapsed: ${minutes} minutes ${seconds} seconds`}>
      {display}
    </span>
  );
}
