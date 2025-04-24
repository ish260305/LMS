// Example JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add page transition effects
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 300);
            }
        });
    });

    // Add entrance animations for cards
    const cards = document.querySelectorAll('.transform');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('motion-safe:animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    });

    cards.forEach(card => observer.observe(card));

    // Add loading state for buttons
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('loading');
        });
    });
});

// Add some CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .motion-safe\:animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
    }

    .fade-out {
        opacity: 0;
        transition: opacity 0.3s ease-out;
    }

    .loading {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
    }

    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1em;
        height: 1em;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
});