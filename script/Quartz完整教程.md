# Quartz 完整教程：从零开始构建你的数字花园

## 📖 教程概述

Quartz 是一个现代化的静态网站生成器，专门为构建数字花园（Digital Garden）和知识库而设计。它可以将你的 Markdown 笔记转换成美观、互联的网站。

## 🎯 Quartz 的特点

**为什么选择 Quartz？**
- 📝 **Markdown 原生支持** - 直接使用 Markdown 写作
- 🔗 **双向链接** - 像 Obsidian 一样的笔记连接
- 🎨 **现代化设计** - 响应式、美观的界面
- ⚡ **快速构建** - 基于现代前端技术
- 🔍 **全文搜索** - 内置搜索功能
- 📊 **图谱视图** - 可视化笔记关系
- 🌙 **深色模式** - 支持明暗主题切换

## 📋 前置准备

### 1. 环境要求
- [x] **Node.js** (v18 或更高版本)
- [x] **npm** (通常随 Node.js 安装)
- [x] **Git** (用于版本控制)
- [x] **代码编辑器** (推荐 VS Code)

### 2. 安装 Node.js
1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载 LTS 版本
3. 按照安装向导完成安装
4. 验证安装：
   ```bash
   node --version
   npm --version
   ```

## 🚀 快速开始

### 第一步：创建 Quartz 项目

#### 1.1 克隆 Quartz 仓库
```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
```

#### 1.2 安装依赖
```bash
npm install
```

#### 1.3 初始化项目
```bash
npx quartz create
```

这个命令会引导你完成初始设置：
- 选择内容来源（空白项目、现有文件夹等）
- 配置基本设置

### 第二步：项目结构了解

```
quartz/
├── content/           # 你的 Markdown 文件
├── quartz/           # Quartz 核心文件
├── public/           # 构建输出目录
├── quartz.config.ts  # 主配置文件
├── quartz.layout.ts  # 布局配置文件
└── package.json      # 项目依赖
```

### 第三步：创建你的第一篇文章

#### 3.1 在 content 目录创建文件
创建 `content/我的第一篇文章.md`：

```markdown
---
title: 我的第一篇文章
date: 2024-01-20
tags:
  - 入门
  - 教程
---

# 欢迎来到我的数字花园

这是我的第一篇文章，我将在这里分享我的想法和知识。

## 什么是数字花园？

数字花园是一种新的内容组织方式，它强调：
- 持续成长的内容
- 非线性的知识结构
- 思想之间的连接

## 双向链接示例

你可以创建指向其他笔记的链接：[[另一篇文章]]

这样就建立了笔记之间的连接关系。
```

#### 3.2 本地预览
```bash
npx quartz build --serve
```

打开浏览器访问 `http://localhost:8080` 查看效果。

## ⚙️ 配置详解

### 1. 主配置文件 (quartz.config.ts)

```typescript
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "我的数字花园",           // 网站标题
    pageTitleSuffix: "",               // 标题后缀
    enableSPA: true,                   // 单页应用模式
    enablePopovers: true,              // 悬浮预览
    analytics: {                       // 分析工具
      provider: "plausible",
    },
    locale: "zh-CN",                   // 语言设置
    baseUrl: "quartz.jzhao.xyz",      // 网站域名
    ignorePatterns: [                  // 忽略的文件
      "private", 
      "templates", 
      ".obsidian"
    ],
    defaultDateType: "created",        // 默认日期类型
    theme: {
      fontOrigin: "googleFonts",       // 字体来源
      cdnCaching: true,                // CDN 缓存
      typography: {                    // 字体设置
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {                        // 颜色主题
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [                    // 内容转换插件
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown(),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks(),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],  // 过滤器插件
    emitters: [                        // 输出插件
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
```

### 2. 布局配置 (quartz.layout.ts)

```typescript
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 共享组件（所有页面都有）
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// 默认页面布局
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// 标签页面布局
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
```

## 📝 内容管理

### 1. Markdown 语法支持

Quartz 支持标准 Markdown 语法，以及一些扩展功能：

#### 1.1 基础语法
```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文本**
*斜体文本*
~~删除线~~

- 无序列表项
- 另一个列表项

1. 有序列表项
2. 另一个有序列表项

[链接文本](https://example.com)
![图片描述](image.png)

> 引用文本

`行内代码`

```代码块
console.log("Hello, World!")
```
```

#### 1.2 扩展语法

**数学公式（LaTeX）：**
```markdown
行内公式：$E = mc^2$

块级公式：
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

**表格：**
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
```

**任务列表：**
```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个任务
```

### 2. Front Matter（文档元数据）

每个 Markdown 文件可以包含 YAML 格式的元数据：

