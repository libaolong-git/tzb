import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import DocumentGeneration from '../views/DocumentGeneration.vue'
import DocumentChecklist from '../views/DocumentChecklist.vue'
import DocumentResult from '../views/DocumentResult.vue'
import Settings from '../views/Settings.vue'
import History from '../views/History.vue'
import KnowledgeBase from '../views/KnowledgeBase.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/document/generation',
    name: 'DocumentGeneration',
    component: DocumentGeneration,
    meta: { requiresAuth: true }
  },
  {
    path: '/document/checklist',
    name: 'DocumentChecklist',
    component: DocumentChecklist,
    meta: { requiresAuth: true }
  },
  {
    path: '/document/result',
    name: 'DocumentResult',
    component: DocumentResult,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true }
  },
  {
    path: '/knowledge-base',
    name: 'KnowledgeBase',
    component: KnowledgeBase,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 初始化认证状态
  if (!authStore.user && authStore.token) {
    authStore.initializeAuth()
  }
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // 检查是否需要游客状态（已登录用户不能访问登录/注册页）
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  next()
})

export default router