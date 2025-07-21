
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    if (document.querySelector('body').classList.contains('index.html')) {
        loadEvents();
    }
    
    if (document.querySelector('body').classList.contains('about.html')) {
        loadLeaders();
    }
    
    if (document.querySelector('body').classList.contains('courses.html')) {
        loadCourses();
        loadDepartments();
    }
});
function loadEvents() {
    const events = [
        {
            title: "Open House",
            date: "October 15, 2023",
            time: "10:00 AM - 2:00 PM",
            location: "Main Campus",
            description: "Prospective students are invited to tour our campus and learn about our programs."
        },
        {
            title: "Research Symposium",
            date: "November 5, 2023",
            time: "9:00 AM - 5:00 PM",
            location: "Science Building",
            description: "Showcasing groundbreaking research from our faculty and students."
        },
        {
            title: "Career Fair",
            date: "November 20, 2023",
            time: "11:00 AM - 4:00 PM",
            location: "Student Center",
            description: "Connect with top employers looking to hire our graduates."
        }
    ];
    
    const eventContainer = document.getElementById('eventContainer');
    
    if (eventContainer) {
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Time:</strong> ${event.time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
            `;
            eventContainer.appendChild(eventCard);
        });
    }
}
