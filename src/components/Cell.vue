<template>
  <div
    :class="value === 0 ? 'block' : 'block-active'"
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      padding: `${paddingSize}px`,
    }"
  >
    <div
      :class="value === 0 ? 'block-container' : 'block-active-container'"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    size: Number,
    paddingSize: Number,
    value: Number,
  },
});
</script>

<style lang="less" scoped>
.block {
  display: inline-block;
  border: 2px solid var(--border);
  box-sizing: border-box;
  margin: "1px";
  &-active {
    display: inline-block;
    border: 2px solid var(--primary);
    box-sizing: border-box;
    &-container {
      width: 100%;
      height: 100%;
      background: var(--primary);
    }
  }
  &-container {
    width: 100%;
    height: 100%;
    background: var(--muted);
  }
}
</style>
