# Quartz 发布到 Cloudflare Pages 完整教程

## 📖 教程概述

本教程将指导你如何将 Quartz 静态网站发布到 Cloudflare Pages，享受全球CDN加速、自动部署和强大的边缘计算功能。

## 🎯 Cloudflare Pages 优势

**为什么选择 Cloudflare Pages？**
- 🚀 **全球CDN加速** - 超快的访问速度
- 🔄 **自动部署** - Git推送即自动更新
- 🆓 **免费额度充足** - 每月500次构建，无限带宽
- 🛡️ **安全防护** - DDoS防护、SSL证书
- 🌐 **边缘计算** - Cloudflare Workers集成
- 📊 **实时分析** - 详细的访问统计
- 🔧 **自定义域名** - 支持自定义域名绑定

## 📋 前置准备

### 1. 环境要求
- [x] 已有 Quartz 项目
- [x] 代码托管在 GitHub/GitLab
- [x] Cloudflare 账户（免费注册）
- [x] 基本的 Git 操作知识

### 2. 项目准备
确保你的 Quartz 项目：
- [x] 可以正常构建（`npx quartz build`）
- [x] 已推送到 Git 仓库
- [x] 构建输出在 `public` 目录

## 🔧 部署步骤

### 第一步：准备 Quartz 项目

#### 1.1 检查项目配置
确保 `quartz.config.ts` 配置正确：

```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "你的网站标题",
    baseUrl: "your-site.pages.dev", // 稍后会更新为实际域名
    // 其他配置...
  },
}
```

#### 1.2 测试本地构建
```bash
# 安装依赖
npm install

# 测试构建
npx quartz build

# 本地预览
npx quartz build --serve
```

#### 1.3 推送到 Git 仓库
```bash
git add .
git commit -m "准备部署到 Cloudflare Pages"
git push origin main
```

### 第二步：创建 Cloudflare Pages 项目

