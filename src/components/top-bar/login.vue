<template>
    <!-- 退出登录 -->
    <n-button v-if="store.state.userInfo.id" quaternary @click="logout">Log Out</n-button>
    <!-- 登录注册框 -->
    <n-button v-else :quaternary="quaternary" @click="loginModal = true">Log In</n-button>
    <n-modal v-model:show="loginModal" style="width: 320px;max-width:90%;">
        <n-card>
            <n-tabs class="card-tabs" default-value="signin" animated>
                <!-- 登录 -->
                <n-tab-pane name="signin" tab="Log In">
                    <n-form :model="LoginInfo" :rules="loginRules" ref="loginRef" :show-require-mark="false">
                        <n-form-item-row label="User Name" path="username">
                            <n-input v-model:value="LoginInfo.username" />
                        </n-form-item-row>
                        <n-form-item-row label="Password" path="password">
                            <n-input v-model:value="LoginInfo.password" type="password" show-password-on="click" />
                        </n-form-item-row>
                    </n-form>
                    <n-button :loading="loading" @click="toLogIn" type="primary" block secondary strong>
                        Log In
                    </n-button>
                </n-tab-pane>
                <!-- 注册 -->
                <n-tab-pane name="signup" tab="Register">
                    <n-space style="margin-bottom: 8px;">
                        <n-alert title="Warning!" type="error" :bordered="false">
                            We have no ability to encrypt and protect your password, so never use a password that is the
                            same as the others of yours!
                        </n-alert>
                    </n-space>
                    <n-form :model="registerInfo" show-require-mark="true">
                        <n-form-item-row label="User Name">
                            <n-input v-model:value="registerInfo.username" />
                        </n-form-item-row>
                        <n-form-item-row label="Password">
                            <n-input v-model:value="registerInfo.password" show-password-on="click" />
                        </n-form-item-row>
                        <n-form-item-row label="Reenter Password">
                            <n-input v-model:value="registerInfo.password2" show-password-on="click" />
                        </n-form-item-row>
                    </n-form>
                    <n-button :loading="loading2" @click="toRegister" type="primary" block secondary strong>
                        Register
                    </n-button>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </n-modal>
</template>
  
<script setup lang="ts">
import type { FormRules, FormItemRule } from 'naive-ui';
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useDialog } from 'naive-ui'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const loginRef = ref(null)
const message = useMessage()
const store = useStore()
const dialog = useDialog()
const loginModal = ref(false)
const loading = ref(false)
const loading2 = ref(false)
const LoginInfo = ref({ username: '', password: '' })
const registerInfo = ref({ username: '', password: '', password2: '' })
function logout() {
    dialog.warning({
        title: 'Log Out?',
        content: 'Are you sure to do so?',
        positiveText: 'Yes',
        negativeText: 'Cancel',
        onPositiveClick: () => {
            store.commit('Logout')
            router.push('/home')
        }
    })
}
function toLogIn(e: MouseEvent) {
    e.preventDefault()
    loading.value = true
    loginRef.value?.validate(async (errors: any) => {
        if (!errors) {
            try {
                const response = await axios.get('/api?username=' + LoginInfo.value.username + '&password=' + LoginInfo.value.password);
                if (response.data.id) {
                    console.log('用户（id：' + response.data.id + '）已登录。用户数据为：' + response.data)
                    store.commit('Login', response.data)
                    loading.value = false
                    loginModal.value = false
                    message.success('Login Success')
                    router.push('/user')
                } else {
                    loading.value = false
                    message.error("Username or Password is incorrect.")
                }
            } catch (error) {
                console.error(error)
                loading.value = false
                message.error('unknown error.');
            }
        } else {
            console.log(errors)
            loading.value = false
        }
    })
}
async function toRegister() {
    loading2.value = true
    if (registerInfo.value.username === '') {
        loading2.value = false
        message.error('Please enter your username.')
    } else {
        try {
            const response = await axios.post('/api', {
                username: registerInfo.value.username,
                password: registerInfo.value.password
            });
            if (response.data) {
                store.commit('Login')
                loading2.value = false
                loginModal.value = false
                message.success('Register and Login Success')
            } else {
                loading2.value = false
                message.error("Username has been registered. Please change a name.")
            }
        } catch (error) {
            console.error(error)
            message.error('unknown error');
        }
    }
}

// 表单验证
const loginRules: FormRules = {
    username: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('Please enter your username.')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    password: [
        {
            required: true,
            message: 'Please enter your password.',
            trigger: ['input', 'blur']
        }
    ]
}
function validatePasswordStartWith(
    rule: FormItemRule,
    value: string
): boolean {
    return (
        !!LoginInfo.value.password &&
        LoginInfo.value.password.startsWith(value) &&
        LoginInfo.value.password.length >= value.length
    )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
    return value === LoginInfo.value.password
}

const props = defineProps({
    quaternary: {
        type: Boolean,
        default: true
    }
})
</script>