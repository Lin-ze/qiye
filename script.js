// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 创建并添加返回顶部按钮
    const backToTopBtn = document.createElement('div');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // 创建并添加页面进度条
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    // 创建页面过渡层
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        // 返回顶部按钮显示/隐藏
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // 更新滚动进度条
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // 滚动动画
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
        
        // 导航栏滚动效果
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 返回顶部功能
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 显示页面过渡动画
                pageTransition.classList.add('active');
                
                // 滚动到目标位置
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 隐藏页面过渡动画
                    setTimeout(() => {
                        pageTransition.classList.remove('active');
                    }, 300);
                }, 300);
            }
        });
    });
    
    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // 创建成功模态框
                const successModal = document.createElement('div');
                successModal.className = 'modal';
                successModal.innerHTML = `
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <h3>消息发送成功！</h3>
                        <p>感谢您的联系，我们的团队将在24小时内回复您。</p>
                        <button class="btn btn-primary" style="margin-top: 20px;">确定</button>
                    </div>
                `;
                
                document.body.appendChild(successModal);
                
                // 显示模态框
                setTimeout(() => {
                    successModal.classList.add('show');
                }, 100);
                
                // 关闭模态框
                const closeBtn = successModal.querySelector('.modal-close');
                const confirmBtn = successModal.querySelector('.btn');
                
                const closeModal = () => {
                    successModal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(successModal);
                        contactForm.reset();
                    }, 300);
                };
                
                closeBtn.addEventListener('click', closeModal);
                confirmBtn.addEventListener('click', closeModal);
                
                // 点击模态框背景关闭
                successModal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeModal();
                    }
                });
            }
        });
    }
    
    // 导航栏搜索功能
    const searchInput = document.querySelector('.nav-search input');
    const searchBtn = document.querySelector('.nav-search button');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (searchInput.value.trim()) {
                alert(`搜索关键词: ${searchInput.value}`);
                // 这里可以添加实际的搜索功能
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                alert(`搜索关键词: ${this.value}`);
                // 这里可以添加实际的搜索功能
            }
        });
    }
    
    // 移动端汉堡菜单
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // 导航链接点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            // 移除所有active类
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            // 添加active类到当前链接
            this.classList.add('active');
            
            // 移动端点击后关闭菜单
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });
    
    // 订阅功能
    const subscribeBtn = document.querySelector('.footer-column:last-child .btn');
    const subscribeInput = document.querySelector('.footer-column:last-child input[type="email"]');
    
    if (subscribeBtn && subscribeInput) {
        subscribeBtn.addEventListener('click', function() {
            if (subscribeInput.value && validateEmail(subscribeInput.value)) {
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <h3>订阅成功！</h3>
                        <p>感谢订阅，我们将定期发送最新资讯到您的邮箱。</p>
                        <button class="btn btn-primary" style="margin-top: 20px;">确定</button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                setTimeout(() => {
                    modal.classList.add('show');
                }, 100);
                
                const closeBtn = modal.querySelector('.modal-close');
                const confirmBtn = modal.querySelector('.btn');
                
                const closeModal = () => {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        subscribeInput.value = '';
                    }, 300);
                };
                
                closeBtn.addEventListener('click', closeModal);
                confirmBtn.addEventListener('click', closeModal);
                
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeModal();
                    }
                });
            } else {
                alert('请输入有效的邮箱地址');
            }
        });
    }
    
    // 添加滚动动画类
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // 触发初始动画
    setTimeout(() => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    }, 100);
    
    // 数字计数动画
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(target.toString(), '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 20);
    });
    
    // 服务卡片点击效果
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h3>${title}</h3>
                    <p>${this.querySelector('p').textContent}</p>
                    <p style="margin-top: 20px;">如需了解更多详情，请联系我们的销售团队。</p>
                    <button class="btn btn-primary" style="margin-top: 20px;" onclick="location.href='#contact'">立即咨询</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.classList.add('show');
            }, 100);
            
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                }
            });
        });
    });
});

