document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    // Initialize first slide
    updateSlideVisibility();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextAction();
        } else if (e.key === 'ArrowLeft') {
            prevAction();
        }
    });

    function nextAction() {
        const currentSlide = slides[currentSlideIndex];
        const steps = currentSlide.querySelectorAll('.step');
        const hiddenSteps = Array.from(steps).filter(step => !step.classList.contains('visible'));

        if (hiddenSteps.length > 0) {
            // Show next step
            hiddenSteps[0].classList.add('visible');
        } else {
            // Move to next slide if available
            if (currentSlideIndex < slides.length - 1) {
                currentSlideIndex++;
                updateSlideVisibility();
            }
        }
    }

    function prevAction() {
        const currentSlide = slides[currentSlideIndex];
        const steps = currentSlide.querySelectorAll('.step');
        const visibleSteps = Array.from(steps).filter(step => step.classList.contains('visible'));

        if (visibleSteps.length > 0) {
            // Hide last visible step
            visibleSteps[visibleSteps.length - 1].classList.remove('visible');
        } else {
            // Move to previous slide if available
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateSlideVisibility();
                // When going back to a slide, show all its steps
                const prevSlideSteps = slides[currentSlideIndex].querySelectorAll('.step');
                prevSlideSteps.forEach(step => step.classList.add('visible'));
            }
        }
    }

    function updateSlideVisibility() {
        slides.forEach((slide, index) => {
            if (index === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
                // Reset steps for non-active slides so they animate again when visited forward
                if (index > currentSlideIndex) {
                    const steps = slide.querySelectorAll('.step');
                    steps.forEach(step => step.classList.remove('visible'));
                }
            }
        });
    }
});