<script setup lang="ts">
import LoginForm from '@/features/authentication/ui/LoginForm/LoginForm.vue'
import RegisterForm from '@/features/authentication/ui/RegisterForm/RegisterForm.vue'
import { ref, type Ref } from 'vue'

const state: Ref<number> = ref(0)
const forms = [LoginForm, RegisterForm]
</script>

<template>
  <section class="auth">
    <component :is="forms[state]" v-model="state"></component>
  </section>
</template>

<style lang="scss">
@import './styles.module.scss';
</style>
