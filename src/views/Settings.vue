<template>
  <div class="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
    <!-- 顶部导航栏 -->
    <nav class="gov-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <button
              @click="$router.go(-1)"
              class="mr-4 p-2 text-secondary hover:text-primary transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div class="flex items-center space-x-3">
              <!-- 政务智能助手图标 -->
              <div class="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h1 class="text-xl font-semibold text-primary">政务智能助手 - 个人设置</h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <!-- 用户头像下拉菜单 -->
            <div 
              @click="toggleUserMenu"
              class="relative"
            >
              <img 
                v-if="userInfo.avatar" 
                :src="userInfo.avatar" 
                :alt="userInfo.name"
                class="user-avatar"
              />
              <div 
                v-else
                class="avatar-placeholder"
              >
                {{ userInfo.name ? userInfo.name.charAt(0) : 'U' }}
              </div>
              
              <!-- 下拉菜单 -->
              <div 
                :class="['dropdown-menu', { 'show': showUserMenu }]"
              >
                <router-link to="/" class="dropdown-item">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  返回主页
                </router-link>
                <a href="#" @click="logout" class="dropdown-item">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  退出登录
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <!-- 页面标题 -->
        <div class="mb-8 animate-fadeIn">
          <div class="gov-card">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold text-gradient mb-2">
                    系统设置
                  </h2>
                  <p class="text-secondary">
                    管理您的个人信息、系统偏好设置和安全配置
                  </p>
                </div>
                <div class="hidden md:block">
                  <div class="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 设置选项卡 -->
        <div class="mb-8">
          <div class="gov-card">
            <div class="card-body">
              <nav class="flex space-x-8">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    activeTab === tab.id
                      ? 'border-accent text-accent bg-bg-secondary'
                      : 'border-transparent text-secondary hover:text-primary hover:border-border',
                    'whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200'
                  ]"
                >
                  <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="tab.id === 'profile'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    <path v-else-if="tab.id === 'security'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                  </svg>
                  {{ tab.name }}
                </button>
              </nav>
            </div>
          </div>
        </div>

        <!-- 个人信息设置 -->
        <div v-if="activeTab === 'profile'" class="gov-card animate-slideInFromLeft">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-primary flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              个人信息
            </h3>
            <p class="text-sm text-secondary mt-1">管理您的基本信息</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile" class="space-y-6">
              <!-- 头像设置 -->
              <div class="flex items-center space-x-6">
                <div class="flex-shrink-0">
                  <img 
                    v-if="profileForm.avatar" 
                    :src="profileForm.avatar" 
                    :alt="profileForm.name"
                    class="user-avatar w-20 h-20"
                  />
                  <div 
                    v-else
                    class="avatar-placeholder w-20 h-20 text-2xl"
                  >
                    {{ profileForm.name ? profileForm.name.charAt(0) : 'U' }}
                  </div>
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium text-primary mb-2">头像</label>
                  <div class="flex items-center space-x-4">
                    <input
                      type="file"
                      ref="avatarInput"
                      @change="handleAvatarChange"
                      accept="image/*"
                      class="hidden"
                    />
                    <button
                      type="button"
                      @click="$refs.avatarInput.click()"
                      class="gov-button-secondary"
                    >
                      选择头像
                    </button>
                    <button
                      v-if="profileForm.avatar"
                      type="button"
                      @click="removeAvatar"
                      class="text-sm text-error hover:text-error/80"
                    >
                      移除头像
                    </button>
                  </div>
                  <p class="text-xs text-secondary mt-1">支持 JPG、PNG 格式，文件大小不超过 2MB</p>
                </div>
              </div>
              
              <!-- 基本信息 -->
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="name" class="block text-sm font-medium text-primary mb-2">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    v-model="profileForm.name"
                    class="gov-input w-full"
                    placeholder="请输入您的姓名"
                    required
                  />
                </div>
                <div>
                  <label for="department" class="block text-sm font-medium text-primary mb-2">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                    部门
                  </label>
                  <select
                    id="department"
                    v-model="profileForm.department"
                    class="select w-full"
                    required
                  >
                    <option value="">请选择部门</option>
                    <option value="市政府办公室">市政府办公室</option>
                    <option value="发展改革委">发展改革委</option>
                    <option value="教育局">教育局</option>
                    <option value="科技局">科技局</option>
                    <option value="工信局">工信局</option>
                    <option value="公安局">公安局</option>
                    <option value="民政局">民政局</option>
                    <option value="司法局">司法局</option>
                    <option value="财政局">财政局</option>
                    <option value="人社局">人社局</option>
                    <option value="自然资源局">自然资源局</option>
                    <option value="生态环境局">生态环境局</option>
                    <option value="住建局">住建局</option>
                    <option value="交通局">交通局</option>
                    <option value="水利局">水利局</option>
                    <option value="农业农村局">农业农村局</option>
                    <option value="商务局">商务局</option>
                    <option value="文旅局">文旅局</option>
                    <option value="卫健委">卫健委</option>
                    <option value="应急管理局">应急管理局</option>
                    <option value="审计局">审计局</option>
                    <option value="市场监管局">市场监管局</option>
                    <option value="统计局">统计局</option>
                    <option value="医保局">医保局</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                <div>
                  <label for="role" class="block text-sm font-medium text-primary mb-2">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2"/>
                    </svg>
                    职务
                  </label>
                  <input
                    type="text"
                    id="role"
                    v-model="profileForm.role"
                    class="gov-input w-full"
                    placeholder="请输入您的职务"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-primary mb-2">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="profileForm.email"
                    class="gov-input w-full"
                    placeholder="请输入您的邮箱地址"
                  />
                </div>
              </div>
              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="gov-button flex items-center gap-2"
                >
                  <span v-if="loading" class="loading"></span>
                  <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ loading ? '保存中...' : '保存更改' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- 安全设置 -->
        <div v-if="activeTab === 'security'" class="gov-card animate-slideInFromRight">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-primary flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              安全设置
            </h3>
            <p class="text-sm text-secondary mt-1">修改您的登录密码和安全配置</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="updatePassword" class="space-y-6">
              <div>
                <label for="current-password" class="block text-sm font-medium text-primary mb-2">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  当前密码
                </label>
                <input
                  type="password"
                  id="current-password"
                  v-model="passwordForm.currentPassword"
                  class="gov-input w-full"
                  placeholder="请输入当前密码"
                />
              </div>
              <div>
                <label for="new-password" class="block text-sm font-medium text-primary mb-2">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                  </svg>
                  新密码
                </label>
                <input
                  type="password"
                  id="new-password"
                  v-model="passwordForm.newPassword"
                  class="gov-input w-full"
                  placeholder="请输入新密码（至少6位）"
                />
              </div>
              <div>
                <label for="confirm-password" class="block text-sm font-medium text-primary mb-2">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  确认新密码
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  v-model="passwordForm.confirmPassword"
                  class="gov-input w-full"
                  placeholder="请再次输入新密码"
                />
              </div>
              
              <!-- 密码强度提示 -->
              <div class="bg-bg-secondary p-4 rounded-lg">
                <h4 class="text-sm font-medium text-primary mb-2">密码安全建议：</h4>
                <ul class="text-xs text-secondary space-y-1">
                  <li class="flex items-center gap-2">
                    <svg class="w-3 h-3 text-info" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    至少包含8个字符
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-3 h-3 text-info" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    包含大小写字母、数字和特殊字符
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-3 h-3 text-info" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    避免使用常见密码或个人信息
                  </li>
                </ul>
              </div>
              
              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="gov-button flex items-center gap-2"
                >
                  <span v-if="loading" class="loading"></span>
                  <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  {{ loading ? '更新中...' : '更新密码' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- 系统偏好设置 -->
        <div v-if="activeTab === 'preferences'" class="gov-card animate-slideInFromBottom">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-primary flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
              </svg>
              系统偏好
            </h3>
            <p class="text-sm text-secondary mt-1">自定义您的系统使用体验和通知设置</p>
          </div>
          <div class="card-body">
            <div class="space-y-6">
              <!-- 图标颜色设置 -->
              <div class="p-4 bg-bg-secondary rounded-lg">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-primary">图标颜色主题</h4>
                    <p class="text-sm text-secondary">选择政务智能助手图标的颜色方案</p>
                  </div>
                </div>
                <div class="color-picker">
                  <div 
                    class="color-option icon-color-blue" 
                    :class="{ active: iconColorScheme === 'blue' }"
                    @click="changeIconColor('blue')"
                    title="蓝色方案（默认）"
                  ></div>
                  <div 
                    class="color-option icon-color-green" 
                    :class="{ active: iconColorScheme === 'green' }"
                    @click="changeIconColor('green')"
                    title="绿色方案"
                  ></div>
                  <div 
                    class="color-option icon-color-purple" 
                    :class="{ active: iconColorScheme === 'purple' }"
                    @click="changeIconColor('purple')"
                    title="紫色方案"
                  ></div>
                  <div 
                    class="color-option icon-color-orange" 
                    :class="{ active: iconColorScheme === 'orange' }"
                    @click="changeIconColor('orange')"
                    title="橙色方案"
                  ></div>
                  <div 
                    class="color-option icon-color-red" 
                    :class="{ active: iconColorScheme === 'red' }"
                    @click="changeIconColor('red')"
                    title="红色方案"
                  ></div>
                </div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-info to-primary rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-primary">邮件通知</h4>
                    <p class="text-sm text-secondary">接收系统通知和更新邮件</p>
                  </div>
                </div>
                <button
                  @click="preferences.emailNotifications = !preferences.emailNotifications"
                  :class="[
                    preferences.emailNotifications ? 'bg-accent' : 'bg-border',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
                  ]"
                >
                  <span
                    :class="[
                      preferences.emailNotifications ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    ]"
                  ></span>
                </button>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-success to-info rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-primary">自动保存</h4>
                    <p class="text-sm text-secondary">自动保存文档草稿</p>
                  </div>
                </div>
                <button
                  @click="preferences.autoSave = !preferences.autoSave"
                  :class="[
                    preferences.autoSave ? 'bg-accent' : 'bg-border',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
                  ]"
                >
                  <span
                    :class="[
                      preferences.autoSave ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    ]"
                  ></span>
                </button>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-primary">深色模式</h4>
                    <p class="text-sm text-secondary">使用深色主题界面</p>
                  </div>
                </div>
                <button
                  @click="preferences.darkMode = !preferences.darkMode"
                  :class="[
                    preferences.darkMode ? 'bg-accent' : 'bg-border',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent'
                  ]"
                >
                  <span
                    :class="[
                      preferences.darkMode ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    ]"
                  ></span>
                </button>
              </div>
              
              <div class="flex justify-end pt-4">
                <button
                  @click="savePreferences"
                  :disabled="loading"
                  class="gov-button flex items-center gap-2"
                >
                  <span v-if="loading" class="loading"></span>
                  <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ loading ? '保存中...' : '保存设置' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'

