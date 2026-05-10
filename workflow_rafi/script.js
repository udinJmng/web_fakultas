/* ===================================================
   FAKULTAS SAINS & TEKNOLOGI - UNIVERSITAS PIGNATELLI TRIPUTRA
   GSAP Animations & Interactivity
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ===================================================
    // 1. NAVBAR SCROLL EFFECT
    // ===================================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ===================================================
    // 2. HERO PARTICLES
    // ===================================================
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${8 + Math.random() * 15}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.width = `${2 + Math.random() * 5}px`;
            particle.style.height = particle.style.width;
            particle.style.opacity = 0.2 + Math.random() * 0.4;
            heroParticles.appendChild(particle);
        }
    }

    // ===================================================
    // 3. GSAP HERO ANIMATIONS
    // ===================================================
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTimeline
        .from('.hero-badge', { opacity: 0, y: 30, duration: 0.8 })
        .from('.hero-title', { opacity: 0, y: 40, duration: 0.8 }, '-=0.4')
        .from('.hero-description', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
        .from('.hero-buttons', { opacity: 0, y: 25, duration: 0.7 }, '-=0.3')
        .from('.hero-stat-item', { opacity: 0, y: 25, stagger: 0.1, duration: 0.7 }, '-=0.3');

    // Scroll indicator animation
    gsap.to('.scroll-line', {
        scaleY: 1.3,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'power1.inOut',
    });

    // ===================================================
    // 4. COUNTER ANIMATION
    // ===================================================
    const statNumbers = document.querySelectorAll('.hero-stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            const currentValue = Math.floor(easedProgress * target);

            el.textContent = currentValue.toLocaleString();
            if (target >= 95 && currentValue >= target) {
                el.textContent = target + '%';
            } else if (target >= 1000 && currentValue >= target) {
                el.textContent = target.toLocaleString() + '+';
            } else if (currentValue >= target) {
                el.textContent = target.toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Trigger counter when hero stats are in view
    const heroStatsSection = document.querySelector('.hero-stats');
    if (heroStatsSection) {
        let countersAnimated = false;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !countersAnimated) {
                        countersAnimated = true;
                        statNumbers.forEach((num) => animateCounter(num));
                    }
                });
            },
            { threshold: 0.5 }
        );
        observer.observe(heroStatsSection);
    }

    // ===================================================
    // 5. GSAP SCROLL ANIMATIONS
    // ===================================================

    // ------------------ PERBAIKAN: About cards (Visi & Misi) ------------------
    // Hapus opacity: 0 agar kartu selalu terlihat, hanya animasi pergeseran
    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
        });
    });

    // Roadmap items
    gsap.from('.roadmap-item', {
        scrollTrigger: {
            trigger: '.roadmap-timeline',
            start: 'top 75%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
    });

    // ------------------ PERBAIKAN: Gallery items (Kegiatan & Prestasi) ------------------
    // Hapus opacity: 0 agar galeri selalu terlihat, hanya animasi pergeseran vertikal
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
    });

    // CTA section
    gsap.from('.cta-content', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
    });

    // ===================================================
    // 6. PROGRAM TABS
    // ===================================================
    const programTabBtns = document.querySelectorAll('.program-tab-btn');
    const programTabContents = document.querySelectorAll('.program-tab-content');

    programTabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetProdi = btn.getAttribute('data-prodi');

            // Remove active from all buttons and contents
            programTabBtns.forEach((b) => b.classList.remove('active'));
            programTabContents.forEach((c) => c.classList.remove('active'));

            // Add active to clicked button and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(`tab-${targetProdi}`);
            if (targetContent) {
                targetContent.classList.add('active');

                // Animate content entrance
                gsap.fromTo(
                    targetContent,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                );
            }
        });
    });

    // ===================================================
    // 7. CURRICULUM TABS
    // ===================================================
    const curriculumTabBtns = document.querySelectorAll('.curriculum-tab-btn');
    const curriculumTabContents = document.querySelectorAll('.curriculum-tab-content');

    curriculumTabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetProdi = btn.getAttribute('data-curprodi');

            curriculumTabBtns.forEach((b) => b.classList.remove('active'));
            curriculumTabContents.forEach((c) => c.classList.remove('active'));

            btn.classList.add('active');
            const targetContent = document.getElementById(`cur-tab-${targetProdi}`);
            if (targetContent) {
                targetContent.classList.add('active');

                gsap.fromTo(
                    targetContent,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
                );

                // Re-animate roadmap items
                const roadmapItems = targetContent.querySelectorAll('.roadmap-item');
                gsap.fromTo(
                    roadmapItems,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        stagger: 0.08,
                        duration: 0.5,
                        ease: 'power3.out',
                    }
                );
            }
        });
    });

    // ===================================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // ===================================================
    // 9. GALLERY ITEM HOVER EFFECT (GSAP)
    // ===================================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item) => {
        const img = item.querySelector('img');

        item.addEventListener('mouseenter', () => {
            if (img) {
                gsap.to(img, { scale: 1.08, duration: 0.5, ease: 'power2.out' });
            }
        });

        item.addEventListener('mouseleave', () => {
            if (img) {
                gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
            }
        });
    });

    // ===================================================
    // 10. INITIAL STATE SETUP
    // ===================================================
    // Ensure first tabs are active on load
    if (programTabContents.length > 0) {
        programTabContents.forEach((c) => c.classList.remove('active'));
        const firstProgramTab = document.getElementById('tab-rpl');
        if (firstProgramTab) firstProgramTab.classList.add('active');
    }

    if (curriculumTabContents.length > 0) {
        curriculumTabContents.forEach((c) => c.classList.remove('active'));
        const firstCurriculumTab = document.getElementById('cur-tab-rpl');
        if (firstCurriculumTab) firstCurriculumTab.classList.add('active');
    }

    console.log('🚀 FST UPITRA Website siap!');
    console.log('📁 Fakultas Sains & Teknologi - Universitas Pignatelli Triputra');
    console.log('🎨 Palet: Putih, Biru Muda, Biru, Biru Tua');
    console.log('✨ Powered by GSAP ' + gsap.version);
});

// ===================================================
// Handle image loading errors gracefully
// ===================================================
window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('gallery-placeholder')) {
                placeholder.style.display = 'flex';
            }
        });
    });
});