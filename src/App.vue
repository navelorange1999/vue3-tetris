<template>
  <div class="page-shell">
    <div ref="shellHeaderTarget"></div>
    <main class="page-main">
      <div class="game-shell">
        <section class="board-column">
          <div class="board-copy">
            <p class="eyebrow">Arcade Playground</p>
            <h1>Tetris</h1>
            <p>Stack clean lines, keep the board clear, and stay in flow.</p>
          </div>
          <Scene
            :widthNum="game.width"
            :heightNum="game.height"
            :cellSize="game.cellSize"
            :paddingSize="game.paddingSize"
            :matrix="game.matrix"
          />
        </section>

        <aside class="side-panel">
          <section class="panel-card status-card">
            <div class="panel-header">
              <div>
                <p class="panel-label">Run Status</p>
                <h2>{{ stateLabel }}</h2>
              </div>
              <el-button
                class="refresh-button"
                size="small"
                type="primary"
                circle
                plain
                icon="el-icon-refresh"
                @click="keyRefresh()"
              />
            </div>

            <div class="score-card">
              <span>Score</span>
              <strong>{{ game.score }}</strong>
            </div>

            <div class="next-preview">
              <p class="panel-label">Next Block</p>
              <div class="next-grid">
                <div
                  v-for="(rowItem, rowIdx) in game.nextBlock.shape"
                  :key="rowIdx"
                  class="next-row"
                >
                  <Cell
                    v-for="(col, colIdx) in rowItem"
                    :key="colIdx"
                    :size="nextCellSize"
                    :paddingSize="game.paddingSize"
                    :value="col"
                  />
                </div>
              </div>
            </div>
          </section>

          <section class="panel-card">
            <div class="panel-section-title">Control Pad</div>
            <Menu :state="game.state" :keyEvents="keyMobile" />
          </section>

          <section class="panel-card">
            <div class="panel-section-title">Keymap</div>
            <div class="key-list">
              <div
                v-for="item in keyGuide"
                :key="item.key"
                class="key-row"
              >
                <span class="key-chip">{{ item.key }}</span>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
    <div ref="shellFooterTarget"></div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from "vue";
import { mountSiteShell } from "@chankay/site-shell";
import Cell from "./components/Cell.vue";
import Scene from "./components/Scene.vue";
import Menu from "./components/Menu.vue";
import GameClass from "@/Model/Game";
import EventClass from "@/Model/Event";

export default defineComponent({
  name: "App",
  components: {
    Cell,
    Scene,
    Menu,
  },
  setup() {
    const heightNum = ref(24);
    const widthNum = ref(12);
    const offsetWidth = document.documentElement.clientWidth;
    if (offsetWidth >= 1200) {
      document.documentElement.style.fontSize = 14 + "px";
      heightNum.value = 20;
    }
    // 以 plus 为断点
    if (offsetWidth <= 500 && offsetWidth >= 340) {
      document.documentElement.style.fontSize = 10 + "px";
    }

    // 如果真的还有人在用 iphone5 的话
    if (offsetWidth <= 340) {
      document.documentElement.style.fontSize = 10 + "px";
      heightNum.value = 16;
      widthNum.value = 8;
    }

    const game = reactive<GameClass>(
      new GameClass("over", widthNum.value, heightNum.value, 2, 2)
    ) as GameClass;

    const eventInstance = new EventClass();
    const shellHeaderTarget = ref<HTMLElement | null>(null);
    const shellFooterTarget = ref<HTMLElement | null>(null);

    const scrollBlockingKeys = new Set([
      "Space",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ]);

    const keyEvents = (e: KeyboardEvent) => {
      if (scrollBlockingKeys.has(e.code)) {
        e.preventDefault();
      }
      eventInstance.keyEvents(e.code, game);
    };
    const keyMobile = (type: string) => {
      eventInstance.keyEvents(type, game);
    };
    const keyRefresh = () => {
      eventInstance.keyEvents("KeyR", game);
    };

    const nextCellSize = computed(() => Math.max(game.cellSize - 0.5, 1.2));
    const stateLabel = computed(() => {
      if (game.state === "start") {
        return "Running";
      }
      if (game.state === "pause") {
        return "Paused";
      }
      return "Ready";
    });
    const keyGuide = [
      { key: "Space", label: "Start or pause the run" },
      { key: "R", label: "Reset the board" },
      { key: "W / ↑", label: "Rotate the current block" },
      { key: "A / ←", label: "Move left" },
      { key: "D / →", label: "Move right" },
      { key: "S / ↓", label: "Soft drop" },
    ];

    const mountShellSections = () => {
      if (
        shellHeaderTarget.value &&
        shellHeaderTarget.value.childElementCount === 0
      ) {
        mountSiteShell({
          target: shellHeaderTarget.value,
          position: "header",
          siteName: "Tetris",
          repoUrl: "https://github.com/navelorange1999/vue3-tetris",
        });
      }

      if (
        shellFooterTarget.value &&
        shellFooterTarget.value.childElementCount === 0
      ) {
        mountSiteShell({
          target: shellFooterTarget.value,
          position: "footer",
        });
      }
    };

    onMounted(() => {
      mountShellSections();
      window.addEventListener("keydown", keyEvents);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", keyEvents);
    });

    return {
      game,
      keyEvents,
      keyMobile,
      keyRefresh,
      keyGuide,
      nextCellSize,
      shellFooterTarget,
      shellHeaderTarget,
      stateLabel,
    };
  },
});
</script>

