<template>
  <div class="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
    <!-- 简化的顶部导航栏 -->
    <nav class="gov-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- 左侧：返回按钮和标题 -->
          <div class="flex items-center space-x-4">
            <button
              @click="$router.push('/')"
              class="p-2 text-secondary hover:text-primary transition-colors duration-200 rounded-lg hover:bg-bg-secondary"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div class="flex items-center space-x-3">
              <!-- 政务智能助手图标 -->
              <div class="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h1 class="text-xl font-semibold text-primary">政务智能助手 - 历史记录</h1>
            </div>
          </div>
          
          <!-- 右侧：用户头像 -->
          <UserAvatar 
            @logout="logout"
          />
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <!-- 简化的搜索和筛选栏 -->
        <div class="gov-card mb-6">
          <div class="card-body">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- 搜索框 -->
              <div class="flex-1">
                <div class="relative">
                  <input 
                    v-model="searchQuery"
                    type="text" 
                    placeholder="搜索文档标题、内容或类型..."
                    class="gov-input w-full pl-10 pr-4 py-2"
                  >
                  <svg class="absolute left-3 top-2.5 w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              
              <!-- 筛选和操作 -->
              <div class="flex items-center gap-3">
                <select v-model="filterType" class="px-3 py-2 border border-border rounded-lg bg-bg-primary text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部类型</option>
                  <option value="通知">通知</option>
                  <option value="通报">通报</option>
                  <option value="报告">报告</option>
                  <option value="请示">请示</option>
                  <option value="批复">批复</option>
                  <option value="意见">意见</option>
                  <option value="函">函</option>
                  <option value="会议纪要">会议纪要</option>
                </select>
                
                <select 
                  v-model="selectedStatus"
                  class="px-3 py-2 border border-border rounded-lg bg-bg-primary text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">全部状态</option>
                  <option value="completed">已完成</option>
                  <option value="draft">草稿</option>
                </select>
                
                <button
                  @click="clearFilters"
                  class="flex items-center gap-1 px-3 py-2 text-secondary border border-border rounded-lg hover:bg-bg-secondary transition-colors text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  重置
                </button>
                
                <button 
                  @click="clearHistory"
                  class="flex items-center gap-1 px-3 py-2 text-error border border-error rounded-lg hover:bg-error hover:text-white transition-colors text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  清空
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 简化的文档列表 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-primary">文档列表</h3>
              <span class="text-sm text-secondary">共 {{ filteredDocuments.length }} 个文档</span>
            </div>
          </div>
          
          <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span class="ml-3 text-secondary">加载中...</span>
          </div>
          
          <div v-else-if="filteredDocuments.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p class="text-secondary mb-4">暂无文档记录</p>
            <button
              @click="$router.push('/document/generation')"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              创建第一个文档
            </button>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文档标题</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="doc in paginatedDocuments"
                  :key="doc.id"
                  class="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td class="px-4 py-4">
                    <div class="flex flex-col">
                      <h4 class="text-sm font-medium text-primary hover:text-accent cursor-pointer transition-colors"
                          @click="viewDocument(doc)">
                        {{ doc.title }}
                      </h4>
                      <p class="text-xs text-gray-500 mt-1 line-clamp-1">
                        {{ doc.content }}
                      </p>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ doc.type }}
                    </span>
                  </td>
                  <td class="px-4 py-4">
                    <span :class="getStatusClass(doc.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ doc.status }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500">
                    {{ formatDate(doc.createdAt) }}
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewDocument(doc)"
                        class="text-primary hover:text-primary-dark text-sm"
                        title="查看"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                      <button
                        @click="editDocument(doc)"
                        class="text-gray-600 hover:text-gray-900 text-sm"
                        title="编辑"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                      <button
                        @click="deleteDocument(doc)"
                        class="text-red-600 hover:text-red-900 text-sm"
                        title="删除"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 简化的分页 -->
          <div v-if="totalPages > 1" class="p-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500">
                显示第 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredDocuments.length) }} 条，共 {{ filteredDocuments.length }} 条
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                <span class="text-sm text-gray-500">
                  {{ currentPage }} / {{ totalPages }}
                </span>
                <button
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
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
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  name: 'History',
  components: {
    UserAvatar
  },
  data() {
    return {
      loading: false,
      searchQuery: '',
      selectedStatus: '',
      showUserMenu: false,
      userInfo: {
        name: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).name : '用户',
        avatar: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).avatar : null
      },
      filterType: '',
      filterStatus: '',
      currentPage: 1,
      pageSize: 10,
      stats: {
        totalDocs: 24,
        thisMonth: 8,
        drafts: 3,
        completed: 21
      },
      documents: [
        {
          id: 1,
          title: '关于加强疫情防控工作的通知',
          type: '通知',
          status: '已完成',
          content: '为进一步做好新冠肺炎疫情防控工作，确保人民群众生命安全和身体健康，现就有关事项通知如下...',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T14:20:00Z',
          wordCount: 1250
        },
        {
          id: 2,
          title: '2023年度工作总结报告',
          type: '报告',
          status: '已导出',
          content: '2023年，在市委、市政府的正确领导下，我局认真贯彻落实各项决策部署，扎实推进各项工作...',
          createdAt: '2024-01-12T09:15:00Z',
          updatedAt: '2024-01-14T16:45:00Z',
          wordCount: 2800
        },
        {
          id: 3,
          title: '关于申请购买办公设备的请示',
          type: '请示',
          status: '草稿',
          content: '由于我局现有办公设备老化严重，影响日常工作效率，现申请购买一批新的办公设备...',
          createdAt: '2024-01-10T14:20:00Z',
          updatedAt: '2024-01-10T14:20:00Z',
          wordCount: 680
        },
        {
          id: 4,
          title: '市政府常务会议纪要',
          type: '会议纪要',
          status: '已完成',
          content: '2024年1月8日上午，市长主持召开市政府第1次常务会议，研究讨论了以下事项...',
          createdAt: '2024-01-08T16:00:00Z',
          updatedAt: '2024-01-09T10:30:00Z',
          wordCount: 1950
        },
        {
          id: 5,
          title: '关于优化营商环境的实施意见',
          type: '意见',
          status: '已完成',
          content: '为深入贯彻落实国务院关于优化营商环境的决策部署，进一步激发市场主体活力...',
          createdAt: '2024-01-05T11:45:00Z',
          updatedAt: '2024-01-07T09:20:00Z',
          wordCount: 3200
        }
      ]
    }
  },
  computed: {
    filteredDocuments() {
      let filtered = this.documents
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(doc => 
          doc.title.toLowerCase().includes(query) ||
          doc.content.toLowerCase().includes(query) ||
          doc.type.toLowerCase().includes(query)
        )
      }
      
      if (this.selectedStatus) {
        const statusMap = {
          'completed': ['已完成', '已导出'],
          'draft': ['草稿']
        }
        filtered = filtered.filter(doc => 
          statusMap[this.selectedStatus]?.includes(doc.status)
        )
      }
      
      if (this.filterType) {
        filtered = filtered.filter(doc => doc.type === this.filterType)
      }
      
      if (this.filterStatus) {
        filtered = filtered.filter(doc => doc.status === this.filterStatus)
      }
      
      return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    },
    totalPages() {
      return Math.ceil(this.filteredDocuments.length / this.pageSize)
    },
    paginatedDocuments() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredDocuments.slice(start, end)
    },
    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('...', total)
        } else if (current >= total - 3) {
          pages.push(1, '...')
          for (let i = total - 4; i <= total; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1, '...')
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i)
          }
          pages.push('...', total)
        }
      }
      
      return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    },
    filterType() {
      this.currentPage = 1
    },
    filterStatus() {
      this.currentPage = 1
    }
  },
  mounted() {
    this.loadDocuments()
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    async loadDocuments() {
      this.loading = true
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        // 这里可以从API加载真实数据
      } catch (error) {
        console.error('加载文档失败:', error)
      } finally {
        this.loading = false
      }
    },
    refreshDocuments() {
      this.loadDocuments()
    },
    clearFilters() {
      this.searchQuery = ''
      this.selectedStatus = ''
      this.filterType = ''
      this.filterStatus = ''
      this.currentPage = 1
    },
    clearHistory() {
      if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
        this.documents = []
        alert('历史记录已清空')
      }
    },
    viewDocument(doc) {
      this.$router.push(`/document/result?id=${doc.id}`)
    },
    editDocument(doc) {
      this.$router.push(`/document/generation?edit=${doc.id}`)
    },
    exportDocument(doc) {
      // 模拟导出功能
      const element = document.createElement('a')
      const file = new Blob([doc.content], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${doc.title}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
      
      this.$message.success('文档导出成功')
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
          this.$message.success('文档删除成功')
        }
      })
    },
    getStatusClass(status) {
      switch (status) {
        case '已完成':
        case 'completed':
          return 'bg-green-100 text-green-800'
        case '草稿':
        case 'draft':
          return 'bg-yellow-100 text-yellow-800'
        case '已导出':
          return 'bg-blue-100 text-blue-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN', {
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
.loading-large {
  width: 2rem;
  height: 2rem;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>