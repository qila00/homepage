let currentSlideIndex = 0; // Current index of the active banner image
const bannerImages = document.querySelectorAll('.banner-images img'); // Select the banner images
const categoryImages = document.querySelectorAll('.category-images img'); // Select the category images
const arrows = document.querySelectorAll('.arrow'); // Select the arrows

// Function to update the active banner image based on the index
function updateBannerImage(index) {
    bannerImages.forEach((img, i) => {
        img.classList.remove('active'); // Remove active class from all images
        if (i === index) {
            img.classList.add('active'); // Add active class to the current image
        }
    });
}

// Function to change slides
function changeSlide(direction) {
    currentSlideIndex = (currentSlideIndex + direction + bannerImages.length) % bannerImages.length; // Move to the next or previous slide
    updateBannerImage(currentSlideIndex); // Update the active image
}

// Initialize the first image as active
updateBannerImage(currentSlideIndex);

// Function to update the active image in the category section
function updateActiveCategoryImage(index) {
    categoryImages.forEach((img, i) => {
        img.classList.remove('active'); // Remove active class from all images
        img.style.filter = ''; // Reset filter
        img.style.transform = ''; // Reset transform
        img.style.boxShadow = ''; // Reset shadow

        if (i === index) {
            img.classList.add('active'); // Add active class to the current image
            img.style.filter = 'brightness(1.2)'; // Increase brightness for emphasis
            img.style.transform = 'scale(1.1)'; // Slightly enlarge the active image
            img.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8)'; // Add glow effect
            
            // Set a timeout to remove the active effects after 1 second
            setTimeout(() => {
                img.classList.remove('active'); // Remove active class
                img.style.filter = ''; // Reset filter
                img.style.transform = ''; // Reset transform
                img.style.boxShadow = ''; // Reset box shadow
            }, 1000); // 1 second in milliseconds
        }
    });
}

// Function to handle image clicks in the category section
function handleCategoryImageClick(event) {
    const currentIndex = Array.from(categoryImages).indexOf(event.currentTarget); // Get the index of the clicked image
    updateActiveCategoryImage(currentIndex); // Update the active image based on the clicked image
}

// Add click event listeners to each category image
categoryImages.forEach(img => {
    img.addEventListener('click', handleCategoryImageClick);
});

// Event listeners for arrow clicks in the banner
arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e) => {
        if (e.target.classList.contains('right-arrow')) {
            changeSlide(1); // Move right
        } else if (e.target.classList.contains('left-arrow')) {
            changeSlide(-1); // Move left
        }
    });
});

// Gallery Lightbox Functionality
const galleryImages = document.querySelectorAll('.gallery-images img'); // Select all gallery images
const lightbox = document.createElement('div'); // Create lightbox element
const lightboxImg = document.createElement('img'); // Create image element for lightbox
const closeBtn = document.createElement('span'); // Create close button

// Set up lightbox styles
lightbox.classList.add('lightbox'); // Add lightbox class for styling
lightbox.style.position = 'fixed';
lightbox.style.top = '0';
lightbox.style.left = '0';
lightbox.style.width = '100%';
lightbox.style.height = '100%';
lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
lightbox.style.display = 'none';
lightbox.style.justifyContent = 'center';
lightbox.style.alignItems = 'center';
lightbox.style.zIndex = '1000';

closeBtn.textContent = '✖'; // Close button text
closeBtn.classList.add('close-btn'); // Add close button class for styling
closeBtn.style.position = 'absolute';
closeBtn.style.top = '20px';
closeBtn.style.right = '30px';
closeBtn.style.fontSize = '40px';
closeBtn.style.color = '#fff';
closeBtn.style.cursor = 'pointer';

// Append elements to lightbox
lightbox.appendChild(lightboxImg);
lightbox.appendChild(closeBtn);
document.body.appendChild(lightbox); // Append lightbox to body

// Function to open lightbox with the clicked image
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src; // Set the lightbox image to the clicked image
        lightbox.style.display = 'flex'; // Show the lightbox
    });
});

// Function to close the lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none'; // Hide the lightbox
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== closeBtn) {
        lightbox.style.display = 'none'; // Hide the lightbox if clicked outside the image
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.style.display = 'none'; // Hide the lightbox
    }
});
