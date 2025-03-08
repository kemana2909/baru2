// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Navbar Start
// Initialize variables
let currentSlide = 0;
const slideCount = slides.length;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// Function to handle navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Function to toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Update dot indicators
function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Function to set slider position
function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Get position of touch/mouse event
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Animation for smooth sliding
function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

// Handle touch/mouse start
function touchStart(event) {
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = 'grabbing';
}

// Handle touch/mouse end
function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const movedBy = currentTranslate - prevTranslate;
    
    // Calculate the threshold for slide change (e.g., 100px)
    const threshold = sliderContainer.offsetWidth * 0.2;
    
    if (movedBy < -threshold) {
        // Swiped right - go to next slide
        currentSlide = currentSlide === slideCount - 1 ? 0 : currentSlide + 1;
    } else if (movedBy > threshold) {
        // Swiped left - go to previous slide
        currentSlide = currentSlide === 0 ? slideCount - 1 : currentSlide - 1;
    }
    
    // Snap to current slide
    currentTranslate = -currentSlide * sliderContainer.offsetWidth;
    prevTranslate = currentTranslate;
    
    // Smooth transition to the snap position
    slider.style.transition = 'transform 0.3s ease-out';
    setSliderPosition();
    updateDots(currentSlide);
    
    slider.style.cursor = 'grab';
}

// Handle touch/mouse move
function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        // Calculate how much has been dragged
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

// Remove transition after it's complete
function transitionEnd() {
    slider.style.transition = '';
}

// Event Listeners
window.addEventListener('scroll', handleNavbarScroll);
hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Add click event to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        currentTranslate = -currentSlide * sliderContainer.offsetWidth;
        prevTranslate = currentTranslate;
        
        slider.style.transition = 'transform 0.3s ease-out';
        setSliderPosition();
        updateDots(currentSlide);
    });
});

// Slider container and touch/mouse events
const sliderContainer = document.querySelector('.slider-container');

// Add mouse and touch events for manual sliding
sliderContainer.addEventListener('mousedown', touchStart);
sliderContainer.addEventListener('touchstart', touchStart);

window.addEventListener('mouseup', touchEnd);
window.addEventListener('touchend', touchEnd);

window.addEventListener('mousemove', touchMove);
window.addEventListener('touchmove', touchMove);

slider.addEventListener('transitionend', transitionEnd);

// Handle window resize
function handleResize() {
    // Update slider position when window is resized
    currentTranslate = -currentSlide * sliderContainer.offsetWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

window.addEventListener('resize', handleResize);

// Initialize the navbar state on page load
handleNavbarScroll();

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('.slide img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
}

// Run preload on window load
window.addEventListener('load', () => {
    preloadImages();
    handleResize(); // Initialize slider position
});
// Navbar End

// Fungsi untuk mengirim pesan ke WhatsApp
function sendToWhatsapp(event) {
    // Mencegah form melakukan submit default
    event.preventDefault();
    
    // Ambil nilai dari input
    const userMessage = document.getElementById('userMessage').value.trim();
    
    // Pastikan ada pesan yang dimasukkan
    if (userMessage === '') {
        alert('Silakan masukkan pertanyaan Anda terlebih dahulu.');
        return;
    }
    
    // Nomor WhatsApp yang dituju (sesuaikan dengan nomor yang ada di website)
    const phoneNumber = '6285601081492';
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(userMessage);
    
    // Buat URL WhatsApp dengan pesan
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
    
    // Reset form setelah dikirim
    document.getElementById('userMessage').value = '';
}

// Tambahkan event listener saat dokumen sudah dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Pastikan form WhatsApp ada di halaman
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', sendToWhatsapp);
    }
});

