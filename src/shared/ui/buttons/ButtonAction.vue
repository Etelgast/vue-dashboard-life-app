<script setup></script>

<template>
  <button :class="$style.button" type="button">
    <slot></slot>
  </button>
</template>

<style lang="scss" module>
.button {
  width: 100%;
  padding: 14px;
  font-weight: 500;
  color: white;
  background-color: var(--black-color);
  border-radius: 19px;
  border: 1px solid transparent;
  transition: all 0.6s ease;

  &:hover {
    background-color: transparent;
    border: 1px solid var(--black-color);
    color: var(--black-color);
  }
}
</style>
