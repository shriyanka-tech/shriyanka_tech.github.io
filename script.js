// Preloader fade-out
    window.addEventListener('load', function() {
      const loader = document.getElementById('preloader');
      setTimeout(() => {
        loader.classList.add('fade-out');
      }, 500);
    });

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Back to top scroll handler
    window.addEventListener('scroll', function () {
      const backBtn = document.querySelector('.back-to-top');
      if (window.scrollY > 200) {
        backBtn.style.display = 'flex';
      } else {
        backBtn.style.display = 'none';
      }
    });

    // Custom typing animation
    const roles = [
      "Data Analyst.",
      "Power BI Architect.",
      "Python Developer.",
      "SQL Developer.",
      "Machine Learning Engineer."
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenRoles = 2000;
    const targetElement = document.getElementById("typing-sub");

    function typeEffect() {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        targetElement.innerHTML = "I'm a " + currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
      } else {
        targetElement.innerHTML = "I'm a " + currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
      }

      if (!isDeleting && currentCharIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenRoles);
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
      } else {
        setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
      }
    }

    document.addEventListener("DOMContentLoaded", function() {
      const contactForm = document.getElementById("contactForm");
      const statusDiv = document.getElementById("contactFormStatus");
      
      if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
          event.preventDefault();
          
          const submitBtn = contactForm.querySelector('.btn-submit');
          const originalBtnText = submitBtn.innerHTML;
          
          // Show loading state and disable button
          submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i>Sending...';
          submitBtn.disabled = true;
          
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const phoneElement = document.getElementById("phone");
          const phone = phoneElement ? phoneElement.value : '';
          const comments = document.getElementById("comments").value;
          
          const formData = {
            name: name,
            email: email,
            phone: phone || 'N/A',
            message: comments
          };
          
          // Submit to FormSubmit
          fetch("https://formsubmit.co/ajax/shriyankarajbhar@gmail.com", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          })
          .then(response => {
            if (!response.ok) {
              return response.json().then(errData => {
                throw new Error(errData.message || `Server error (${response.status})`);
              }).catch(() => {
                throw new Error(`Server returned status ${response.status}`);
              });
            }
            return response.json();
          })
          .then(data => {
            if (data.success === "true" || data.success === true) {
              // Success feedback
              if (statusDiv) {
                statusDiv.style.display = 'block';
                statusDiv.style.backgroundColor = 'rgba(40, 167, 69, 0.15)'; // Sleek transparent green
                statusDiv.style.border = '1px solid #28a745';
                statusDiv.style.color = '#28a745';
                statusDiv.innerHTML = 'Thank you! Your message has been sent successfully.';
              }
              
              // Reset the form input fields
              contactForm.reset();
              
              // Show checkmark on button
              submitBtn.innerHTML = '<i class="fa fa-check me-2"></i>Sent!';
              setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
              }, 3000);
            } else {
              throw new Error(data.message || "Form submission failed.");
            }
          })
          .catch(error => {
            console.error("Submission error:", error);
            if (statusDiv) {
              statusDiv.style.display = 'block';
              statusDiv.style.backgroundColor = 'rgba(220, 53, 69, 0.15)'; // Transparent red
              statusDiv.style.border = '1px solid #dc3545';
              statusDiv.style.color = '#dc3545';
              
              // Custom help text if it looks like activation is needed
              if (error.message.toLowerCase().includes("activate")) {
                statusDiv.innerHTML = `<strong>Activation Required:</strong> FormSubmit sent an activation link to your email. Please click that link to activate and try again.`;
              } else {
                statusDiv.innerHTML = `<strong>Error:</strong> ${error.message}. Please try again later.`;
              }
            }
            
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          });
        });
      }
      setTimeout(typeEffect, 800);
    });