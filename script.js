document.addEventListener('DOMContentLoaded', function() {

    // --- Accordion Functionality ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Optional: Close other open accordions
            const currentlyActive = document.querySelector('.accordion-header.active');
            if (currentlyActive && currentlyActive !== this) {
                currentlyActive.classList.remove('active');
                currentlyActive.nextElementSibling.style.maxHeight = null;
            }

            // Toggle current accordion
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- On-Scroll Fade-In Animations ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('.portfolio-section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = 'home'; // Default to home
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Add subtle shadow to header on scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});