```markdown
---
title: 文章标题
date: 2024-01-20
lastmod: 2024-01-21
tags:
  - 标签1
  - 标签2
categories:
  - 分类名
draft: false
description: 文章描述
aliases:
  - 别名1
  - 别名2
---

文章内容从这里开始...
```

**常用字段说明：**
- `title`: 文章标题
- `date`: 创建日期
- `lastmod`: 最后修改日期
- `tags`: 标签列表
- `categories`: 分类
- `draft`: 是否为草稿（true 不会发布）
- `description`: 文章描述
- `aliases`: 别名，用于创建重定向

### 3. 双向链接

#### 3.1 创建链接
```markdown
[[目标文件名]]
[[目标文件名|显示文本]]
[[文件夹/目标文件名]]
```

#### 3.2 链接类型
- **内部链接**：`[[另一篇文章]]`
- **带显示文本的链接**：`[[另一篇文章|点击这里]]`
- **文件夹中的文件**：`[[技术/编程技巧]]`
- **标题链接**：`[[另一篇文章#特定标题]]`

#### 3.3 反向链接
Quartz 会自动生成反向链接，显示哪些文章链接到当前文章。

### 4. 文件组织

#### 4.1 推荐的文件夹结构
```
content/
├── index.md              # 首页
├── 日常笔记/
│   ├── 2024-01-20.md
│   └── 2024-01-21.md
├── 技术/
│   ├── 编程/
│   │   ├── JavaScript.md
│   │   └── Python.md
│   └── 工具/
│       ├── Git.md
│       └── VS Code.md
├── 读书笔记/
│   ├── 《原则》.md
│   └── 《思考快与慢》.md
└── 项目/
    ├── 个人网站.md
    └── 学习计划.md
```

#### 4.2 文件命名建议
- 使用有意义的文件名
- 避免特殊字符
- 可以使用中文文件名
- 保持一致的命名风格

## 🎨 自定义样式

### 1. 主题定制

#### 1.1 颜色主题
在 `quartz.config.ts` 中修改颜色：

```typescript
colors: {
  lightMode: {
    light: "#ffffff",      // 背景色
    lightgray: "#f5f5f5",  // 浅灰色
    gray: "#cccccc",       // 灰色
    darkgray: "#666666",   // 深灰色
    dark: "#333333",       // 深色文字
    secondary: "#0066cc",  // 次要颜色
    tertiary: "#00aa44",   // 第三颜色
    highlight: "rgba(0, 102, 204, 0.1)", // 高亮色
  },
  // darkMode 配置类似...
}
```

#### 1.2 字体设置
```typescript
typography: {
  header: "Noto Sans SC",    // 标题字体
  body: "Noto Sans SC",      // 正文字体
  code: "JetBrains Mono",    // 代码字体
}
```

### 2. 自定义 CSS

#### 2.1 创建自定义样式文件
在 `quartz/styles/` 目录下创建 `custom.scss`：

```scss
// 自定义样式
.content {
  h1 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
  }

  blockquote {
    border-left: 4px solid #3498db;
    background-color: #f8f9fa;
    padding: 1rem;
    margin: 1rem 0;
  }

  code {
    background-color: #f1f2f6;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'JetBrains Mono', monospace;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .content {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}
```

#### 2.2 引入自定义样式
在 `quartz/styles/base.scss` 中添加：
```scss
@import "custom";
```

## 🔌 插件系统

### 1. 内置插件

#### 1.1 转换器插件 (Transformers)
- **FrontMatter**: 解析文档元数据
- **CreatedModifiedDate**: 添加创建和修改日期
- **SyntaxHighlighting**: 代码语法高亮
- **ObsidianFlavoredMarkdown**: Obsidian 风格 Markdown
- **GitHubFlavoredMarkdown**: GitHub 风格 Markdown
- **TableOfContents**: 生成目录
- **CrawlLinks**: 处理内部链接
- **Description**: 生成文章描述
- **Latex**: LaTeX 数学公式支持

#### 1.2 过滤器插件 (Filters)
- **RemoveDrafts**: 移除草稿文章
- **ExplicitPublish**: 只发布明确标记的文章

#### 1.3 发射器插件 (Emitters)
- **ContentPage**: 生成内容页面
- **FolderPage**: 生成文件夹页面
- **TagPage**: 生成标签页面
- **ContentIndex**: 生成搜索索引和 RSS
- **Assets**: 处理静态资源
- **Static**: 复制静态文件
- **NotFoundPage**: 生成 404 页面

### 2. 插件配置示例