#### 2.1 登录 Cloudflare
1. 访问 [Cloudflare](https://www.cloudflare.com)
2. 登录你的账户
3. 在左侧菜单找到 [**"Pages"**](https://dash.cloudflare.com/8d4d423f3ea2927c0c8365c86259e591/workers-and-pages)
4. 点击进入 Pages 控制面板

#### 2.2 连接 Git 仓库
1. 点击 **"Create a project"** 按钮
2. 选择 **"Connect to Git"**
3. 选择你的 Git 提供商（GitHub/GitLab）
4. 授权 Cloudflare 访问你的仓库
5. 选择包含 Quartz 项目的仓库

#### 2.3 配置构建设置
在项目配置页面设置：

**基本设置：**
- **Project name**: 输入项目名称（如：my-quartz-blog）
- **Production branch**: `main` 或 `master`

**构建设置：**
- **Framework preset**: 选择 "None" 或 "Static site"
- **Build command**: `npm run build` 或 `npx quartz build`
- **Build output directory**: `public`
- **Root directory**: `/` （如果项目在根目录）

#### 2.4 环境变量（如需要）
如果项目需要环境变量：
1. 点击 **"Environment variables"**
2. 添加必要的变量
3. 例如：`NODE_VERSION = 18`

### 第三步：部署和验证

#### 3.1 开始部署
1. 检查所有配置无误
2. 点击 **"Save and Deploy"**
3. Cloudflare 开始自动构建和部署

#### 3.2 监控构建过程
1. 在 Pages 控制面板查看构建日志
2. 等待构建完成（通常需要2-5分钟）
3. 构建成功后会显示绿色的 ✅ 标志

#### 3.3 访问网站
1. 构建完成后，Cloudflare 会提供一个临时域名
2. 格式通常为：`your-project.pages.dev`
3. 点击链接访问你的网站

### 第四步：配置自定义域名（可选）

#### 4.1 添加自定义域名
1. 在 Pages 项目页面，点击 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入你的域名（如：blog.example.com）
4. 点击 **"Continue"**

#### 4.2 配置 DNS
根据提示配置 DNS 记录：

**如果域名在 Cloudflare：**
- DNS 记录会自动添加

**如果域名在其他服务商：**
- 添加 CNAME 记录指向 `your-project.pages.dev`
- 或按照 Cloudflare 提供的具体指示操作

#### 4.3 验证域名
1. 等待 DNS 传播（通常几分钟到24小时）
2. Cloudflare 会自动验证域名
3. 验证成功后会显示 "Active" 状态

### 第五步：更新 Quartz 配置

#### 5.1 更新 baseUrl
将 `quartz.config.ts` 中的 `baseUrl` 更新为实际域名：

```typescript
const config: QuartzConfig = {
  configuration: {
    baseUrl: "your-actual-domain.com", // 或 your-project.pages.dev
    // 其他配置...
  },
}
```

#### 5.2 重新部署
```bash
git add quartz.config.ts
git commit -m "更新域名配置"
git push origin main
```

Cloudflare Pages 会自动检测到更改并重新部署。

## 📝 日常使用流程

配置完成后，你的日常工作流程：

### 1. 内容更新
1. **编辑内容**：在 `content/` 目录下编辑 Markdown 文件
2. **本地预览**：运行 `npx quartz build --serve` 预览效果
3. **提交推送**：
   ```bash
   git add .
   git commit -m "更新内容：添加新文章"
   git push origin main
   ```
4. **自动部署**：Cloudflare Pages 自动构建并部署

### 2. 部署监控
1. 在 Cloudflare Pages 控制面板查看部署状态
2. 查看构建日志排查问题
3. 监控网站访问统计

## 🔧 高级配置

### 1. 构建优化

#### 1.1 自定义构建命令
如果需要特殊的构建流程，可以创建 `package.json` 脚本：

```json
{
  "scripts": {
    "build": "npx quartz build",
    "dev": "npx quartz build --serve",
    "clean": "rm -rf public"
  }
}
```

#### 1.2 Node.js 版本控制
在项目根目录创建 `.nvmrc` 文件：
```
18
```

或在 Cloudflare Pages 环境变量中设置：
- `NODE_VERSION = 18`

### 2. 性能优化

#### 2.1 启用压缩
Cloudflare Pages 默认启用 Gzip 压缩，无需额外配置。

#### 2.2 缓存设置
1. 在 Pages 项目设置中找到 **"Functions"**
2. 配置缓存规则（如需要）

### 3. 安全设置

#### 3.1 访问控制
1. 在 Pages 设置中找到 **"Access"**
2. 可以设置密码保护或 IP 白名单

#### 3.2 HTTPS 重定向
Cloudflare Pages 默认强制 HTTPS，无需额外配置。

## 🔄 与 GitHub Pages 对比

| 功能 | Cloudflare Pages | GitHub Pages |
|------|------------------|--------------|
| 构建速度 | ⚡ 更快 | 🐌 较慢 |
| 全球CDN | ✅ 内置 | ❌ 需要额外配置 |
| 自定义域名 | ✅ 免费SSL | ✅ 免费SSL |
| 构建次数限制 | 500次/月 | 无限制 |
| 带宽限制 | 无限制 | 100GB/月 |
| 边缘计算 | ✅ Workers | ❌ 不支持 |
| 部署预览 | ✅ 支持 | ❌ 不支持 |

## ❗ 常见问题

### Q: 构建失败怎么办？
A: 检查以下几点：
1. **构建命令是否正确** - 确保是 `npx quartz build`
2. **输出目录是否正确** - 应该是 `public`
3. **依赖是否完整** - 检查 `package.json` 和 `package-lock.json`
4. **Node.js 版本** - 建议使用 Node.js 18+

### Q: 网站显示 404 错误？
A: 可能原因：
1. **构建输出目录错误** - 确认是 `public`
2. **baseUrl 配置错误** - 检查 `quartz.config.ts`
3. **路径问题** - 确保所有链接都是相对路径

### Q: 自定义域名不生效？
A: 检查步骤：
1. **DNS 记录是否正确** - CNAME 指向 `your-project.pages.dev`
2. **DNS 传播时间** - 等待最多24小时
3. **域名验证状态** - 在 Cloudflare 控制面板查看

### Q: 自定义域名显示 403 错误？
A: 403错误通常是域名配置问题，按以下步骤排查：

**1. 检查域名状态**
- 在 Cloudflare Pages → Custom domains 查看域名状态
- 确保显示为 "Active" 而不是 "Pending"

**2. 验证 DNS 配置**
- 在域名注册商（如 Name.com）设置正确的 DNS 记录：
  ```
  类型: CNAME
  名称: @ (根域名) 或 www
  值: your-project.pages.dev
  ```
- 使用 [DNS Checker](https://dnschecker.org/) 验证解析是否正确

**3. 检查 SSL 证书**
- 等待 SSL 证书自动生成（可能需要几分钟到几小时）
- 确保使用 HTTPS 访问

**4. 重新配置域名**
- 如果问题持续，删除自定义域名后重新添加
- 按照 Cloudflare 提供的最新指示配置 DNS

**5. 使用诊断工具**
- [DNS Checker](https://dnschecker.org/) - 检查 DNS 传播
- [SSL Labs](https://www.ssllabs.com/ssltest/) - 检查 SSL 状态

### Q: 如何回滚到之前的版本？
A: 在 Pages 控制面板：
1. 进入 **"Deployments"** 页面
2. 找到要回滚的版本
3. 点击 **"Rollback to this deployment"**

### Q: 构建时间过长怎么办？
A: 优化建议：
1. **减少依赖** - 移除不必要的 npm 包
2. **优化图片** - 压缩图片文件
3. **缓存依赖** - 确保 `package-lock.json` 存在

### Q: 如何查看访问统计？
A: 在 Cloudflare Pages 控制面板：
1. 进入项目页面
2. 点击 **"Analytics"** 标签
3. 查看详细的访问数据

## 🚀 部署后优化

### 1. SEO 优化
确保 Quartz 配置包含：
```typescript
const config: QuartzConfig = {
  configuration: {
    pageTitle: "你的网站标题",
    pageTitleSuffix: " | 你的品牌",
    enableSPA: false, // 有利于SEO
    // 其他配置...
  },
}
```

### 2. 性能监控
1. 使用 Cloudflare Analytics 监控性能
2. 定期检查 Core Web Vitals
3. 优化图片和资源加载

### 3. 内容优化
1. 使用合适的图片格式（WebP）
2. 优化 Markdown 文件结构
3. 添加适当的内部链接

## 🔧 故障排除

### 构建日志分析
如果部署失败，查看构建日志：
1. 进入 Pages 项目页面
2. 点击失败的部署
3. 查看详细的错误信息
4. 根据错误信息调整配置

### 常见错误解决
1. **"Command not found"** - 检查构建命令拼写
2. **"Module not found"** - 运行 `npm install` 确保依赖完整
3. **"Permission denied"** - 检查文件权限设置

## 🎉 部署成功后的优势

使用 Cloudflare Pages 部署 Quartz 后，你将享受到：

### 性能优势
- 🚀 **全球加速** - 200+ 个边缘节点
- ⚡ **快速构建** - 平均构建时间 < 3分钟
- 📱 **移动优化** - 自动移动端优化

### 开发体验
- 🔄 **自动部署** - Git 推送即部署
- 👀 **预览部署** - 每个 PR 都有预览链接
- 📊 **实时监控** - 详细的性能数据

### 成本效益
- 💰 **免费额度** - 对个人博客完全够用
- 🔧 **无需维护** - 无需管理服务器
- 📈 **可扩展** - 流量增长时自动扩展

## 📚 相关资源

### 官方文档
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Quartz 官方文档](https://quartz.jzhao.xyz/)
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)

### 有用工具
- [Cloudflare Speed Test](https://speed.cloudflare.com/) - 测试网站速度
- [GTmetrix](https://gtmetrix.com/) - 性能分析工具
- [Google PageSpeed Insights](https://pagespeed.web.dev/) - 性能优化建议

### 社区资源
- [Cloudflare Community](https://community.cloudflare.com/)
- [Quartz Discord](https://discord.gg/cRFFHYye7t)

## 🎯 总结

将 Quartz 部署到 Cloudflare Pages 是一个简单而强大的解决方案。相比传统的托管方式，你可以获得：

**关键优势：**
1. ⚡ **更快的访问速度** - 全球CDN加速
2. 🔄 **自动化部署** - 无需手动操作
3. 🛡️ **安全防护** - 内置DDoS防护
4. 💰 **成本效益** - 免费额度充足
5. 🔧 **易于管理** - 统一的控制面板

**最佳实践：**
- 保持项目结构清晰
- 定期更新依赖
- 监控网站性能
- 优化内容质量

现在你已经掌握了完整的部署流程，可以开始享受 Cloudflare Pages 带来的强大功能了！

---

**提示**：如果在部署过程中遇到问题，可以查看 Cloudflare Pages 的详细日志，或者参考官方文档获得更多帮助。记住，第一次部署可能需要一些调试，但一旦配置正确，后续的部署就会非常顺畅。