<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '@/shared/lib/utils/date/date'

const props = defineProps<{
  endDate: string
}>()

const renderDateBackground = () => {
  const currentDate = new Date().getTime()
  const endDate = Date.parse(props.endDate)
  const difference = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24))
  if (difference < 2) return 'red'
  if (difference >= 2 && difference <= 4) return 'yellow'
  else return 'gray'
}

const endTaskDate = computed((): { date: string; background: string } => {
  const { day, monthName, year } = formatDate(new Date(props.endDate))
  return {
    date: day + ' ' + monthName + ' ' + year,
    background: renderDateBackground()
  }
})
</script>

<template>
  <button class="date-button" :class="endTaskDate.background">
    {{ endTaskDate.date }}
  </button>
</template>

<style lang="scss" scoped>
.date-button {
  font-weight: 600;
  border-radius: 17px;
  padding: 8px 16px;

  &.red {
    color: #ff7979;
    background-color: rgba(255, 121, 121, 0.1);
  }

  &.yellow {
    color: #ffa048;
    background-color: rgba(255, 160, 72, 0.1);
  }

  &.gray {
    color: var(--gray-color);
    background-color: rgba(136, 141, 167, 0.1);
  }
}
</style>
