/* ========================================================================
   PREMIUM PORTFOLIO — JAVASCRIPT
   Pure vanilla JS — no libraries
   ======================================================================== */

(function () {
    'use strict';

    /* ---- DOM REFERENCES ---- */
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navCta = document.getElementById('navCta');
    const backToTop = document.getElementById('backToTop');
    const pageLoader = document.getElementById('pageLoader');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const contactForm = document.getElementById('contactForm');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    /* ==================================================================
       1. PAGE LOADER
    ================================================================== */
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('loaded');
        }, 1600);
    });

    /* ==================================================================
       2. CUSTOM CURSOR (desktop only)
    ================================================================== */
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouchDevice && cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth trailing for outline
        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover grow effect on interactive elements
        const interactives = document.querySelectorAll('a, button, .project-card, input, textarea');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    }

    /* ==================================================================
       3. NAVBAR — scroll behavior
    ================================================================== */
    let lastScroll = 0;
    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* ==================================================================
       4. MOBILE NAVIGATION
    ================================================================== */
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            if (navCta) navCta.classList.toggle('open');
            body.classList.toggle('no-scroll', isOpen);
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                if (navCta) navCta.classList.remove('open');
                body.classList.remove('no-scroll');
            });
        });
    }

    /* ==================================================================
       5. SMOOTH SCROLL for nav links
    ================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight + 10 : 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ==================================================================
       6. ACTIVE NAV LINK DETECTION
    ================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function setActiveNav() {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', setActiveNav, { passive: true });

    /* ==================================================================
       7. SCROLL REVEAL — Intersection Observer
    ================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: reveal all
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    /* ==================================================================
       8. ANIMATED COUNTERS
    ================================================================== */
    const counters = document.querySelectorAll('[data-count]');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000; // ms
        const startTime = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.round(easedProgress * target);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(updateCounter);
    }

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => counterObserver.observe(el));
    } else {
        counters.forEach(el => {
            el.textContent = el.getAttribute('data-count');
        });
    }

    /* ==================================================================
       9. PROJECT MODAL
    ================================================================== */
    const projectCards = document.querySelectorAll('.project-card[data-project]');

    /* EDIT: Project data — update with your real projects */
    const projectData = {
        1: {
            title: 'E-Commerce Platform Redesign',
            category: 'Web Design & Development',
            description: 'A complete redesign of an e-commerce platform focused on improving user experience, conversion rates, and brand perception. The project involved extensive user research, wireframing, prototyping, and front-end development.',
            tech: ['HTML', 'CSS', 'JavaScript', 'Figma', 'UI/UX Design'],
            image: 'https://images.pexels.com/photos/34804003/pexels-photo-34804003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
            link: '#'
        },
        2: {
            title: 'Brand Identity — Artisan Studio',
            category: 'Branding & Graphic Design',
            description: 'Developed a comprehensive brand identity for a creative studio, including logo design, color system, typography guidelines, business cards, and social media templates.',
            tech: ['Illustrator', 'Photoshop', 'Branding', 'Typography'],
            image: 'https://images.pexels.com/photos/41227/pexels-photo-41227.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
            link: '#'
        },
        3: {
            title: 'SaaS Dashboard Interface',
            category: 'UI/UX Design',
            description: 'Designed and developed a clean, modern dashboard interface for a SaaS analytics platform. Focused on data visualization, accessibility, and responsive design across all devices.',
            tech: ['Figma', 'HTML', 'CSS', 'JavaScript', 'Charts'],
            image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
            link: '#'
        },
        4: {
            title: 'Digital Marketing Campaign',
            category: 'Social Media & Digital Marketing',
            description: 'Created a multi-platform digital marketing campaign including social media creatives, landing pages, email templates, and advertising materials that drove a 40% increase in engagement.',
            tech: ['Photoshop', 'After Effects', 'Social Media', 'Analytics'],
            image: 'https://images.pexels.com/photos/8534041/pexels-photo-8534041.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
            link: '#'
        }
    };

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        document.getElementById('modalImg').src = data.image;
        document.getElementById('modalImg').alt = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDesc').textContent = data.description;
        document.getElementById('modalLink').href = data.link;

        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        data.tech.forEach(t => {
            const span = document.createElement('span');
            span.textContent = t;
            techContainer.appendChild(span);
        });

        modalOverlay.classList.add('active');
        body.classList.add('no-scroll');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.getAttribute('data-project'));
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card.getAttribute('data-project'));
            }
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    /* ==================================================================
       10. CONTACT FORM VALIDATION
    ================================================================== */
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            this.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
            document.getElementById('formSuccess').classList.remove('show');

            // Name
            const name = this.querySelector('#formName');
            if (!name.value.trim()) {
                name.closest('.form-group').classList.add('error');
                isValid = false;
            }

            // Email
            const email = this.querySelector('#formEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.closest('.form-group').classList.add('error');
                isValid = false;
            }

            // Subject
            const subject = this.querySelector('#formSubject');
            if (!subject.value.trim()) {
                subject.closest('.form-group').classList.add('error');
                isValid = false;
            }

            // Message
            const message = this.querySelector('#formMessage');
            if (!message.value.trim()) {
                message.closest('.form-group').classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                // NOTE: Connect to your backend/email service here
                document.getElementById('formSuccess').classList.add('show');
                this.reset();

                // Hide success after 5 seconds
                setTimeout(() => {
                    document.getElementById('formSuccess').classList.remove('show');
                }, 5000);
            }
        });
    }

    /* ==================================================================
       11. BACK-TO-TOP BUTTON
    ================================================================== */
    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', handleBackToTop, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==================================================================
       12. SUBTLE PARALLAX on Hero
    ================================================================== */
    const heroBlobs = document.querySelectorAll('.hero-blob');
    const heroFloats = document.querySelectorAll('.hero-float');

    if (!isTouchDevice) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                const factor = scrollY * 0.15;
                heroBlobs.forEach((blob, i) => {
                    const dir = i % 2 === 0 ? 1 : -1;
                    blob.style.transform = `translateY(${factor * dir}px)`;
                });
            }
        }, { passive: true });

        // Mouse-based parallax for hero floats
        const hero = document.getElementById('home');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                heroFloats.forEach((el, i) => {
                    const speed = (i + 1) * 8;
                    el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });
            });
        }
    }

    /* ==================================================================
       13. IMAGE LAZY LOADING FALLBACK
    ================================================================== */
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported — do nothing extra
    } else {
        // Simple fallback
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    lazyObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => lazyObserver.observe(img));
    }

    /* ==================================================================
       14. YEAR in footer
    ================================================================== */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
