import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(store).use(router).mount('#app')

