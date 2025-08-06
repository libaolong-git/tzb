<template>
  <div class="min-h-screen flex items-center justify-center luxury-gradient py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- 政务徽标区域 -->
      <div class="text-center mb-8 animate-fadeIn">
        <div class="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gradient mb-2">
          政务智能助手
        </h1>
        <p class="text-secondary text-sm">
          安全 · 高效 · 智能的政务服务平台
        </p>
      </div>

      <!-- 登录卡片 -->
      <div class="gov-card animate-slideInFromRight">
        <div class="card-header">
          <h2 class="text-xl font-semibold text-primary text-center">
            用户登录
          </h2>
        </div>
        
        <div class="card-body">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 用户名输入 -->
            <div>
              <label for="username" class="block text-sm font-medium text-primary mb-2">
                用户名
              </label>
              <input
                id="username"
                v-model="form.username"
                name="username"
                type="text"
                required
                class="gov-input w-full"
                placeholder="请输入用户名"
              />
            </div>

            <!-- 密码输入 -->
            <div>
              <label for="password" class="block text-sm font-medium text-primary mb-2">
                密码
              </label>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                class="gov-input w-full"
                placeholder="请输入密码"
              />
            </div>

            <!-- 记住我和忘记密码 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="form.rememberMe"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-accent focus:ring-accent border-secondary rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-secondary">
                  记住我
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-accent hover:text-accent icon-hover">
                  忘记密码？
                </a>
              </div>
            </div>

            <!-- 登录按钮 -->
            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="gov-button w-full flex justify-center items-center gap-2"
              >
                <span v-if="isLoading" class="loading"></span>
                <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                {{ isLoading ? '登录中...' : '登录系统' }}
              </button>
            </div>

            <!-- 错误提示 -->
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {{ error }}
            </div>
          </form>
        </div>

        <div class="card-footer">
          <div class="text-center">
            <span class="text-sm text-secondary">还没有账户？</span>
            <router-link to="/register" class="font-medium text-accent hover:text-accent icon-hover ml-1">
              立即注册
            </router-link>
          </div>
        </div>
      </div>

      <!-- 底部信息 -->
      <div class="text-center mt-8 animate-fadeIn">
        <p class="text-xs text-tertiary">
          © 2025 政务助手系统 · 安全可信赖的政务服务平台
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  username: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    const result = await authStore.login(form.value)
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.message || '登录失败，请重试'
    }
  } catch (err) {
    error.value = '登录失败，请检查网络连接'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>