// 邮箱验证函数
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 滚动到特定元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 显示加载动画
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-spinner';
    loading.innerHTML = `
        <div class="spinner"></div>
        <p>加载中...</p>
    `;
    document.body.appendChild(loading);
    return loading;
}

// 隐藏加载动画
function hideLoading(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
    }
}
// 在已有的JavaScript代码末尾添加以下内容

// 客户评价轮播
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    function showSlide(n) {
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 循环控制
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // 显示当前幻灯片
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // 自动轮播
    let slideInterval = setInterval(nextSlide, 5000);
    
    // 鼠标悬停暂停轮播
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // 事件监听
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // 点导航
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// 数字计数器
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target;
            }
        };
        
        // 使用Intersection Observer API
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// 新闻卡片点击效果
function initNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.news-read-more')) {
                const title = this.querySelector('h3').textContent;
                const content = this.querySelector('p').textContent;
                
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <h3>${title}</h3>
                        <p>${content}</p>
                        <p style="margin-top: 20px;">这是新闻的详细内容。在实际应用中，这里会显示完整的文章内容。</p>
                        <div class="news-details">
                            <span><i class="far fa-calendar"></i> 2024年5月15日</span>
                            <span><i class="far fa-eye"></i> 256 次阅读</span>
                        </div>
                        <button class="btn btn-primary" style="margin-top: 20px;">继续阅读</button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                setTimeout(() => {
                    modal.classList.add('show');
                }, 100);
                
                const closeBtn = modal.querySelector('.modal-close');
                const confirmBtn = modal.querySelector('.btn');
                
                const closeModal = () => {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                };
                
                closeBtn.addEventListener('click', closeModal);
                confirmBtn.addEventListener('click', closeModal);
                
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeModal();
                    }
                });
            }
        });
    });
}

// 平滑滚动到职业发展部分
function initSmoothScroll() {
    const careerLink = document.querySelector('a[href="#careers"]');
    if (careerLink) {
        careerLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#careers');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// 初始化所有功能
function initAdditionalFeatures() {
    // 在DOMContentLoaded事件中添加
    initTestimonialSlider();
    initNewsCards();
    initSmoothScroll();
    
    // 检查是否有数字计数器
    if (document.querySelector('.counter')) {
        initCounters();
    }
}

// 页面加载时初始化
window.addEventListener('DOMContentLoaded', function() {
    // ... 您现有的初始化代码 ...
    initAdditionalFeatures();
});

// 添加页面性能监控
function monitorPerformance() {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
    });
}

// 添加错误监控
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 添加页面可见性API支持
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('页面被隐藏');
    } else {
        console.log('页面重新获得焦点');
    }
});

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭所有模态框
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.classList.contains('show')) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.parentNode.removeChild(modal);
                }, 300);
            }
        });
    }
    
    // Alt + 1 返回顶部
    if (e.altKey && e.key === '1') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// 添加复制功能
function initCopyEmail() {
    const emailElements = document.querySelectorAll('p:contains("@")');
    
    emailElements.forEach(element => {
        if (element.textContent.includes('@')) {
            element.style.cursor = 'pointer';
            element.title = '点击复制邮箱';
            
            element.addEventListener('click', function() {
                const text = this.textContent.trim();
                navigator.clipboard.writeText(text)
                    .then(() => {
                        const originalText = this.textContent;
                        this.textContent = '已复制到剪贴板！';
                        
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('复制失败:', err);
                    });
            });
        }
    });
}// 在现有script.js的最后添加

