# Need for Speed: Most Wanted (2005) - Developer Portfolio

A highly stylized, game-accurate developer portfolio themed after the legendary *Need for Speed: Most Wanted (2005)*. Built to stand out and deliver a gritty, high-adrenaline user experience mimicking the UI of the Rockport City underground.

## 🏁 Live Demo

*(Add your Vercel deployment link here!)*

## ⚠️ Features & Authenticity

This portfolio isn't just a color swap. It includes meticulous details to replicate the authentic 2005 MW experience:

*   **Intro Splash with Web Audio API:** Clicking to enter Rockport synthesizes an authentic, wailing police siren using dual-layer oscillators, paired with a police light flash overlay.
*   **Authentic Color Palette:** Removed all modern vibrant colors. The entire UI strictly uses the game's color scheme:
    *   **Rockport Gold & Sepia** (`#e5c158`, `#c4a35a`) for primary text and borders.
    *   **Asphalt & Industrial Darks** (`#0a0a0a`, `#1a1a1a`) for deep, gritty backgrounds.
    *   **Pursuit Red & Blue** (`#c0392b`, `#1a3a6b`) used exclusively for police-light hovers and the siren intro.
*   **Custom Game Cursor:** The default browser cursor is replaced with the iconic golden angular arrow used in the game's menus.
*   **Ambient Glow & Grain:** A permanent sepia glow and film grain noise overlay gives the screen that heavy, warm tint that defined the mid-2000s street racing aesthetic.
*   **Aggressive Typography:** Uses `Oswald` (Impact-style) for bold, skewed headings and `Roboto Mono` for technical, terminal-like body text.
*   **"Skewed" Geometry:** Buttons and UI elements are heavily skewed to recreate the fast, angular look of the game's HUD.
*   **Interactive "Radio" Component:** A togglable background radio that uses the Web Audio API to generate authentic police scanner static and low engine rumbles (no external audio files needed).

## 🛠️ Technology Stack

*   **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router, Server Components)
*   **Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) for scroll-triggered fades, stagger animations, and hover effects.
*   **Icons:** [Lucide React](https://lucide.dev/) (paired with custom inline SVGs for brand icons since they were removed from Lucide).
*   **Audio Synthesis:** Native Web Audio API (Oscillators, BiquadFilters, GainNodes).

## 📂 Project Structure & Sections

The portfolio uses game-lore naming for standard portfolio sections:

1.  **Intro Splash:** The entry gate. Plays the synthesized siren to set the mood.
2.  **Hero:** The landing section with a "Most Wanted" badge and speed-line animations.
3.  **Driver Profile (About):** Your personal bio, styled as a street racer's dossier.
4.  **The Blacklist (Projects):** Your projects are ranked from #7 down to #1. Each card mimics a Blacklist rival card with pursuit-light hover effects.
5.  **Under The Hood (Skills):** Technical skills categorized by car parts (Engine = Languages, Turbo = AI/ML, Chassis = Frontend, etc.).
6.  **Dispatch (Contact):** Channels to reach you, mimicking a police dispatch radio layout.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Data Configuration

To update the portfolio with your own information, edit the data in `src/data/projects.ts`. The UI will automatically generate the Blacklist cards based on this file.

## 📜 License

This project is open source and available under the [MIT License](LICENSE). Note that "Need for Speed" is a trademark of Electronic Arts Inc., and this project is a fan-made portfolio theme not affiliated with EA.
