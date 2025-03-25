document.addEventListener('DOMContentLoaded', function() {
    const headerBackground = document.querySelector('.header-background');
    const navLinks = document.querySelectorAll('.navbar a');
    const missionText = document.getElementById('mission-text');

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

    window.addEventListener('load', updateHeaderFromActiveLink);
});
