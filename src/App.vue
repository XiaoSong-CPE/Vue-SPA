<template>
  <!-- 添加测试水印 -->
  <n-watermark fullscreen content="CNection测试版" :font-size="16" :line-height="16" :width="320" :height="320"
    :x-offset="12" :y-offset="60" :rotate="-15" />
  <!-- 正式内容 -->
  <naive-ui-fabric>
    <n-layout position="absolute">
      <TopBar />
      <n-layout has-sider position="absolute" style="top:64px">
        <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :default-collapsed="true" :width="192">
          <n-menu :collapsed-width="64" :options="menuOptions" :value="menuValue" />
        </n-layout-sider>
        <n-layout bordered :native-scrollbar="false">
          <n-space style="padding: 24px;min-height: 100vh;" vertical>
            <!-- 路由视图 -->
            <router-view @response="(a: string) => menuValue = a"></router-view>
            <!-- 返回顶部的按钮 -->
            <n-back-top />
          </n-space>
          <Footer />
        </n-layout>
      </n-layout>
    </n-layout>
  </naive-ui-fabric>
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import NaiveUiFabric from './components/naive-ui-fabric.vue'
import TopBar from './components/top-bar.vue'
import Footer from './components/footer.vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { InfoOutlined, HomeOutlined, CodeOutlined, AdminPanelSettingsOutlined, AccountCircleOutlined} from '@vicons/material'

const route = useRoute()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// const menuValue = ref(route.name)
const menuValue = computed(()=>route.name)


const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        { to: '/' },
        "Home"
      ),
    key: 'home',
    icon: renderIcon(HomeOutlined)
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: '/user' },
        "User"
      ),
    key: 'user',
    icon: renderIcon(AccountCircleOutlined)
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: '/about' },
        "About"
      ),
    key: 'about',
    icon: renderIcon(InfoOutlined)
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: '/privacy' },
        "Privacy"
      ),
    key: 'privacy',
    icon: renderIcon(AdminPanelSettingsOutlined)
  },
  {
    label: () =>
      h(
        RouterLink,
        { to: '/license' },
        "License"
      ),
    key: 'license',
    icon: renderIcon(CodeOutlined)
  }
]
</script>