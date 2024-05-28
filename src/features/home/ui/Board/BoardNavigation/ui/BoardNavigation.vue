<script setup lang="ts">
import ButtonAction from '@/shared/ui/buttons/ButtonAction.vue'

defineEmits(['toggle-modal'])
</script>

<template>
  <nav :class="$style.navigation">
    <button type="button">Board View</button>
    <div>
      <button type="button">Filter</button>
      <button type="button">Sort</button>
      <ButtonAction @click="$emit('toggle-modal', 'To Do')">Add new task</ButtonAction>
    </div>
  </nav>
</template>

<style lang="scss" module>
@import './styles.module.scss';
</style>