<style>
html,
body {
  width: 100%;
  min-height: 100%;
  font-size: 14px;
  overflow: hidden;
}

body {
  margin: 0;
  background: var(--site-shell-background, #f7f4ee);
  color: var(--site-shell-foreground, #26231f);
  font-family: var(--font-sans, sans-serif);
}

#app {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
}

.page-shell {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  flex-direction: column;
  overflow: hidden;
}

.page-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
  touch-action: none;
}

.game-shell {
  width: fit-content;
  max-width: 100%;
  display: grid;
  grid-template-columns: max-content 14rem;
  gap: 1.25rem;
  align-items: start;
}

.board-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.board-copy {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.eyebrow,
.panel-label,
.panel-section-title {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.board-copy h1,
.panel-header h2 {
  margin: 0;
  font-size: 2rem;
  line-height: 1;
  color: var(--foreground);
}

.board-copy p:last-child {
  margin: 0;
  max-width: 34rem;
  color: var(--muted-foreground);
  font-size: 1rem;
  line-height: 1.5;
}

.side-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-card {
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 2);
  background: var(--card);
  box-shadow: var(--shadow-sm);
  padding: 1rem;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.refresh-button {
  flex: none;
}

.status-card .panel-header h2 {
  font-size: 1.55rem;
  line-height: 1.05;
}

.score-card {
  margin-top: 1rem;
  border-radius: calc(var(--radius) * 1.5);
  background: var(--accent);
  color: var(--accent-foreground);
  padding: 0.9rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.score-card span {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
}

.score-card strong {
  font-size: 2.35rem;
  line-height: 1;
}

.next-preview {
  margin-top: 1rem;
}

.next-grid {
  margin-top: 0.65rem;
  border-radius: calc(var(--radius) * 1.5);
  border: 1px solid var(--border);
  background: var(--secondary);
  padding: 0.75rem;
}

.next-row {
  display: flex;
}

.key-list {
  margin-top: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.key-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.6rem;
  align-items: center;
  color: var(--muted-foreground);
  font-size: 0.9rem;
}

.key-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.6rem;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  background: var(--muted);
  color: var(--foreground);
  font-size: 0.78rem;
  font-weight: 700;
}

.page-shell .el-button--primary {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: var(--shadow-sm);
}

.page-shell .el-button--primary:hover,
.page-shell .el-button--primary:focus {
  border-color: var(--secondary-foreground);
  background: var(--secondary-foreground);
  color: var(--primary-foreground);
}

.page-shell .el-button--primary.is-plain {
  border-color: var(--border);
  background: var(--card);
  color: var(--foreground);
}

.page-shell .el-button--primary.is-plain:hover,
.page-shell .el-button--primary.is-plain:focus {
  border-color: var(--primary);
  background: var(--accent);
  color: var(--accent-foreground);
}

.page-shell .el-button.is-circle {
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
}

@media (max-width: 640px) {
  html,
  body {
    font-size: 10px;
  }

  .page-main {
    padding: 0.75rem;
  }

  .game-shell {
    grid-template-columns: max-content 11.5rem;
    gap: 0.75rem;
  }

  .board-copy h1,
  .panel-header h2 {
    font-size: 1.6rem;
  }

  .board-copy p:last-child {
    font-size: 0.9rem;
  }

  .panel-card {
    padding: 0.85rem;
  }

  .key-row {
    font-size: 0.8rem;
  }
}
</style>
