# Easy Peasy Chinese-y

**English → Chinese Vocabulary Trainer** (Characters + Pinyin)

A clean, fast flashcard trainer to help English-speaking users memorize the 500+ most common Chinese words.

## Features

- 500+ vocabulary words organized by frequency rank
- 10 rounds of 50 words each, progressing in difficulty
- Flashcard interaction with reveal-and-self-grade flow
- Timer for each round
- Score tracking with accuracy percentage
- Focus list of weak words after each round
- Shareable progress card (downloadable as PNG)
- Learning cheat sheet with pinyin basics and tone tips
- Keyboard shortcuts (Space/Enter to reveal, R for right, W for wrong)
- Mobile-first, responsive design
- No backend — session resets on refresh

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **html-to-image** for PNG export
- Client-side state only (no database, no server storage)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Railway Deployment

### Option 1: Dockerfile (Recommended)

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. Select "Deploy from GitHub repo"
4. Railway will auto-detect the Dockerfile and build
5. The app will be available at your Railway-provided URL

### Option 2: Nixpacks (Node.js)

Railway's Nixpacks builder will auto-detect the Next.js app:

1. Push to GitHub
2. Create new Railway project → Deploy from GitHub
3. Railway will run `npm install` → `npm run build` → `npm start`
4. Set the `PORT` environment variable if needed (defaults to 3000)

### Environment Variables

No environment variables or API keys are required.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page (game controller)
│   └── globals.css      # Global styles + Tailwind
├── components/
│   ├── Landing.tsx      # Setup screen with name + toggles
│   ├── Flashcard.tsx    # Individual flashcard component
│   ├── GameRound.tsx    # Round gameplay with timer + progress
│   ├── RoundSummary.tsx # End-of-round score + focus list
│   ├── ProgressCard.tsx # Shareable branded card + PNG export
│   ├── CheatSheet.tsx   # Learning tips panel
│   └── Timer.tsx        # mm:ss timer component
├── data/
│   ├── index.ts         # Combined vocabulary export
│   ├── vocab1.ts        # Words 1-100
│   ├── vocab2.ts        # Words 101-200
│   ├── vocab3.ts        # Words 201-300
│   ├── vocab4.ts        # Words 301-400
│   └── vocab5.ts        # Words 401-500
├── hooks/
│   └── useGameState.ts  # Core game state management
└── types/
    └── index.ts         # TypeScript interfaces
```
