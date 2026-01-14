# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Ultimate Stick Shift Guide is a modern web application designed to help users learn how to drive manual transmission vehicles. It features interactive visualizations, educational content, and real-time RPM simulations based on vehicle parameters.

**Technology Stack:**
- React 18 with Vite
- Tailwind CSS (with dark mode support)
- D3.js (RPM gauge visualization)
- Cloudflare Workers (deployment via Wrangler)

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Deployment

Deploys automatically to Cloudflare Workers via GitHub Actions on push to `main`. Requires `CLOUDFLARE_API_TOKEN` secret configured in GitHub repository settings.

Manual deploy: `npx wrangler deploy`

## Architecture

### Key Components

```
src/
├── components/
│   ├── layout/Header.jsx          # Header with theme toggle
│   ├── simulator/
│   │   ├── RPMGauge.jsx           # D3.js semicircular gauge
│   │   ├── GearSelector.jsx       # Gear buttons (keyboard: 1-0)
│   │   ├── TransmissionRatios.jsx # Gear ratio inputs + presets
│   │   ├── VehicleParameters.jsx  # Speed/axle/tire inputs
│   │   ├── CalculationDisplay.jsx # Formula + result display
│   │   └── SimulatorPanel.jsx     # Combines all simulator components
│   └── guide/GuideSection.jsx     # Accordion guide sections
├── hooks/
│   ├── useRPMCalculation.js       # State + RPM calculation logic
│   └── useTheme.jsx               # Dark/light mode context
├── utils/calculations.js          # Pure RPM calculation functions
└── data/
    ├── defaultVehicles.js         # Vehicle presets (Miata, Civic, etc.)
    └── guideContent.js            # Educational content
```

### RPM Formula

```
RPM = (Axle Ratio × Vehicle Speed × Transmission Ratio × 336.13) / Tire Diameter
```

State is persisted to localStorage via `useRPMCalculation` hook.

### Theme System

Uses Tailwind's `class` strategy with React Context. Theme preference saved to localStorage, defaults to system preference.