```typescript
plugins: {
  transformers: [
    Plugin.FrontMatter(),
    Plugin.CreatedModifiedDate({
      priority: ["frontmatter", "filesystem"], // 日期优先级
    }),
    Plugin.SyntaxHighlighting({
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
      keepBackground: false,
    }),
    Plugin.ObsidianFlavoredMarkdown({
      enableInHtmlEmbed: false
    }),
    Plugin.GitHubFlavoredMarkdown(),
    Plugin.TableOfContents(),
    Plugin.CrawlLinks({
      markdownLinkResolution: "shortest"
    }),
    Plugin.Description(),
    Plugin.Latex({
      renderEngine: "katex"
    }),
  ],
  filters: [
    Plugin.RemoveDrafts(),
  ],
  emitters: [
    Plugin.AliasRedirects(),
    Plugin.ComponentResources(),
    Plugin.ContentPage(),
    Plugin.FolderPage(),
    Plugin.TagPage(),
    Plugin.ContentIndex({
      enableSiteMap: true,
      enableRSS: true,
    }),
    Plugin.Assets(),
    Plugin.Static(),
    Plugin.NotFoundPage(),
  ],
}
```

### 3. 组件系统

#### 3.1 常用组件
- **PageTitle**: 页面标题
- **Search**: 搜索框
- **Darkmode**: 深色模式切换
- **Explorer**: 文件浏览器
- **TableOfContents**: 目录
- **Graph**: 关系图谱
- **Backlinks**: 反向链接
- **TagList**: 标签列表
- **Breadcrumbs**: 面包屑导航

#### 3.2 组件配置示例
```typescript
left: [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Search(),
  Component.Darkmode(),
  Component.DesktopOnly(Component.Explorer({
    title: "文件浏览器",
    folderClickBehavior: "collapse",
    folderDefaultState: "collapsed",
    useSavedState: true,
    sortFn: (a, b) => {
      // 自定义排序逻辑
      if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
        return a.displayName.localeCompare(b.displayName, "zh-CN", {
          numeric: true,
          sensitivity: "base",
        })
      }
      return a.isFolder ? -1 : 1
    },
  })),
]
```

## 🚀 构建和部署

### 1. 本地开发

#### 1.1 开发服务器
```bash
# 启动开发服务器（带热重载）
npx quartz build --serve

# 指定端口
npx quartz build --serve --port 3000
```

#### 1.2 构建网站
```bash
# 构建静态网站
npx quartz build

# 构建后的文件在 public/ 目录
```

### 2. 部署选项

#### 2.1 GitHub Pages
1. 创建 GitHub 仓库
2. 推送代码到仓库
3. 配置 GitHub Actions（参考 GitHub Pages 教程）

#### 2.2 Cloudflare Pages
1. 连接 Git 仓库
2. 设置构建命令：`npx quartz build`
3. 设置输出目录：`public`

#### 2.3 Vercel
1. 连接 Git 仓库
2. 设置构建命令：`npx quartz build`
3. 设置输出目录：`public`

#### 2.4 Netlify
1. 连接 Git 仓库
2. 设置构建命令：`npx quartz build`
3. 设置发布目录：`public`

### 3. 同步工具

#### 3.1 使用 Quartz 同步
```bash
# 同步内容到远程仓库
npx quartz sync

# 不拉取远程更改，直接推送
npx quartz sync --no-pull

# 查看同步选项
npx quartz sync --help
```

#### 3.2 Git 工作流
```bash
# 添加新内容
git add content/

# 提交更改
git commit -m "添加新文章"

# 推送到远程仓库
git push origin main
```

## 💡 最佳实践

### 1. 内容组织
- **使用有意义的文件夹结构**
- **保持文件名简洁明了**
- **合理使用标签和分类**
- **建立清晰的链接关系**

### 2. 写作建议
- **使用 Front Matter 添加元数据**
- **创建索引页面链接相关内容**
- **定期整理和更新内容**
- **使用双向链接建立知识网络**

### 3. 性能优化
- **优化图片大小**
- **合理使用插件**
- **定期清理无用文件**
- **使用 CDN 加速**

### 4. 维护建议
- **定期备份内容**
- **保持 Quartz 版本更新**
- **监控网站性能**
- **收集用户反馈**

## ❗ 常见问题

### Q: 如何处理中文文件名？
A: Quartz 完全支持中文文件名，但建议：
- 避免使用特殊字符
- 保持文件名简洁
- 使用连字符而不是空格

### Q: 双向链接不工作怎么办？
A: 检查以下几点：
- 确保文件名拼写正确
- 检查文件是否在 content 目录下
- 重新构建网站：`npx quartz build`

### Q: 如何添加自定义页面？
A: 在 content 目录下创建 Markdown 文件，使用 Front Matter 配置：
```markdown
---
title: 关于我
layout: custom
---

这是一个自定义页面。
```

### Q: 如何修改网站图标？
A: 将图标文件放在 `quartz/static/` 目录下，然后在配置中引用。

