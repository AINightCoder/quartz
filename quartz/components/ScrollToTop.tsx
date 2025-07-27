// @ts-ignore: this is safe, we don't want to actually make scrolltotop.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import scrollToTopScript from "./scripts/scrolltotop.inline"
import styles from "./styles/scrolltotop.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ScrollToTop: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <button 
      class={classNames(displayClass, "scroll-to-top")} 
      id="scroll-to-top"
      aria-label="回到顶部"
      title="回到顶部"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="20"
        height="20"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  )
}

ScrollToTop.beforeDOMLoaded = scrollToTopScript
ScrollToTop.css = styles

export default (() => ScrollToTop) satisfies QuartzComponentConstructor
