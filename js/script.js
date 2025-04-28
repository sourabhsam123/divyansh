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
    // Create and insert the tooltip div dynamically
    const tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip); // Append to body so it's available globally

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function (event) {
            const description = this.getAttribute('data-description');
            if (description) {
                tooltip.textContent = description;
                tooltip.style.display = 'flex'; 
                tooltip.style.opacity = '1';

                // Position the tooltip near the hovered link
                const rect = this.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;

                // Hide after 3 seconds
                //timeout = setTimeout(() => {
                //    tooltip.style.opacity = '0';
                //    setTimeout(() => tooltip.style.display = 'none', 300);
                //}, 3000);
            }
        });

        link.addEventListener("mousemove", function (event) {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        });

        link.addEventListener('mouseleave', function () {
            //clearTimeout(timeout);
            //tooltip.style.opacity = '0';
            //setTimeout(() => tooltip.style.display = 'none', 300);
            tooltip.style.display = "none";
        });
    });


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
        const modal = document.getElementById('imageModal');
        modal.classList.remove('hidden');
         // Reset scroll position of the scrollable container
        const scrollContainer = modal.querySelector('.group-hover\\:overflow-y-auto');
         if (scrollContainer) {
        scrollContainer.scrollTop = 0; 
        }

        
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
