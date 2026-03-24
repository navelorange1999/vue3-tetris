<template>
  <div class="menu-container">
    <div class="left">
      <el-button
        class="play-button"
        size="medium"
        type="primary"
        circle
        plain
        :icon="state === 'start' ? 'el-icon-video-pause' : 'el-icon-video-play'"
        @click="keyEvents('Space')"
      />
    </div>
    <div class="right">
      <div class="up_btn">
        <el-button
          class="pad-button"
          size="medium"
          icon="el-icon-caret-top"
          type="primary"
          circle
          @click="keyEvents('ArrowUp')"
        />
      </div>
      <div class="left_right_btns">
        <el-button
          class="pad-button"
          size="medium"
          icon="el-icon-caret-left"
          type="primary"
          circle
          @click="keyEvents('ArrowLeft')"
        />
        <el-button
          class="pad-button"
          size="medium"
          icon="el-icon-caret-right"
          type="primary"
          circle
          @click="keyEvents('ArrowRight')"
        />
      </div>
      <div class="down_btn">
        <el-button
          class="pad-button"
          size="medium"
          icon="el-icon-caret-bottom"
          type="primary"
          circle
          @click="keyEvents('ArrowDown')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    state: {
      type: String,
      required: true,
    },
    keyEvents: {
      type: Function,
      required: true,
    },
  },
});
</script>
<style lang="less" scoped>
.menu-container {
  display: grid;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: repeat(3, max-content);
  grid-template-rows: repeat(3, max-content);
  grid-template-areas:
    ". up ."
    "left center right"
    ". down .";
  gap: 0.6rem;
  align-items: center;
  justify-items: center;
  justify-content: center;

  .left {
    grid-area: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    display: contents;

    .up_btn {
      grid-area: up;
    }

    .left_right_btns {
      display: contents;
    }

    .left_right_btns :deep(.el-button:first-child) {
      grid-area: left;
    }

    .left_right_btns :deep(.el-button:last-child) {
      grid-area: right;
    }

    .down_btn {
      grid-area: down;
    }
  }
}

.play-button {
  width: 4rem;
  height: 4rem;
}

.pad-button {
  width: 3rem;
  height: 3rem;
}
</style>
