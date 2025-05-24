// Enhanced JavaScript functionality for Soto Analyzer

class SotoAnalyzer {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.previewContainer = document.getElementById('previewContainer');
        this.previewImage = document.getElementById('previewImage');
        this.fileInfo = document.getElementById('fileInfo');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.successMessage = document.getElementById('successMessage');
        this.resultContainer = document.getElementById('resultContainer');
        this.progressBar = document.getElementById('progressBar');
        
        this.initializeEventListeners();
        this.createProgressBar();
        this.createHistoryButton();
    }

    initializeEventListeners() {
        // Drag and drop events
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        
        // File input change
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        
        // Keyboard accessibility
        this.uploadArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.fileInput.click();
            }
        });
        
        // Click to upload
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });
    }

    createProgressBar() {
        const progressBarHTML = `
            <div class="progress-bar" id="progressBar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        `;
        this.loading.insertAdjacentHTML('afterend', progressBarHTML);
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
    }

    createHistoryButton() {
        const historyButton = document.createElement('button');
        historyButton.className = 'nav-button';
        historyButton.innerHTML = '📋 Riwayat';
        historyButton.onclick = this.showHistory.bind(this);
        document.body.appendChild(historyButton);
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    handleFileSelect(e) {
        if (e.target.files && e.target.files[0]) {
            this.handleFile(e.target.files[0]);
        }
    }

    handleFile(file) {
        // Validate file
        if (!this.validateFile(file)) {
            return;
        }

        // Show preview
        this.showPreview(file);
        
        // Upload file
        this.uploadFile(file);
    }

    validateFile(file) {
        // Check if file is image
        if (!file.type.startsWith('image/')) {
            this.showError('File harus berupa gambar!');
            return false;
        }

        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            this.showError('Ukuran file maksimal 5MB!');
            return false;
        }

        // Check file extension
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            this.showError('Format file tidak didukung! Gunakan: ' + allowedExtensions.join(', '));
            return false;
        }

        return true;
    }

    showPreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImage.src = e.target.result;
            this.previewContainer.style.display = 'block';
            
            // Enhanced file info
            this.fileInfo.innerHTML = `
                <div class="file-info-item">
                    <strong>Nama File:</strong>
                    ${file.name}
                </div>
                <div class="file-info-item">
                    <strong>Ukuran:</strong>
                    ${this.formatFileSize(file.size)}
                </div>
                <div class="file-info-item">
                    <strong>Tipe:</strong>
                    ${file.type}
                </div>
                <div class="file-info-item">
                    <strong>Terakhir Diubah:</strong>
                    ${new Date(file.lastModified).toLocaleString('id-ID')}
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }

    uploadFile(file) {
        const formData = new FormData();
        formData.append('sotoPhoto', file);

        // Show loading state
        this.loading.style.display = 'block';
        this.progressBar.style.display = 'block';
        this.hideMessages();
        this.resultContainer.style.display = 'none';

        // Simulate progress
        this.simulateProgress();

        // Create XMLHttpRequest for progress tracking
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                this.progressFill.style.width = percentComplete + '%';
            }
        });

        xhr.addEventListener('load', () => {
            this.loading.style.display = 'none';
            this.progressBar.style.display = 'none';
            
            try {
                const data = JSON.parse(xhr.responseText);
                if (data.success) {
                    this.showSuccess('Foto berhasil diupload dan dianalisis!');
                    this.displayResult(data.data.analysis);
                    this.saveToLocalHistory(data.data);
                } else {
                    this.showError(data.message);
                }
            } catch (error) {
                this.showError('Terjadi kesalahan saat memproses response!');
                console.error('Parse error:', error);
            }
        });

        xhr.addEventListener('error', () => {
            this.loading.style.display = 'none';
            this.progressBar.style.display = 'none';
            this.showError('Terjadi kesalahan saat mengupload file!');
        });

        xhr.open('POST', '/upload');
        xhr.send(formData);
    }

    simulateProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 90) {
                clearInterval(interval);
                progress = 90;
            }
            this.progressFill.style.width = progress + '%';
        }, 200);
    }

    displayResult(analysis) {
        document.getElementById('resultTitle').textContent = analysis.type;
        document.getElementById('confidenceBadge').textContent = `Confidence: ${analysis.confidence}%`;
        
        const qualityColor = analysis.quality === 'Premium' ? '#4CAF50' : 
                           analysis.quality === 'Standard' ? '#FF9800' : '#757575';
        
        const resultGrid = document.getElementById('resultGrid');
        resultGrid.innerHTML = `
            <div class="result-card">
                <h3>🏆 Kualitas</h3>
                <p style="color: ${qualityColor}; font-weight: 600;">${analysis.quality}</p>
            </div>
            <div class="result-card">
                <h3>💰 Estimasi Harga</h3>
                <p style="font-weight: 600; color: #2E7D32;">${analysis.price}</p>
            </div>
            <div class="result-card">
                <h3>📝 Deskripsi</h3>
                <p>${analysis.description}</p>
            </div>
            <div class="result-card">
                <h3>⏰ Waktu Analisis</h3>
                <p>${analysis.uploadTime}</p>
            </div>
        `;
        
        this.resultContainer.style.display = 'block';
        this.resultContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Add animation
        const cards = document.querySelectorAll('.result-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            }, index * 100);
        });
    }

    saveToLocalHistory(data) {
        try {
            let history = JSON.parse(localStorage.getItem('sotoHistory') || '[]');
            history.unshift({
                ...data,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 10 items
            history = history.slice(0, 10);
            localStorage.setItem('sotoHistory', JSON.stringify(history));
        } catch (error) {
            console.warn('Could not save to localStorage:', error);
        }
    }

    showHistory() {
        try {
            const history = JSON.parse(localStorage.getItem('sotoHistory') || '[]');
            this.createHistoryModal(history);
        } catch (error) {
            console.warn('Could not load history:', error);
            this.showError('Tidak dapat memuat riwayat!');
        }
    }

    createHistoryModal(history) {
        // Remove existing modal
        const existingModal = document.getElementById('historyModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'historyModal';
        modal.className = 'modal';
        modal.style.display = 'block';
        
        const historyItems = history.length > 0 ? 
            history.map(item => `
                <div class="result-card" style="margin-bottom: 15px;">
                    <h4>${item.analysis.type}</h4>
                    <p><strong>Kualitas:</strong> ${item.analysis.quality}</p>
                    <p><strong>Harga:</strong> ${item.analysis.price}</p>
                    <p><strong>Waktu:</strong> ${item.analysis.uploadTime}</p>
                </div>
            `).join('') :
            '<p style="text-align: center; color: #666;">Belum ada riwayat analisis</p>';

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 style="color: #8b4513; margin-bottom: 20px;">📋 Riwayat Analisis Soto</h2>
                <div style="max-height: 60vh; overflow-y: auto;">
                    ${historyItems}
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="this.closest('.modal').remove()" 
                            style="background: #ff8c42; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">
                        Tutup
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal events
        modal.querySelector('.close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.successMessage.style.display = 'none';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 5000);
    }

    showSuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
        this.errorMessage.style.display = 'none';
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.successMessage.style.display = 'none';
        }, 3000);
    }

    hideMessages() {
        this.errorMessage.style.display = 'none';
        this.successMessage.style.display = 'none';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SotoAnalyzer();
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