// 视差滚动效果
function initParallax() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// 打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 粒子背景效果
function createParticleBackground() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(0, 123, 255, 0.2);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // 添加动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 初始化打字机效果
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
    
    // 创建粒子背景
    createParticleBackground();
    
    // 初始化视差效果
    initParallax();
    
    // 初始化复制功能
    initCopyEmail();
    
    // 添加页面加载完成的效果
    document.body.classList.add('loaded');
});
// 轮播图功能
function initCarousel() {
    const carousel = document.querySelector('.carousel-slider');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 循环控制
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        // 显示当前幻灯片
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
    
    // 自动轮播
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // 事件监听
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    // 指示器点击
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
    
    // 鼠标悬停暂停
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // 触摸滑动
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoPlay();
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoPlay();
        }
    }
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
    
    // 开始自动轮播
    startAutoPlay();
}

// FAQ折叠功能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 关闭其他项目
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前项目
            item.classList.toggle('active');
        });
    });
}

// 下载表单
function initDownloadForm() {
    const downloadForm = document.querySelector('.download-form');
    if (!downloadForm) return;
    
    downloadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = downloadForm.querySelector('input[type="email"]');
        
        if (emailInput.value && validateEmail(emailInput.value)) {
            // 模拟下载
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h3>下载开始！</h3>
                    <p>白皮书已发送到您的邮箱：${emailInput.value}</p>
                    <p>同时，您也可以在5分钟内通过邮件中的链接下载。</p>
                    <div class="download-progress">
                        <div class="progress-bar" style="width: 0%"></div>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 20px;">完成</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.classList.add('show');
                
                // 模拟进度条
                const progressBar = modal.querySelector('.progress-bar');
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 5;
                    progressBar.style.width = progress + '%';
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        modal.querySelector('button').textContent = '下载完成！';
                    }
                }, 100);
                
            }, 100);
            
            const closeBtn = modal.querySelector('.modal-close');
            const confirmBtn = modal.querySelector('.btn');
            
            const closeModal = () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    emailInput.value = '';
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            confirmBtn.addEventListener('click', closeModal);
            
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
        } else {
            alert('请输入有效的邮箱地址');
        }
    });
}

// 技术栈标签动画
function initTechStack() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        const originalText = tag.textContent;
        
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
        
        // 点击复制
        tag.addEventListener('click', () => {
            navigator.clipboard.writeText(originalText)
                .then(() => {
                    const original = tag.textContent;
                    tag.textContent = '已复制！';
                    tag.style.backgroundColor = '#4cd964';
                    
                    setTimeout(() => {
                        tag.textContent = original;
                        tag.style.backgroundColor = '';
                    }, 1500);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                });
        });
    });
}

// 博客卡片点击
function initBlogCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.blog-read-more')) {
                const title = this.querySelector('h3').textContent;
                const category = this.querySelector('.blog-category').textContent;
                const meta = this.querySelector('.blog-meta').innerHTML;
                
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content" style="max-width: 800px;">
                        <span class="modal-close">&times;</span>
                        <div class="blog-modal-header">
                            <span class="blog-category">${category}</span>
                            <h3>${title}</h3>
                            <div class="blog-meta">${meta}</div>
                        </div>
                        <div class="blog-modal-content">
                            <p>这是文章的详细内容。在实际应用中，这里会显示完整的博客文章。</p>
                            <p>林泽科技在数字化转型方面有着丰富的经验。我们通过创新技术帮助企业实现业务增长和效率提升。</p>
                            <h4>主要观点</h4>
                            <ul>
                                <li>数字化转型是未来发展的必然趋势</li>
                                <li>AI技术正在改变传统行业</li>
                                <li>数据安全是企业必须重视的问题</li>
                                <li>云原生架构提供更好的扩展性</li>
                            </ul>
                            <p>我们的团队将继续探索前沿技术，为客户提供更优质的服务。</p>
                        </div>
                        <div class="blog-modal-footer">
                            <button class="btn btn-primary" onclick="location.href='#contact'">咨询相关服务</button>
                            <button class="btn btn-outline">分享文章</button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                setTimeout(() => {
                    modal.classList.add('show');
                }, 100);
                
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                });
                
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        modal.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(modal);
                        }, 300);
                    }
                });
            }
        });
    });
}

