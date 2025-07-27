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
      <img src={avatarPath} alt="Avatar" class="page-title-avatar" />
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
  gap: 0.75rem;
  margin: 0;
}

.page-title-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--lightgray);
  transition: border-color 0.2s ease;
}

.page-title-avatar:hover {
  border-color: var(--secondary);
}

.page-title-text {
  font-size: 1.75rem;
  margin: 0;
}

.page-title-text a {
  text-decoration: none;
  color: var(--dark);
}

.page-title-text a:hover {
  color: var(--secondary);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
