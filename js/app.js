// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap components
    initBootstrapComponents();
    
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Initialize the doctors and NGOs sections
    loadDoctors();
    loadNGOs();
    
    // Setup form submissions
    setupFormSubmissions();
});

// Initialize Bootstrap components
function initBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Setup login modal
    setupLoginModal();
}

// Setup login modal functionality
function setupLoginModal() {
    // Get the login link
    const loginLink = document.querySelector('a[href="#login"]');
    
    if (loginLink) {
        // Create a new Bootstrap modal instance
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        
        // Show the modal when the login link is clicked
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.show();
        });
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Skip if it's the login link (handled separately)
            if (this.getAttribute('href') === '#login') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
                
                // Update the URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Load doctors from the data source
function loadDoctors() {
    const doctorsList = document.getElementById('doctors-list');
    const doctorsLoading = document.getElementById('doctors-loading');
    
    if (!doctorsList || !doctorsLoading) return;
    
    // Simulate loading data (in a real app, this would be an API call)
    setTimeout(() => {
        // Hide the loading spinner
        doctorsLoading.style.display = 'none';
        
        // Check if doctors data exists
        if (window.appData && window.appData.doctors && window.appData.doctors.length > 0) {
            // Render each doctor
            window.appData.doctors.forEach(doctor => {
                doctorsList.appendChild(createDoctorCard(doctor));
            });
        } else {
            // Show a message if no doctors are available
            doctorsList.innerHTML = `
                <div class="col-12 text-center">
                    <p class="lead">No volunteer doctors available at the moment. Please check back later.</p>
                </div>
            `;
        }
    }, 1000); // Simulate network delay
}

// Create a doctor card element
function createDoctorCard(doctor) {
    const doctorCol = document.createElement('div');
    doctorCol.className = 'col-lg-4 col-md-6 animate-fade-in';
    
    doctorCol.innerHTML = `
        <div class="card profile-card mb-4">
            <div class="card-body text-center">
                <h5 class="card-title">${doctor.name}</h5>
                <p class="text-muted">${doctor.specialty}</p>
                <p class="card-text">${doctor.description}</p>
                <div class="social-links mb-3">
                    ${doctor.email ? `<a href="mailto:${doctor.email}" title="Email"><i class="fas fa-envelope"></i></a>` : ''}
                    ${doctor.phone ? `<a href="tel:${doctor.phone}" title="Call"><i class="fas fa-phone"></i></a>` : ''}
                    ${doctor.linkedin ? `<a href="${doctor.linkedin}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
                </div>
                <button class="btn btn-primary" data-doctor-id="${doctor.id}" onclick="scheduleConsultation(${doctor.id})">
                    Schedule Consultation
                </button>
            </div>
        </div>
    `;
    
    return doctorCol;
}

// Load NGOs from the data source
function loadNGOs() {
    const ngosList = document.getElementById('ngos-list');
    const ngosLoading = document.getElementById('ngos-loading');
    
    if (!ngosList || !ngosLoading) return;
    
    // Simulate loading data (in a real app, this would be an API call)
    setTimeout(() => {
        // Hide the loading spinner
        ngosLoading.style.display = 'none';
        
        // Check if NGOs data exists
        if (window.appData && window.appData.ngos && window.appData.ngos.length > 0) {
            // Render each NGO
            window.appData.ngos.forEach(ngo => {
                ngosList.appendChild(createNGOCard(ngo));
            });
        } else {
            // Show a message if no NGOs are available
            ngosList.innerHTML = `
                <div class="col-12 text-center">
                    <p class="lead">No partner NGOs available at the moment. Please check back later.</p>
                </div>
            `;
        }
    }, 1200); // Simulate network delay
}

// Create an NGO card element
function createNGOCard(ngo) {
    const ngoCol = document.createElement('div');
    ngoCol.className = 'col-lg-4 col-md-6 animate-fade-in';
    
    ngoCol.innerHTML = `
        <div class="card profile-card mb-4">
            <div class="card-body text-center">
                <h5 class="card-title">${ngo.name}</h5>
                <p class="text-muted">${ngo.focus}</p>
                <p class="card-text">${ngo.description}</p>
                <div class="social-links mb-3">
                    ${ngo.email ? `<a href="mailto:${ngo.email}" title="Email"><i class="fas fa-envelope"></i></a>` : ''}
                    ${ngo.phone ? `<a href="tel:${ngo.phone}" title="Call"><i class="fas fa-phone"></i></a>` : ''}
                    ${ngo.website ? `<a href="${ngo.website}" target="_blank" title="Website"><i class="fas fa-globe"></i></a>` : ''}
                </div>
                <button class="btn btn-primary" data-ngo-id="${ngo.id}" onclick="contactNGO(${ngo.id})">
                    Contact NGO
                </button>
            </div>
        </div>
    `;
    
    return ngoCol;
}

// Setup form submissions
function setupFormSubmissions() {
    // Donation form
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const amount = document.getElementById('donation-amount').value;
            const name = document.getElementById('donor-name').value;
            const email = document.getElementById('donor-email').value;
            const message = document.getElementById('donation-message').value;
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').id === 'payment-card' ? 'Credit/Debit Card' : 'UPI';
            
            // In a real app, you would send this data to a server
            console.log('Donation submitted:', { amount: `₹${amount}`, name, email, message, paymentMethod });
            
            // Show success message
            alert(`Thank you for your donation of ₹${amount}! Your contribution will help provide healthcare to those in need.`);
            
            // Reset the form
            this.reset();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            // In a real app, you would send this data to a server
            console.log('Contact form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you as soon as possible.');
            
            // Reset the form
            this.reset();
        });
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // In a real app, you would send this data to a server for authentication
            console.log('Login submitted:', { email, password, rememberMe });
            
            // Show success message
            alert('Login successful! Redirecting to your dashboard...');
            
            // Close the modal
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (loginModal) {
                loginModal.hide();
            }
        });
    }
    
    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const role = document.getElementById('register-role').value;
            
            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // In a real app, you would send this data to a server for registration
            console.log('Registration submitted:', { name, email, password, role });
            
            // Show success message
            alert('Registration successful! Please check your email to verify your account.');
            
            // Close the modal
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (loginModal) {
                loginModal.hide();
            }
        });
    }
}

// Function to schedule a consultation with a doctor
function scheduleConsultation(doctorId) {
    // In a real app, this would open a scheduling interface or redirect to a booking page
    alert(`You are about to schedule a consultation with doctor ID: ${doctorId}. This feature will be available soon.`);
}

// Function to contact an NGO
function contactNGO(ngoId) {
    // In a real app, this would open a contact form specific to the NGO or redirect to a contact page
    alert(`You are about to contact NGO ID: ${ngoId}. This feature will be available soon.`);
} 