// 高级数字计数器
function initAdvancedCounters() {
    const counters = document.querySelectorAll('.counter[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const speed = 2000; // 动画时长(ms)
                
                const increment = target / (speed / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (current > target) current = target;
                        counter.textContent = Math.floor(current);
                        setTimeout(updateCounter, 16);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 页面水印
function addWatermark() {
    const watermark = document.createElement('div');
    watermark.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.03;
        background-image: repeating-linear-gradient(
            45deg,
            var(--primary-color) 0px,
            var(--primary-color) 1px,
            transparent 1px,
            transparent 20px
        );
        display: none;
    `;
    
    document.body.appendChild(watermark);
    
    // 添加水印控制
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'W') {
            watermark.style.display = watermark.style.display === 'none' ? 'block' : 'none';
        }
    });
}

// 主题切换
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // 保存主题偏好
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// 深色主题样式
const darkThemeCSS = `
    <style id="dark-theme">
        .dark-theme {
            background-color: #1a1a1a;
            color: #e0e0e0;
        }
        
        .dark-theme .service-card,
        .dark-theme .product-card,
        .dark-theme .team-member,
        .dark-theme .news-card,
        .dark-theme .blog-card,
        .dark-theme .tech-category,
        .dark-theme .faq-question,
        .dark-theme .timeline-content {
            background-color: #2d2d2d;
            color: #e0e0e0;
        }
        
        .dark-theme h1,
        .dark-theme h2,
        .dark-theme h3,
        .dark-theme h4 {
            color: #ffffff;
        }
        
        .dark-theme p {
            color: #b0b0b0;
        }
        
        .dark-theme .navbar {
            background-color: rgba(26, 26, 26, 0.95);
        }
        
        .dark-theme .nav-menu {
            background-color: #2d2d2d;
        }
        
        .dark-theme .modal-content {
            background-color: #2d2d2d;
            color: #e0e0e0;
        }
    </style>
`;

// 初始化所有功能
function initAllFeatures() {
    // 添加深色主题样式
    document.head.insertAdjacentHTML('beforeend', darkThemeCSS);
    
    // 初始化各个功能
    initCarousel();
    initFAQ();
    initDownloadForm();
    initTechStack();
    initBlogCards();
    initAdvancedCounters();
    addWatermark();
    initThemeSwitcher();
    
    // 添加页面加载完成的效果
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// 在页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 原有的初始化代码...
    initAllFeatures();
});

// 添加页面性能优化
window.addEventListener('load', () => {
    // 懒加载图片
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // 预加载关键资源
    const preloadLinks = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
});

// 添加页面切换动画
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#!')) return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                // 添加页面过渡动画
                const transition = document.createElement('div');
                transition.className = 'page-transition-overlay';
                transition.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--primary-color);
                    z-index: 9999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                document.body.appendChild(transition);
                
                // 显示过渡
                setTimeout(() => {
                    transition.style.opacity = '1';
                }, 10);
                
                // 滚动到目标
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // 隐藏过渡
                    setTimeout(() => {
                        transition.style.opacity = '0';
                        
                        setTimeout(() => {
                            document.body.removeChild(transition);
                        }, 300);
                    }, 300);
                }, 300);
            }
        });
    });
}
// 价格套餐切换
function initPricingSwitch() {
    const toggle = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    
    if (!toggle) return;
    
    toggle.addEventListener('change', function() {
        if (this.checked) {
            monthlyPrices.forEach(price => price.style.display = 'none');
            yearlyPrices.forEach(price => price.style.display = 'block');
        } else {
            monthlyPrices.forEach(price => price.style.display = 'block');
            yearlyPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// 地图功能
function initMap() {
    const mapBtn = document.getElementById('showMapBtn');
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    
    if (!mapBtn || !mapPlaceholder) return;
    
    mapBtn.addEventListener('click', function() {
        const mapReal = document.createElement('div');
        mapReal.className = 'map-real';
        mapReal.innerHTML = `
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.947674203123!2d113.7266091153429!3d22.58376928518075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f5d5b7e7e7e7%3A0x6c5c2c5c2c5c2c5c!2z5rKZ5rKZ5Lq65Lq65Lq65Lq65Lq65Lq6!5e0!3m2!1szh-CN!2scn!4v1684147200000!5m2!1szh-CN!2scn" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
        
        mapPlaceholder.innerHTML = '';
        mapPlaceholder.appendChild(mapReal);
        mapReal.classList.add('active');
        
        // 更新按钮
        this.innerHTML = '<i class="fas fa-compress"></i> 收起地图';
        this.onclick = function() {
            mapPlaceholder.innerHTML = `
                <div class="map-overlay">
                    <i class="fas fa-map-marked-alt"></i>
                    <h4>点击查看地图</h4>
                </div>
            `;
            this.innerHTML = '<i class="fas fa-map-marked-alt"></i> 查看地图';
            this.onclick = initMap;
        };
    });
}

// 聊天机器人功能
function initChatWidget() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-input button');
    const chatBody = document.querySelector('.chat-body');
    
    if (!chatToggle) return;
    
    // 常见问题回答
    const responses = {
        'hello': '您好！欢迎来到林泽科技，请问有什么可以帮助您的吗？',
        'hi': '您好！我是智能助手，请问有什么可以为您服务的？',
        '你好': '您好！很高兴为您服务。',
        '价格': '我们提供多种服务套餐，您可以在价格套餐部分查看详细信息和报价。',
        '套餐': '我们有基础、专业和企业三种套餐，详情请查看价格套餐部分。',
        '联系': '您可以通过电话 +86 191 2036 0184 或邮箱 info@innovatech.com 联系我们。',
        '地址': '我们的地址是：广东省东莞市万江街道下坝 林泽科技大厦',
        '时间': '我们的工作时间是周一至周五 9:00-18:00，周六 10:00-16:00',
        '服务': '我们提供软件开发、移动应用、云计算、数据分析、网络安全等服务。',
        '团队': '我们有一支专业的团队，包括技术专家、设计师和项目经理。',
        '项目': '您可以查看我们的"项目展示"部分了解我们的成功案例。',
        '默认': '抱歉，我还没有学会回答这个问题。您可以联系我们的客服人员获取更多帮助。'
    };
    
    // 打开/关闭聊天
    chatToggle.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });
    
    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });
    
    // 发送消息
    function sendMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        const now = new Date();
        messageTime.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        chatBody.appendChild(messageDiv);
        
        // 滚动到底部
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // 获取回答
    function getResponse(input) {
        input = input.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (input.includes(key)) {
                return response;
            }
        }
        
        return responses['默认'];
    }
    
    // 处理用户输入
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendMessage(message, true);
            
            // 模拟思考时间
            setTimeout(() => {
                const response = getResponse(message);
                sendMessage(response, false);
            }, 1000);
            
            chatInput.value = '';
        }
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
}

