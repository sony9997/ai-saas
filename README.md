<h1 align="center">AI SaaS</h1>

<p align="center">
    <a href="https://github.com/sony9997/ai-saas">
        <img alt="Build" src="https://img.shields.io/badge/Project%20Page-AI%20SaaS-yellow">
    </a>
    <a href="https://as.qimuinfo.top/">
        <img alt="License" src="https://img.shields.io/badge/Demo-🤗-lightblue">
    </a>
    <a href="https://qimuinfo.top">
        <img alt="Build" src="https://img.shields.io/badge/Official%20Website-🤗-yellow">
    </a>    
</p>

<h4 align="center">
    <p>
        <a href=#technical-architecture>Technical Architecture</a> |
        <a href=#development-process>Development Process</a> |
        <a href=#installation>Installation</a> |
        <a href=#key-features>Key Features</a> |
        <a href=#free-usage>Free Usage</a> |
        <a href="#license">License</a> |
        <a href="#support">Support</a>
    <p>
</h4>

<div align="center">

[🌟 English](README.md) | [🌏 中文](README_CN.md)

<img src="./public/favicon.svg" alt="Qimu Logo" width="120"/>

</div>

## Technical Architecture

### Frontend Stack

- Vue 3 + Vite + TypeScript
- TailwindCSS for styling
- Particles.js for particle effects ([GitHub](https://github.com/VincentGarreau/particles.js))
- Vue Router for routing
- Pinia for state management

### Backend Services

- Supabase as Backend-as-a-Service (BaaS), providing:
  - User authentication
  - Database storage
  - File storage
  - Real-time subscriptions
- Supabase GitHub: https://github.com/supabase/supabase
- Using [Dify](https://github.com/langgenius/dify) for AI chat, text-to-image, and image-to-image backend services. For more information, refer to [Dify Documentation](https://docs.dify.ai/)
  - AI chat application description file is located at [/res/chat.yml](./res/chat.yml)
  - Text-to-image and image-to-image applications are developed based on Dify's Comfyui component, with description file at [/res/Comfyui.yml](./res/Comfyui.yml)
- Unified image processing is developed using OmniGen model's Gradio API. For more information, refer to [OmniGen GitHub](https://github.com/VectorSpaceLab/OmniGen)

## Development Process

This project follows the development workflow below:

1. Used bolt.new to quickly build the project's basic framework
2. Used Cursor + Cline for code optimization and feature development:
   - Cline uses the DeepSeek model for multi-file collaborative development
   - Cursor is used for optimizing and developing individual features/files
3. Development experience summary:
   - Cline + DeepSeek excels at handling complex requirements involving multiple files
   - Cursor is more efficient for optimizing individual features or files

## Installation

### Frontend Installation

1. Clone the project

   ```bash
   git clone https://github.com/your-repo/ai-saas.git
   cd ai-saas
   ```
2. Install dependencies

   ```bash
   npm install
   ```
3. Configure environment variables
   Copy `.env.example` to `.env` and fill in Supabase configuration
4. Start development server

   ```bash
   npm run dev
   ```

## Key Features

- **AI Chat**: Intelligent conversations based on GPT
- **Text-to-Image**: Generate images from text descriptions
- **Image-to-Image**: Image style transfer
- **Face Swap**: AI face replacement functionality
- **AI Singing**: Text-to-song conversion
- **Unified Image Processing**: Integrated multiple image processing features

## Free Usage

This project is deployed online and all features are available for free at:
https://as.qimuinfo.top

## License
This repository is under the [MIT License](LICENSE).

## Support

If this project has been helpful to you, feel free to show your support:

### WeChat Pay (Chinese Payment Method)

<img src="src/assets/pay-weixin.jpg" width="150" height="150">

### Alipay (Chinese Payment Method)

<img src="src/assets/pay-zhifubao.jpg" width="150" height="150">

### Ko-fi

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/your-ko-fi)

### Contact Me
You can reach me via email:

- Email: [sony9997@sina.com](mailto:sony9997@sina.com)

You can also visit my [Official Website](https://qimuinfo.top)