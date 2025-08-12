
// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('yourName').value,
                email: document.getElementById('yourEmail').value,
                deviceType: document.getElementById('deviceType').value,
                location: document.getElementById('location').value,
                serviceType: document.getElementById('serviceType').value,
                problemDescription: document.getElementById('problemDescription').value
            };
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            bookingForm.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
                modal.hide();
            }, 2000);
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add button click animations
    const buttons = document.querySelectorAll('.btn-service, .btn-submit');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add fade-in animation for elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .contact-item, .intro-box');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Modal event listeners
    const skillsModal = document.getElementById('skillsModal');
    if (skillsModal) {
        skillsModal.addEventListener('shown.bs.modal', function() {
            // Add zoom animation to the skills image
            const skillsImage = this.querySelector('.skills-image');
            if (skillsImage) {
                skillsImage.style.transform = 'scale(0.8)';
                skillsImage.style.opacity = '0';
                skillsImage.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    skillsImage.style.transform = 'scale(1)';
                    skillsImage.style.opacity = '1';
                }, 100);
            }
        });
    }
});

// Success message function
function showSuccessMessage() {
    const modalBody = document.querySelector('#bookingModal .modal-body');
    const originalContent = modalBody.innerHTML;
    
    modalBody.innerHTML = `
        <div class="text-center py-4">
            <i class="fas fa-check-circle text-success" style="font-size: 4rem; margin-bottom: 1rem;"></i>
            <h4 class="text-success mb-3">Request Submitted!</h4>
            <p class="lead">Thank you for your request. I'll get back to you within 24 hours.</p>
        </div>
    `;
    
    // Restore original content after modal closes
    const modal = document.getElementById('bookingModal');
    modal.addEventListener('hidden.bs.modal', function() {
        modalBody.innerHTML = originalContent;
    }, { once: true });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
