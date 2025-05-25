// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const uploadSection = document.getElementById('uploadSection');
const resultsSection = document.getElementById('resultsSection');
const loadingIndicator = document.getElementById('loadingIndicator');
const toast = document.getElementById('toast');

// Result elements
const priceMin = document.getElementById('priceMin');
const priceMax = document.getElementById('priceMax');
const priceRecommended = document.getElementById('priceRecommended');
const description = document.getElementById('description');
const sellingPointsList = document.getElementById('sellingPointsList');
const uploadedImage = document.getElementById('uploadedImage');
const photoFeedback = document.getElementById('photoFeedback');
const photoGrid = document.getElementById('photoGrid');
const saveButton = document.getElementById('saveButton');
const shareButton = document.getElementById('shareButton');

// Current analysis data
let currentAnalysis = null;

// Initialize event listeners
function init() {
    // Upload button click
    uploadButton.addEventListener('click', () => fileInput.click());
    
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Action buttons
    saveButton.addEventListener('click', saveAnalysis);
    shareButton.addEventListener('click', shareAnalysis);
    
    // Click on upload area
    uploadArea.addEventListener('click', () => fileInput.click());
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        uploadFile(file);
    }
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

// Handle file drop
function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        uploadFile(files[0]);
    }
}

// Upload file to server
async function uploadFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showToast('Harap upload file gambar', 'error');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showToast('Ukuran file maksimal 10MB', 'error');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Create FormData
    const formData = new FormData();
    formData.append('soto', file);
    
    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentAnalysis = data;
            displayResults(data);
        } else {
            throw new Error(data.error || 'Upload gagal');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showToast('Gagal mengupload foto. Silakan coba lagi.', 'error');
        hideLoading();
    }
}

// Display analysis results
function displayResults(data) {
    const { file, analysis } = data;
    const { quality, recommendations } = analysis;
    
    // Update prices
    priceMin.textContent = formatCurrency(recommendations.pricing.min);
    priceMax.textContent = formatCurrency(recommendations.pricing.max);
    priceRecommended.textContent = formatCurrency(recommendations.pricing.recommended);
    
    // Update description
    description.textContent = recommendations.description;
    
    // Update selling points
    sellingPointsList.innerHTML = '';
    recommendations.sellingPoints.forEach(point => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${point.title}:</strong> ${point.desc}`;
        sellingPointsList.appendChild(li);
    });
    
    // Update uploaded image
    uploadedImage.src = file.path;
    uploadedImage.alt = 'Foto Soto Pengguna';
    
    // Update photo feedback
    const feedbackText = photoFeedback.querySelector('p');
    feedbackText.textContent = quality.recommendation;
    
    // Update photo recommendations
    photoGrid.innerHTML = '';
    recommendations.photoRecommendations.forEach((rec, index) => {
        const div = document.createElement('div');
        div.className = 'photo-recommendation';
        div.innerHTML = `
            <img src="${rec.image}" alt="${rec.name}" onerror="this.src='/recommendations/placeholder.jpg'">
            <p>${rec.name}</p>
        `;
        photoGrid.appendChild(div);
    });
    
    // Hide loading and show results
    hideLoading();
    uploadSection.style.display = 'none';
    resultsSection.style.display = 'block';
}

// Save analysis
function saveAnalysis() {
    if (!currentAnalysis) return;
    
    // In a real app, this would save to a database
    localStorage.setItem('lastAnalysis', JSON.stringify(currentAnalysis));
    showToast('Analisis berhasil disimpan!', 'success');
}

// Share analysis
function shareAnalysis() {
    if (!currentAnalysis) return;
    
    // Create shareable text
    const shareText = `Analisis Foto Soto\n` +
        `Harga Rekomendasi: ${priceRecommended.textContent}\n` +
        `${description.textContent}`;
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Analisis Foto Soto',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('Hasil analisis disalin ke clipboard!', 'success');
        }).catch(() => {
            showToast('Gagal menyalin hasil', 'error');
        });
    }
}

// Show loading indicator
function showLoading() {
    loadingIndicator.style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    loadingIndicator.style.display = 'none';
}

// Show toast notification
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Initialize app
init();
