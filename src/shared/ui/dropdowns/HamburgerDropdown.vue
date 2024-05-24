<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  status: string
}>()

defineEmits(['move-task-to-another-column'])

const tabs = ['To Do', 'In Progress', 'Done']

const isDropdownActive = ref<boolean>(false)
const isSubmenuActive = ref<boolean>(false)

const toggleDropdownMenu = () => {
  isDropdownActive.value = !isDropdownActive.value
}

const toggleSubmenu = () => {
  isSubmenuActive.value = !isSubmenuActive.value
}

const handleClickOutside = () => {
  isSubmenuActive.value = false
  isDropdownActive.value = false
}
</script>

<template>
  <div class="hamburger-dropdown" v-click-outside="handleClickOutside">
    <button type="button" @click="toggleDropdownMenu"></button>
    <ul class="hamburger-dropdown__list" :class="{ active: isDropdownActive }">
      <li>Delete task</li>
      <li class="item-move" @click="toggleSubmenu">Move to</li>
      <ul class="move__list" :class="{ active: isSubmenuActive }">
        <li
          v-for="tab in tabs"
          :key="tab"
          :class="{ inactive: props.status === tab }"
          @click="$emit('move-task-to-another-column', tab)"
        >
          {{ tab }}
        </li>
      </ul>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.hamburger-dropdown {
  position: relative;
  width: 26px;
  height: 26px;
  background-image: url('/src/shared/ui/assets/hamburger-icon.svg');
  background-size: cover;
  cursor: pointer;

  button {
    width: 100%;
    height: 100%;
  }

  ul {
    min-width: 150px;
    background-color: #f1f1f1;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
}

.hamburger-dropdown__list {
  visibility: hidden;
  position: absolute;
  top: 30px;
  left: 0;

  &.active {
    visibility: visible;
  }

  li {
    padding: 10px 15px;

    &:hover {
      background-color: #ddd;
    }
  }

  .move__list {
    display: none;
    position: absolute;
    top: 50%;
    left: 103%;

    &.active {
      display: block;
    }

    li.inactive {
      display: none;
    }
  }

  .item-move {
    position: relative;
  }
}
</style>