### Q: 搜索功能不工作？
A: 确保：
- ContentIndex 插件已启用
- 重新构建网站
- 检查浏览器控制台是否有错误

### Q: 如何备份内容？
A: 推荐方法：
- 使用 Git 版本控制
- 定期推送到远程仓库
- 导出 content 目录

## 🔧 故障排除

### 1. 构建错误

#### 错误：Command not found
```bash
# 解决方案：确保 Node.js 和 npm 已安装
node --version
npm --version

# 重新安装依赖
npm install
```

#### 错误：Module not found
```bash
# 解决方案：清除缓存并重新安装
rm -rf node_modules package-lock.json
npm install
```

#### 错误：Build failed
```bash
# 解决方案：检查配置文件语法
# 查看详细错误信息
npx quartz build --verbose
```

### 2. 链接问题

#### 双向链接失效
- 检查文件名是否正确
- 确保文件在 content 目录下
- 重新构建网站

#### 图片不显示
- 检查图片路径是否正确
- 将图片放在 `quartz/static/` 目录下
- 使用相对路径引用

### 3. 样式问题

#### 自定义样式不生效
- 检查 CSS 语法是否正确
- 确保样式文件已正确引入
- 清除浏览器缓存

#### 响应式布局问题
- 检查 CSS 媒体查询
- 测试不同设备尺寸
- 使用浏览器开发者工具调试

## 📚 进阶技巧

### 1. 自动化工作流

#### 1.1 使用 GitHub Actions
创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy Quartz
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx quartz build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

#### 1.2 定时任务
```bash
# 使用 cron 定时同步内容
0 */6 * * * cd /path/to/quartz && npx quartz sync
```

### 2. 内容管理技巧

#### 2.1 模板系统
创建文章模板 `templates/article.md`：
```markdown
---
title: "{{title}}"
date: {{date}}
tags:
  -
categories:
  -
draft: false
---

# {{title}}

## 概述

## 详细内容

## 总结

## 相关链接
- [[]]
```

#### 2.2 批量操作
```bash
# 批量重命名文件
for file in *.md; do
  mv "$file" "${file// /-}"
done

# 批量添加 Front Matter
for file in content/*.md; do
  if ! grep -q "^---" "$file"; then
    echo -e "---\ntitle: $(basename "$file" .md)\ndate: $(date +%Y-%m-%d)\n---\n$(cat "$file")" > "$file"
  fi
done
```

### 3. 性能优化

#### 3.1 图片优化
```bash
# 使用 ImageMagick 批量压缩图片
for img in *.jpg; do
  convert "$img" -quality 85 -resize 1200x1200\> "optimized_$img"
done
```

#### 3.2 构建优化
```typescript
// 在 quartz.config.ts 中优化配置
const config: QuartzConfig = {
  configuration: {
    enableSPA: true,        // 启用单页应用
    enablePopovers: true,   // 启用悬浮预览
    // 其他优化配置...
  },
}
```

## 🎉 总结

Quartz 是一个强大而灵活的静态网站生成器，特别适合构建个人知识库和数字花园。通过本教程，你已经学会了：

### 核心技能
- ✅ **安装和配置** Quartz 项目
- ✅ **创建和管理** Markdown 内容
- ✅ **使用双向链接** 建立知识网络
- ✅ **自定义主题** 和样式
- ✅ **配置插件** 扩展功能
- ✅ **部署网站** 到各种平台

### 进阶能力
- ✅ **故障排除** 和问题解决
- ✅ **性能优化** 和最佳实践
- ✅ **自动化工作流** 设置
- ✅ **内容管理** 技巧

### 下一步建议
1. **开始写作** - 创建你的第一批内容
2. **建立链接** - 使用双向链接连接相关内容
3. **定制外观** - 根据个人喜好调整主题
4. **分享交流** - 与社区分享你的数字花园

## 📖 相关资源

### 官方资源
- [Quartz 官方文档](https://quartz.jzhao.xyz/)
- [GitHub 仓库](https://github.com/jackyzha0/quartz)
- [Discord 社区](https://discord.gg/cRFFHYye7t)

### 学习资源
- [Markdown 语法指南](https://www.markdownguide.org/)
- [数字花园概念](https://maggieappleton.com/garden-history)
- [知识管理方法](https://fortelabs.co/blog/para/)

### 工具推荐
- [Obsidian](https://obsidian.md/) - 本地笔记管理
- [Typora](https://typora.io/) - Markdown 编辑器
- [VS Code](https://code.visualstudio.com/) - 代码编辑器

---

**祝你在数字花园的旅程中收获满满！** 🌱

如果在使用过程中遇到问题，欢迎查阅官方文档或在社区寻求帮助。记住，最好的学习方式就是开始实践！
```
```
