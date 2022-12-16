<template>
  <n-button quaternary @click="a">{{ store.state.IsChinese ? `English` : `中文` }}</n-button>
</template>
  
<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useStore } from 'vuex'
const store = useStore()
const message = useMessage()
function a() {
  store.commit('SwitchLang')
  message.warning('This feature has not supported yet.')
}
</script>