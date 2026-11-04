import { createApp } from 'vue'

import '@fontsource/golos-text/cyrillic-400.css'
import '@fontsource/golos-text/cyrillic-600.css'
import '@fontsource/golos-text/cyrillic-800.css'
import '@fontsource/golos-text/latin-400.css'
import '@fontsource/golos-text/latin-600.css'
import '@fontsource/golos-text/latin-800.css'

import '@fontsource/jetbrains-mono/cyrillic-400.css'
import '@fontsource/jetbrains-mono/cyrillic-700.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-700.css'
import '@fontsource/jetbrains-mono/latin-400-italic.css'

import './style.css'
import App from './App.vue'
import router from './router/index.ts'

createApp(App).use(router).mount('#app')
