// Sample data for the CareConnect application
window.appData = {
    // Sample doctors data
    doctors: [
        {
            id: 1,
            name: "Dr. Shaurya",
            specialty: "Neuro Surgeon",
            description: "Neuro Surgeon with 3 years of experience, offering free consultations for basic healthcare needs.",
            image: "",
            email: "shaurya.sharma@example.com",
            phone: "+91 600000000",
            linkedin: "https://linkedin.com/in/example",
            availability: "Mon, Wed, Fri (10 AM - 2 PM)",
            languages: ["English", "Hindi"],
            experience: "3+ years"
        },
        {
            id: 2,
            name: "Dr. Shreya Sharma",
            specialty: "Pediatrician",
            description: "Specialized in children's healthcare with a focus on preventive care and childhood development.",
            image: "",
            email: "shreya.sharma@example.com",
            phone: "+91 9876543211",
            linkedin: "https://linkedin.com/in/example",
            availability: "Tue, Thu (9 AM - 5 PM)",
            languages: ["English", "Hindi", "Gujarati"],
            experience: "2+ years"
        },
        {
            id: 3,
            name: "Dr. Amina Khan",
            specialty: "Cardiologist",
            description: "Heart specialist offering consultations for cardiovascular health and preventive care advice.",
            image: "",
            email: "amina.khan@example.com",
            phone: "+91 9876543212",
            linkedin: "https://linkedin.com/in/example",
            availability: "Mon, Thu (1 PM - 6 PM)",
            languages: ["English", "Hindi", "Urdu"],
            experience: "20 years"
        },
        {
            id: 4,
            name: "Dr. Suresh Reddy",
            specialty: "Orthopedic Surgeon",
            description: "Specializing in bone and joint issues, offering consultations for musculoskeletal problems.",
            image: "",
            email: "suresh.reddy@example.com",
            phone: "+91 9876543213",
            linkedin: "https://linkedin.com/in/example",
            availability: "Wed, Fri (10 AM - 4 PM)",
            languages: ["English", "Hindi", "Telugu"],
            experience: "22 years"
        },
        {
            id: 5,
            name: "Dr. Meera Iyer",
            specialty: "Gynecologist",
            description: "Women's health specialist providing consultations on reproductive health and general wellness.",
            image: "",
            email: "meera.iyer@example.com",
            phone: "+91 9876543214",
            linkedin: "https://linkedin.com/in/example",
            availability: "Tue, Thu, Sat (9 AM - 3 PM)",
            languages: ["English", "Hindi", "Tamil"],
            experience: "18 years"
        },
        {
            id: 6,
            name: "Dr. Arjun Singh",
            specialty: "Psychiatrist",
            description: "Mental health professional offering support for anxiety, depression, and other psychological concerns.",
            image: "",
            email: "arjun.singh@example.com",
            phone: "+91 9876543215",
            linkedin: "https://linkedin.com/in/example",
            availability: "Mon, Wed, Fri (12 PM - 6 PM)",
            languages: ["English", "Hindi", "Punjabi"],
            experience: "15 years"
        }
    ],
    
    // Sample NGOs data
    ngos: [
        {
            id: 1,
            name: "HealthForAll Foundation",
            focus: "General Healthcare Access",
            description: "Providing access to basic healthcare services for underserved communities through mobile clinics and health camps.",
            logo: "",
            email: "info@healthforall.org",
            phone: "+91 9876543220",
            website: "https://www.healthforall.org",
            founded: 2005,
            areas: ["Delhi slums", "Rural communities in Haryana"],
            services: ["Mobile clinics", "Health education", "Medication assistance"]
        },
        {
            id: 2,
            name: "Children's Medical Relief",
            focus: "Pediatric Care",
            description: "Dedicated to providing medical care for children from low-income families, including vaccinations and treatment for common illnesses.",
            logo: "",
            email: "contact@childrensmedicalrelief.org",
            phone: "+91 9876543221",
            website: "https://www.childrensmedicalrelief.org",
            founded: 2010,
            areas: ["Schools in Delhi", "Orphanages", "Community centers"],
            services: ["Vaccinations", "Nutritional support", "Pediatric consultations"]
        },
        {
            id: 3,
            name: "Elderly Care Network",
            focus: "Geriatric Support",
            description: "Supporting elderly individuals with healthcare needs, including home visits, medication management, and companionship.",
            logo: "",
            email: "help@elderlycarenetwork.org",
            phone: "+91 9876543222",
            website: "https://www.elderlycarenetwork.org",
            founded: 2008,
            areas: ["Retirement homes in Delhi NCR", "Individual residences"],
            services: ["Home healthcare", "Medication management", "Physical therapy"]
        },
        {
            id: 4,
            name: "Mental Wellness Alliance",
            focus: "Mental Health",
            description: "Providing mental health support through counseling, therapy sessions, and awareness programs to reduce stigma.",
            logo: "",
            email: "support@mentalwellnessalliance.org",
            phone: "+91 9876543223",
            website: "https://www.mentalwellnessalliance.org",
            founded: 2015,
            areas: ["Community centers in Delhi", "Schools", "Online platforms"],
            services: ["Counseling", "Support groups", "Mental health education"]
        },
        {
            id: 5,
            name: "Diabetes Care Initiative",
            focus: "Diabetes Management",
            description: "Helping individuals with diabetes through education, screening camps, and access to affordable insulin and supplies.",
            logo: "",
            email: "info@diabetescareinitiative.org",
            phone: "+91 9876543224",
            website: "https://www.diabetescareinitiative.org",
            founded: 2012,
            areas: ["Urban and rural communities in Delhi NCR"],
            services: ["Diabetes screening", "Insulin access programs", "Nutrition counseling"]
        },
        {
            id: 6,
            name: "Vision Care Outreach",
            focus: "Eye Care",
            description: "Providing eye examinations, glasses, and cataract surgeries for those who cannot afford vision care services.",
            logo: "",
            email: "contact@visioncareoutreach.org",
            phone: "+91 9876543225",
            website: "https://www.visioncareoutreach.org",
            founded: 2009,
            areas: ["Schools in Delhi", "Rural communities", "Urban centers"],
            services: ["Eye examinations", "Eyeglasses distribution", "Cataract surgeries"]
        }
    ],
    
    // Sample hospitals data
    hospitals: [
        {
            id: 1,
            name: "Community General Hospital",
            type: "General Hospital",
            description: "A community hospital offering subsidized care for low-income patients across various medical specialties.",
            address: "123 Healthcare Avenue, Sharda, New Delhi, India",
            phone: "+91 9876543230",
            email: "info@communitygeneral.org",
            website: "https://www.communitygeneral.org",
            services: ["Emergency care", "General medicine", "Basic surgeries", "Pediatrics", "Obstetrics"]
        },
        {
            id: 2,
            name: "Children's Hope Medical Center",
            type: "Pediatric Hospital",
            description: "Specialized in children's healthcare with programs for families who cannot afford treatment for their children.",
            address: "456 Child Avenue, Sharda, New Delhi, India",
            phone: "+91 9876543231",
            email: "contact@childrenshope.org",
            website: "https://www.childrenshope.org",
            services: ["Pediatric emergency", "Child development", "Pediatric surgeries", "Vaccination programs"]
        },
        {
            id: 3,
            name: "Heart & Vascular Institute",
            type: "Specialty Hospital",
            description: "Cardiovascular care center with a charitable wing that provides free or reduced-cost heart surgeries for those in need.",
            address: "789 Cardiac Road, Sharda, New Delhi, India",
            phone: "+91 9876543232",
            email: "info@heartinstitute.org",
            website: "https://www.heartinstitute.org",
            services: ["Cardiac diagnostics", "Heart surgeries", "Cardiac rehabilitation", "Preventive cardiology"]
        }
    ]
};

// For NGO and hospital logos, we're using placeholders. In a real application, you would use actual logo images.
// The following code creates SVG placeholders for the NGO logos
document.addEventListener('DOMContentLoaded', function() {
    // Create SVG placeholders for NGO logos
    createSVGPlaceholders();
});

// Function to create SVG placeholders for NGO logos
function createSVGPlaceholders() {
    // This function is now simplified since we're not using images
    console.log('Images for doctors and NGOs have been removed from the UI.');
    
    // No need to generate or update logo paths anymore
    window.appData.ngos.forEach(ngo => {
        // Ensure the logo property is empty
        ngo.logo = '';
    });
} 