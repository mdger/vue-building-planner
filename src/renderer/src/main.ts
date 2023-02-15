import { createApp } from 'vue'
import Editor from './Editor.vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// import App from './App.vue'

const app = createApp(Editor)
app.use(ElementPlus)

app.mount('#app')
