export default {
  nav: {
    home: 'Home',
    chat: 'AI Chat',
    imageGen: 'Text to Image',
    imageToImage: 'Image to Image',
    faceSwap: 'Face Swap',
    aiSing: 'AI Singing',
    imageProcess: 'Image Processing',
    tools: 'Tools',
    donate: 'Donate',
    about: 'About'
  },
  common: {
    switchLang: 'Switch to Chinese',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    github: 'GitHub',
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    success: 'Success',
    error: 'Error',
    confirm: 'Confirm',
    back: 'Back'
  },
  home: {
    title: 'AI SaaS Platform',
    subtitle: 'Your One-Stop AI Solution',
    getStarted: 'Get Started',
    features: 'Features',
    pricing: 'Pricing',
    description: 'Experience our comprehensive AI toolkit',
    tryNow: 'Try Now',
    learnMore: 'Learn More'
  },
  tools: {
    title: 'AI Tools',
    subtitle: 'Explore Our Powerful AI Tools',
    description: 'We offer a suite of powerful AI tools to help you unleash creativity and boost productivity.',
    startUse: 'Start Using',
    popular: 'Popular Tools',
    all: 'All Tools',
    searchPlaceholder: 'Search tools...'
  },
  chat: {
    placeholder: 'Type your message here...',
    send: 'Send',
    clear: 'Clear Chat',
    thinking: 'AI is thinking...',
    welcome: 'Welcome to AI Chat! How can I help you today?',
    title: 'AI Chat',
    description: 'A personalized chat assistant based on large language models, supporting context understanding, knowledge Q&A, and emotional interaction.',
    settings: 'Chat Settings',
    model: 'Model Selection',
    temperature: 'Creativity',
    history: 'History',
    clearConfirm: 'Confirm clear chat?'
  },
  imageGen: {
    prompt: 'Describe the image you want to create',
    generate: 'Generate Image',
    style: 'Style',
    size: 'Size',
    downloading: 'Downloading...',
    tryAgain: 'Try Again',
    title: 'Text to Image',
    description: 'Transform your text descriptions into beautiful images',
    advanced: 'Advanced Options',
    negativePrompt: 'Negative Prompt',
    steps: 'Generation Steps',
    seed: 'Random Seed',
    guidance: 'Guidance Scale',
    previewArea: 'Generated image preview area',
    generatedImage: 'Generated image'
  },
  imageToImage: {
    title: 'Image to Image',
    description: 'Generate new images based on input images',
    sourceImage: 'Source Image',
    generatedImage: 'Generated Image',
    dragDrop: 'Click or drag an image here',
    previewArea: 'Generated image preview area',
    style: 'Style',
    strength: 'Effect Strength',
    prompt: 'Prompt',
    negativePrompt: 'Negative Prompt',
    convert: 'Generate Image',
    uploadImage: 'Upload Image',
    uploadFromLocal: 'Choose from local',
    promptPlaceholder: 'Enter positive prompt...',
    negativePromptPlaceholder: 'Enter negative prompt...'
  },
  styles: {
    anime: 'Anime',
    realistic: 'Realistic',
    oil: 'Oil Painting',
    sketch: 'Sketch',
    watercolor: 'Watercolor'
  },
  faceSwap: {
    sourceImage: 'Source Image',
    targetImage: 'Target Image',
    swap: 'Swap Faces',
    uploadBoth: 'Please upload both images',
    title: 'AI Face Swap',
    description: 'Upload two photos and AI will help you swap faces.',
    dragDrop: 'Click or drag an image here',
    fileSupport: 'Supports JPG, PNG formats',
    startGenerate: 'Start Generate',
    preserveExpression: 'Preserve Expression',
    enhanceFace: 'Face Enhancement',
    blendStrength: 'Blend Strength'
  },
  imageProcess: {
    upload: 'Upload Image',
    process: 'Process',
    effect: 'Select Effect',
    download: 'Download Result',
    title: 'Unified Image Processing',
    description: 'One-stop image processing solution',
    effects: {
      enhance: 'Image Enhancement',
      style: 'Style Transfer',
      restore: 'Image Restoration',
      background: 'Background Removal',
      upscale: 'Super Resolution'
    }
  },
  unifiedImage: {
    title: 'Unified Image Processing',
    description: 'Based on the OmniGen model, this module is a unified image generation model that can be used for various tasks, including but not limited to text-to-image generation, theme-driven generation, identity-preserving generation, and image-conditioned generation.',
    modelDescription1: 'For multi-modal image generation, you should pass strings as prompts and a list of image paths as input_images. Placeholders in the prompt should be in the format ',
    modelDescription2: ' (for the first image use ',
    modelDescription3: ', for the second image use ',
    modelDescription4: '). Additionally, please use English for prompts.',
    example: 'For example, using a woman\'s image to generate a new image:',
    examplePrompt: 'Prompt',
    dragDrop: 'Click or drag an image here',
    prompt: 'Prompt',
    promptPlaceholder: 'Enter your prompt here...',
    generating: 'Generating image...',
    startGenerate: 'Start Generation',
    outputPreview: 'Output Image Preview Area',
    height: 'Height',
    width: 'Width',
    guidanceScale: 'Guidance Scale',
    imgGuidanceScale: 'Image Guidance Scale',
    inferenceSteps: 'Inference Steps',
    seed: 'Seed',
    randomizeSeed: 'Randomize Seed',
    maxInputImageSize: 'Max Input Image Size',
    separateCfgInfer: 'Use Separate Inference Process',
    separateCfgInferDescription: 'Use separate inference process for different guidance, which will reduce memory consumption',
    useInputSizeAsOutput: 'Use Input Size as Output',
    useInputSizeAsOutputDescription: 'Automatically adjust output image size to match input image, helps improve performance',
    uploadDialogTitle: 'Upload Image',
    uploadFromLocal: 'Choose from Local',
    uploadFromUrl: 'Enter Image URL',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  donate: {
    title: 'Support Us',
    description: 'We are committed to providing quality AI services. If you find our tools helpful, we welcome your support! Every contribution will help us do better.',
    wechatPay: 'WeChat Pay',
    alipay: 'Alipay',
    kofi: 'Ko-fi',
    qrCode: 'Payment QR Code'
  },
  about: {
    title: 'About Me',
    introduction: 'Hello! I am an independent developer passionate about technology. I love exploring new technologies, developing interesting projects, and sharing with like-minded friends. This website is one of my attempts to bring something useful and interesting to everyone.',
    whatImDoing: {
      title: 'What I\'m Doing',
      content: 'I am dedicated to developing simple and easy-to-use tools and applications, making AI technology better serve daily life and work. I also share my learning experiences and technical knowledge here, hoping to progress together with everyone.'
    },
    expectation: {
      title: 'My Expectations',
      content: 'I hope to meet more friends who are passionate about technology through this platform. Whether you\'re a developer or a regular user, you\'re welcome to communicate with me and share your thoughts and suggestions. Let\'s explore the endless possibilities of technology together!'
    },
    philosophy: {
      title: 'My Philosophy',
      items: [
        'Stay curious, keep learning',
        'Simple and practical over fancy and complex',
        'Share willingly, grow together',
        'Use technology to serve life'
      ]
    },
    contact: {
      title: 'Contact Me',
      content: 'If you have any questions, suggestions, or ideas for collaboration, feel free to contact me through:',
      email: 'Email:',
      website: 'Website:'
    }
  },
  auth: {
    loginTitle: 'Welcome Back',
    registerTitle: 'Create Account',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account?',
    hasAccount: 'Already have an account?',
    registerNow: 'Register Now',
    loginNow: 'Login Now',
    registerSubtitle: 'Create a new account',
    loginSubtitle: 'Login to your account' 
  },
  errors: {
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    passwordMismatch: 'Passwords do not match',
    loginFailed: 'Login failed. Please check your credentials.',
    registerFailed: 'Registration failed. Please try again.',
    networkError: 'Network error. Please try again.',
    unauthorized: 'Please login to access this feature',
    noImage: 'Please upload an image first',
    fileTooLarge: 'File size cannot exceed 10MB'
  },
  aiSing: {
    inputText: 'Enter lyrics or text',
    voice: 'Select Voice',
    generate: 'Generate Song',
    play: 'Play',
    pause: 'Pause',
    download: 'Download'
  },
  contentCreation: {
    title: 'Content Creation',
    description: 'Intelligent text generation and processing, supporting article writing, content polishing, multilingual translation and other creative needs.'
  },
  aiPainting: {
    title: 'AI Painting',
    description: 'Image generation tool based on large language models, supporting text description, image editing, style transfer and other features.'
  },
  openApi: {
    title: 'Open API',
    description: 'Provides standardized API interfaces to easily integrate AI capabilities into your applications. For more API services, please visit Qimu Technology.'
  }
}
