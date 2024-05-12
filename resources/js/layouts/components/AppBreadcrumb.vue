<script setup>
import { onMounted, ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { CBreadcrumbItem } from '@/layouts/components/coreUi/CBreadcrumbItem'
import nav from '@/_nav'

const breadcrumbs = ref()

const isActiveItem = (currentRoute, item) => {
  if (currentRoute === item.to) {
    return true
  }
  if (item.items) {
    return item.items.some((child) => isActiveItem(currentRoute, child))
  }
  return false
}

const addToBreadcrumb = (breadcrumbsArray, currentRoute, navItem) => {
  if (navItem.to === currentRoute) {
    return breadcrumbsArray.push({
      active: true,
      name: navItem.name,
      path: navItem.to,
    })
  } else if (navItem.items) {
    const matchedItem = navItem.items.find((child) => isActiveItem(currentRoute, child))
    if (matchedItem) {
      breadcrumbsArray.push({
        active: false,
        name: navItem.name,
        path: navItem.to,
      })
      return addToBreadcrumb(breadcrumbsArray, currentRoute, matchedItem)
    } else {
      return false
    }
  }
}

const getBreadcrumbs = () => {
  const currentRoute = route().current()
  const breadcrumbs = [
    {
      active: false,
      name: 'Home',
      path: 'dashboard',
    },
  ]
  for (const navItem of nav) {
    const tempBreadcrumbs = addToBreadcrumb(breadcrumbs, currentRoute, navItem)
    if (Array.isArray(tempBreadcrumbs)) {
      break
    }
  }
  return breadcrumbs
}

router.on('success', () => {
  breadcrumbs.value = getBreadcrumbs()
})

onMounted(() => {
  breadcrumbs.value = getBreadcrumbs()
})
</script>

<template>
  <CBreadcrumb class="my-0">
    <CBreadcrumbItem v-for="item in breadcrumbs" :key="item" :href="item.active ? '' : item.path" :active="item.active">
      {{ item.name }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>