// Script untuk Animasi Feature Cards
document.addEventListener('DOMContentLoaded', function() {
    // Animasi untuk feature cards saat di-scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Fungsi untuk mengecek apakah elemen terlihat di viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Fungsi untuk menambahkan kelas 'visible' saat elemen muncul di layar
    function checkVisibility() {
        featureCards.forEach((card, index) => {
            if (isInViewport(card)) {
                // Tambahkan delay berdasarkan index untuk efek staggered
                setTimeout(() => {
                    card.classList.add('visible');
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }
    
    // Tambahkan kelas initial untuk animasi - alternatif kanan kiri
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        
        // Efek alternatif dari kanan dan kiri
        if (index % 2 === 0) {
            // Kartu dengan index genap muncul dari kiri
            card.style.transform = 'translateX(-80px)';
        } else {
            // Kartu dengan index ganjil muncul dari kanan
            card.style.transform = 'translateX(80px)';
        }
        
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });
    
    // Hanya jalankan saat scroll, bukan saat halaman dimuat
    window.addEventListener('scroll', checkVisibility);
    
    // Hover effect enhancement
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const otherCards = Array.from(featureCards).filter(c => c !== card);
            otherCards.forEach(c => {
                c.style.opacity = '0.7';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            featureCards.forEach(c => {
                if (c.classList.contains('visible')) {
                    c.style.opacity = '1';
                } else {
                    c.style.opacity = '0';
                }
            });
        });
    });
    
    // Jalankan pengecekan visibilitas saat halaman sudah di-scroll
    setTimeout(() => {
        checkVisibility();
    }, 300);
});

// Script untuk Section Tipe Rumah dengan Mouse Drag
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing House Types Slider");
    
    // Seleksi elemen yang diperlukan
    const houseSlider = document.querySelector('.house-types-slider');
    const houseCards = document.querySelectorAll('.house-type-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const houseDots = document.querySelectorAll('.house-dot');
    
    // Periksa apakah elemen ditemukan
    if (!houseSlider) {
        console.error("House Slider element not found!");
        return;
    }
    
    if (!prevBtn || !nextBtn) {
        console.error("Navigation buttons not found!");
        return;
    }
    
    // Track state
    let currentIndex = 0;
    const totalCards = houseCards.length;
    
    // Variabel untuk mouse drag
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let isMobile = window.innerWidth <= 768;
    
    // Fungsi navigasi sederhana
    function goToSlide(index) {
        // Validasi index
        if (index < 0) index = 0;
        if (index >= totalCards) index = totalCards - 1;
        
        currentIndex = index;
        
        // Buat transform CSS
        let translateValue;
        if (isMobile) {
            translateValue = -currentIndex * 25; // 25% width per card
        } else {
            translateValue = 0; // Di desktop tidak perlu transform
        }
        
        // Set prevTranslate untuk drag
        prevTranslate = translateValue * houseSlider.offsetWidth / 100;
        currentTranslate = prevTranslate;
        
        // Update slide position dengan CSS langsung
        houseSlider.style.transition = 'transform 0.3s ease';
        houseSlider.style.transform = `translateX(${translateValue}%)`;
        
        // Update dots
        updateDots();
        
        // Update disabled state pada buttons
        updateButtons();
        
        console.log(`Navigated to slide ${index}, Transform: translateX(${translateValue}%)`);
    }
    
    // Update dots berdasarkan current slide
    function updateDots() {
        houseDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Update tombol prev/next
    function updateButtons() {
        // Disable prev button if on first slide
        if (currentIndex === 0) {
            prevBtn.classList.add('disabled');
            prevBtn.disabled = true;
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.disabled = false;
        }
        
        // Disable next button if on last slide
        if (currentIndex === totalCards - 1) {
            nextBtn.classList.add('disabled');
            nextBtn.disabled = true;
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.disabled = false;
        }
    }
    
    // Event listener untuk Prev button
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });
    
    // Event listener untuk Next button
    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalCards - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Event listeners untuk dots
    houseDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // ==== MOUSE DRAG FUNCTIONALITY ====
    
    // Set event listeners for mouse drag
    function addEventListeners() {
        // Mouse events
        houseSlider.addEventListener('mousedown', dragStart);
        houseSlider.addEventListener('mouseup', dragEnd);
        houseSlider.addEventListener('mouseleave', dragEnd);
        houseSlider.addEventListener('mousemove', drag);
        
        // Touch events
        houseSlider.addEventListener('touchstart', dragStart, { passive: true });
        houseSlider.addEventListener('touchend', dragEnd, { passive: true });
        houseSlider.addEventListener('touchmove', drag, { passive: true });
    }
    
    // Get position of cursor/touch
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    // Start drag
    function dragStart(event) {
        if (!isMobile) return; // Only allow drag on mobile
        
        startPosition = getPositionX(event);
        isDragging = true;
        
        // Change cursor style
        houseSlider.style.cursor = 'grabbing';
        
        // Stop any ongoing transitions
        houseSlider.style.transition = 'none';
        
        // Start animation frame
        animationID = requestAnimationFrame(animation);
    }
    
    // During drag
    function drag(event) {
        if (!isDragging || !isMobile) return;
        
        const currentPosition = getPositionX(event);
        const moveDistance = currentPosition - startPosition;
        
        // Calculate new position - convert from px to %
        const containerWidth = houseSlider.offsetWidth;
        const movePercent = (moveDistance / containerWidth) * 100;
        const percentPerCard = 25; // Each card is 25% wide
        
        // Calculate new translate value in %
        const baseTranslatePercent = -currentIndex * percentPerCard;
        const newTranslatePercent = baseTranslatePercent + movePercent;
        
        // Apply the transformation
        currentTranslate = newTranslatePercent;
        houseSlider.style.transform = `translateX(${newTranslatePercent}%)`;
    }
    
    // End drag
    function dragEnd() {
        if (!isDragging || !isMobile) return;
        
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        // Reset cursor
        houseSlider.style.cursor = 'grab';
        
        // Determine how far was dragged
        const movePercent = currentTranslate - (-currentIndex * 25);
        const threshold = 5; // 5% threshold to change slide
        
        // Add smooth transition back
        houseSlider.style.transition = 'transform 0.3s ease';
        
        if (movePercent > threshold && currentIndex > 0) {
            // Swiped right - go to previous slide
            goToSlide(currentIndex - 1);
        } else if (movePercent < -threshold && currentIndex < totalCards - 1) {
            // Swiped left - go to next slide
            goToSlide(currentIndex + 1);
        } else {
            // Return to current slide
            goToSlide(currentIndex);
        }
    }
    
    // Animation function for smooth dragging
    function animation() {
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 768;
        goToSlide(currentIndex); // Reset to current slide with new layout
    });
    
    // Initialize
    addEventListeners();
    updateButtons();
    updateDots();
    
    // Set initial cursor style
    if (isMobile) {
        houseSlider.style.cursor = 'grab';
    }
    
    console.log("House slider initialized successfully with mouse drag support");
});

