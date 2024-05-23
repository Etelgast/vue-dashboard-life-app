<script setup lang="ts">
import { ref, type Ref } from 'vue'

import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit.vue'

import { api } from '@/entities/Session/api'

const stateValue = defineModel()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const isPasswordVisible: Ref<boolean> = ref(false)
const isLoading: Ref<boolean> = ref(false)

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const login = async (): Promise<void> => {
  isLoading.value = true
  await api.createSession(email.value, password.value)
  isLoading.value = false
}

const changeVisibilityOfPassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div class="login">
    <h1>Login to your Account</h1>
    <h2>See what is going on with your life</h2>
    <Form name="signin" :validation-schema="schema" @submit="login">
      <div>
        <label for="email">Email</label>
        <Field id="email" type="text" name="email" placeholder="mail@abc.com" v-model="email" />
        <ErrorMessage name="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <Field
          :type="isPasswordVisible ? 'text' : 'password'"
          id="password"
          name="password"
          placeholder="*****************"
          v-model="password"
        />
        <i
          :class="isPasswordVisible ? 'pi pi-eye' : 'pi pi-eye-slash'"
          @click="changeVisibilityOfPassword"
        ></i>
        <ErrorMessage name="password" />
      </div>
      <ButtonSubmit>
        <template v-if="!isLoading">Login </template>
        <template v-if="isLoading">
          <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
        </template>
      </ButtonSubmit>
    </Form>
    <a @click="stateValue = 1">Not Registered Yet? <strong>Create an account</strong></a>
  </div>
</template>
