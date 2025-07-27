import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const avatarPath = joinSegments(baseDir, "static/head.png")

  return (
    <div class={classNames(displayClass, "page-title")}>
      <img
        src={avatarPath}
        alt="头像"
        class="page-title-avatar"
        onError="this.style.display='none'"
        loading="lazy"
      />
      <h2 class="page-title-text">
        <a href={baseDir}>{title}</a>
      </h2>
    </div>
  )
}

PageTitle.css = `
.page-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0rem 0;
}

.page-title-avatar {
  width: 66px;
  height: 66px;
  margin: 0;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid var(--lightgray);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  background: var(--light);
}

.page-title-avatar:hover {
  border-color: var(--secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px) scale(1.05);
}

.page-title-text {
  font-size: 1.75rem;
  margin: 0;
  line-height: 1.2;
  min-width: 0;
  flex: 1;
}

.page-title-text a {
  text-decoration: none;
  color: var(--dark);
  transition: color 0.2s ease;
  display: block;
}

.page-title-text a:hover {
  color: var(--secondary);
}

/* 暗色主题优化 */
:root[saved-theme="dark"] .page-title-avatar {
  border-color: var(--gray);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background: var(--darkgray);
}

:root[saved-theme="dark"] .page-title-avatar:hover {
  border-color: var(--secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

/* 响应式优化 */
@media (max-width: 600px) {
  .page-title {
    gap: 0.4rem;
  }

  .page-title-avatar {
    width: 28px;
    height: 28px;
  }

  .page-title-text {
    font-size: 1.5rem;
  }
}

/* 图片加载失败时的样式 */
.page-title-avatar[src=""],
.page-title-avatar:not([src]) {
  display: none;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
