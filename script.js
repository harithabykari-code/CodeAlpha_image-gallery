/**
 * Lumina Gallery - Interactive Logic (Plain JS)
 */

const IMAGES = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1470&auto=format&fit=crop',
        title: 'Alpine Serenity',
        category: 'Nature',
        description: 'A peaceful lake reflecting the majestic mountain peaks at first light.'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1470&auto=format&fit=crop',
        title: 'Urban Rhythm',
        category: 'Architecture',
        description: 'The geometric dance of skyscrapers against a crisp morning horizon.'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop',
        title: 'Yosemite Glow',
        category: 'Nature',
        description: 'Iconic valley peaks catching the golden warmth of a dying sun.'
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1374&auto=format&fit=crop',
        title: 'Eiffel Perspective',
        category: 'Architecture',
        description: 'A unique low-angle study of the Iron Lady\'s structural complexity.'
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=1374&auto=format&fit=crop',
        title: 'Emerald Forest',
        category: 'Nature',
        description: 'Ancient woodlands where light struggles through the thick canopy.'
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop',
        title: 'Modern Minimal',
        category: 'Architecture',
        description: 'Minimalist facades reflecting the shifting moods of the sky.'
    },
    {
        id: 7,
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1500&auto=format&fit=crop',
        title: 'Neon Nights',
        category: 'City',
        description: 'The electric pulse of a city transformed by synthetic light.'
    },
    {
        id: 8,
        url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1544&auto=format&fit=crop',
        title: 'Twilight Skyline',
        category: 'City',
        description: 'Urban sprawl stretching toward a burning indigo horizon.'
    },
    {
        id: 9,
        url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop',
        title: 'Ridge Mist',
        category: 'Nature',
        description: 'Mountain peaks appearing like islands above a sea of heavy clouds.'
    }
];

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const emptyState = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');
const currentCategoryLabel = document.getElementById('current-category-label');

const lightbox = document.getElementById('lightbox');
const closeLightboxBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const lbMainImg = document.getElementById('lightbox-main-img');
const lbCategory = document.getElementById('lb-category');
const lbTitle = document.getElementById('lb-title');
const lbDescription = document.getElementById('lb-description');
const lbCurrentIndex = document.getElementById('lb-current-index');
const lbTotalCount = document.getElementById('lb-total-count');

// State
let currentFilter = 'All';
let filteredData = [...IMAGES];
let currentLightboxIndex = 0;

/**
 * Filter and Render Gallery
 */
function renderGallery() {
    galleryGrid.innerHTML = '';
    
    filteredData = currentFilter === 'All' 
        ? [...IMAGES] 
        : IMAGES.filter(img => img.category === currentFilter);

    if (filteredData.length === 0) {
        galleryGrid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        galleryGrid.classList.remove('hidden');
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');

        filteredData.forEach((image, index) => {
            const card = document.createElement('div');
            card.className = "gallery-item";
            card.onclick = () => openLightbox(index);

            card.innerHTML = `
                <img 
                    src="${image.url}" 
                    alt="${image.title}" 
                    loading="lazy"
                >
                <div class="image-overlay">
                    <div class="image-info">
                        <span class="cat-label">${image.category}</span>
                        <h3 class="image-title">${image.title}</h3>
                        <p class="explore-text">
                             Explore Details <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                        </p>
                    </div>
                </div>
            `;

            galleryGrid.appendChild(card);
        });
    }

    currentCategoryLabel.textContent = currentFilter;
}

/**
 * Filtering Event
 */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        if (currentFilter === cat) return;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = cat;
        renderGallery();
    });
});

/**
 * Lightbox Logic
 */
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
}

function updateLightbox() {
    const data = filteredData[currentLightboxIndex];
    if (!data) return;

    lbMainImg.src = data.url;
    lbCategory.textContent = data.category;
    lbTitle.textContent = data.title;
    lbDescription.textContent = data.description;
    
    lbCurrentIndex.textContent = String(currentLightboxIndex + 1).padStart(2, '0');
    lbTotalCount.textContent = String(filteredData.length).padStart(2, '0');

    // Button states
    prevBtn.disabled = currentLightboxIndex === 0;
    nextBtn.disabled = currentLightboxIndex === filteredData.length - 1;
}

function next() {
    if (currentLightboxIndex < filteredData.length - 1) {
        currentLightboxIndex++;
        updateLightbox();
    }
}

function prev() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        updateLightbox();
    }
}

function close() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-open');
}

// Listeners
closeLightboxBtn.addEventListener('click', close);
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
});

// Keys
window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') close();
});

// Init
renderGallery();