import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = ref(!!token.value)

  // 登录
  const login = async (credentials) => {
    try {
      // 这里应该调用实际的登录API
      // const response = await authService.login(credentials)
      
      // 模拟登录成功
      const mockUser = {
        id: 1,
        username: credentials.username,
        name: '张三',
        department: '市政府办公室',
        role: '文秘'
      }
      const mockToken = 'mock-jwt-token-' + Date.now()
      
      user.value = mockUser
      token.value = mockToken
      isAuthenticated.value = true
      
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      return { success: true, user: mockUser }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: '登录失败，请检查用户名和密码' }
    }
  }

  // 注册
  const register = async (userInfo) => {
    try {
      // 这里应该调用实际的注册API
      // const response = await authService.register(userInfo)
      
      // 模拟注册成功
      return { success: true, message: '注册成功，请登录' }
    } catch (error) {
      console.error('注册失败:', error)
      return { success: false, message: '注册失败，请稍后重试' }
    }
  }

  // 登出
  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // 更新用户头像
  const updateUserAvatar = (avatarData) => {
    if (user.value) {
      user.value.avatar = avatarData
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  // 更新用户信息
  const updateUserInfo = (userInfo) => {
    if (user.value) {
      user.value = { ...user.value, ...userInfo }
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  // 获取用户头像
  const getUserAvatar = () => {
    return user.value?.avatar || null
  }

  // 初始化用户信息
  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser && token.value) {
      try {
        user.value = JSON.parse(savedUser)
        isAuthenticated.value = true
      } catch (error) {
        console.error('解析用户信息失败:', error)
        logout()
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    initializeAuth,
    updateUserAvatar,
    updateUserInfo,
    getUserAvatar
  }
})