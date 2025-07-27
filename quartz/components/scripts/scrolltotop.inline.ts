const initScrollToTop = () => {
  const scrollToTopButton = document.querySelector("#scroll-to-top") as HTMLButtonElement

  if (!scrollToTopButton) {
    console.warn("ScrollToTop button not found")
    return
  }

  console.log("ScrollToTop script initialized")

  // 显示/隐藏按钮的逻辑
  const toggleButtonVisibility = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const shouldShow = scrollTop > 300 // 滚动超过300px时显示

    if (shouldShow) {
      scrollToTopButton.classList.add("visible")
    } else {
      scrollToTopButton.classList.remove("visible")
    }
  }

  // 平滑滚动到顶部
  const scrollToTop = (e: Event) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // 初始检查
  toggleButtonVisibility()

  // 监听滚动事件
  let ticking = false
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        toggleButtonVisibility()
        ticking = false
      })
      ticking = true
    }
  }

  // 绑定事件
  scrollToTopButton.addEventListener("click", scrollToTop)
  window.addEventListener("scroll", handleScroll, { passive: true })

  // 清理函数
  window.addCleanup(() => {
    scrollToTopButton.removeEventListener("click", scrollToTop)
    window.removeEventListener("scroll", handleScroll)
  })
}

// 在DOM加载完成后立即执行
document.addEventListener("nav", initScrollToTop)

// 也在页面加载时执行一次
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollToTop)
} else {
  initScrollToTop()
}
