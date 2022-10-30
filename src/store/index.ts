import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinia)
  useLoginStore().loadLocalCacheAction()
}

export default registerStore
