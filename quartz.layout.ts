import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "AINightCoder/quartz",
        // from data-repo-id
        repoId: "R_kgDONMsC4g",
        // from data-category
        category: "Announcements",
        // from data-category-id
        categoryId: "DIC_kwDONMsC4s4CkLBr",
        // how to map pages -> discussions
        // defaults to 'url'
        mapping: "pathname",
        // use strict title matching
        // defaults to true
        strict: false,
        // whether to enable reactions for the main post
        // defaults to true
        reactionsEnabled: true,
        // where to put the comment input box relative to the comments
        // defaults to 'bottom'
        inputPosition: "top",
      },
    }),
    Component.ScrollToTop(),
  ],
  footer: Component.Footer({
    links: {
      // 移除了官方广告链接和回到顶部链接（现在使用专门的ScrollToTop组件）
      // 可以在这里添加自定义链接
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
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
    Component.Graph({
      localGraph: {
        showTags: false, // 关闭局部图谱中的标签显示
        linkDistance: 50, // 增加连接线长度
      },
      globalGraph: {
        showTags: false, // 关闭全局图谱中的标签显示
        linkDistance: 50, // 增加连接线长度
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
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
