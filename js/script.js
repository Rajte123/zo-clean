// ===== DOM CONTENT LOADED ===== 
document.addEventListener('DOMContentLoaded', function() {
    
  // ===== MOBILE NAVIGATION TOGGLE =====
  const hamburger = document.getElementById('hamburger');
  const navbarNav = document.getElementById('navbarNav');
  const hamburgerIcon = hamburger?.querySelector('.hamburger-icon');
  
  if (hamburger && navbarNav) {
      hamburger.addEventListener('click', function() {
          const bsCollapse = new bootstrap.Collapse(navbarNav, { toggle: true });
          hamburgerIcon?.classList.toggle('active');
      });
  }

  // Close mobile menu when clicking nav links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          if (window.innerWidth < 992) { 
              const bsCollapse = bootstrap.Collapse.getInstance(navbarNav);
              if (bsCollapse) bsCollapse.hide();
              hamburgerIcon?.classList.remove('active');
          }
      });
  });

  // ===== SMOOTH SCROLLING =====
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              const headerHeight = 80;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // ===== WHATSAPP BOOKING FUNCTIONALITY =====
  const bookButtons = document.querySelectorAll('.book-btn');
  const whatsappNumber = '919863241323'; // Your WhatsApp number
  
  bookButtons.forEach(button => {
      button.addEventListener('click', function() {
          const service = this.getAttribute('data-service');
          const price = this.getAttribute('data-price');
          
          showButtonLoading(this);
          const message = createWhatsAppMessage(service, price);
          const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          
          setTimeout(() => {
              window.open(whatsappURL, '_blank');
              hideButtonLoading(this);
          }, 500);
      });
  });

 function createWhatsAppMessage(service, price) {
    // Special case: Booking Siamna button → plain message
    if (service === "Booking Siamna") {
        return "Hello Booking ka siam duh e";
    }

    // For other services → full detailed message
    return `Hi Zo Clean! 👋

I'm interested in booking your cleaning service.

📋 Service Details:
• Service: ${service}
• Price: ${price}

📞 Please let me know:
- Available time slots
- Confirmation of service details
- Any additional information

Looking forward to hearing from you!

Best regards`;
}

function sendToWhatsApp(service, price) {
    const message = createWhatsAppMessage(service, price);
    const phoneNumber = "91XXXXXXXXXX"; // your WhatsApp number
    let url = `https://wa.me/${phoneNumber}`;

    // add ?text only if there is a message
    if (message.trim() !== "") {
        url += `?text=${encodeURIComponent(message)}`;
    }

    window.open(url, "_blank");
}

  
  function showButtonLoading(button) {
      button.classList.add('loading');
      button.setAttribute('data-original-text', button.textContent);
      button.textContent = 'Opening WhatsApp...';
  }
  
  function hideButtonLoading(button) {
      button.classList.remove('loading');
      const originalText = button.getAttribute('data-original-text');
      if (originalText) {
          button.textContent = originalText;
          button.removeAttribute('data-original-text');
      }
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
  });

  // ===== NAVBAR SCROLL EFFECT =====
  window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.pageYOffset > 100) {
          navbar?.classList.add('scrolled');
      } else {
          navbar?.classList.remove('scrolled');
      }
  });

  // ===== SERVICE AVAILABILITY CHECKER =====
  function checkServiceAvailability() {
      const now = new Date();
      const hours = now.getHours();
      const isServiceTime = hours >= 8 && hours < 18;
      
      const availabilityIndicator = document.querySelector('.availability-indicator');
      if (availabilityIndicator) {
          if (isServiceTime) {
              availabilityIndicator.textContent = '🟢 Available Now';
              availabilityIndicator.className = 'availability-indicator available';
          } else {
              availabilityIndicator.textContent = '🔴 Currently Closed';
              availabilityIndicator.className = 'availability-indicator closed';
          }
      }
  }

  checkServiceAvailability();
  setInterval(checkServiceAvailability, 60000);

}); 
