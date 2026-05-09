/**
 * Park Lane Methodist Church - Modern Website Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Wembley Park Lane Methodist Church Website Initialized');

    // 1. Mobile Menu Toggle (To be implemented with a burger icon)
    const initMobileMenu = () => {
        // Placeholder for future mobile menu logic
    };

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});
