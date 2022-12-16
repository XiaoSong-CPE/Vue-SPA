<template>
  <n-layout-header bordered>
    <n-space justify="space-between" align="center" style="height: 63px; margin: 0 16px;">
      <n-space >
        <n-avatar :style="{ backgroundColor: 'green' }">LOGO</n-avatar>
        <n-gradient-text type="success" size="24">CNection</n-gradient-text>
      </n-space>
      <n-auto-complete placeholder="Search something..." />
      <n-space class="hidden-xs-only">
        <Login />
        <ThemeSwither />
        <LangSwither />
      </n-space>
    </n-space>
  </n-layout-header>
</template>

<script setup lang="ts">
import ThemeSwither from './top-bar/theme-switcher.vue'
import LangSwither from './top-bar/lang-switcher.vue'
import Login from './top-bar/login.vue'
</script>