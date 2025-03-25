document.addEventListener('DOMContentLoaded', function() {
    const headerBackground = document.querySelector('.header-background');
    const navLinks = document.querySelectorAll('.navbar a');
    const missionText = document.getElementById('mission-text');
    const modal = document.getElementById('imageModal');

    function changeHeaderBackground(imageName) {
        if (headerBackground) {
            headerBackground.style.backgroundImage = `url('images/${imageName}')`;
        }
    }

    function changeNavColor(color) {
        navLinks.forEach(link => {
            link.style.color = color;
        });
    }

    function updateHeaderFromActiveLink() {
        const activeLink = document.querySelector('.navbar a.active');
        if (activeLink) {
            const initialImage = activeLink.getAttribute('data-image');
            changeHeaderBackground(initialImage);

            const initialMission = activeLink.getAttribute('data-mission');
            if (missionText) missionText.textContent = initialMission;

            const initialNavColor = activeLink.getAttribute('data-color');
            changeNavColor(initialNavColor);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            this.classList.add('active');

            const imageName = this.getAttribute('data-image');
            changeHeaderBackground(imageName);

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
    
    // Close modal if user clicks outside the image
    if (modal) {
        modal.addEventListener('click', function(event) {
            // Close only if the user clicks outside the image (not inside the image)
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});
