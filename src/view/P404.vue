<template>
    <n-result status="404" title="404 Not Found" description="Welcome Home.">
      <template #footer>
        <n-button @click="router.push('/')">Go Home</n-button>
      </template>
    </n-result>
  </template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
const router = useRouter()
</script>