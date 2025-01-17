# AI SaaS 项目

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
   复制`.env.example`文件为`.env`，并填写Supabase配置

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

## 支持项目

如果本项目对您有帮助，欢迎打赏支持：

### 微信支付
<img src="src/assets/pay-weixin.jpg" width="150" height="150">

### 支付宝
<img src="src/assets/pay-zhifubao.jpg" width="150" height="150">

### Ko-fi
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/your-ko-fi)


### 其他

您还可以逛逛我的官网 https://qimuinfo.top