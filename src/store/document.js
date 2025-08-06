import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('document', {
  state: () => ({
    // 当前步骤：1-基本信息，2-信息清单，3-生成结果
    currentStep: 1,
    
    // 基本信息
    basicInfo: {
      documentType: '',
      requirements: '',
      existingInfo: '',
      attachments: []
    },
    
    // 信息清单
    checklist: {
      header: {
        issuer: '',
        documentNumber: '',
        signer: '',
        urgency: ''
      },
      content: {
        title: '',
        recipient: '',
        copyTo: '',
        mainPoints: '',
        requirements: ''
      },
      footer: {
        date: '',
        printOffice: '',
        printDate: '',
        copies: 1
      },
      special: {
        hasAttachments: false,
        needsApproval: false,
        isConfidential: false,
        notes: ''
      }
    },
    
    // 生成结果
    result: {
      documentType: '',
      title: '',
      content: '',
      generatedAt: '',
      header: {},
      footer: {},
      recipient: '',
      copyTo: ''
    },
    
    // 加载状态
    isLoading: false,
    
    // 错误信息
    error: null
  }),
  
  actions: {
    // 更新基本信息
    updateBasicInfo(info) {
      this.basicInfo = { ...this.basicInfo, ...info }
    },
    
    // 更新信息清单
    updateChecklist(checklist) {
      this.checklist = { ...this.checklist, ...checklist }
    },
    
    // 更新生成结果
    updateResult(result) {
      this.result = { ...this.result, ...result }
    },
    
    // 设置当前步骤
    setCurrentStep(step) {
      this.currentStep = step
    },

    // 设置信息清单信息
    setChecklistInfo(info) {
      // 更新checklist的content部分
      this.checklist.content = {
        ...this.checklist.content,
        title: info.title || '',
        recipient: info.recipientUnit || '',
        copyTo: info.copyRecipients || '',
        mainPoints: info.mainBody || '',
        requirements: info.remarks || ''
      }
      
      // 更新checklist的header部分
      this.checklist.header = {
        ...this.checklist.header,
        issuer: info.issuingUnit || '',
        documentNumber: info.docNumber || ''
      }
      
      // 更新checklist的footer部分
      this.checklist.footer = {
        ...this.checklist.footer,
        date: info.date || ''
      }
      
      // 更新checklist的special部分
      this.checklist.special = {
        ...this.checklist.special,
        hasAttachments: !!info.attachments,
        notes: info.contactPerson || ''
      }
      
      // 设置当前步骤为信息清单确认完成
      this.currentStep = 2
    },
  
    // 生成信息清单
    async generateChecklist() {
      this.isLoading = true
      this.error = null
      
      try {
        // 模拟API调用讯飞星辰工作流
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 根据文档类型生成不同的模板
        const templates = {
          '通知': {
            title: `关于${this.extractKeyword(this.basicInfo.requirements)}的通知`,
            mainPoints: '一、通知事项\n二、执行要求\n三、时间安排\n四、责任分工',
            requirements: '各单位要高度重视，认真组织实施，确保各项措施落实到位。'
          },
          '通报': {
            title: `关于${this.extractKeyword(this.basicInfo.requirements)}的通报`,
            mainPoints: '一、基本情况\n二、主要问题\n三、处理结果\n四、经验教训',
            requirements: '各单位要引以为戒，举一反三，切实加强相关工作。'
          },
          '公告': {
            title: `关于${this.extractKeyword(this.basicInfo.requirements)}的公告`,
            mainPoints: '一、公告事项\n二、相关规定\n三、执行时间\n四、注意事项',
            requirements: '本公告自发布之日起施行，请社会各界知悉并遵照执行。'
          },
          '决定': {
            title: `关于${this.extractKeyword(this.basicInfo.requirements)}的决定`,
            mainPoints: '一、决定事项\n二、实施措施\n三、组织保障\n四、监督检查',
            requirements: '各有关单位要严格执行本决定，确保各项工作顺利推进。'
          },
          '报告': {
            title: `关于${this.extractKeyword(this.basicInfo.requirements)}的报告`,
            mainPoints: '一、工作概况\n二、主要成效\n三、存在问题\n四、下步打算',
            requirements: '请审阅，如无不妥，建议按此执行。'
          }
        }
        
        const template = templates[this.basicInfo.documentType] || templates['通知']
        
        // 模拟返回的信息清单数据
        const mockChecklist = {
          header: {
            issuer: this.generateIssuer(),
            documentNumber: this.generateDocumentNumber(),
            signer: '',
            urgency: this.determineUrgency()
          },
          content: {
            title: template.title,
            recipient: this.generateRecipient(),
            copyTo: '',
            mainPoints: template.mainPoints,
            requirements: template.requirements
          },
          footer: {
            date: new Date().toISOString().split('T')[0],
            printOffice: this.generatePrintOffice(),
            printDate: new Date().toISOString().split('T')[0],
            copies: 1
          },
          special: {
            hasAttachments: this.basicInfo.attachments.length > 0,
            needsApproval: ['决定', '通知', '公告'].includes(this.basicInfo.documentType),
            isConfidential: false,
            notes: ''
          }
        }
        
        this.updateChecklist(mockChecklist)
        this.setCurrentStep(2)
        
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, message: error.message }
      } finally {
        this.isLoading = false
      }
    },

    // 生成最终文档
    async generateDocument() {
      this.isLoading = true
      this.error = null
      
      try {
        // 模拟API调用讯飞星辰工作流生成公文
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // 生成公文正文内容
        const content = this.generateDocumentContent()
        
        // 模拟生成的公文内容
        const mockDocument = {
          documentType: this.basicInfo.documentType,
          title: this.checklist.content.title,
          content: content,
          generatedAt: new Date().toISOString(),
          header: this.checklist.header,
          footer: this.checklist.footer,
          recipient: this.checklist.content.recipient,
          copyTo: this.checklist.content.copyTo
        }
        
        this.updateResult(mockDocument)
        this.setCurrentStep(3)
        
        return { success: true }
      } catch (error) {
        this.error = error.message
        return { success: false, message: error.message }
      } finally {
        this.isLoading = false
      }
    },

    // 辅助方法：提取关键词
    extractKeyword(text) {
      if (!text) return '相关事项'
      // 简单的关键词提取逻辑
      const keywords = text.match(/[\u4e00-\u9fa5]{2,8}/g)
      return keywords ? keywords[0] : '相关事项'
    },
    
    // 辅助方法：生成发文机关
    generateIssuer() {
      const issuers = [
        '某某市人民政府',
        '某某县人民政府',
        '某某区人民政府',
        '某某市政府办公室',
        '某某局'
      ]
      return issuers[Math.floor(Math.random() * issuers.length)]
    },
    
    // 辅助方法：生成文件编号
    generateDocumentNumber() {
      const year = new Date().getFullYear()
      const num = Math.floor(Math.random() * 99) + 1
      return `政发〔${year}〕${num}号`
    },
    
    // 辅助方法：确定紧急程度
    determineUrgency() {
      const urgencyKeywords = ['紧急', '急', '立即', '马上', '尽快']
      const hasUrgency = urgencyKeywords.some(keyword => 
        this.basicInfo.requirements.includes(keyword)
      )
      return hasUrgency ? '急件' : ''
    },
    
    // 辅助方法：生成主送机关
    generateRecipient() {
      const recipients = [
        '各区县人民政府，市政府各部门',
        '各县（市、区）人民政府，市政府各部门',
        '市政府各部门，各直属机构',
        '各有关单位'
      ]
      return recipients[Math.floor(Math.random() * recipients.length)]
    },
    
    // 辅助方法：生成印发机关
    generatePrintOffice() {
      return this.checklist.header.issuer + '办公室'
    },
    
    // 辅助方法：生成公文正文内容
    generateDocumentContent() {
      const { documentType, requirements } = this.basicInfo
      const { mainPoints, requirements: execRequirements } = this.checklist.content
      
      let content = ''
      
      // 根据文档类型生成不同的开头
      const openings = {
        '通知': `为了${this.extractKeyword(requirements)}，现将有关事项通知如下：`,
        '通报': `现将${this.extractKeyword(requirements)}有关情况通报如下：`,
        '公告': `根据相关规定，现就${this.extractKeyword(requirements)}公告如下：`,
        '决定': `经研究决定，现就${this.extractKeyword(requirements)}作出如下决定：`,
        '报告': `现将${this.extractKeyword(requirements)}情况报告如下：`,
        '请示': `现就${this.extractKeyword(requirements)}请示如下：`,
        '批复': `你单位关于${this.extractKeyword(requirements)}的请示收悉，经研究，批复如下：`,
        '意见': `为了${this.extractKeyword(requirements)}，提出如下意见：`,
        '函': `关于${this.extractKeyword(requirements)}，函复如下：`
      }
      
      content += openings[documentType] || openings['通知']
      content += '\n\n'
      
      // 添加主要内容
      if (mainPoints) {
        content += mainPoints.replace(/\n/g, '\n\n')
        content += '\n\n'
      }
      
      // 添加执行要求
      if (execRequirements) {
        content += execRequirements
        content += '\n\n'
      }
      
      // 根据文档类型添加结尾
      const endings = {
        '通知': '请各单位认真贯彻执行。',
        '通报': '请各单位引以为戒，举一反三。',
        '公告': '特此公告。',
        '决定': '本决定自发布之日起施行。',
        '报告': '以上报告，请审阅。',
        '请示': '以上请示，请批示。',
        '批复': '此复。',
        '意见': '请结合实际，认真贯彻落实。',
        '函': '请予支持配合。'
      }
      
      content += endings[documentType] || endings['通知']
      
      return content
    },

    // 重置状态
    reset() {
      this.currentStep = 1
      this.basicInfo = {
        documentType: '',
        requirements: '',
        existingInfo: '',
        attachments: []
      }
      this.checklist = {
        header: {
          issuer: '',
          documentNumber: '',
          signer: '',
          urgency: ''
        },
        content: {
          title: '',
          recipient: '',
          copyTo: '',
          mainPoints: '',
          requirements: ''
        },
        footer: {
          date: '',
          printOffice: '',
          printDate: '',
          copies: 1
        },
        special: {
          hasAttachments: false,
          needsApproval: false,
          isConfidential: false,
          notes: ''
        }
      }
      this.result = {
        documentType: '',
        title: '',
        content: '',
        generatedAt: '',
        header: {},
        footer: {},
        recipient: '',
        copyTo: ''
      }
      this.isLoading = false
      this.error = null
    }
  }
})