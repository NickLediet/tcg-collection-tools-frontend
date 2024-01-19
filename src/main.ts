import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import 'primevue/resources/themes/lara-dark-green/theme.css'
import './style.css'

const pinia = createPinia()

createApp(App)
    .use(PrimeVue)
    .use(pinia)
    .mount('#app')
