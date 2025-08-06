<template>
  <div class="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
    <!-- 顶部导航栏 -->
    <nav class="gov-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <button
              @click="goBack"
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
              <h1 class="text-xl font-semibold text-primary">政务智能助手 - 文档生成</h1>
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
                <router-link to="/settings" class="dropdown-item">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  个人设置
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
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <!-- 状态卡片 -->
        <div class="mb-8 animate-fadeIn">
          <div class="gov-card">
            <div class="card-body">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="statusIconClass">
                    <svg v-if="generationStatus === 'generating'" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else-if="generationStatus === 'completed'" class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <svg v-else class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-primary">{{ statusTitle }}</h2>
                    <p class="text-secondary">{{ statusDescription }}</p>
                  </div>
                </div>
                <div v-if="generationStatus === 'generating'" class="text-right">
                  <div class="text-2xl font-bold text-accent">{{ Math.round(progress) }}%</div>
                  <div class="text-sm text-secondary">{{ estimatedTime }}</div>
                </div>
              </div>
              
              <!-- 进度条 -->
              <div v-if="generationStatus === 'generating'" class="mt-6">
                <div class="w-full bg-border rounded-full h-3 overflow-hidden">
                  <div class="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-700 ease-out" :style="{ width: progress + '%' }"></div>
                </div>
                <div class="flex justify-between text-xs text-tertiary mt-2">
                  <span>开始生成</span>
                  <span>{{ generationSteps[Math.min(currentStep, generationSteps.length - 1)] }}</span>
                  <span>完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 主要内容网格 -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <!-- 文档预览 -->
          <div class="xl:col-span-2">
            <div class="gov-card animate-slideInFromLeft">
              <!-- 文档头部 -->
              <div class="card-header">
                <div class="flex items-center justify-between">
                  <div>
                    <h1 class="text-2xl font-bold text-primary">{{ documentTitle }}</h1>
                    <p class="text-sm text-secondary mt-1">创建于：{{ formatDate(new Date()) }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="badge" :class="statusBadgeClass">
                      {{ statusBadgeText }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 文档内容 -->
              <div class="card-body" v-if="isGenerated">
                <!-- 公文头部 -->
                <div class="text-center mb-10 border-b border-border pb-8">
                  <div class="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
                    </svg>
                  </div>
                  <div class="text-primary font-bold text-xl mb-3">{{ checklistInfo.issuingUnit || '政务部门' }}</div>
                  <div class="text-secondary text-base mb-6 font-medium">正式文件</div>
                  <div class="flex justify-between items-center text-sm text-secondary bg-bg-secondary rounded-lg p-4">
                    <div class="font-mono">{{ checklistInfo.docNumber || 'AUTO-' + new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0') + '-001' }}</div>
                    <div class="flex items-center space-x-2">
                      <svg class="h-4 w-4 text-tertiary" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                      </svg>
                      <span>签发人：{{ checklistInfo.signer || '签发人' }}</span>
                    </div>
                  </div>
                </div>

                <!-- 文档标题 -->
                <div class="text-center mb-10">
                  <h2 class="text-3xl font-bold text-primary leading-relaxed">{{ documentTitle }}</h2>
                </div>

                <!-- 收件人 -->
                <div class="mb-8 p-4 bg-info/10 rounded-lg border-l-4 border-info">
                  <div class="flex items-center space-x-2">
                    <svg class="h-5 w-5 text-info" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    <span class="font-semibold text-info">收件单位：{{ checklistInfo.recipientUnit || '相关部门' }}</span>
                  </div>
                </div>

                <!-- 文档正文 -->
                <div class="prose prose-lg max-w-none text-secondary leading-relaxed mb-10 bg-white rounded-lg p-6 border border-border">
                  <div v-html="formattedContent"></div>
                </div>

                <!-- 文档尾部 -->
                <div class="text-right mt-10 space-y-4">
                  <div class="inline-block text-left bg-bg-secondary rounded-lg p-6">
                    <p class="mb-4 text-secondary">此致</p>
                    <p class="mb-8 text-tertiary">[电子签名]</p>
                    <div class="border-t border-border pt-4">
                      <p class="font-bold text-primary">{{ checklistInfo.issuingUnit || '政务部门' }}</p>
                      <p class="text-secondary mt-1">{{ formatDate(new Date(checklistInfo.date || new Date())) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 生成占位符 -->
              <div v-else class="card-body text-center py-12">
                <div class="max-w-md mx-auto">
                  <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <svg class="h-12 w-12 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-primary mb-3">文档生成中...</h3>
                  <p class="text-secondary mb-6">我们正在使用AI技术为您生成专业的公文，请稍候片刻。</p>
                  <div class="flex items-center justify-center space-x-2 text-sm text-tertiary">
                    <div class="loading"></div>
                    <span>正在处理您的请求...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作侧边栏 -->
          <div class="xl:col-span-1 space-y-6">
            <!-- 快速操作 -->
            <div class="gov-card animate-slideInFromRight" v-if="isGenerated">
              <div class="card-header">
                <h3 class="text-lg font-bold text-primary flex items-center">
                  <svg class="h-5 w-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                  快速操作
                </h3>
              </div>
              
              <div class="card-body space-y-4">
                <!-- 多模态下载选项 -->
                <div class="space-y-3">
                  <h4 class="text-sm font-semibold text-primary mb-3 flex items-center">
                    <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    文档下载
                  </h4>
                  
                </div>
                
                <!-- 下载按钮 -->
                <button @click="downloadAllFormats" class="w-full gov-button flex items-center justify-center space-x-3">
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-semibold">下载文档</span>
                </button>
              </div>
            </div>
            


            <!-- 文档信息 -->
            <div class="gov-card animate-slideInFromRight" style="animation-delay: 0.2s">
              <div class="card-header">
                <h3 class="text-lg font-bold text-primary flex items-center">
                  <svg class="h-5 w-5 mr-2 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  文档信息
                </h3>
              </div>
              <div class="card-body space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-secondary">文档类型</span>
                  <span class="text-sm font-medium text-primary">{{ checklistInfo.docType || '通知' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-secondary">字数统计</span>
                  <span class="text-sm font-medium text-primary">{{ wordCount }} 字</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-secondary">创建时间</span>
                  <span class="text-sm font-medium text-primary">{{ formatDate(new Date()) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-secondary">状态</span>
                  <span class="badge badge-success">{{ generationStatus === 'completed' ? '已完成' : '生成中' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DocumentGeneration',
  data() {
    return {
      userInfo: {
        name: localStorage.getItem('userName') || '用户',
        avatar: localStorage.getItem('userAvatar') || ''
      },
      showUserMenu: false,
      generationStatus: 'generating', // 'idle', 'generating', 'completed', 'error'
      progress: 0,
      currentStep: 0,
      estimatedTime: '预计还需 2 分钟',
      

      documentTitle: '关于加强疫情防控工作的通知',
      checklistInfo: {
        issuingUnit: '市政府办公厅',
        docNumber: 'ZF-2024-001',
        recipientUnit: '各区县政府、市直各部门',
        signer: '市长',
        docType: '通知',
        date: new Date()
      },
      generationSteps: [
        '分析需求',
        '收集资料',
        '生成大纲',
        '撰写内容',
        '格式优化',
        '质量检查'
      ],
      generatedContent: `
        <p>为进一步做好新冠肺炎疫情防控工作，确保人民群众生命安全和身体健康，根据国家卫生健康委员会和省政府相关要求，现就有关事项通知如下：</p>
        
        <h3>一、提高思想认识</h3>
        <p>各级各部门要充分认识当前疫情防控形势的复杂性和严峻性，始终把人民群众生命安全和身体健康放在第一位，坚决克服麻痹思想、厌战情绪、侥幸心理、松劲心态。</p>
        
        <h3>二、强化防控措施</h3>
        <p>1. 严格落实"四早"要求，即早发现、早报告、早隔离、早治疗；</p>
        <p>2. 加强重点场所管控，对商场、超市、餐厅等人员密集场所实施限流措施；</p>
        <p>3. 做好个人防护，坚持佩戴口罩、勤洗手、保持社交距离。</p>
        
        <h3>三、加强组织领导</h3>
        <p>各级政府要切实履行属地责任，建立健全疫情防控工作机制，确保各项防控措施落实到位。对工作不力、措施不到位的，将严肃追究责任。</p>
      `
    }
  },
  computed: {
    isGenerated() {
      return this.generationStatus === 'completed'
    },
    statusTitle() {
      switch (this.generationStatus) {
        case 'generating':
          return '正在生成文档'
        case 'completed':
          return '文档生成完成'
        case 'error':
          return '生成失败'
        default:
          return '准备生成'
      }
    },
    statusDescription() {
      switch (this.generationStatus) {
        case 'generating':
          return 'AI正在为您生成专业的政务文档'
        case 'completed':
          return '文档已成功生成，您可以预览和下载'
        case 'error':
          return '文档生成过程中出现错误，请重试'
        default:
          return '点击开始按钮生成文档'
      }
    },
    statusIconClass() {
      switch (this.generationStatus) {
        case 'generating':
          return 'bg-gradient-to-r from-primary to-accent'
        case 'completed':
          return 'bg-gradient-to-r from-success to-info'
        case 'error':
          return 'bg-gradient-to-r from-error to-warning'
        default:
          return 'bg-gradient-to-r from-secondary to-tertiary'
      }
    },
    statusBadgeClass() {
      switch (this.generationStatus) {
        case 'generating':
          return 'badge-warning'
        case 'completed':
          return 'badge-success'
        case 'error':
          return 'badge-error'
        default:
          return 'badge-secondary'
      }
    },
    statusBadgeText() {
      switch (this.generationStatus) {
        case 'generating':
          return '生成中'
        case 'completed':
          return '已完成'
        case 'error':
          return '生成失败'
        default:
          return '待生成'
      }
    },
    formattedContent() {
      return this.generatedContent
    },
    wordCount() {
      const text = this.generatedContent.replace(/<[^>]*>/g, '')
      return text.length
    }
  },
  mounted() {
    this.startGeneration()
    // 添加点击外部关闭菜单的事件监听器
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    // 移除事件监听器
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    startGeneration() {
      this.generationStatus = 'generating'
      this.progress = 0
      this.currentStep = 0
      
      const interval = setInterval(() => {
        this.progress += Math.random() * 15
        this.currentStep = Math.floor((this.progress / 100) * this.generationSteps.length)
        
        if (this.progress >= 100) {
          this.progress = 100
          this.generationStatus = 'completed'
          this.currentStep = this.generationSteps.length - 1
          clearInterval(interval)
        }
        
        // 更新预计时间
        const remaining = Math.max(0, Math.ceil((100 - this.progress) / 10))
        this.estimatedTime = remaining > 0 ? `预计还需 ${remaining} 秒` : '即将完成'
      }, 500)
    },
    goBack() {
      this.$router.push('/dashboard')
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showUserMenu = false
      }
    },
   






    downloadAllFormats() {
      this.$message.info('正在准备下载文档...')
      
      // 模拟下载PDF
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = '#'
        link.download = `${this.documentTitle || '政务文档'}.pdf`
        link.click()
      }, 500)
      
      // 模拟下载DOCX
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = '#'
        link.download = `${this.documentTitle || '政务文档'}.docx`
        link.click()
      }, 1000)
      
      // 模拟下载TXT
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = '#'
        link.download = `${this.documentTitle || '政务文档'}.txt`
        link.click()
        
        this.$message.success('文档下载完成！已下载PDF、Word和TXT格式')
      }, 1500)
    },
    formatDate(date) {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
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
.prose h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #3b82f6;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
  color: #6b7280;
  line-height: 1.625;
}

.animate-slideInFromTop {
  animation: slideInFromTop 0.2s ease-out;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>