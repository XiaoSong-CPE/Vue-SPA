<template>
    <n-result status="403" title="403 Forbidden" description="How about log in first?">
      <template #footer>
        <login :quaternary="false"/>
      </template>
    </n-result>
  </template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import Login from '../components/top-bar/login.vue'
const router = useRouter()
</script>