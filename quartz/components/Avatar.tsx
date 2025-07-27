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
    size: 48,
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
    margin: 1rem 0;
  }

  .avatar-image {
    border-radius: 50%;
    object-fit: cover;
    ${opts.showBorder ? `border: 2px solid var(--lightgray);` : ""}
    transition: all 0.2s ease;
  }

  .avatar-link {
    display: block;
    text-decoration: none;
  }

  .avatar-link:hover .avatar-image {
    ${opts.showBorder ? `border-color: var(--secondary);` : ""}
    transform: scale(1.05);
  }
  `

  return Avatar
}) satisfies QuartzComponentConstructor<AvatarOptions>
