<template>
  <div class="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
    <!-- 顶部导航 -->
    <header class="gov-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <button 
              @click="goBack" 
              class="flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span class="font-medium">返回工作台</span>
            </button>
            <div class="h-6 w-px bg-white/20"></div>
            <div class="flex items-center space-x-3">
              <!-- 政务智能助手图标 -->
              <div class="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h1 class="text-xl font-semibold text-primary">政务智能助手 - 个人知识库</h1>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- 返回主页按钮 -->
            <button 
              @click="$router.push('/')"
              class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary hover:text-primary hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              返回主页
            </button>
            
            <button 
              @click="showUploadModal = true"
              class="gov-button flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span>上传文档</span>
            </button>
            
            <!-- 用户头像下拉菜单 -->
            <UserAvatar 
              @logout="logout"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 简化的搜索和操作栏 -->
      <div class="gov-card mb-6">
        <div class="card-body">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <!-- 搜索框 -->
            <div class="flex-1 max-w-md">
              <div class="relative">
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="搜索文档..."
                  class="gov-input w-full pl-10 pr-4 py-2"
                >
                <svg class="absolute left-3 top-2.5 w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            <!-- 操作按钮组 -->
            <div class="flex items-center gap-3">
              <select 
                v-model="selectedCategory"
                class="px-3 py-2 border border-border rounded-lg bg-bg-primary text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">全部</option>
                <option value="template">模板</option>
                <option value="document">文档</option>
              </select>
              
              <button 
                @click="showUploadModal = true"
                class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                上传
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 文档列表 -->
      <div class="gov-card animate-slideInFromRight">
        <div class="card-header">
          <h2 class="text-lg font-bold text-primary flex items-center space-x-2">
            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span>我的文档</span>
          </h2>
        </div>
        
        <div class="divide-y divide-white/20">
          <div 
            v-for="doc in filteredDocuments" 
            :key="doc.id"
            class="p-6 hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
            @click="openDocument(doc)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="p-2 rounded-lg" :class="getDocumentIconClass(doc.type)">
                  <svg class="w-6 h-6" :class="getDocumentIconColor(doc.type)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getDocumentIconPath(doc.type)"></path>
                  </svg>
                </div>
                
                <div>
                  <h3 class="text-sm font-medium text-primary">{{ doc.title }}</h3>
                  <p class="text-sm text-secondary">{{ doc.description }}</p>
                  <div class="flex items-center space-x-4 mt-1">
                    <span class="text-xs text-tertiary">{{ formatDate(doc.lastModified) }}</span>
                    <span class="text-xs text-tertiary">{{ doc.size }}</span>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getCategoryClass(doc.category)">
                      {{ doc.category }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  @click.stop="downloadDocument(doc)"
                  class="p-2 text-secondary hover:text-primary transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 8h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                
                <button 
                  @click.stop="deleteDocument(doc)"
                  class="p-2 text-secondary hover:text-error transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="filteredDocuments.length === 0" class="p-12 text-center">
          <svg class="mx-auto w-12 h-12 text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="text-lg font-medium text-primary mb-2">暂无文档</h3>
          <p class="text-secondary mb-4">开始上传您的第一个文档吧</p>
          <button 
            @click="showUploadModal = true"
            class="gov-button flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>上传文档</span>
          </button>
        </div>
      </div>
    </main>

    <!-- 上传模态框 -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div class="gov-card max-w-md w-full mx-4 animate-slideInFromTop">
        <div class="card-header">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-primary">上传文档</h3>
            <button 
              @click="showUploadModal = false"
              class="text-secondary hover:text-primary transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="card-body space-y-4">
          <div>
            <label class="block text-sm font-medium text-primary mb-2">文档标题</label>
            <input 
              v-model="uploadForm.title"
              type="text" 
              class="gov-input w-full"
              placeholder="请输入文档标题"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-primary mb-2">分类</label>
            <select 
              v-model="uploadForm.category"
              class="select w-full"
            >
              <option value="template">模板</option>
              <option value="document">文档</option>
              <option value="reference">参考资料</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-primary mb-2">文件</label>
            <div class="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
              <input 
                ref="fileInput"
                type="file" 
                class="hidden"
                @change="handleFileSelect"
                accept=".doc,.docx,.pdf,.txt"
              >
              <svg class="mx-auto w-12 h-12 text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-primary mb-2">点击上传或拖拽文件到此处</p>
              <p class="text-sm text-secondary">支持 DOC, DOCX, PDF, TXT 格式</p>
              <button 
                @click="$refs.fileInput.click()"
                class="gov-button-secondary mt-4"
              >
                选择文件
              </button>
            </div>
            <p v-if="uploadForm.file" class="mt-2 text-sm text-secondary">
              已选择: {{ uploadForm.file.name }}
            </p>
          </div>
        </div>
        
        <div class="card-footer">
          <div class="flex justify-end space-x-3">
            <button 
              @click="showUploadModal = false"
              class="gov-button-secondary"
            >
              取消
            </button>
            <button 
              @click="uploadDocument"
              :disabled="!uploadForm.title || !uploadForm.file"
              class="gov-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上传
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  name: 'KnowledgeBase',
  components: {
    UserAvatar
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'date',
      showUploadModal: false,
      showUserMenu: false,
      userInfo: {
        name: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).name : '用户',
        avatar: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).avatar : null
      },
      uploadForm: {
        title: '',
        category: 'document',
        file: null
      },
      stats: {
        totalDocs: 156,
        templates: 23,
        storage: '2.3GB',
        monthlyNew: 12
      },
      documents: [
        {
          id: 1,
          title: '政府工作报告模板',
          description: '年度政府工作报告标准模板',
          type: 'template',
          category: '模板',
          size: '2.5MB',
          lastModified: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          title: '疫情防控通知',
          description: '关于加强疫情防控工作的通知文件',
          type: 'document',
          category: '文档',
          size: '1.2MB',
          lastModified: '2024-01-14T14:20:00Z'
        },
        {
          id: 3,
          title: '公文写作规范',
          description: '政府公文写作标准规范参考资料',
          type: 'reference',
          category: '参考资料',
          size: '3.8MB',
          lastModified: '2024-01-13T09:15:00Z'
        },
        {
          id: 4,
          title: '会议纪要模板',
          description: '标准会议纪要格式模板',
          type: 'template',
          category: '模板',
          size: '1.5MB',
          lastModified: '2024-01-12T16:45:00Z'
        },
        {
          id: 5,
          title: '预算申请报告',
          description: '年度预算申请报告文档',
          type: 'document',
          category: '文档',
          size: '4.2MB',
          lastModified: '2024-01-11T11:30:00Z'
        }
      ]
    }
  },
  computed: {
    filteredDocuments() {
      let filtered = this.documents
      
      // 按分类筛选
      if (this.selectedCategory) {
        filtered = filtered.filter(doc => doc.type === this.selectedCategory)
      }
      
      // 按搜索关键词筛选
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(doc => 
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
        )
      }
      
      // 排序
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.title.localeCompare(b.title)
          case 'size':
            return parseFloat(a.size) - parseFloat(b.size)
          case 'date':
          default:
            return new Date(b.lastModified) - new Date(a.lastModified)
        }
      })
      
      return filtered
    }
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    logout() {
      if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }
    },
    goBack() {
      this.$router.push('/dashboard')
    },
    
    getDocumentIconClass(type) {
      const classes = {
        template: 'bg-gradient-to-r from-success/10 to-info/10',
        document: 'bg-gradient-to-r from-primary/10 to-accent/10',
        reference: 'bg-gradient-to-r from-warning/10 to-error/10'
      }
      return classes[type] || classes.document
    },
    
    getDocumentIconColor(type) {
      const colors = {
        template: 'text-success',
        document: 'text-primary',
        reference: 'text-warning'
      }
      return colors[type] || colors.document
    },
    
    getDocumentIconPath(type) {
      const paths = {
        template: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        reference: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
      }
      return paths[type] || paths.document
    },
    
    getCategoryClass(category) {
      const classes = {
        '模板': 'bg-success/10 text-success border border-success/20',
        '文档': 'bg-primary/10 text-primary border border-primary/20',
        '参考资料': 'bg-warning/10 text-warning border border-warning/20'
      }
      return classes[category] || classes['文档']
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    
    openDocument(doc) {
      this.$message.info(`正在打开文档：${doc.title}`)
      // 这里可以添加打开文档的逻辑
    },
    
    downloadDocument(doc) {
      this.$message.success(`正在下载：${doc.title}`)
      // 这里可以添加下载逻辑
    },
    
    deleteDocument(doc) {
      this.$confirm(`确定要删除文档"${doc.title}"吗？`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.documents.findIndex(d => d.id === doc.id)
        if (index > -1) {
          this.documents.splice(index, 1)
          this.$message.success('删除成功')
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (file) {
        this.uploadForm.file = file
        if (!this.uploadForm.title) {
          this.uploadForm.title = file.name.replace(/\.[^/.]+$/, '')
        }
      }
    },
    
    uploadDocument() {
      if (!this.uploadForm.title || !this.uploadForm.file) {
        this.$message.warning('请填写完整信息')
        return
      }
      
      // 模拟上传
      this.$message.success('上传成功')
      
      // 添加到文档列表
      const newDoc = {
        id: Date.now(),
        title: this.uploadForm.title,
        description: `用户上传的${this.uploadForm.category}文档`,
        type: this.uploadForm.category,
        category: this.getCategoryName(this.uploadForm.category),
        size: this.formatFileSize(this.uploadForm.file.size),
        lastModified: new Date().toISOString()
      }
      
      this.documents.unshift(newDoc)
      
      // 重置表单
      this.uploadForm = {
        title: '',
        category: 'document',
        file: null
      }
      
      this.showUploadModal = false
    },
    
    getCategoryName(type) {
      const names = {
        template: '模板',
        document: '文档',
        reference: '参考资料'
      }
      return names[type] || '文档'
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
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

/* 文件拖拽样式 */
.border-dashed:hover {
  border-color: rgba(59, 130, 246, 0.5);
}
</style>