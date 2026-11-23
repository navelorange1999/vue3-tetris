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

## Controls

- **← / A** and **→ / D**: Move left and right
- **↑ / W**: Rotate
- **↓ / S**: Soft drop
- **Space**: Start, pause, or resume
- **R**: Reset the board

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Element Plus UI

## Local Development

Use Node.js 22 and Yarn 1.22.22 to install dependencies and start the dev server.

```bash
corepack yarn install --frozen-lockfile
corepack yarn dev
```

Build and preview the standalone app locally.

```bash
corepack yarn build
corepack yarn preview
```

## Project Structure

```text
src/
├── components/
│   ├── Cell.vue          # Individual grid cell component
│   ├── Menu.vue          # Game menu and controls
│   └── Scene.vue         # Main game board
├── Model/
│   ├── Block.ts         # Block generation and control logic
│   ├── Game.ts          # Game state management and rendering
│   └── Event.ts         # Event handling and dispatching
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

The [release workflow](.github/workflows/release.yml) builds pull requests and
publishes `main` to the shared `chankay-demo-assets` R2 bucket. Each release lives
under `projects/tetris/releases/<commit>/`. The shared demo gateway serves the
active release and fills the header and footer slots.

To build the release artifact locally, run this command from a Git checkout.

```bash
DEMO_RELEASE="$(git rev-parse HEAD)" bash scripts/build-demo.sh
```

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT
