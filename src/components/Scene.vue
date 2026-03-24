<template>
  <div
    class="scene-container"
    :style="{
      padding: `${paddingSize}px`,
    }"
  >
    <div class="game">
      <el-row v-for="(rowItem, rowIdx) in matrix" :key="rowIdx">
        <Cell
          v-for="(col, colIdx) in rowItem"
          :key="colIdx"
          :size="cellSize"
          :paddingSize="paddingSize"
          :value="col"
        />
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cell from "./Cell.vue";

export default defineComponent({
  name: "Scene",
  props: {
    cellSize: {
      type: Number,
      required: true,
    },
    paddingSize: {
      type: Number,
      required: true,
    },
    matrix: {
      type: Array,
      required: true,
    },
  },
  components: {
    Cell,
  },
});
</script>

<style lang="less" scoped>
.scene-container {
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 2);
  background:
    linear-gradient(180deg, var(--card) 0%, var(--secondary) 100%);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.game {
  padding: 0.35rem;
}

.game :deep(.el-row) {
  flex-wrap: nowrap;
}
</style>
