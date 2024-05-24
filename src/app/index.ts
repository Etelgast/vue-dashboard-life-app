import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ClickOutsideDirective from './directives/ClickOutsideDirective'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

export const application = app
  .use(pinia)
  .use(router)
  .directive('click-outside', ClickOutsideDirective)
