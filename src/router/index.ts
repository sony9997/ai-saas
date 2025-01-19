import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/config/supabase'
import Home from '../views/Home.vue'
import Tools from '../views/Tools.vue'
import Pricing from '../views/Pricing.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Docs from '../views/Docs.vue'
import News from '../views/News.vue'
import About from '../views/About.vue'
import Chat from '@/views/tools/Chat.vue'
import Text2Image from '@/views/tools/Text2Image.vue'
import Image2Image from '@/views/tools/Image2Image.vue'
import Sing from '@/views/tools/Sing.vue'
import FaceSwap from '@/views/tools/FaceSwap.vue'
import UnifiedImage from '@/views/tools/UnifiedImage.vue'
import Donate from '../views/Donate.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools,
      children: [
        {
          path: 'chat',
          name: 'chat',
          component: Chat,
          meta: { requiresAuth: true }
        },
        {
          path: 'text2image',
          name: 'text2image',
          component: Text2Image,
          meta: { requiresAuth: true }
        },
        {
          path: 'image2image',
          name: 'image2image',
          component: Image2Image,
          meta: { requiresAuth: true }
        },
        {
          path: 'sing',
          name: 'sing',
          component: Sing,
          meta: { requiresAuth: true }
        },
        {
          path: 'faceswap',
          name: 'faceswap',
          component: FaceSwap,
          meta: { requiresAuth: true }
        },
        {
          path: 'unified-image',
          name: 'unified-image',
          component: UnifiedImage,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: Pricing
    },
    {
      path: '/docs',
      name: 'docs',
      component: Docs
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: { requiresGuest: true }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: { requiresGuest: true }
    },
    {
      path: '/donate',
      name: 'donate',
      component: Donate
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, _from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  // 如果是重置密码页面，且 URL 中包含 type=recovery，允许访问
  if (to.path === '/reset-password' && window.location.href.includes('type=recovery')) {
    next()
    return
  }

  if (requiresAuth && !session) {
    next('/login')
  } else if (requiresGuest && session && to.path !== '/reset-password') {
    next('/')
  } else {
    next()
  }
})

export default router
