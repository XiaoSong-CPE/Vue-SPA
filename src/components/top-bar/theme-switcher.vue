<template>
  <n-button quaternary @click="store.commit('SwitchTheme')">{{ text }}</n-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const text = computed(() => store.state.IsDarkMode ? `Light` : `Dark`)
</script>