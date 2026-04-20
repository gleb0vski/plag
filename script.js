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
        
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !burgerBtn.contains(e.target)) {
                closeMenu();
            }
        });
        
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
    
    // Маска для телефона
    const phoneInput = document.getElementById('formPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            let formatted = '';
            if (value.length > 0) formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.slice(1, 4);
            if (value.length > 4) formatted += ') ' + value.slice(4, 7);
            if (value.length > 7) formatted += '-' + value.slice(7, 9);
            if (value.length > 9) formatted += '-' + value.slice(9, 11);
            
            this.value = formatted;
        });
    }
    
    // Form submit with validation and PHP
    const form = document.getElementById('orderForm');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (formError) formError.style.display = 'none';
            if (formSuccess) formSuccess.style.display = 'none';
            
            const nameInput = document.getElementById('formName');
            const phoneInputField = document.getElementById('formPhone');
            const emailInput = document.getElementById('formEmail');
            const messageInput = document.getElementById('formMessage');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInputField ? phoneInputField.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';
            
            if (!name) {
                if (formError) {
                    formError.textContent = 'Введите ваше имя';
                    formError.style.display = 'block';
                }
                return;
            }
            if (!phone) {
                if (formError) {
                    formError.textContent = 'Введите номер телефона';
                    formError.style.display = 'block';
                }
                return;
            }
            
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length < 11) {
                if (formError) {
                    formError.textContent = 'Введите корректный номер телефона (10 цифр после +7)';
                    formError.style.display = 'block';
                }
                return;
            }
            
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (formError) {
                    formError.textContent = 'Введите корректный email';
                    formError.style.display = 'block';
                }
                return;
            }
            
            if (!message) {
                if (formError) {
                    formError.textContent = 'Опишите вашу задачу';
                    formError.style.display = 'block';
                }
                return;
            }
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Отправка...';
            }
            
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('phone', phone);
                formData.append('email', email);
                formData.append('message', message);
                
                const response = await fetch('send.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    if (formSuccess) {
                        formSuccess.style.display = 'block';
                    }
                    if (form) form.reset();
                    setTimeout(() => {
                        if (formSuccess) formSuccess.style.display = 'none';
                        closeModal();
                    }, 3000);
                } else {
                    if (formError) {
                        formError.textContent = result.error || 'Ошибка отправки';
                        formError.style.display = 'block';
                    }
                }
            } catch (error) {
                if (formError) {
                    formError.textContent = 'Ошибка отправки. Попробуйте позже или напишите в Telegram.';
                    formError.style.display = 'block';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить заявку';
                }
            }
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