// Gallery Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing Gallery Slider");
    
    // Seleksi elemen yang diperlukan
    const gallerySlider = document.querySelector('.gallery-slider');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevGalleryBtn = document.querySelector('.prev-gallery');
    const nextGalleryBtn = document.querySelector('.next-gallery');
    const galleryDotsContainer = document.querySelector('.gallery-dots');
    
    // Periksa apakah elemen ditemukan
    if (!gallerySlider || !galleryItems.length) {
        console.error("Gallery slider elements not found!");
        return;
    }
    
    // Variabel untuk tracking state
    let currentGalleryIndex = 0;
    const totalGalleryItems = galleryItems.length;
    let itemsPerView = getItemsPerView();
    let galleryWidth = gallerySlider.offsetWidth;
    
    // Variabel untuk swipe/drag
    let isDragging = false;
    let mousePressed = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let initialPos = 0;
    let clickThreshold = 10; // Threshold to differentiate between click and drag
    
    // Tambahkan variabel untuk mendeteksi drag
    let dragDistance = 0;
    let dragStartX = 0;
    const dragThreshold = 10; // Jarak minimal untuk dianggap sebagai drag
    
    // Inisialisasi Fancybox
    Fancybox.bind("[data-fancybox]", {
        // Fancybox options
        Carousel: {
            infinite: true,
        },
        Thumbs: {
            autoStart: true,
        },
        // Saat Fancybox terbuka, ingat indexnya untuk sinkronisasi slider
        on: {
            init: (fancybox) => {
                console.log("Fancybox initialized");
            }
        }
    });
    
    // Fungsi untuk menentukan berapa item yang ditampilkan berdasarkan viewport
    function getItemsPerView() {
        if (window.innerWidth < 768) {
            return 1;
        } else if (window.innerWidth < 1200) {
            return 2;
        } else {
            return 3;
        }
    }
    
    // Membuat dots berdasarkan jumlah gambar yang dapat dilihat sekaligus
    function createDots() {
        galleryDotsContainer.innerHTML = '';
        const totalDots = Math.ceil(totalGalleryItems / itemsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            
            dot.addEventListener('click', () => {
                goToGallerySlide(i * itemsPerView);
            });
            
            galleryDotsContainer.appendChild(dot);
        }
    }
    
    // Fungsi untuk navigasi gallery
    function goToGallerySlide(index, smooth = true) {
        // Validasi index
        if (index < 0) index = 0;
        if (index > totalGalleryItems - itemsPerView) index = totalGalleryItems - itemsPerView;
        
        currentGalleryIndex = index;
        
        // Hitung posisi translate berdasarkan itemWidth
        const itemWidth = gallerySlider.offsetWidth / itemsPerView;
        const translateX = -index * itemWidth;
        
        // Set transform dengan atau tanpa transition
        gallerySlider.style.transition = smooth ? 'transform 0.4s ease' : 'none';
        gallerySlider.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        updateGalleryDots();
        
        // Update status navigasi
        updateGalleryNavigation();
        
        // Set prevTranslate untuk reference dalam drag
        prevTranslate = translateX;
        currentTranslate = translateX;
    }
    
    // Update gallery dots
    function updateGalleryDots() {
        const dots = document.querySelectorAll('.gallery-dot');
        const activeDotIndex = Math.floor(currentGalleryIndex / itemsPerView);
        
        dots.forEach((dot, index) => {
            if (index === activeDotIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Update navigation buttons
    function updateGalleryNavigation() {
        // Disable prev button if on first slide
        if (currentGalleryIndex === 0) {
            prevGalleryBtn.classList.add('disabled');
        } else {
            prevGalleryBtn.classList.remove('disabled');
        }
        
        // Disable next button if on last possible slide
        if (currentGalleryIndex >= totalGalleryItems - itemsPerView) {
            nextGalleryBtn.classList.add('disabled');
        } else {
            nextGalleryBtn.classList.remove('disabled');
        }
    }
    
    // Event listener untuk Prev button
    prevGalleryBtn.addEventListener('click', function() {
        goToGallerySlide(currentGalleryIndex - itemsPerView);
    });
    
    // Event listener untuk Next button
    nextGalleryBtn.addEventListener('click', function() {
        goToGallerySlide(currentGalleryIndex + itemsPerView);
    });
    
    // Handle untuk touch/drag swipe functionality
    function touchStart(e) {
        if (e.type === 'mousedown') {
            mousePressed = true;
            e.preventDefault(); // Prevent default browser drag
        }
        
        if (e.type === 'mousemove' && !mousePressed) {
            return;
        }
        
        isDragging = true;
        startPos = getPositionX(e);
        initialPos = startPos;
        dragStartX = startPos; // Capture posisi awal untuk perhitungan drag
        dragDistance = 0; // Reset jarak drag
        
        animationID = requestAnimationFrame(animation);
        gallerySlider.style.cursor = 'grabbing';
        gallerySlider.style.transition = 'none';
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        if (e.type.includes('mouse') && !mousePressed) return;
        
        const currentPosition = getPositionX(e);
        const moveDistance = currentPosition - startPos;
        
        // Hitung jarak total yang di-drag
        dragDistance = Math.abs(currentPosition - dragStartX);
        
        // Calculate new position
        currentTranslate = prevTranslate + moveDistance;
        
        gallerySlider.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function touchEnd(e) {
        if (!isDragging) return;
        
        const wasDragging = dragDistance > dragThreshold;
        
        isDragging = false;
        mousePressed = false;
        cancelAnimationFrame(animationID);
        gallerySlider.style.cursor = 'grab';
        
        // Jika terdeteksi sebagai drag, tandai dengan atribut data
        if (wasDragging) {
            gallerySlider.setAttribute('data-was-dragging', 'true');
            setTimeout(() => {
                gallerySlider.removeAttribute('data-was-dragging');
            }, 100); // Hapus atribut setelah 100ms
            
            // Kode navigasi slider
            const itemWidth = gallerySlider.offsetWidth / itemsPerView;
            const moveRatio = (currentTranslate - prevTranslate) / itemWidth;
            
            gallerySlider.style.transition = 'transform 0.4s ease';
            
            const threshold = 0.2;
            
            if (moveRatio > threshold && currentGalleryIndex > 0) {
                goToGallerySlide(currentGalleryIndex - itemsPerView);
            } else if (moveRatio < -threshold && currentGalleryIndex < totalGalleryItems - itemsPerView) {
                goToGallerySlide(currentGalleryIndex + itemsPerView);
            } else {
                goToGallerySlide(currentGalleryIndex);
            }
        }
    }
    
    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }
    
    function animation() {
        if (isDragging) {
            requestAnimationFrame(animation);
        }
    }
    
    // Event listeners for drag functionality
    gallerySlider.addEventListener('mousedown', touchStart);
    gallerySlider.addEventListener('mousemove', touchMove);
    window.addEventListener('mouseup', touchEnd);
    
    gallerySlider.addEventListener('touchstart', touchStart, { passive: true });
    gallerySlider.addEventListener('touchmove', touchMove, { passive: true });
    gallerySlider.addEventListener('touchend', touchEnd, { passive: true });
    
    // Tambahkan interceptor untuk semua gallery link
    document.querySelectorAll('.gallery-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Jika drag terdeteksi, cegah terbukanya Fancybox
            if (dragDistance > dragThreshold || gallerySlider.hasAttribute('data-was-dragging')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    });
    
    // Mobile caption handling
    if (window.innerWidth <= 768) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (Math.abs(initialPos - getPositionX(e)) < clickThreshold) {
                    e.stopPropagation();
                    
                    // Jangan tangani click jika masih dalam mode drag
                    if (isDragging) return;
                    
                    // Toggle class untuk caption
                    const wasActive = this.classList.contains('caption-active');
                    galleryItems.forEach(i => i.classList.remove('caption-active'));
                    
                    if (!wasActive) {
                        this.classList.add('caption-active');
                    }
                }
            });
        });
        
        // Klik di luar item untuk menyembunyikan caption
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.gallery-item')) {
                galleryItems.forEach(i => i.classList.remove('caption-active'));
            }
        });
    }
    
    // Handle window resize
    function handleResize() {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            createDots();
            
            // Adjust current index to nearest multiple of itemsPerView
            currentGalleryIndex = Math.floor(currentGalleryIndex / itemsPerView) * itemsPerView;
        }
        
        galleryWidth = gallerySlider.offsetWidth;
        goToGallerySlide(currentGalleryIndex, false);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Prevent default drag behavior on images
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('dragstart', e => e.preventDefault());
        }
    });
    
    // Initialize
    createDots();
    updateGalleryNavigation();
    
    // Set initial gallery position
    gallerySlider.style.transform = 'translateX(0)';
    gallerySlider.style.cursor = 'grab';
    
    console.log("Gallery slider with Fancybox initialized successfully");
});

