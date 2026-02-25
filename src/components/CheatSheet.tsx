'use client';

export default function CheatSheet() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm space-y-5 text-sm">
      <h3 className="font-bold text-lg text-gray-800">
        Learning Cheat Sheet
      </h3>

      {/* Pinyin basics */}
      <section>
        <h4 className="font-semibold text-red-700 mb-2">Pinyin Basics</h4>
        <p className="text-gray-600 mb-2">
          Pinyin is the romanization system for Chinese characters. Each
          syllable has an initial, a final, and a tone.
        </p>
        <div className="bg-amber-50 rounded-lg p-3">
          <p className="font-medium text-gray-700 mb-1">
            Four tones + neutral:
          </p>
          <div className="grid grid-cols-2 gap-1 text-gray-600">
            <span>1st tone (flat): <strong className="font-chinese">mā</strong> — mother</span>
            <span>2nd tone (rising): <strong className="font-chinese">má</strong> — hemp</span>
            <span>3rd tone (dip): <strong className="font-chinese">mǎ</strong> — horse</span>
            <span>4th tone (falling): <strong className="font-chinese">mà</strong> — scold</span>
          </div>
        </div>
      </section>

      {/* Tone tips */}
      <section>
        <h4 className="font-semibold text-red-700 mb-2">Tone Tips</h4>
        <ul className="text-gray-600 space-y-1 list-disc list-inside">
          <li>
            Same letters + different tone = completely different word
          </li>
          <li>
            Exaggerate tones when practicing — subtlety comes later
          </li>
          <li>
            Listen to native audio when possible to internalize patterns
          </li>
          <li>
            The 3rd tone before another 3rd tone sounds like a 2nd tone
            (tone sandhi)
          </li>
        </ul>
      </section>

      {/* Character tips */}
      <section>
        <h4 className="font-semibold text-red-700 mb-2">
          Character Learning Tips
        </h4>
        <ul className="text-gray-600 space-y-1 list-disc list-inside">
          <li>
            Characters have meaning components (radicals) and sound
            components — learn to spot them
          </li>
          <li>
            Repetition beats perfection: review often, even briefly
          </li>
          <li>
            Focus on recognizing characters first, handwriting later
          </li>
          <li>
            Look for patterns: 氵 (water radical) appears in 河, 海, 湖
          </li>
        </ul>
      </section>

      {/* Common categories */}
      <section>
        <h4 className="font-semibold text-red-700 mb-2">
          Common Word Categories
        </h4>
        <div className="space-y-2">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-700 mb-1">Pronouns</p>
            <p className="text-gray-500">
              我 (wǒ) I · 你 (nǐ) you · 他 (tā) he · 她 (tā) she · 我们
              (wǒmen) we · 你们 (nǐmen) you (pl.)
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-700 mb-1">Time</p>
            <p className="text-gray-500">
              今天 (jīntiān) today · 明天 (míngtiān) tomorrow · 昨天
              (zuótiān) yesterday · 现在 (xiànzài) now
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-700 mb-1">Numbers</p>
            <p className="text-gray-500">
              一 (yī) 1 · 二 (èr) 2 · 三 (sān) 3 · 四 (sì) 4 · 五 (wǔ) 5 ·
              十 (shí) 10 · 百 (bǎi) 100
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-700 mb-1">Common Verbs</p>
            <p className="text-gray-500">
              是 (shì) is · 有 (yǒu) have · 去 (qù) go · 来 (lái) come ·
              吃 (chī) eat · 喝 (hē) drink · 看 (kàn) see
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-700 mb-1">Connectors</p>
            <p className="text-gray-500">
              和 (hé) and · 但是 (dànshì) but · 因为 (yīnwèi) because · 所以
              (suǒyǐ) so · 如果 (rúguǒ) if
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
