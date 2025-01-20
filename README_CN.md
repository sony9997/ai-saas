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
        <a href=#技术架构>技术架构</a> |
        <a href=#开发过程>开发过程</a> |
        <a href=#安装步骤>安装步骤</a> |
        <a href=#主要功能>主要功能</a> |
        <a href=#免费使用>免费使用</a> |
        <a href="#许可证">许可证</a> |
        <a href="#支持项目">打赏项目</a>
    <p>
</h4>


<div align="center">

[🌟 English](README.md) | [🌏 中文](README_CN.md)

<img src="./public/favicon.svg" alt="Qimu Logo" width="120"/>

</div>



## 技术架构

### 前端技术栈

- Vue 3 + Vite + TypeScript
- TailwindCSS 样式框架
- Particles.js 粒子效果 ([GitHub](https://github.com/VincentGarreau/particles.js))
- Vue Router 路由管理
- Pinia 状态管理

### 后端服务

- 使用Supabase作为后端即服务(BaaS)，提供：
  - 用户认证
  - 数据库存储
  - 文件存储
  - 实时订阅
- Supabase GitHub: https://github.com/supabase/supabase
- 使用[Dify](https://github.com/langgenius/dify)开发AI聊天、文生图、图生图功能的后台服务，更多信息请参考[Dify 官方文档](https://docs.dify.ai/)
  - AI聊天的应用描述文件位于 [/res/chat.yml](./res/chat.yml)
  - 文生图图生图应用是基于Dify中的Comfyui组件开发的，描述文件位于[/res/Comfyui.yml](./res/Comfyui.yml)
- 统一图像处理是基于OmniGen模型开发的Gradio API，更多信息请参考[OmniGen github](https://github.com/VectorSpaceLab/OmniGen)

## 开发过程

本项目采用以下开发流程：

1. 使用bolt.new快速构建项目基础框架
2. 使用Cursor + Cline进行代码优化和功能开发：
   - Cline使用DeepSeek模型进行多文件协同开发
   - Cursor用于单个功能/文件的优化和开发
3. 开发经验总结：
   - Cline + DeepSeek在处理涉及多个文件的复杂需求时表现优异
   - Cursor在优化单个功能或文件时效率更高

## 安装步骤

### 前端安装

1. 克隆项目

   ```bash
   git clone https://github.com/your-repo/ai-saas.git
   cd ai-saas
   ```
2. 安装依赖

   ```bash
   npm install
   ```
3. 配置环境变量
   复制 `.env.example`文件为 `.env`，并填写Supabase配置
4. 启动开发服务器

   ```bash
   npm run dev
   ```

## 主要功能

- **AI聊天**：基于GPT的智能对话
- **文生图**：根据文字描述生成图像
- **图生图**：图像风格转换
- **人脸替换**：AI换脸功能
- **AI唱歌**：文字转歌声
- **统一图像处理**：集成多种图像处理功能

## 免费使用

本项目已部署到公网，所有功能均可免费使用，访问地址：
https://as.qimuinfo.top

## 许可证
此仓库遵循[MIT 许可协议](LICENSE)。 

## 支持项目

如果本项目对您有帮助，欢迎打赏支持：

### 微信支付

<img src="src/assets/pay-weixin.jpg" width="150" height="150">

### 支付宝

<img src="src/assets/pay-zhifubao.jpg" width="150" height="150">

### Ko-fi

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/your-ko-fi)

### 联系我
您可以通过邮件联系我：

- 邮箱：[sony9997@sina.com](mailto:sony9997@sina.com)

您还可以逛逛我的[官网](https://qimuinfo.top)
