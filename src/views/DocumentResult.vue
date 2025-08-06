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
              <h1 class="text-xl font-semibold text-primary">公文生成结果</h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <UserAvatar />
          </div>
        </div>
      </div>
    </nav>

    <!-- 进度指示器 -->
    <div class="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-center">
          <div class="flex items-center space-x-8">
            <!-- 步骤1 -->
            <div class="flex items-center animate-slideInFromLeft">
              <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-success to-info text-white rounded-full text-sm font-medium shadow-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span class="ml-3 text-sm font-semibold text-primary">基本信息</span>
            </div>
            <div class="w-16 h-1 bg-gradient-to-r from-success to-info rounded-full"></div>
            <!-- 步骤2 -->
            <div class="flex items-center animate-slideInFromBottom">
              <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-success to-info text-white rounded-full text-sm font-medium shadow-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span class="ml-3 text-sm font-semibold text-primary">信息清单</span>
            </div>
            <div class="w-16 h-1 bg-gradient-to-r from-success to-info rounded-full"></div>
            <!-- 步骤3 -->
            <div class="flex items-center animate-slideInFromRight">
              <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-success to-info text-white rounded-full text-sm font-medium shadow-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span class="ml-3 text-sm font-semibold text-primary">生成完成</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-8 animate-fadeIn">
        <div class="gov-card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-6">
                <div>
                  <h1 class="text-2xl font-bold text-gradient">{{ documentInfo.title }}</h1>
                  <div class="flex items-center space-x-4 mt-2 text-sm text-secondary">
                    <span>{{ documentInfo.documentType }}</span>
                    <span>•</span>
                    <span>{{ formatDate(documentInfo.generatedAt) }}</span>
                    <span>•</span>
                    <span>{{ documentInfo.content?.length || 0 }} 字</span>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      已生成
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button
                  @click="toggleEditMode"
                  :class="[
                    'gov-button-secondary flex items-center space-x-2',
                    isEditing ? 'bg-warning/10 text-warning border-warning/30' : ''
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  <span>{{ isEditing ? '保存编辑' : '编辑文档' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="gov-card">
          <div class="card-body text-center py-12">
            <div class="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <p class="text-secondary text-lg">正在生成公文...</p>
          </div>
        </div>
      </div>

      <!-- 公文内容 -->
      <div v-else class="animate-slideInFromBottom">
        <!-- 公文预览/编辑区域 -->
        <div class="relative">
          <div class="gov-card" style="min-height: 800px;">
            <!-- 下载操作区域 -->
            <div class="absolute top-4 right-4 z-10">
              <div class="flex flex-col space-y-2 download-buttons">
                <!-- 下载按钮组 -->
                <div class="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/30">
                  <div class="text-xs text-gray-600 mb-2 text-center font-medium">📥 下载文档</div>
                  <div class="flex flex-col space-y-1">
                    <button
                      @click="downloadDocument('pdf')"
                      class="download-btn flex items-center justify-center space-x-1 px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-all duration-200 border border-red-200 font-medium"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <span>📄 PDF</span>
                    </button>
                    <button
                      @click="downloadDocument('word')"
                      class="download-btn flex items-center justify-center space-x-1 px-3 py-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-all duration-200 border border-blue-200 font-medium"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <span>📝 Word</span>
                    </button>
                    <button
                      @click="downloadDocument('txt')"
                      class="download-btn flex items-center justify-center space-x-1 px-3 py-1.5 text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md transition-all duration-200 border border-gray-200 font-medium"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <span>📄 TXT</span>
                    </button>
                  </div>
                </div>
                <!-- 打印按钮 -->
                <button
                  @click="printDocument"
                  class="download-btn flex items-center justify-center space-x-1 px-3 py-2 text-xs bg-white/95 hover:bg-white text-gray-700 rounded-lg transition-all duration-200 border border-white/30 shadow-xl backdrop-blur-sm font-medium"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  <span>🖨️ 打印</span>
                </button>
              </div>
            </div>
            
            <div class="card-body p-12">
              <!-- 公文头部 -->
              <div class="text-center mb-8 border-b border-white/20 pb-6">
                <div class="text-error font-bold text-lg mb-2">{{ documentInfo.header?.issuer || '发文机关' }}</div>
                <div class="text-secondary text-sm mb-4">文件</div>
                <div class="flex justify-between items-center text-sm text-secondary">
                  <div>{{ documentInfo.header?.documentNumber || '文件编号' }}</div>
                  <div>签发人：{{ documentInfo.header?.signer || '签发人' }}</div>
                </div>
                <div v-if="documentInfo.header?.urgency" class="text-error font-bold mt-2">
                  {{ documentInfo.header.urgency }}
                </div>
              </div>

              <!-- 公文标题 -->
              <div class="text-center mb-8">
                <h1 v-if="!isEditing" class="text-2xl font-bold text-primary leading-relaxed">
                  {{ documentInfo.title }}
                </h1>
                <input
                  v-else
                  v-model="editableContent.title"
                  class="gov-input text-2xl font-bold text-center w-full bg-warning/5 border-warning/30"
                >
              </div>

              <!-- 主送机关 -->
              <div class="mb-6">
                <span v-if="!isEditing" class="text-primary">
                  {{ documentInfo.recipient }}：
                </span>
                <input
                  v-else
                  v-model="editableContent.recipient"
                  class="gov-input w-full bg-warning/5 border-warning/30"
                >
              </div>

              <!-- 公文正文 -->
              <div class="mb-8 leading-relaxed">
                <div v-if="!isEditing" class="text-primary whitespace-pre-line text-justify" style="line-height: 2; text-indent: 2em;">
                  {{ documentInfo.content }}
                </div>
                <textarea
                  v-else
                  v-model="editableContent.content"
                  class="gov-textarea w-full h-96 bg-warning/5 border-warning/30 leading-relaxed resize-none"
                  style="line-height: 2;"
                ></textarea>
              </div>

              <!-- 公文尾部 -->
              <div class="space-y-4">
                <!-- 抄送 -->
                <div v-if="documentInfo.copyTo">
                  <span class="text-primary">抄送：</span>
                  <span v-if="!isEditing" class="text-primary">{{ documentInfo.copyTo }}</span>
                  <input
                    v-else
                    v-model="editableContent.copyTo"
                    class="gov-input flex-1 ml-2 bg-warning/5 border-warning/30"
                  >
                </div>
                
                <!-- 日期和印章区域 -->
                <div class="flex justify-end mt-12">
                  <div class="text-center">
                    <div class="text-primary mb-4">
                      {{ documentInfo.footer?.issuer || documentInfo.header?.issuer }}
                    </div>
                    <div class="text-primary">
                      {{ formatDate(documentInfo.footer?.date || documentInfo.generatedAt) }}
                    </div>
                  </div>
                </div>

                <!-- 印发信息 -->
                <div class="border-t border-white/20 pt-4 mt-8 text-sm text-secondary">
                  <div class="flex justify-between">
                    <div>
                      {{ documentInfo.footer?.printOffice || '印发机关' }}印发
                    </div>
                    <div>
                      {{ formatDate(documentInfo.footer?.printDate || documentInfo.generatedAt) }}印发
                    </div>
                  </div>
                  <div class="text-center mt-2">
                    共印{{ documentInfo.footer?.copies || 1 }}份
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作区域 -->
      <div class="mt-8 flex justify-center space-x-4 animate-slideInFromBottom">
        <button
          @click="createNew"
          class="gov-button-secondary flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span>创建新文档</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  name: 'DocumentResult',
  components: {
    UserAvatar
  },
  data() {
    return {
      isLoading: false,
      isEditing: false,
      documentInfo: {
        title: '关于加强疫情防控工作的通知',
        documentType: '通知',
        recipient: '各区县政府、市直各部门',
        content: `根据当前疫情防控形势和上级部门要求，为进一步加强疫情防控工作，现就有关事项通知如下：

一、提高思想认识
各单位要充分认识当前疫情防控工作的重要性和紧迫性，坚决克服麻痹思想和侥幸心理，始终绷紧疫情防控这根弦。

二、强化防控措施
1. 严格落实各项防控措施，做好人员健康监测；
2. 加强重点场所管理，确保防控措施到位；
3. 做好应急物资储备，提升应急处置能力。

三、工作要求
各单位要高度重视，明确责任分工，确保各项措施落实到位。对工作不力、措施不到位的，将严肃追究责任。`,
        copyTo: '市委办公厅、市人大办公厅',
        generatedAt: new Date().toISOString(),
        header: {
          issuer: '市政府办公厅',
          documentNumber: 'ZF-2024-001',
          signer: '市长',
          urgency: '特急'
        },
        footer: {
          issuer: '市政府办公厅',
          date: new Date().toISOString(),
          printOffice: '市政府办公厅',
          printDate: new Date().toISOString(),
          copies: 50
        }
      },
      editableContent: {}
    }
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard')
    },
    goToDashboard() {
      this.$router.push('/dashboard')
    },
    createNew() {
      this.$router.push('/dashboard')
    },
    toggleEditMode() {
      if (this.isEditing) {
        // 保存编辑
        this.saveChanges()
      } else {
        // 进入编辑模式
        this.isEditing = true
        this.editableContent = {
          title: this.documentInfo.title,
          recipient: this.documentInfo.recipient,
          content: this.documentInfo.content,
          copyTo: this.documentInfo.copyTo
        }
      }
    },
    saveChanges() {
      this.documentInfo = {
        ...this.documentInfo,
        ...this.editableContent
      }
      this.isEditing = false
      this.$message.success('修改已保存')
    },
    printDocument() {
      window.print()
      this.$message.success('正在打印文档...')
    },
    downloadDocument(format) {
      // 根据格式类型进行不同的下载处理
      const formatMap = {
        'pdf': { name: 'PDF', color: 'red', icon: '📄' },
        'word': { name: 'Word', color: 'blue', icon: '📝' },
        'txt': { name: 'TXT', color: 'gray', icon: '📄' }
      }
      
      const formatInfo = formatMap[format] || formatMap['pdf']
      
      // 模拟下载过程
      this.$message.info(`正在生成${formatInfo.name}格式文档...`)
      
      setTimeout(() => {
        // 创建下载链接
        const content = this.generateDownloadContent(format)
        const blob = new Blob([content], { 
          type: this.getContentType(format) 
        })
        
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${this.documentInfo.title}.${format === 'word' ? 'docx' : format}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        this.$message.success(`${formatInfo.icon} ${formatInfo.name}格式文档下载成功！`)
      }, 1000)
    },
    
    generateDownloadContent(format) {
      const { title, documentType, recipient, content, copyTo, header, footer } = this.documentInfo
      
      if (format === 'txt') {
        // 纯文本格式
        return `${header?.issuer || '发文机关'}
文件

${header?.documentNumber || '文件编号'}\t\t签发人：${header?.signer || '签发人'}
${header?.urgency ? header.urgency + '\n' : ''}\n${title}

${recipient}：

${content}

${copyTo ? '抄送：' + copyTo + '\n\n' : ''}${footer?.issuer || header?.issuer}
${this.formatDate(footer?.date || this.documentInfo.generatedAt)}

${footer?.printOffice || '印发机关'}印发\t\t${this.formatDate(footer?.printDate || this.documentInfo.generatedAt)}印发
共印${footer?.copies || 1}份`
      } else if (format === 'word') {
        // Word格式 (简化的HTML格式)
        return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
body { font-family: 'SimSun', serif; line-height: 2; margin: 40px; }
.header { text-align: center; border-bottom: 1px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
.title { text-align: center; font-size: 22px; font-weight: bold; margin: 30px 0; }
.content { text-indent: 2em; text-align: justify; }
.footer { margin-top: 40px; }
</style>
</head>
<body>
<div class="header">
<div style="font-weight: bold; font-size: 18px;">${header?.issuer || '发文机关'}</div>
<div>文件</div>
<div style="display: flex; justify-content: space-between; margin-top: 10px;">
<span>${header?.documentNumber || '文件编号'}</span>
<span>签发人：${header?.signer || '签发人'}</span>
</div>
${header?.urgency ? '<div style="color: red; font-weight: bold; margin-top: 10px;">' + header.urgency + '</div>' : ''}
</div>
<div class="title">${title}</div>
<div><strong>${recipient}：</strong></div>
<div class="content">${content.replace(/\n/g, '<br>')}</div>
${copyTo ? '<div style="margin-top: 20px;"><strong>抄送：</strong>' + copyTo + '</div>' : ''}
<div class="footer">
<div style="text-align: right; margin-top: 40px;">
<div>${footer?.issuer || header?.issuer}</div>
<div>${this.formatDate(footer?.date || this.documentInfo.generatedAt)}</div>
</div>
<div style="border-top: 1px solid #000; padding-top: 10px; margin-top: 30px; font-size: 12px;">
<div style="display: flex; justify-content: space-between;">
<span>${footer?.printOffice || '印发机关'}印发</span>
<span>${this.formatDate(footer?.printDate || this.documentInfo.generatedAt)}印发</span>
</div>
<div style="text-align: center; margin-top: 5px;">共印${footer?.copies || 1}份</div>
</div>
</div>
</body>
</html>`
      } else {
        // PDF格式 (使用HTML格式，实际项目中可以使用PDF库)
        return this.generateDownloadContent('word')
      }
    },
    
    getContentType(format) {
      const types = {
        'pdf': 'application/pdf',
        'word': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'txt': 'text/plain;charset=utf-8'
      }
      return types[format] || 'text/plain'
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
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

.gov-textarea:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
}

/* 下载按钮悬浮效果 */
.download-buttons {
  transition: all 0.3s ease;
}

.download-buttons:hover {
  transform: translateY(-2px);
}

/* 按钮动画效果 */
.download-btn {
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.download-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.download-btn:active {
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .absolute.top-4.right-4 {
    position: fixed;
    top: 80px;
    right: 16px;
    z-index: 50;
  }
}

/* 打印样式 */
@media print {
  .gov-header,
  .card-header,
  .card-footer,
  button,
  .absolute.top-4.right-4 {
    display: none !important;
  }
  
  .gov-card {
    box-shadow: none !important;
    border: none !important;
  }
  
  .card-body {
    padding: 0 !important;
  }
}
</style>