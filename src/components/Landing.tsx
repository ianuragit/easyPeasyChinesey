'use client';

import { useState } from 'react';
import { GameSettings } from '@/types';

interface LandingProps {
  onStart: (settings: GameSettings) => void;
}

export default function Landing({ onStart }: LandingProps) {
  const [userName, setUserName] = useState('');
  const [showPinyin, setShowPinyin] = useState(true);
  const [showHanzi, setShowHanzi] = useState(true);
  const [showSpanish, setShowSpanish] = useState(false);
  const [includeMeasureWords] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    onStart({
      userName: userName.trim(),
      showPinyin,
      showHanzi,
      includeMeasureWords,
      showSpanish,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-red-700 mb-2 tracking-tight">
            Easy Peasy
          </h1>
          <h1 className="text-4xl sm:text-5xl font-bold text-amber-600 mb-3 tracking-tight">
            Chinese-y
          </h1>
          <p className="text-gray-600 text-lg">
            English → Chinese Vocabulary Trainer
          </p>
          <p className="text-gray-400 text-sm mt-1">Characters + Pinyin</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 space-y-5"
        >
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:ring-2 focus:ring-red-500 focus:border-red-500
                         text-lg transition-colors"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Settings</h3>

            <Toggle
              label="Show Pinyin"
              checked={showPinyin}
              onChange={setShowPinyin}
              description="Display romanized pronunciation"
            />
            <Toggle
              label="Show Spanish"
              checked={showSpanish}
              onChange={setShowSpanish}
              description="Show Spanish alongside English"
            />
            <Toggle
              label="Show Chinese Characters"
              checked={showHanzi}
              onChange={setShowHanzi}
              description="Display hanzi characters"
            />
            <Toggle
              label="Include Measure Words"
              checked={includeMeasureWords}
              onChange={() => {}}
              disabled
              description="Coming soon"
            />
          </div>

          <button
            type="submit"
            disabled={!userName.trim()}
            className="btn-primary w-full text-lg"
          >
            Start Round 1
          </button>

          <p className="text-xs text-center text-gray-400">
            500+ words across 10 rounds · No account needed
          </p>
        </form>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
  description?: string;
}) {
  return (
    <label
      className={`flex items-center justify-between p-3 rounded-lg border transition-colors
        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:bg-gray-50 bg-white'}
        ${checked && !disabled ? 'border-red-200' : 'border-gray-200'}`}
    >
      <div>
        <span className="text-sm font-medium text-gray-800">{label}</span>
        {description && (
          <span className="block text-xs text-gray-400">{description}</span>
        )}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-12 h-7 rounded-full transition-colors flex items-center ${
            checked ? 'bg-red-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform mx-1
              ${checked ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </div>
      </div>
    </label>
  );
}
