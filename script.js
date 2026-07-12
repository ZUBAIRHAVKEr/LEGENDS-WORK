document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. LOADING PRELOADER ANIMATION
       ========================================== */
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 400); // Small clean buffer delay
        });
    }

    /* ==========================================
       2. RESPONSIVE MOBILE MENU TOGGLE
       ========================================== */
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('is-active');
                navMenu.classList.remove('active');
            }
        });
    });

    /* ==========================================
       3. DYNAMIC NAVBAR STYLING ON SCROLL
       ========================================== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================
       4. SCROLL REVEAL INTERSECTION OBSERVER
       ========================================== */
    const revealItems = document.querySelectorAll('.scroll-reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Unobserve after item is revealed to keep processing efficient
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    /* ==========================================
       5. ACTIVE NAVIGATION CURRENT SECTION LINK TRACKER
       ========================================== */
    const sections = document.querySelectorAll('section, header');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}` || 
                (link.getAttribute('href') === 'tools.html' && window.location.pathname.includes('tools.html'))) {
                link.add('active');
            }
        });
    });

    /* ==========================================
       6. BACK TO TOP BUTTON LOGIC
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       7. CONTACT FORM LOGIC (CLIENT-SIDE SAFE ONLY)
       ========================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract values safely
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if(name && email && subject && message) {
                // UI feedback execution trace
                const submitBtn = contactForm.querySelector('.form-btn');
                const nativeText = submitBtn.textContent;
                
                submitBtn.textContent = 'TRANSMITTING SECURE DATA...';
                submitBtn.style.background = '#008cff';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert(`System Communication Status: Complete!\nThank you ${name}. Your request regarding "${subject}" has been successfully logged.`);
                    contactForm.reset();
                    submitBtn.textContent = nativeText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
});