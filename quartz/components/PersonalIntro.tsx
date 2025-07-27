import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const PersonalIntro: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "personal-intro")}>
      <div class="intro-header">
        <span class="intro-emoji">👋</span>
        <h3 class="intro-title">关于我</h3>
      </div>
      <div class="intro-content">
        <p class="intro-main">全栈工程师 · AI应用开发者 · 超级个体创业者</p>
        <ul class="intro-list">
          <li>白天写代码，晚上搞副业</li>
          <li>用AI做有趣又能赚钱的应用</li>
          <li>Build in Public，记录真实创业旅程</li>
          <li>目标：把副业做到能养活自己</li>
        </ul>
      </div>
    </div>
  )
}

PersonalIntro.css = `
.personal-intro {
  margin: 0.5rem 0;
  padding: 0;
  background: transparent;
  border: none;
}

.intro-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
}

.intro-emoji {
  font-size: 1.1rem;
}

.intro-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: var(--dark);
}

.intro-content {
  margin: 0;
}

.intro-main {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--secondary);
  margin: 0 0 0.6rem 0;
  line-height: 1.3;
}

.intro-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.intro-list li {
  font-size: 0.8rem;
  color: var(--darkgray);
  line-height: 1.4;
  margin: 0.25rem 0;
  padding-left: 0.8rem;
  position: relative;
}

.intro-list li::before {
  content: "·";
  color: var(--secondary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* 暗色主题优化 */
:root[saved-theme="dark"] .intro-title {
  color: var(--light);
}

:root[saved-theme="dark"] .intro-main {
  color: var(--secondary);
}

:root[saved-theme="dark"] .intro-list li {
  color: var(--lightgray);
}

/* 响应式优化 */
@media (max-width: 600px) {
  .personal-intro {
    margin: 0.4rem 0;
  }

  .intro-header {
    margin-bottom: 0.5rem;
  }

  .intro-main {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .intro-list li {
    font-size: 0.75rem;
    margin: 0.2rem 0;
  }
}
`

export default (() => PersonalIntro) satisfies QuartzComponentConstructor
