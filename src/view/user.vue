<template>
    <n-card>
        <n-space>
            <n-avatar round :size="64">{{ store.state.userInfo.username || 'username' }}</n-avatar>
            <n-space vertical>
                <n-text strong style="font-size: 16px;">{{ store.state.userInfo.username || 'username' }}</n-text>
                <n-space>
                    <n-tag size="small" :bordered="false">
                        ID: {{ store.state.userInfo.id || 'id' }}
                    </n-tag>
                    <n-tag size="small" v-if="store.state.userInfo.gender" :bordered="false">
                        Gender: {{ (store.state.userInfo.gender === 1) ? 'male' : 'female' }}
                    </n-tag>
                    <n-tag size="small" v-if="store.state.userInfo.region" :bordered="false">
                        Region: {{ store.state.userInfo.region }}
                    </n-tag>
                </n-space>
            </n-space>
        </n-space>
    </n-card>
    <n-divider />
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { onMounted, onBeforeMount } from 'vue'
import { useLoadingBar } from 'naive-ui'
const router = useRouter()
const store = useStore()
const loadingBar = useLoadingBar()
onMounted(() => {
    loadingBar.finish()
})
onBeforeMount(() => {
    if (!store.state.userInfo.id) {
        router.push('/login')
    }
})
console.log(useRoute().name)
// const emit = defineEmits(['response'])
// emit('response', 'user')
</script>