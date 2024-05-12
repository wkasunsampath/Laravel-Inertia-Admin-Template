import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'
import { CBadge, CSidebarNav, CNavGroup, CNavTitle } from '@coreui/vue'
import nav from '@/_nav'
import simplebar from 'simplebar-vue'
import { CNavItem } from './coreUi/CNavItem'
import { router } from '@inertiajs/vue3'
import 'simplebar-vue/dist/simplebar.min.css'

const isActiveItem = (currentRoute: any, item: any) => {
  if (currentRoute === item.to) {
    return true
  }
  if (item.items) {
    return item.items.some((child: any) => isActiveItem(currentRoute, child))
  }
  return false
}

const AppSidebarNav = defineComponent({
  name: 'AppSidebarNav',
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup() {
    const currentRoute = ref(route().current())
    const firstRender = ref(true)

    router.on('success', () => {
      currentRoute.value = route().current()
    })

    onMounted(() => {
      firstRender.value = false
    })

    const renderItem = (item: any) => {
      if (item.items) {
        return h(
          CNavGroup,
          {
            as: 'div',
            compact: true,
            ...(firstRender.value && {
              visible: item.items.some((child: any) => isActiveItem(currentRoute, child)),
            }),
          },
          {
            togglerContent: () => [
              h(resolveComponent('CIcon'), {
                customClassName: 'nav-icon',
                name: item.icon,
              }),
              item.name,
            ],
            default: () => item.items.map((child: any) => renderItem(child)),
          },
        )
      }

      return item.to
        ? h(
            resolveComponent(item.component),
            {
              active: currentRoute.value === item.to,
              as: 'div',
              href: item.to,
              onClick: () => {},
            },
            {
              default: () => [
                item.icon
                  ? h(resolveComponent('CIcon'), {
                      customClassName: 'nav-icon',
                      name: item.icon,
                    })
                  : h('span', { class: 'nav-icon' }, h('span', { class: 'nav-icon-bullet' })),
                item.name,
                item.badge &&
                  h(
                    CBadge,
                    {
                      class: 'ms-auto',
                      color: item.badge.color,
                    },
                    {
                      default: () => item.badge.text,
                    },
                  ),
              ],
            },
          )
        : h(
            resolveComponent(item.component),
            {
              as: 'div',
            },
            {
              default: () => item.name,
            },
          )
    }

    return () =>
      h(
        CSidebarNav,
        {
          as: simplebar,
        },
        {
          default: () => nav.map((item) => renderItem(item)),
        },
      )
  },
})

export { AppSidebarNav }
