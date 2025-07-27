import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface AvatarOptions {
  /** 头像图片文件名，默认为 "head.png" */
  imageName?: string
  /** 头像大小，默认为 48px */
  size?: number
  /** 是否显示边框，默认为 true */
  showBorder?: boolean
  /** 点击头像时的链接，默认为首页 */
  linkTo?: string
}

export default ((userOpts?: AvatarOptions) => {
  const opts: Required<AvatarOptions> = {
    imageName: "head.png",
    size: 32,
    showBorder: true,
    linkTo: "/",
    ...userOpts,
  }

  const Avatar: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    const avatarPath = joinSegments(baseDir, `static/${opts.imageName}`)
    const linkPath = opts.linkTo === "/" ? baseDir : opts.linkTo

    const avatarElement = (
      <img
        src={avatarPath}
        alt="Avatar"
        class={classNames(displayClass, "avatar-image")}
        style={`width: ${opts.size}px; height: ${opts.size}px;`}
      />
    )

    return (
      <div class="avatar-container">
        {opts.linkTo ? (
          <a href={linkPath} class="avatar-link">
            {avatarElement}
          </a>
        ) : (
          avatarElement
        )}
      </div>
    )
  }

  Avatar.css = `
  .avatar-container {
    display: flex;
    justify-content: center;
    margin: 0.75rem 0;
  }

  .avatar-image {
    border-radius: 50%;
    object-fit: cover;
    ${opts.showBorder ? `border: 1.5px solid var(--lightgray);` : ""}
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--light);
  }

  .avatar-link {
    display: block;
    text-decoration: none;
  }

  .avatar-link:hover .avatar-image {
    ${opts.showBorder ? `border-color: var(--secondary);` : ""}
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px) scale(1.05);
  }

  /* 暗色主题优化 */
  :root[saved-theme="dark"] .avatar-image {
    ${opts.showBorder ? `border-color: var(--gray);` : ""}
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    background: var(--darkgray);
  }

  :root[saved-theme="dark"] .avatar-link:hover .avatar-image {
    ${opts.showBorder ? `border-color: var(--secondary);` : ""}
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  /* 响应式优化 */
  @media (max-width: 600px) {
    .avatar-container {
      margin: 0.5rem 0;
    }
  }
  `

  return Avatar
}) satisfies QuartzComponentConstructor<AvatarOptions>
