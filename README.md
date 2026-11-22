# Vue3 Tetris

A modern Tetris game implementation built with Vue 3 + TypeScript + Vite. Experience the classic puzzle game with smooth animations and responsive controls.

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Demo

[Play Tetris](https://demos.chankay.com/tetris/)

## Features

- Classic Tetris gameplay mechanics
- Smooth block rotation and movement
- Line clearing with scoring system
- Next block preview
- Game pause/resume functionality
- Responsive design for various screen sizes
- Level progression with increasing speed

## Controls

- **Arrow Left/Right**: Move block horizontally
- **Arrow Up**: Rotate block
- **Arrow Down**: Soft drop (faster falling)
- **Space**: Hard drop (instant drop)
- **P**: Pause/Resume game

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Element Plus UI

## Local Development

Install dependencies and start the dev server:

```bash
yarn install
yarn dev
```

Create a production build:

```bash
yarn build
```

## Project Structure

```text
src/
├── components/
│   ├── Cell.vue          # Individual grid cell component
│   ├── Menu.vue          # Game menu and controls
│   └── Scene.vue         # Main game board
├── core/
│   ├── BlockClass.ts     # Block generation and control logic
│   ├── GameClass.ts      # Game state management and rendering
│   └── EventClass.ts     # Event handling and dispatching
├── assets/               # Static assets
├── App.vue              # Root component
└── main.ts              # Application entry point
```

## Architecture

The game uses a class-based architecture with Vue 3's reactivity system:

1. **BlockClass**: Handles tetromino generation, rotation, and movement logic
2. **GameClass**: Manages game state, board rendering, collision detection, and scoring
3. **EventClass**: Dispatches keyboard events and game commands to the GameClass

Vue 3's reactive API creates reactive game objects that automatically update the UI when the game state changes.

## Deployment

GitHub Actions builds pull requests and publishes the `main` branch to the shared
`chankay-demo-assets` R2 bucket through the protected `release` environment.
Each release lives under `projects/tetris/releases/<commit>/`. The shared demo
gateway reads the active release and fills the header and footer slots before
returning HTML. The existing `build:cf` command remains available for the legacy
Cloudflare host during cutover.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT
