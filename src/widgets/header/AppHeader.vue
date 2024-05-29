<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import router from '@/app/router'
import { api } from '@/entities/Session/api'
import { useSessionStore } from '@/entities/Session/model/stores'
import { formatDate } from '@/shared/lib/utils/date/date'

const avatar = ref()

const sessionStore = useSessionStore()

const renderCurrentDate = computed(() => {
  const { day, monthName, year } = formatDate(new Date())
  return day + ' ' + monthName + ' ' + year
})

const renderUserName = computed(() => {
  if (sessionStore.user) {
    return sessionStore.user.name
  } else {
    return 'Guest'
  }
})

onMounted(() => {
  avatar.value = api.getUserAvatar()
})
</script>

<template>
  <header :class="$style.header">
    <h1>Welcome back, {{ renderUserName }} 👋</h1>
    <nav :class="$style.navigation">
      <img src="/src/shared/ui/assets/search-icon.svg" alt="search" />
      <img src="/src/shared/ui/assets/notification-icon.svg" alt="notifications" />
      <div @click="router.push({ name: 'calendar' })">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.25 1.83334C8.75626 1.83334 9.16667 2.24375 9.16667 2.75001V3.66668H12.8333V2.75001C12.8333 2.24375 13.2437 1.83334 13.75 1.83334C14.2563 1.83334 14.6667 2.24375 14.6667 2.75001V3.66668H17.4167C18.4292 3.66668 19.25 4.48749 19.25 5.50001V17.4167C19.25 18.4292 18.4292 19.25 17.4167 19.25H4.58333C3.57081 19.25 2.75 18.4292 2.75 17.4167V5.50001C2.75 4.48749 3.57081 3.66668 4.58333 3.66668H7.33333V2.75001C7.33333 2.24375 7.74374 1.83334 8.25 1.83334ZM7.33333 5.50001H4.58333V8.25001H17.4167V5.50001H14.6667V6.41668C14.6667 6.92294 14.2563 7.33334 13.75 7.33334C13.2437 7.33334 12.8333 6.92294 12.8333 6.41668V5.50001H9.16667V6.41668C9.16667 6.92294 8.75626 7.33334 8.25 7.33334C7.74374 7.33334 7.33333 6.92294 7.33333 6.41668V5.50001ZM17.4167 10.0833H4.58333V17.4167H17.4167V10.0833Z"
            fill="black"
          />
        </svg>
        <span>{{ renderCurrentDate }}</span>
      </div>
      <img :src="avatar" alt="avatar" @click="router.push({ name: 'account' })" />
    </nav>
  </header>
</template>

<style lang="scss" module>
.header {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
}

.navigation {
  display: flex;
  align-items: center;
  gap: 22px;

  img {
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    span {
      font-family: inherit;
      font-weight: 600;
      color: rgba(28, 29, 34, 0.5);
    }
  }
}

.navigation img:last-child {
  border-radius: 50%;
}
</style>
