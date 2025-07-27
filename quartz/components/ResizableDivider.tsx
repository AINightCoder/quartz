import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ResizableDivider: QuartzComponent = () => {
  return (
    <div class="resizable-divider" id="resizable-divider">
      <div class="divider-line"></div>
    </div>
  )
}

ResizableDivider.css = `
.resizable-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6px;
  right: -3px;
  cursor: col-resize;
  z-index: 10;
  background: transparent;
  transition: background-color 0.2s ease;
}

.resizable-divider:hover {
  background-color: var(--tertiary);
}

.resizable-divider .divider-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background-color: transparent;
  transition: background-color 0.2s ease;
  transform: translateX(-50%);
}

.resizable-divider:hover .divider-line {
  background-color: var(--tertiary);
}

.resizable-divider.dragging {
  background-color: var(--tertiary);
}

.resizable-divider.dragging .divider-line {
  background-color: var(--tertiary);
}

/* 确保左侧栏有相对定位以便分隔线定位 */
.sidebar.left {
  position: relative;
}

/* 添加拖动时的全局样式 */
body.resizing {
  cursor: col-resize !important;
  user-select: none !important;
}

body.resizing * {
  cursor: col-resize !important;
  user-select: none !important;
}
`

ResizableDivider.afterDOMLoaded = `
function initResizableDivider() {
  const divider = document.getElementById('resizable-divider');
  const leftSidebar = document.querySelector('.sidebar.left');
  const quartzBody = document.getElementById('quartz-body');

  if (!divider || !leftSidebar || !quartzBody) return;

  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  // 获取当前左侧栏宽度
  function getCurrentWidth() {
    return leftSidebar.offsetWidth;
  }

  // 设置左侧栏宽度
  function setLeftSidebarWidth(width) {
    // 限制最小和最大宽度
    const minWidth = 200;
    const maxWidth = Math.min(600, window.innerWidth * 0.4);
    width = Math.max(minWidth, Math.min(maxWidth, width));

    // 更新CSS自定义属性
    document.documentElement.style.setProperty('--left-sidebar-width', width + 'px');

    // 更新网格模板列
    const rightSidebarWidth = 320; // 右侧栏固定宽度
    quartzBody.style.gridTemplateColumns = \`\${width}px auto \${rightSidebarWidth}px\`;

    // 保存到localStorage
    localStorage.setItem('leftSidebarWidth', width.toString());

    return width;
  }

  // 从localStorage恢复宽度
  function restoreWidth() {
    const savedWidth = localStorage.getItem('leftSidebarWidth');
    if (savedWidth) {
      setLeftSidebarWidth(parseInt(savedWidth));
    }
  }

  // 鼠标按下事件
  divider.addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startWidth = getCurrentWidth();

    divider.classList.add('dragging');
    document.body.classList.add('resizing');

    e.preventDefault();
  });

  // 鼠标移动事件
  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - startX;
    const newWidth = startWidth + deltaX;

    setLeftSidebarWidth(newWidth);

    e.preventDefault();
  });

  // 鼠标释放事件
  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      divider.classList.remove('dragging');
      document.body.classList.remove('resizing');
    }
  });

  // 双击重置宽度
  divider.addEventListener('dblclick', () => {
    setLeftSidebarWidth(320); // 重置为默认宽度
  });

  // 页面加载时恢复宽度
  restoreWidth();

  // 窗口大小改变时重新计算
  window.addEventListener('resize', () => {
    const currentWidth = getCurrentWidth();
    setLeftSidebarWidth(currentWidth);
  });
}

// 确保DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initResizableDivider);
} else {
  initResizableDivider();
}
`

export default (() => ResizableDivider) satisfies QuartzComponentConstructor
