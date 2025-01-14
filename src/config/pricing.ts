import type { PricingTier } from '@/types'

export const pricingTiers: PricingTier[] = [
  {
    name: 'Amethyst',
    price: 0,
    period: 'month',
    description: '适合个人用户的免费计划',
    color: 'bg-gradient-to-r from-purple-400 to-purple-600',
    features: [
      '每日 10 次 AI 图像生成',
      '基础文本生成功能',
      '社区支持',
      '基础 API 访问'
    ]
  },
  {
    name: 'Sapphire',
    price: 19.99,
    period: 'month',
    description: '适合专业创作者的进阶计划',
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
    features: [
      '每日 100 次 AI 图像生成',
      '高级文本生成功能',
      '优先客服支持',
      '完整 API 访问',
      '自定义模型训练'
    ],
    discount: 30,
    popular: true
  },
  {
    name: 'Emerald',
    price: 29.99,
    period: 'month',
    description: '适合小型团队的商业计划',
    color: 'bg-gradient-to-r from-green-400 to-green-600',
    features: [
      '每日 500 次 AI 图像生成',
      '团队协作功能',
      '24/7 专属支持',
      '高级 API 访问',
      '自定义模型训练',
      '优先处理队列'
    ]
  },
  {
    name: 'Ruby',
    price: 99.99,
    period: 'month',
    description: '适合企业的定制计划',
    color: 'bg-gradient-to-r from-red-400 to-red-600',
    features: [
      '无限 AI 图像生成',
      '企业级功能',
      '专属客户经理',
      '企业 API 集成',
      '自定义模型开发',
      '服务级别协议(SLA)',
      '白标解决方案'
    ]
  }
]