// 通知横幅控制
function initNotificationBanner() {
    const notification = document.querySelector('.notification-banner');
    const closeBtn = document.querySelector('.notification-close');
    
    if (!notification || !closeBtn) return;
    
    // 检查是否已经关闭过
    if (localStorage.getItem('notificationClosed')) {
        notification.remove();
        return;
    }
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideUp 0.5s ease forwards';
        notification.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            notification.remove();
        }, 500);
        
        // 记录关闭状态
        localStorage.setItem('notificationClosed', 'true');
    });
    
    // 自动关闭
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    }, 10000); // 10秒后自动关闭
}

// 页面加载动画
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    
    // 模拟加载进度
    const progressBar = loader.querySelector('.loader-progress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // 加载完成
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                }, 500);
            }, 500);
        }
        
        progressBar.style.width = progress + '%';
    }, 100);
    
    // 如果页面已经加载完成
    if (document.readyState === 'complete') {
        clearInterval(interval);
        progressBar.style.width = '100%';
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 500);
    }
}

// 滚动进度指示器
function initScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-progress';
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 滚动动画
function initScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
    
    // 为部分元素添加动画类
    document.querySelectorAll('section, .service-card, .team-member, .product-card, .certificate-card').forEach(el => {
        if (!el.classList.contains('hero')) {
            el.classList.add('animate-on-scroll');
        }
    });
}

