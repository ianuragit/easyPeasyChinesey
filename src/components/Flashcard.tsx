'use client';

import { VocabWord } from '@/types';

interface FlashcardProps {
  word: VocabWord;
  isRevealed: boolean;
  showPinyin: boolean;
  showHanzi: boolean;
  showSpanish: boolean;
  onReveal: () => void;
  onCorrect: () => void;
  onWrong: () => void;
}

export default function Flashcard({
  word,
  isRevealed,
  showPinyin,
  showHanzi,
  showSpanish,
  onReveal,
  onCorrect,
  onWrong,
}: FlashcardProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`card-flip w-full ${!isRevealed ? 'cursor-pointer' : ''}`}
        onClick={!isRevealed ? onReveal : undefined}
        onKeyDown={(e) => {
          if (!isRevealed && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onReveal();
          }
        }}
        tabIndex={!isRevealed ? 0 : -1}
        role={!isRevealed ? 'button' : undefined}
        aria-label={!isRevealed ? 'Reveal answer' : undefined}
      >
        <div
          className={`w-full rounded-2xl shadow-xl transition-all duration-500
            ${isRevealed ? 'bg-white ring-2 ring-amber-300' : 'bg-white hover:shadow-2xl hover:-translate-y-1'}`}
        >
          {/* Front - always visible */}
          <div className="flex flex-col items-center justify-center p-6 min-h-[280px] sm:min-h-[320px]">
            <span className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
              English
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-2">
              {word.english}
            </h2>
            {showSpanish && word.spanish && (
              <p className="text-lg text-blue-600 font-medium mb-2">
                {word.spanish}
              </p>
            )}
            {word.pos && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full mb-4">
                {word.pos}
              </span>
            )}

            {!isRevealed && (
              <p className="text-gray-400 text-sm mt-2 animate-pulse">
                Tap to reveal · Recall the Chinese
              </p>
            )}

            {isRevealed && (
              <div className="mt-2 animate-fade-in space-y-2 text-center">
                <div className="w-16 h-0.5 bg-amber-300 mx-auto mb-3" />

                {showHanzi && (
                  <p className="text-4xl sm:text-5xl font-chinese font-bold text-red-700">
                    {word.hanzi}
                  </p>
                )}

                {showPinyin && (
                  <p className="text-xl text-amber-700 font-medium">
                    {word.pinyin}
                  </p>
                )}

                {showSpanish && word.spanish && (
                  <p className="text-base text-blue-500 mt-1">
                    {word.spanish}
                  </p>
                )}

                {word.example && (
                  <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm">
                    <p className="font-chinese text-gray-700">
                      {word.example.zh}
                    </p>
                    {word.example.pinyin && (
                      <p className="text-gray-500 text-xs mt-0.5">
                        {word.example.pinyin}
                      </p>
                    )}
                    {word.example.en && (
                      <p className="text-gray-400 mt-1">{word.example.en}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Answer buttons */}
      {isRevealed && (
        <div className="flex gap-4 mt-6 animate-slide-up">
          <button
            onClick={onWrong}
            className="btn-wrong flex-1 flex items-center justify-center gap-2"
            aria-label="Mark as wrong (W)"
          >
            <span aria-hidden="true">✗</span> Wrong
            <kbd className="text-xs opacity-60 ml-1 hidden sm:inline">W</kbd>
          </button>
          <button
            onClick={onCorrect}
            className="btn-correct flex-1 flex items-center justify-center gap-2"
            aria-label="Mark as correct (R)"
          >
            <span aria-hidden="true">✓</span> Right
            <kbd className="text-xs opacity-60 ml-1 hidden sm:inline">R</kbd>
          </button>
        </div>
      )}
    </div>
  );
}
