import './bootstrap'
import './styles/style.scss'

import { createApp, h, DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { ZiggyVue } from '../../vendor/tightenco/ziggy'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import { createPinia } from 'pinia'
import DefaultLayout from './layouts/DefaultLayout.vue'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
    const page: any = pages[`./pages/${name}.vue`]
    page.default.layout = page.default.layout || DefaultLayout
    return page
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(createPinia())
      .use(plugin)
      .use(ZiggyVue)
      .use(CoreuiVue)
      .provide('icons', icons)
      .component('CIcon', CIcon)
      .mount(el)
  },
  progress: {
    color: '#4B5563',
  },
})