// Hubungi Kami Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const profileContainer = document.querySelector('.profile-container');
    const contactInfoContainer = document.querySelector('.contact-info-container');
    const contactItems = document.querySelectorAll('.contact-item');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animation when elements come into view
    function checkVisibility() {
        if (profileContainer && isInViewport(profileContainer)) {
            profileContainer.classList.add('animate-in');
        }
        
        if (contactInfoContainer && isInViewport(contactInfoContainer)) {
            contactInfoContainer.classList.add('animate-in');
            
            // Animate contact items with delay
            contactItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, 150 * index);
            });
        }
    }
    
    // Add initial styles for animations
    if (profileContainer) {
        profileContainer.style.opacity = '0';
        profileContainer.style.transform = 'translateY(30px)';
        profileContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    if (contactInfoContainer) {
        contactInfoContainer.style.opacity = '0';
        contactInfoContainer.style.transform = 'translateY(30px)';
        contactInfoContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add CSS for the animate-in class
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Check visibility on scroll and initial load
    window.addEventListener('scroll', checkVisibility);
    setTimeout(checkVisibility, 300); // Initial check with slight delay
});

// JavaScript Sederhana untuk Section Google Maps
document.addEventListener('DOMContentLoaded', function() {
    // Animate maps section on scroll
    const mapsSection = document.querySelector('.maps-section');
    const mapsContainer = document.querySelector('.maps-container');
    
    // Fungsi untuk mengecek apakah elemen terlihat di viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Fungsi untuk menambahkan animasi saat elemen muncul di viewport
    function checkMapsVisibility() {
        if (mapsSection && isInViewport(mapsSection)) {
            mapsContainer.classList.add('animate-in');
            
            // Remove scroll listener once animated
            window.removeEventListener('scroll', checkMapsVisibility);
        }
    }
    
    // Add initial styles for animations
    if (mapsContainer) {
        mapsContainer.style.opacity = '0';
        mapsContainer.style.transform = 'translateY(30px)';
        mapsContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    // Add CSS for the animate-in class
    if (!document.querySelector('#maps-animation-style')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'maps-animation-style';
        styleElement.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Check visibility on scroll and initial load
    window.addEventListener('scroll', checkMapsVisibility);
    setTimeout(checkMapsVisibility, 500); // Initial check with slight delay
});

// Footer JavaScript Functionality (Dimodifikasi untuk Menghindari Konflik)
document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('emailNewsletter');
            const email = emailInput.value.trim();
            
            // Simple email validation
            if (!isValidEmail(email)) {
                showEmailError(emailInput, 'Silakan masukkan email yang valid');
                return;
            }
            
            // Here you would typically send the email to your server
            // For demo purposes, we'll just show a success message
            showEmailSuccess(emailInput);
            
            // Reset form
            emailInput.value = '';
            
            // Alert for demonstration purposes (would be replaced by a proper UI notification)
            alert('Terima kasih! Anda telah berhasil berlangganan info Garden House Serpong.');
        });
    }
    
    // Footer animation on scroll
    const footer = document.querySelector('.footer-section');
    const footerItems = document.querySelectorAll('.ft-brand, .ft-links, .ft-contact, .ft-newsletter');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Add animation when elements come into view
    function checkFooterVisibility() {
        if (footer && isInViewport(footer)) {
            // Animate footer items with delay
            footerItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, 150 * index);
            });
            
            // Remove scroll listener once animated
            window.removeEventListener('scroll', checkFooterVisibility);
        }
    }
    
    // Add initial styles for animations
    if (footerItems.length > 0) {
        footerItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Add CSS for the fade-in class
        const fadeInStyle = document.createElement('style');
        fadeInStyle.textContent = `
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(fadeInStyle);
        
        // Listen for scroll to trigger animations
        window.addEventListener('scroll', checkFooterVisibility);
        
        // Initial check for visibility
        setTimeout(checkFooterVisibility, 300);
    }
    
    // Helper functions for form validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showEmailError(inputElement, message) {
        // Remove any existing error message
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and append error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#ff4d4d';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.marginTop = '5px';
        
        inputElement.parentElement.appendChild(errorMessage);
        
        // Add error styling to input
        inputElement.style.borderColor = '#ff4d4d';
        
        // Remove error message after 3 seconds
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.remove();
                inputElement.style.borderColor = '';
            }
        }, 3000);
    }
    
    function showEmailSuccess(inputElement) {
        // Remove any existing error message
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Flash success styling
        inputElement.style.borderColor = '#4CAF50';
        inputElement.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        
        // Reset styling after animation
        setTimeout(() => {
            inputElement.style.borderColor = '';
            inputElement.style.backgroundColor = '';
        }, 2000);
    }
});

// Fungsi validasi email yang dibutuhkan
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fungsi untuk menampilkan error
function showEmailError(inputElement, message) {
    // Buat elemen error jika belum ada
    let errorElement = inputElement.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff4d4d';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        inputElement.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    inputElement.style.borderColor = '#ff4d4d';
    
    // Hapus pesan error setelah 3 detik
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.textContent = '';
            inputElement.style.borderColor = '';
        }
    }, 3000);
}

// Fungsi untuk menampilkan sukses
function showEmailSuccess(inputElement) {
    inputElement.style.borderColor = '#4CAF50';
    inputElement.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
    
    setTimeout(() => {
        inputElement.style.borderColor = '';
        inputElement.style.backgroundColor = '';
    }, 2000);
}

// Form handler untuk newsletter
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('emailNewsletter');
    const email = emailInput.value.trim();
    
    // Validasi email
    if (!isValidEmail(email)) {
        showEmailError(emailInput, 'Silakan masukkan email yang valid');
        return;
    }
    
    // Informasi Telegram yang benar
    const botToken = '8110849181:AAGRC4QSMVayvU50Jd6f0b9YOJAdaSt2__E';
    const chatId = '-4676919972';
    
    // Encode message untuk URL
    const message = encodeURIComponent(`📧 Subscriber Baru!\nEmail: ${email}\nWaktu: ${new Date().toLocaleString('id-ID')}`);
    
    // Buat URL untuk mengirim pesan
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;
    
    // Gunakan teknik image placeholder untuk mengatasi CORS
    const img = new Image();
    img.src = telegramUrl;
    img.style.display = 'none';
    img.onload = function() {
        showEmailSuccess(emailInput);
        emailInput.value = '';
        alert('Terima kasih! Anda telah berhasil berlangganan info Garden House Serpong.');
    };
    img.onerror = function() {
        // Mungkin berhasil terkirim meskipun ada error CORS
        console.log('Request telah dikirim ke Telegram. Periksa Telegram Anda.');
        showEmailSuccess(emailInput);
        emailInput.value = '';
        alert('Terima kasih! Anda telah berhasil berlangganan info Garden House Serpong.');
    };
    
    // Tambahkan ke DOM dan kemudian hapus
    document.body.appendChild(img);
    setTimeout(() => {
        if (img.parentNode) {
            document.body.removeChild(img);
        }
    }, 5000);
});

