<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import ButtonSubmit from '@/shared/ui/buttons/ButtonSubmit.vue'
import { api } from '@/entities/Session/api'

const stateValue = defineModel()

const name: Ref<string> = ref('')
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const isPasswordVisible: Ref<boolean> = ref(false)

const isLoading: Ref<boolean> = ref(false)

const schema = yup.object().shape({
  name: yup.string().max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match')
})

const changeVisibilityOfPassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const register = async () => {
  isLoading.value = true
  await api.registerUser(name.value, email.value, password.value)
  isLoading.value = false
}
</script>

<template>
  <div class="login">
    <h1>Create a new account</h1>
    <h2>And see what is going on with your life</h2>
    <Form name="sign-up" :validation-schema="schema" autocomplete="off" @submit="register">
      <div>
        <label for="name">Name</label>
        <Field id="name" type="text" name="name" placeholder="Ivan" v-model="name"></Field>
        <ErrorMessage name="name" />
      </div>
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
      <div>
        <label for="password_confirmation">Confirm password</label>
        <Field
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          placeholder="*****************"
        />
        <ErrorMessage name="passwordConfirmation" />
      </div>
      <ButtonSubmit>
        <template v-if="!isLoading">Create account</template>
        <template v-if="isLoading">
          <i class="pi pi-spin pi-spinner" style="font-size: 1.5rem"></i>
        </template>
      </ButtonSubmit>
    </Form>
    <a @click="stateValue = 0">Already Registered? <strong>Login to your Account</strong></a>
  </div>
</template>
