// 高级动画效果JavaScript

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加加载动画
    addLoadingAnimations();
    
    // 添加滚动动画
    addScrollAnimations();
    
    // 添加交互效果
    addInteractiveEffects();
});

// 加载动画函数
function addLoadingAnimations() {
    // 为页面元素添加渐入动画
    const elementsToAnimate = [
        '#page-header',
        '#recent-posts',
        '.aside-content',
        '.card-widget'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            // 设置延迟，让元素依次出现
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
    
    // 为头像添加旋转动画
    const avatar = document.querySelector('.avatar-img img');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.transform = 'rotate(360deg) scale(1.1)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    }
}

// 滚动动画函数
function addScrollAnimations() {
    // 创建Intersection Observer来检测元素是否进入视口
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 元素进入视口时添加动画
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.recent-post-item, .card-widget, .aside-list-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 滚动时更新导航栏样式
    let lastScrollTop = 0;
    const navbar = document.getElementById('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            if (navbar) {
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s ease';
            }
        } else {
            // 向上滚动
            if (navbar) {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// 交互效果函数
function addInteractiveEffects() {
    // 为所有按钮添加点击波纹效果
    const buttons = document.querySelectorAll('a, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建波纹元素
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // 动画结束后移除波纹元素
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 为链接添加悬停声音效果（可选）
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // 可以在这里添加声音效果
            this.style.cursor = 'pointer';
        });
    });
    
    // 添加打字机效果到标题
    const siteTitle = document.getElementById('site-title');
    if (siteTitle) {
        const originalText = siteTitle.textContent;
        siteTitle.textContent = '';
        siteTitle.classList.add('typewriter');
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                siteTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // 延迟开始打字效果
        setTimeout(typeWriter, 1000);
    }
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .typewriter {
        overflow: hidden;
        border-right: 2px solid #49b1f5;
        white-space: nowrap;
        animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
    }
    
    @keyframes typing {
        from { width: 0 }
        to { width: 100% }
    }
    
    @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: #49b1f5 }
    }
    
    /* 平滑滚动 */
    html {
        scroll-behavior: smooth;
    }
    
    /* 加载动画 */
    .loading {
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;

document.head.appendChild(style);

// 页面加载指示器
window.addEventListener('load', function() {
    // 移除加载动画
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => {
        el.classList.remove('loading');
    });
    
    // 添加加载完成动画
    document.body.classList.add('loaded');
});