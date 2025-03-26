document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const missionText = document.getElementById('mission-text');
    const modal = document.getElementById('imageModal');

    function changeNavColor(color) {
        navLinks.forEach(link => {
            link.style.color = color;
        });
    }

    function updateHeaderFromActiveLink() {
        const activeLink = document.querySelector('.navbar a.active');
        if (activeLink) {
            const initialMission = activeLink.getAttribute('data-mission');
            if (missionText) missionText.textContent = initialMission;

            const initialNavColor = activeLink.getAttribute('data-color');
            changeNavColor(initialNavColor);
        }
    }

    navLinks.forEach(link => {
        let originalText = link.textContent;
        let englishText = link.getAttribute("data-english");

        // Click Event - Active Link & Mission Text
        link.addEventListener('click', function(event) {
            event.preventDefault();

            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            this.classList.add('active');

            const mission = this.getAttribute('data-mission');
            if (missionText) missionText.textContent = mission;

            const navColor = this.getAttribute('data-color');
            changeNavColor(navColor);

            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.location.href = href;
            }
        });

        // Hover Effect - Change Text to english
        link.addEventListener("mouseenter", function() {
            this.textContent = englishText;
        });

        link.addEventListener("mouseleave", function() {
            this.textContent = originalText;
        });
    });

    // Ensure the correct header is set on page load
    updateHeaderFromActiveLink();

    // Image Modal Functionality
    window.openModal = function(imageSrc) { 
        document.getElementById('modalImage').src = imageSrc;
        document.getElementById('imageModal').classList.remove('hidden');
    };

    // Function to close the modal
    window.closeModal = function() { 
        document.getElementById('imageModal').classList.add('hidden');
    };

    // Close modal if user clicks outside the image
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});