// 证书卡片3D效果
function initCertificate3D() {
    const certificates = document.querySelectorAll('.certificate-card');
    
    certificates.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
    });
}

// 粒子效果增强
function initEnhancedParticles() {
    const particlesContainer = document.querySelector('.particles-container') || (() => {
        const container = document.createElement('div');
        container.className = 'particles-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(container);
        return container;
    })();
    
    const particleCount = 100;
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            filter: blur(${Math.random() * 2}px);
        `;
        
        particlesContainer.appendChild(particle);
        
        // 动画
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let vx = (Math.random() - 0.5) * 0.5;
    let vy = (Math.random() - 0.5) * 0.5;
    
    function move() {
        x += vx;
        y += vy;
        
        // 边界检查
        if (x < 0 || x > 100) vx = -vx;
        if (y < 0 || y > 100) vy = -vy;
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        requestAnimationFrame(move);
    }
    
    move();
}

// 页面切换动画
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#!')) return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                // 创建页面过渡效果
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                transition.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, var(--primary-color), #2ecc71);
                    z-index: 9999;
                    transform: scaleY(0);
                    transform-origin: top;
                    transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
                `;
                
                document.body.appendChild(transition);
                
                // 开始动画
                requestAnimationFrame(() => {
                    transition.style.transform = 'scaleY(1)';
                    
                    // 滚动到目标
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth' });
                        
                        // 结束动画
                        setTimeout(() => {
                            transition.style.transform = 'scaleY(0)';
                            transition.style.transformOrigin = 'bottom';
                            
                            // 移除元素
                            setTimeout(() => {
                                if (transition.parentNode) {
                                    transition.parentNode.removeChild(transition);
                                }
                            }, 600);
                        }, 500);
                    }, 300);
                });
            }
        });
    });
}

