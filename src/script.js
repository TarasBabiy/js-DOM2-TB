const gallery = document.getElementById('gallery');
let loadedImages = [];

async function fetchImages(count = 4) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?limit=${count}`);
        const images = await response.json();
        return images;
    } catch (error) {
        console.error("Помилка завантаження зображень:", error);
        return [];
    }
}

async function loadMoreImages() {
    const newImages = await fetchImages(4);
    loadedImages.push(...newImages);
    renderGallery();
}

function renderGallery() {
    gallery.innerHTML = '';
    loadedImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.download_url;
        imgElement.alt = image.author;
        gallery.appendChild(imgElement);
    });
}

function clearGallery() {
    loadedImages = [];
    renderGallery();
}

function removeLastImage() {
    loadedImages.pop();
    renderGallery();
}

function reverseGallery() {
    loadedImages.reverse();
    renderGallery();
}

// Завантажити перші 4 картинки при завантаженні сторінки
window.addEventListener('DOMContentLoaded', loadMoreImages);
