import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const PersonalIntro: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "personal-intro")}>
      <div class="intro-content">
        <p class="intro-main">🚀 全栈工程师 · AI应用开发 · 超级个体创业</p>
        <ul class="intro-list">
          <li>💻 白天写代码，晚上搞副业</li>
          <li>🤖 用AI做有趣又能赚钱的应用</li>
          <li>📈 Build in Public，记录真实创业旅程</li>
          <li>🎯 目标：把副业做到能养活自己</li>
        </ul>
      </div>

      <div class="social-links">
        <a href="https://github.com/AINightCoder" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <a href="https://twitter.com/AINightCoder" target="_blank" rel="noopener noreferrer" class="social-link" title="Twitter">
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>

        {/* <a href="https://www.linkedin.com/in/ainightcoder" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        <a href="https://www.youtube.com/@AINightCoder" target="_blank" rel="noopener noreferrer" class="social-link" title="YouTube">
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>

        <a href="mailto:contact@ainightcoder.com" class="social-link" title="Email">
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.832l8.532 6.545 8.532-6.545h1.832c.904 0 1.636.732 1.636 1.636z"/>
          </svg>
        </a>

        <a href="https://blog.ainightcoder.com" target="_blank" rel="noopener noreferrer" class="social-link" title="Blog">
          <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </a> */}
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
  padding-left: 0;
  position: relative;
}

.social-links {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--lightgray);
  flex-wrap: wrap;
  align-items: center;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--lightgray);
  color: var(--dark);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.social-link:hover {
  background: var(--secondary);
  color: var(--light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.social-icon {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
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

:root[saved-theme="dark"] .social-links {
  border-top-color: var(--darkgray);
}

:root[saved-theme="dark"] .social-link {
  background: var(--darkgray);
  color: var(--lightgray);
}

:root[saved-theme="dark"] .social-link:hover {
  background: var(--secondary);
  color: var(--light);
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

  .social-links {
    gap: 0.6rem;
    margin-top: 0.8rem;
    padding-top: 0.6rem;
  }

  .social-link {
    width: 1.8rem;
    height: 1.8rem;
  }

  .social-icon {
    width: 0.9rem;
    height: 0.9rem;
  }
}
`

export default (() => PersonalIntro) satisfies QuartzComponentConstructor
