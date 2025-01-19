export default {
  nav: {
    home: '首页',
    chat: 'AI 聊天',
    imageGen: '文生图',
    imageToImage: '图生图',
    faceSwap: '人脸替换',
    aiSing: 'AI 唱歌',
    imageProcess: '图像处理',
    tools: '工具',
    donate: '赞助',
    about: '关于'
  },
  common: {
    switchLang: '切换为英文',
    login: '登录',
    signup: '注册',
    logout: '退出登录',
    github: 'GitHub',
    loading: '加载中...',
    submit: '提交',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    success: '成功',
    error: '错误',
    confirm: '确认'
  },
  home: {
    title: 'AI SaaS 平台',
    subtitle: '您的一站式 AI 解决方案',
    getStarted: '立即开始',
    features: '功能特点',
    pricing: '价格方案',
    description: '体验我们全方位的 AI 工具套件',
    tryNow: '立即体验',
    learnMore: '了解更多'
  },
  chat: {
    placeholder: '在此输入您的消息...',
    send: '发送',
    clear: '清空对话',
    thinking: 'AI 思考中...',
    welcome: '欢迎使用 AI 聊天！我能为您做些什么？',
    title: '智能对话',
    description: '基于大语言模型的个性化对话助手，支持上下文理解、知识问答、情感交互等功能。',
    settings: '对话设置',
    model: '模型选择',
    temperature: '创造性',
    history: '历史记录',
    clearConfirm: '确认清空对话？'
  },
  imageGen: {
    prompt: '描述您想创建的图像',
    generate: '生成图像',
    style: '风格',
    size: '尺寸',
    downloading: '下载中...',
    tryAgain: '重试',
    title: '文本生成图像',
    description: '将您的文字描述转换为精美的图像',
    advanced: '高级选项',
    negativePrompt: '反向提示词',
    steps: '生成步数',
    seed: '随机种子',
    guidance: '引导系数',
    previewArea: '生成图片预览区域',
    generatedImage: '生成的图片'
  },
  imageToImage: {
    title: '图像生成图像',
    description: '基于输入图像生成新的图像',
    sourceImage: '源图片',
    generatedImage: '生成的图片',
    dragDrop: '点击或拖放图片到此处',
    previewArea: '生成图片预览区域',
    style: '风格选择',
    strength: '效果强度',
    prompt: '正向提示词',
    negativePrompt: '反向提示词',
    convert: '生成图片',
    uploadImage: '上传图片',
    uploadFromLocal: '从本地选择',
    promptPlaceholder: '请输入正向提示词...',
    negativePromptPlaceholder: '请输入反向提示词...'
  },
  styles: {
    anime: '动漫风格',
    realistic: '写实风格',
    oil: '油画风格',
    sketch: '素描风格',
    watercolor: '水彩风格'
  },
  faceSwap: {
    sourceImage: '源图片',
    targetImage: '目标图片',
    swap: '替换面部',
    uploadBoth: '请上传两张图片',
    title: 'AI 换脸',
    description: '上传两张照片，AI 将帮您完成换脸操作。',
    dragDrop: '点击或拖放图片到此处',
    fileSupport: '支持 JPG、PNG 格式',
    startGenerate: '开始生成',
    preserveExpression: '保持表情',
    enhanceFace: '面部增强',
    blendStrength: '混合强度'
  },
  unifiedImage: {
    title: '统一图像处理',
    description: '本模块是基于OmniGen模型开发的，OmniGen是一个统一的图像生成模型，可用于执行各种任务，包括但不限于文本到图像生成、主题驱动生成、身份保留生成和图像条件生成。',
    modelDescription1: '对于多模式图像生成，您应该将字符串作为提示传递，将图像路径列表作为input_images传递。提示中的占位符应采用',
    modelDescription2: '的格式（对于第一幅图像，占位符为',
    modelDescription3: '。对于第二幅图像，占位为',
    modelDescription4: '。另外，提示词请使用英文。',
    example: '例如，使用一个女人的图像来生成一个新的图像：',
    examplePrompt: '提示',
    dragDrop: '点击或拖放图片到此处',
    prompt: '提示词',
    promptPlaceholder: '请在此输入提示词...',
    generating: '正在生成图片...',
    startGenerate: '开始生成',
    outputPreview: '输出图片预览区域',
    height: '高度',
    width: '宽度',
    guidanceScale: '引导比例',
    imgGuidanceScale: '图像引导比例',
    inferenceSteps: '推理步数',
    seed: '随机种子',
    randomizeSeed: '随机化种子',
    maxInputImageSize: '最大输入图片尺寸',
    separateCfgInfer: '使用单独的推理过程',
    separateCfgInferDescription: '对不同的引导使用单独的推理过程，这将减少内存消耗',
    useInputSizeAsOutput: '使用输入图片尺寸作为输出尺寸',
    useInputSizeAsOutputDescription: '自动调整输出图片尺寸以匹配输入图片，有助于提升性能',
    uploadDialogTitle: '上传图片',
    uploadFromLocal: '从本地选择图片',
    uploadFromUrl: '输入图片URL',
    cancel: '取消',
    confirm: '确认'
  },
  imageProcess: {
    upload: '上传图片',
    process: '处理',
    effect: '选择效果',
    download: '下载结果',
    title: '统一图像处理',
    description: '一站式图像处理解决方案',
    effects: {
      enhance: '图像增强',
      style: '风格转换',
      restore: '图像修复',
      background: '背景移除',
      upscale: '超分辨率'
    }
  },
  aiSing: {
    inputText: '输入歌词或文本',
    voice: '选择声音',
    generate: '生成歌曲',
    play: '播放',
    pause: '暂停',
    download: '下载'
  },
  tools: {
    title: 'AI 工具集',
    subtitle: '探索我们强大的 AI 工具',
    description: '我们提供一系列强大的 AI 工具，帮助您实现创意和提高效率。',
    startUse: '开始使用',
    popular: '热门工具',
    all: '所有工具',
    searchPlaceholder: '搜索工具...'
  },
  donate: {
    title: '支持我们',
    subtitle: '帮助我们持续改进',
    description: '您的支持是我们前进的动力',
    methods: {
      wechat: '微信支付',
      alipay: '支付宝',
      paypal: 'PayPal'
    },
    tiers: {
      basic: '基础支持',
      pro: '专业支持',
      enterprise: '企业支持'
    },
    thanks: '感谢您的支持！',
    customAmount: '自定义金额'
  },
  about: {
    title: '关于我',
    introduction: '你好！我是一名热爱技术的独立开发者。我喜欢探索新技术，开发有趣的项目，并与志同道合的朋友分享交流。这个网站就是我的一个尝试，希望能为大家带来一些有用且有趣的东西。',
    whatImDoing: {
      title: '我在做什么',
      content: '我致力于开发简单易用的工具和应用，让AI技术能更好地服务于日常生活和工作。同时也在这里分享我的学习心得和技术积累，希望能与大家一起进步。'
    },
    expectation: {
      title: '我的期待',
      content: '希望通过这个平台，能认识更多对技术有热情的朋友。无论你是开发者还是普通用户，都欢迎和我交流，分享你的想法和建议。让我们一起探索技术的无限可能！'
    },
    philosophy: {
      title: '我的理念',
      items: [
        '保持好奇心，不断学习',
        '简单实用优于花哨复杂',
        '乐于分享，共同成长',
        '用技术服务生活'
      ]
    },
    contact: {
      title: '联系我',
      content: '如果你有任何问题、建议或者合作想法，欢迎通过以下方式联系我：',
      email: 'Email:',
      website: '官网:'
    }
  },
  auth: {
    loginTitle: '欢迎回来',
    registerTitle: '创建账号',
    emailLabel: '邮箱',
    passwordLabel: '密码',
    confirmPassword: '确认密码',
    forgotPassword: '忘记密码？',
    noAccount: '还没有账号？',
    hasAccount: '已有账号？',
    registerNow: '立即注册',
    loginNow: '立即登录',
    registerSubtitle: '创建一个新的账号',
    loginSubtitle: '登录到您的账号'
  },
  errors: {
    required: '此字段为必填项',
    invalidEmail: '无效的邮箱地址',
    passwordMismatch: '两次输入的密码不匹配',
    loginFailed: '登录失败，请检查您的凭据。',
    registerFailed: '注册失败，请重试。',
    networkError: '网络错误，请重试。',
    unauthorized: '请登录后使用此功能',
    noImage: '请先上传图片',
    fileTooLarge: '文件大小不能超过10MB'
  },
  contentCreation:{
    title: '内容创作',
    description: '智能文本生成与处理，支持文章写作、内容润色、多语言翻译等创作需求。'
  },
  aiPainting: {
    title: 'AI 绘画',
    description: '基于大语言模型的图像生成工具，支持文本描述、图像编辑、风格迁移等功能。'
  },
  openApi: {
    title: '开放 API',
    description: '提供标准化的API接口，轻松将AI能力集成到您的应用中。更多API服务请访问琦木科技。' 
  }
}
