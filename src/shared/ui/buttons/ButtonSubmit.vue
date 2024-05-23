<script setup lang="ts"></script>

<template>
  <button :class="$style.button" type="submit">
    <slot></slot>
  </button>
</template>

<style lang="scss" module>
.button {
  width: 100%;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: var(--black-color);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: all 0.6s ease;

  &:hover {
    background-color: transparent;
    border: 1px solid var(--black-color);
    color: var(--black-color);
  }
}
</style>