export default {
  name: 'Settings',
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      activeTab: 'profile',
      loading: false,
      showUserMenu: false,
      userInfo: {
        name: '张三',
        email: 'zhangsan@gov.cn',
        department: '市政府办公室',
        role: '科员'
      },
      profileForm: {
        name: '',
        email: '',
        department: '',
        role: '',
        avatar: ''
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      preferences: {
        emailNotifications: true,
        autoSave: true,
        darkMode: false
      },
      iconColorScheme: 'green', // 当前选中的图标颜色方案
      tabs: [
        { id: 'profile', name: '个人信息' },
        { id: 'security', name: '安全设置' },
        { id: 'preferences', name: '系统偏好' }
      ],
      colorSchemes: {
        blue: { from: 'from-primary', to: 'to-accent' },
        green: { from: 'from-primary-green', to: 'to-accent-green' },
        purple: { from: 'from-primary-purple', to: 'to-accent-purple' },
        orange: { from: 'from-primary-orange', to: 'to-accent-orange' },
        red: { from: 'from-primary-red', to: 'to-accent-red' }
      }
    }
  },
  mounted() {
    this.loadUserInfo()
    this.loadIconColorScheme()
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    loadUserInfo() {
      // 从全局状态加载用户信息
      if (this.authStore.user) {
        this.userInfo = { ...this.authStore.user }
        this.profileForm = { ...this.authStore.user }
      } else {
        // 如果全局状态没有，尝试从localStorage加载
        const savedUserInfo = localStorage.getItem('userInfo')
        if (savedUserInfo) {
          this.userInfo = JSON.parse(savedUserInfo)
          this.profileForm = { ...this.userInfo }
        }
      }
    },
    loadIconColorScheme() {
      // 从localStorage加载保存的图标颜色方案
      const savedScheme = localStorage.getItem('iconColorScheme')
      if (savedScheme && this.colorSchemes[savedScheme]) {
        this.iconColorScheme = savedScheme
      }
    },
    handleAvatarChange(event) {
      const file = event.target.files[0]
      if (!file) return
      
      // 检查文件大小（2MB限制）
      if (file.size > 2 * 1024 * 1024) {
        alert('头像文件大小不能超过2MB')
        return
      }
      
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件')
        return
      }
      
      // 读取文件并转换为base64
      const reader = new FileReader()
      reader.onload = (e) => {
        const avatarData = e.target.result
        this.profileForm.avatar = avatarData
        // 更新全局状态
        this.authStore.updateUserAvatar(avatarData)
        alert('头像上传成功！')
      }
      reader.readAsDataURL(file)
    },
    removeAvatar() {
      this.profileForm.avatar = ''
      // 更新全局状态
      this.authStore.updateUserAvatar('')
      // 清空文件输入
      if (this.$refs.avatarInput) {
        this.$refs.avatarInput.value = ''
      }
      alert('头像已移除！')
    },
    changeIconColor(colorScheme) {
      this.iconColorScheme = colorScheme
      // 保存到localStorage
      localStorage.setItem('iconColorScheme', colorScheme)
      // 发送事件通知其他组件更新图标颜色
      this.$emit('icon-color-changed', colorScheme)
      // 显示成功消息
      this.$message?.success(`图标颜色已切换为${this.getColorName(colorScheme)}方案`)
    },
    getColorName(scheme) {
      const names = {
        blue: '蓝色',
        green: '绿色', 
        purple: '紫色',
        orange: '橙色',
        red: '红色'
      }
      return names[scheme] || '默认'
    },
    async updateProfile() {
      this.loading = true
      
      // 更新全局状态
      this.authStore.updateUserInfo({
        name: this.profileForm.name,
        email: this.profileForm.email,
        department: this.profileForm.department,
        role: this.profileForm.role,
        avatar: this.profileForm.avatar
      })
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 更新用户信息
        this.userInfo = { ...this.profileForm }
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        
        this.$message.success('个人信息更新成功')
      } catch (error) {
        this.$message.error('更新失败，请重试')
      } finally {
        this.loading = false
      }
    },
    async updatePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$message.error('两次输入的密码不一致')
        return
      }
      
      if (this.passwordForm.newPassword.length < 6) {
        this.$message.error('密码长度至少为6位')
        return
      }
      
      this.loading = true
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.$message.success('密码更新成功')
        this.passwordForm = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      } catch (error) {
        this.$message.error('密码更新失败，请重试')
      } finally {
        this.loading = false
      }
    },
    async savePreferences() {
      this.loading = true
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        localStorage.setItem('preferences', JSON.stringify(this.preferences))
        this.$message.success('偏好设置保存成功')
      } catch (error) {
        this.$message.error('保存失败，请重试')
      } finally {
        this.loading = false
      }
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    handleClickOutside(event) {
      if (!event.target.closest('.relative')) {
        this.showUserMenu = false
      }
    },
    logout() {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
/* 组件特定样式 */
.loading {
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>