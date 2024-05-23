<script setup lang="ts">
import { api } from '@/entities/Session/api'
import AppLogo from '../logo/AppLogo.vue'

const tabs = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'account',
    path: '/account'
  },
  {
    name: 'calendar',
    path: '/calendar'
  },
  {
    name: 'statistic',
    path: '/statistic'
  },
  {
    name: 'map',
    path: '/map'
  },
  {
    name: 'settings',
    path: '/settings'
  },
  {
    name: 'exit',
    action: async () => await api.deleteUserSession()
  }
]
</script>

<template>
  <nav :class="$style.navigation">
    <div>
      <AppLogo />
      <ul>
        <li v-for="tab in tabs" :key="tab.name" @click="tab.action">
          <RouterLink v-if="tab.path" :to="tab.path">
            <img :src="`/src/shared/ui/assets/${tab.name}-icon.svg`" :alt="tab.name" />
          </RouterLink>
          <button v-else>
            <img :src="`/src/shared/ui/assets/${tab.name}-icon.svg`" :alt="tab.name" />
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" module>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 35px;
  padding: 15px;
  height: 100vh;
  background: #1c1d22;

  div {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 35px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: clamp(0.938rem, 0.483rem + 2.27vw, 2.188rem);

    li {
      img {
        padding: 13px;
        border: none;
        border-radius: 50%;
        opacity: 0.5;
        transition: all 0.6s ease;
        cursor: pointer;

        &:hover {
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }

    li:last-child {
      position: fixed;
      bottom: 10px;
      left: 12px;
    }
  }
}
</style>
