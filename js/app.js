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
    
    // Check if user is logged in and update UI accordingly
    checkUserLoginStatus();
    
    // Setup logout button
    setupLogout();
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
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            try {
                console.log('Attempting login...');
                
                // Try direct fetch for login
                try {
                    const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password }),
                        mode: 'cors'
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        // Store user data in localStorage
                        if (data.user) {
                            localStorage.setItem('careConnectUser', JSON.stringify(data.user));
                            
                            // Update UI for logged in user
                            updateUIForLoggedInUser(data.user);
                        }
                        
                        // Show success message
                        alert('Login successful!');
                        
                        // Close the modal
                        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                        if (loginModal) {
                            loginModal.hide();
                        }
                        
                        // Scroll to profile section
                        const profileSection = document.getElementById('profile');
                        if (profileSection) {
                            window.scrollTo({
                                top: profileSection.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }
                    } else {
                        throw new Error(data.message || 'Login failed');
                    }
                } catch (directError) {
                    console.error('Direct fetch login failed:', directError);
                    
                    // Try API wrapper as fallback
                    try {
                        const response = await window.careConnectAPI.auth.login({ email, password });
                        
                        // Store user data
                        if (response.user) {
                            localStorage.setItem('careConnectUser', JSON.stringify(response.user));
                            
                            // Update UI for logged in user
                            updateUIForLoggedInUser(response.user);
                        }
                        
                        // Show success message
                        alert('Login successful!');
                        
                        // Close the modal
                        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                        if (loginModal) {
                            loginModal.hide();
                        }
                        
                        // Scroll to profile section
                        const profileSection = document.getElementById('profile');
                        if (profileSection) {
                            window.scrollTo({
                                top: profileSection.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }
                    } catch (apiError) {
                        throw apiError;
                    }
                }
            } catch (error) {
                console.error('Login error:', error);
                alert(`Login failed: ${error.message}`);
            }
        });
    }
    
    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
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
            
            try {
                console.log('Attempting registration...');
                
                // Try direct fetch for registration
                try {
                    const response = await fetch('http://127.0.0.1:3000/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            name, 
                            email, 
                            password,
                            role 
                        }),
                        mode: 'cors'
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        // Store user data in localStorage
                        if (data.user) {
                            localStorage.setItem('careConnectUser', JSON.stringify(data.user));
                            
                            // Update UI for logged in user
                            updateUIForLoggedInUser(data.user);
                        }
                        
                        // Show success message
                        alert('Registration successful!');
                        
                        // Close the modal
                        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                        if (loginModal) {
                            loginModal.hide();
                        }
                        
                        // Scroll to profile section
                        const profileSection = document.getElementById('profile');
                        if (profileSection) {
                            window.scrollTo({
                                top: profileSection.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }
                    } else {
                        throw new Error(data.message || 'Registration failed');
                    }
                } catch (directError) {
                    console.error('Direct fetch registration failed:', directError);
                    
                    // Try API wrapper as fallback
                    try {
                        const response = await window.careConnectAPI.auth.register({ 
                            name, 
                            email, 
                            password,
                            role 
                        });
                        
                        // Store user data
                        if (response.user) {
                            localStorage.setItem('careConnectUser', JSON.stringify(response.user));
                            
                            // Update UI for logged in user
                            updateUIForLoggedInUser(response.user);
                        }
                        
                        // Show success message
                        alert('Registration successful!');
                        
                        // Close the modal
                        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                        if (loginModal) {
                            loginModal.hide();
                        }
                        
                        // Scroll to profile section
                        const profileSection = document.getElementById('profile');
                        if (profileSection) {
                            window.scrollTo({
                                top: profileSection.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }
                    } catch (apiError) {
                        throw apiError;
                    }
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert(`Registration failed: ${error.message}`);
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

// Check user login status and update UI
function checkUserLoginStatus() {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('careConnectUser');
    
    if (userData) {
        try {
            // Parse user data
            const user = JSON.parse(userData);
            
            // Update UI for logged in user
            updateUIForLoggedInUser(user);
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Clear invalid data
            localStorage.removeItem('careConnectUser');
        }
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    // Hide login/register button and show user profile dropdown
    document.getElementById('login-register-item').style.display = 'none';
    document.getElementById('user-profile-dropdown').style.display = 'block';
    
    // Update username in dropdown
    document.getElementById('username-display').textContent = user.name;
    
    // Update profile information
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-role').textContent = user.role || 'Patient';
    
    // Make profile section accessible
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        profileSection.style.display = 'block';
    }
}

// Setup logout button
function setupLogout() {
    const logoutButton = document.getElementById('logout-button');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Call logout API
            logoutUser();
        });
    }
}

// Logout user
async function logoutUser() {
    try {
        // Call logout API if available
        try {
            await fetch('http://127.0.0.1:3000/api/auth/logout', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (apiError) {
            console.warn('Logout API call failed, continuing with local logout:', apiError);
        }
        
        // Clear local storage
        localStorage.removeItem('careConnectUser');
        
        // Update UI
        document.getElementById('login-register-item').style.display = 'block';
        document.getElementById('user-profile-dropdown').style.display = 'none';
        
        // Hide profile section
        const profileSection = document.getElementById('profile');
        if (profileSection) {
            profileSection.style.display = 'none';
        }
        
        // Show success message
        alert('You have been successfully logged out.');
        
        // Redirect to home
        window.location.href = '#home';
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout. Please try again.');
    }
} 