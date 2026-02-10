import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Easy Peasy Chinese-y — English → Chinese Vocabulary Trainer',
  description:
    'A clean, fast flashcard trainer to help you memorize the 500+ most common Chinese words with characters and pinyin.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
