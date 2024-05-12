<script setup>
import { logo } from '@/assets/brand/logo'
import { sygnet } from '@/assets/brand/sygnet'
import { AppSidebarNav } from './AppSidebarNav'
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()
</script>

<template>
  <CSidebar
    class="border-end"
    colorScheme="dark"
    position="fixed"
    :unfoldable="sidebar.unfoldable"
    :visible="sidebar.visible"
    @visible-change="(value) => sidebar.toggleVisible(value)"
  >
    <CSidebarHeader class="border-bottom">
      <CSidebarBrand v-bind="$attrs" as="a">
        <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32" />
        <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32" />
      </CSidebarBrand>
      <CCloseButton class="d-lg-none" dark @click="sidebar.toggleVisible()" />
    </CSidebarHeader>
    <AppSidebarNav />
    <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="sidebar.toggleUnfoldable()" />
    </CSidebarFooter>
  </CSidebar>
</template>
@/layouts/components/AppSidebarNav
