<template>
  <div class="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full">
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
          新用户注册 · 加入安全可信赖的政务服务平台
        </p>
      </div>

      <!-- 注册卡片 -->
      <div class="gov-card animate-slideInFromRight">
        <div class="card-header">
          <h2 class="text-xl font-semibold text-primary text-center">
            用户注册
          </h2>
        </div>
        
        <div class="card-body">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- 基本信息区域 -->
            <div class="space-y-4">
              <!-- 用户名 -->
              <div>
                <label for="username" class="block text-sm font-medium text-primary mb-2">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
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



              <!-- 邮箱地址 -->
              <div>
                <label for="email" class="block text-sm font-medium text-primary mb-2">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  邮箱地址
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  required
                  class="gov-input w-full"
                  placeholder="请输入邮箱地址"
                />
              </div>

              <!-- 密码设置 -->
              <div>
                <label for="password" class="block text-sm font-medium text-primary mb-2">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
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

              <!-- 确认密码 -->
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-primary mb-2">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  确认密码
                </label>
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  class="gov-input w-full"
                  placeholder="请再次输入密码"
                />
              </div>
            </div>

            <!-- 服务条款 -->
            <div class="flex items-start">
              <input
                id="agree"
                v-model="form.agree"
                name="agree"
                type="checkbox"
                required
                class="h-4 w-4 text-accent focus:ring-accent border-secondary rounded mt-1"
              />
              <label for="agree" class="ml-2 block text-sm text-secondary">
                我已阅读并同意
                <a href="#" class="font-medium text-accent hover:text-accent/80 transition-colors duration-200">
                  《用户服务协议》
                </a>
                和
                <a href="#" class="font-medium text-accent hover:text-accent/80 transition-colors duration-200">
                  《隐私政策》
                </a>
              </label>
            </div>

            <!-- 注册按钮 -->
            <div>
              <button
                type="submit"
                :disabled="isLoading || !form.agree"
                class="gov-button w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading" class="loading"></span>
                <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                {{ isLoading ? '注册中...' : '立即注册' }}
              </button>
            </div>

            <!-- 错误提示 -->
            <div v-if="error" class="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-md text-sm">
              {{ error }}
            </div>

            <!-- 成功提示 -->
            <div v-if="success" class="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-md text-sm">
              {{ success }}
            </div>
          </form>
        </div>

        <div class="card-footer">
          <div class="text-center">
            <span class="text-sm text-secondary">已有账户？</span>
            <router-link to="/login" class="font-medium text-accent hover:text-accent/80 transition-colors duration-200 ml-1">
              立即登录
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

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        name: '',
        department: '',
        role: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        agree: false
      },
      isLoading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    async handleRegister() {
      if (this.isLoading) return
      
      // 验证密码
      if (this.form.password !== this.form.confirmPassword) {
        this.error = '两次输入的密码不一致'
        return
      }
      
      if (this.form.password.length < 6) {
        this.error = '密码长度不能少于6位'
        return
      }
      
      this.isLoading = true
      this.error = ''
      this.success = ''
      
      try {
        // 模拟注册请求
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 模拟成功
        this.success = '注册成功！请等待管理员审核，审核通过后即可登录系统。'
        
        // 3秒后跳转到登录页
        setTimeout(() => {
          this.$router.push('/login')
        }, 3000)
        
      } catch (err) {
        this.error = '注册失败，请重试'
        console.error('Register error:', err)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* 组件特定样式 */
.gov-input:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
}

.select:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
}

/* 加载动画 */
.loading {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>