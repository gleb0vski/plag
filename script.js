(function() {
    // Burger menu
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    function closeMenu() {
        burgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        burgerBtn.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Закрытие по клику на ссылки в меню
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        // Закрытие по клику вне меню
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !burgerBtn.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Закрытие при ресайзе окна (если стало больше 999px)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 999 && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // Scroll to services
    const scrollLinks = document.querySelectorAll('[data-scroll-to="services"]');
    const servicesBlock = document.getElementById('services');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (servicesBlock) {
                servicesBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Modal
    const modal = document.getElementById('callbackModal');
    const openBtns = document.querySelectorAll('[data-modal-open]');
    const closeBtn = document.getElementById('closeModalBtn');
    function openModal() { if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; } }
    function closeModal() { if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } }
    openBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
    
    // Form submit
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset();
            closeModal();
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => { item.classList.toggle('active'); });
        }
    });
    
    // Animated circle 1 (ИИ-ТЕКСТ, 81.51%)
    const circle1 = document.getElementById('animatedCircle');
    const percentSpan1 = document.getElementById('percentValue');
    if (circle1 && percentSpan1) {
        const circumference1 = 2 * Math.PI * 96;
        const targetPercent1 = 81.51;
        let currentPercent1 = 0;
        const duration1 = 1500;
        let startTime1 = null;
        function animate1(timestamp) {
            if (!startTime1) startTime1 = timestamp;
            const elapsed = timestamp - startTime1;
            const progress = Math.min(1, elapsed / duration1);
            currentPercent1 = targetPercent1 * progress;
            const offset = circumference1 - (currentPercent1 / 100) * circumference1;
            circle1.style.strokeDashoffset = offset;
            percentSpan1.innerText = Math.floor(currentPercent1) + '%';
            if (progress < 1) {
                requestAnimationFrame(animate1);
            } else {
                percentSpan1.innerText = targetPercent1 + '%';
                circle1.style.strokeDashoffset = circumference1 - (targetPercent1 / 100) * circumference1;
            }
        }
        requestAnimationFrame(animate1);
    }
    
    // Animated circle 2 (ОРИГИНАЛЬНОСТЬ, 92.89%)
    const circle2 = document.getElementById('animatedCircle2');
    const percentSpan2 = document.getElementById('percentValue2');
    if (circle2 && percentSpan2) {
        const circumference2 = 2 * Math.PI * 96;
        const targetPercent2 = 92.89;
        let currentPercent2 = 0;
        const duration2 = 1500;
        let startTime2 = null;
        function animate2(timestamp) {
            if (!startTime2) startTime2 = timestamp;
            const elapsed = timestamp - startTime2;
            const progress = Math.min(1, elapsed / duration2);
            currentPercent2 = targetPercent2 * progress;
            const offset = (currentPercent2 / 100) * circumference2;
            circle2.style.strokeDashoffset = offset;
            percentSpan2.innerText = Math.floor(currentPercent2) + '%';
            if (progress < 1) {
                requestAnimationFrame(animate2);
            } else {
                percentSpan2.innerText = targetPercent2 + '%';
                circle2.style.strokeDashoffset = (targetPercent2 / 100) * circumference2;
            }
        }
        requestAnimationFrame(animate2);
    }
    
    // Stats list animation
    const statElements = document.querySelectorAll('.stats-value');
    function animateStat(el, target) {
        let current = 0;
        const duration = 1500;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target + '%';
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current) + '%';
            }
        }, stepTime);
    }
    statElements.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        if (!isNaN(target)) {
            animateStat(el, target);
        }
    });
})();