// 键盘导航
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + K 聚焦搜索框
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.nav-search input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // ESC 键关闭所有弹窗
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.classList.contains('show')) {
                    modal.classList.remove('show');
                    setTimeout(() => {
                        if (modal.parentNode) {
                            modal.parentNode.removeChild(modal);
                        }
                    }, 300);
                }
            });
            
            // 关闭聊天窗口
            const chat = document.querySelector('.chat-container');
            if (chat && chat.classList.contains('active')) {
                chat.classList.remove('active');
            }
        }
        
        // 数字键快速导航
        if (e.key >= '1' && e.key <= '6' && !e.ctrlKey) {
            const sections = [
                '#home', '#services', '#about', '#products', '#team', '#contact'
            ];
            const index = parseInt(e.key) - 1;
            if (sections[index]) {
                const target = document.querySelector(sections[index]);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 初始化所有功能
function initAll() {
    // 页面加载
    initPageLoader();
    
    // 基础功能
    initPricingSwitch();
    initMap();
    initChatWidget();
    initNotificationBanner();
    initScrollProgress();
    initScrollAnimation();
    initCertificate3D();
    initEnhancedParticles();
    initPageTransitions();
    initKeyboardNavigation();
    
    // 性能优化
    optimizePerformance();
    
    // 添加右键菜单
    initContextMenu();
    
    // 添加拖拽功能
    initDragAndDrop();
    
    // 添加打印样式
    addPrintStyles();
    
    // 初始化所有现有功能
    if (typeof initAllFeatures === 'function') {
        initAllFeatures();
    }
}

// 性能优化
function optimizePerformance() {
    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 防抖滚动事件
    const scrollHandler = throttle(() => {
        // 滚动时暂停重绘
        window.requestAnimationFrame(() => {
            // 滚动处理逻辑
        });
    }, 100);
    
    window.addEventListener('scroll', scrollHandler);
    
    // 内存优化
    window.addEventListener('beforeunload', () => {
        // 清理不需要的监听器
    });
}

// 右键菜单
function initContextMenu() {
    const menu = document.createElement('div');
    menu.id = 'customContextMenu';
    menu.style.cssText = `
        position: fixed;
        background: white;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px 0;
        min-width: 200px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        display: none;
    `;
    
    menu.innerHTML = `
        <div class="context-item" data-action="back">返回上一页</div>
        <div class="context-item" data-action="forward">前进</div>
        <div class="context-separator"></div>
        <div class="context-item" data-action="reload">重新加载</div>
        <div class="context-item" data-action="print">打印页面</div>
        <div class="context-separator"></div>
        <div class="context-item" data-action="top">返回顶部</div>
        <div class="context-item" data-action="bottom">滚动到底部</div>
    `;
    
    document.body.appendChild(menu);
    
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        menu.style.display = 'block';
        menu.style.left = e.pageX + 'px';
        menu.style.top = e.pageY + 'px';
    });
    
    document.addEventListener('click', () => {
        menu.style.display = 'none';
    });
    
    menu.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        switch(action) {
            case 'back':
                window.history.back();
                break;
            case 'forward':
                window.history.forward();
                break;
            case 'reload':
                window.location.reload();
                break;
            case 'print':
                window.print();
                break;
            case 'top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'bottom':
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
        }
        
        menu.style.display = 'none';
    });
}

// 拖拽功能
function initDragAndDrop() {
    const dragElements = document.querySelectorAll('.service-card, .product-card, .certificate-card');
    
    dragElements.forEach(element => {
        element.setAttribute('draggable', 'true');
        
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', element.querySelector('h3')?.textContent || '');
            element.style.opacity = '0.5';
        });
        
        element.addEventListener('dragend', () => {
            element.style.opacity = '1';
        });
        
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            element.style.border = '2px dashed var(--primary-color)';
        });
        
        element.addEventListener('dragleave', () => {
            element.style.border = '';
        });
        
        element.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            console.log('拖拽元素:', data);
            element.style.border = '';
            
            // 显示拖拽成功提示
            const notification = document.createElement('div');
            notification.textContent = `已拖拽: ${data}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 2000);
        });
    });
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// 打印样式
function addPrintStyles() {
    const printStyle = document.createElement('style');
    printStyle.media = 'print';
    printStyle.textContent = `
        @media print {
            .chat-widget,
            .notification-banner,
            .page-loader,
            .page-transition,
            #customContextMenu,
            #backToTop {
                display: none !important;
            }
            
            body {
                font-size: 12pt;
                line-height: 1.5;
            }
            
            a {
                color: black !important;
                text-decoration: none;
            }
            
            .btn, .chat-toggle, .switch {
                display: none !important;
            }
            
            .section {
                page-break-inside: avoid;
                margin-bottom: 2cm;
            }
            
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }
        }
    `;
    document.head.appendChild(printStyle);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initAll);
window.addEventListener('load', function() {
    // 页面完全加载后
    console.log('页面已完全加载');
    
    // 添加访问统计
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view');
    }
});

// 页面可见性变化
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = "👋 记得回来看看！";
    } else {
        document.title = "林泽科技 - 企业官网";
    }
});

// 网络状态监听
window.addEventListener('online', () => {
    showNotification('网络已连接', 'success');
});

window.addEventListener('offline', () => {
    showNotification('网络已断开，请检查连接', 'error');
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}