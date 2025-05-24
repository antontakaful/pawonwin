# 🍜 Soto Analyzer - Enhanced AI Photo Analysis

Aplikasi web untuk menganalisis foto soto dan memberikan rekomendasi kualitas, harga, dan deskripsi secara otomatis dengan teknologi AI terdepan.

## 🎯 Fitur Enhanced (Update Terbaru)

### 📸 1. Analisis Kualitas Foto AI
- **Deteksi Kualitas:** AI menganalisis pencahayaan, kejelasan, komposisi, dan fokus
- **Scoring System:** Score 0-100 dengan feedback detail
- **Saran Perbaikan:** Tips spesifik untuk meningkatkan kualitas foto
- **Real-time Feedback:** Memberitahu jika foto blur, gelap, atau kurang optimal

### 🍜 2. Rekomendasi Foto Soto Terbaik
- **Merchant Terverifikasi:** Tampilan foto soto berkualitas dari merchant terpercaya
- **Rating & Reviews:** Sistem rating 5 bintang dengan jumlah review
- **Kualitas Referensi:** Contoh foto soto yang sudah disetujui AI
- **Inspiration Gallery:** Galeri foto untuk inspirasi fotografi makanan

### 💰 3. AI Price Recommendation Engine
- **Smart Pricing:** Analisis harga berdasarkan jenis soto dan kualitas
- **Market Analysis:** Perbandingan dengan harga pasar (range 10k-25k)
- **Competitive Pricing:** Rekomendasi harga yang optimal dan kompetitif
- **Price Reasoning:** Penjelasan detail mengapa AI memberikan harga tersebut

### ✨ 4. AI Copywriting & Content Generator
- **Auto Description:** Generate deskripsi produk yang menarik
- **Selling Points:** Bullet points keunggulan produk otomatis
- **Smart Hashtags:** Generate hashtags yang relevan untuk media sosial
- **Call-to-Action:** CTA yang persuasif dan menarik
- **SEO Optimized:** Content yang dioptimasi untuk search engine

### 🎨 5. Enhanced User Experience
- **Modern UI/UX:** Interface yang lebih modern dan user-friendly
- **Progress Indicators:** Visual feedback saat upload dan analisis
- **Smooth Animations:** Transisi dan animasi yang halus
- **Mobile Responsive:** Optimal di semua device
- **PWA Support:** Offline capability dan installable app

## 🛠️ Teknologi

- **Backend**: Node.js + Express.js dengan enhanced middleware
- **AI Engine**: Advanced photo quality analysis algorithms
- **Upload**: Multer dengan enhanced file validation
- **Template Engine**: EJS dengan dynamic content rendering
- **Styling**: CSS3 + Custom animations + Responsive design
- **JavaScript**: ES6+ Class-based architecture
- **PWA**: Service Worker untuk offline support
- **Security**: Enhanced security headers dan validation

## 🚀 Quick Start (Windows)

### ⚡ Metode 1: Super Quick (Recommended)
```bash
# 1. Install dependencies otomatis
double-click "fix-dependencies.bat"

# 2. Start server
double-click "start.bat"

# 3. Buka browser
http://localhost:3000
```

### 🔧 Metode 2: Manual Setup
```bash
# Install dependencies
npm install express ejs multer uuid
npm install --save-dev nodemon

# Start server
npm start
```

## 📊 Demo Results Example

Setelah upload foto soto, aplikasi akan menampilkan:

### 1. 📸 Photo Quality Analysis
```
Score: 78/100 - Kualitas Baik
Feedback: "Foto cukup baik, namun bisa ditingkatkan"
Saran:
• Coba ambil foto dengan pencahayaan lebih terang
• Pastikan fokus tepat pada objek soto
• Gunakan background yang lebih bersih
```

### 2. 🍜 Soto Recommendations (3 cards)
```
[Card 1] Soto Betawi Haji Mamat
⭐⭐⭐⭐⭐ 4.8/5 (324 reviews)
Rp 18.000 - 25.000

[Card 2] Soto Lamongan Cak Har  
⭐⭐⭐⭐⭐ 4.6/5 (198 reviews)
Rp 12.000 - 18.000

[Card 3] Soto Kudus Bu Tini
⭐⭐⭐⭐⭐ 4.7/5 (267 reviews)
Rp 16.000 - 22.000
```

### 3. 💰 AI Price Recommendations
```
🤖 Rekomendasi AI: Rp 18.000
Range Pasar: Rp 15.000 - 21.000
Harga Terendah: Rp 10.000
Harga Tertinggi: Rp 25.000

Reasoning: "Berdasarkan analisis AI, harga yang 
direkomendasikan untuk Soto Ayam dengan kualitas 
Premium adalah Rp 18.000. Harga ini competitive 
dengan range pasar."
```

### 4. ✨ AI Copywriting
```
Title: "Kelezatan Autentik yang Menggugah Selera"

Description: "Nikmati cita rasa Soto Ayam yang autentik 
dengan bumbu rempah pilihan yang telah diracik secara 
tradisional. Setiap suapan memberikan pengalaman 
kuliner yang tak terlupakan..."

Selling Points:
🌟 Resep turun-temurun yang autentik
🥘 Bahan-bahan segar pilihan setiap hari
👨‍🍳 Dimasak oleh chef berpengalaman
🔥 Disajikan selalu hangat dan fresh

Hashtags: #SotoAyam #KulinerJawaTengah #SotoEnak
CTA: "Yuk, cobain sekarang dan rasakan bedanya!"
```

## 📁 Struktur Proyek Enhanced

```
soto-analyzer/
├── 📄 app.js                    # Enhanced server dengan AI features
├── 📄 package.json              # Dependencies yang sudah diperbaiki
├── 📄 README.md                 # Dokumentasi lengkap
├── 📄 QUICK_START.md            # Panduan cepat
├── 📄 demo.html                 # Demo page fitur enhanced
├── 🔧 fix-dependencies.bat      # Script fix untuk Windows
├── 🔧 start.bat                 # Quick start untuk Windows
├── 📁 upload/                   # Folder penyimpanan foto + logs
│   ├── .gitkeep                 # Placeholder
│   └── analysis_log.json        # Log analisis (auto-generated)
├── 📁 views/                    # Template EJS enhanced
│   └── index.ejs                # Main page dengan 4 section baru
└── 📁 public/                   # Static assets enhanced
    ├── style.css                # Enhanced CSS dengan animations
    ├── app.js                   # Enhanced JavaScript dengan class
    ├── manifest.json            # PWA manifest
    └── sw.js                    # Service Worker
```

## 🌐 API Endpoints Enhanced

### POST /upload
Upload dan analisis foto soto dengan AI.

**Enhanced Response:**
```json
{
  "success": true,
  "message": "Foto berhasil diupload dan dianalisis!",
  "data": {
    "analysis": {
      "type": "Soto Ayam",
      "confidence": 85,
      "photoQuality": {
        "score": 78,
        "qualityLevel": "Baik",
        "feedback": "Foto cukup baik...",
        "suggestions": ["Tingkatkan pencahayaan..."]
      },
      "recommendations": [
        {
          "type": "Soto Betawi",
          "merchant": "Haji Mamat",
          "qualityRating": 4.8,
          "totalReviews": 324
        }
      ],
      "priceRecommendation": {
        "recommended": 18000,
        "range": { "min": 15000, "max": 21000 },
        "reasoning": "Berdasarkan analisis AI..."
      },
      "aiCopywriting": {
        "title": "Kelezatan Autentik...",
        "description": "Nikmati cita rasa...",
        "sellingPoints": ["🌟 Resep turun-temurun..."],
        "hashtags": ["#SotoAyam", "#KulinerJawaTengah"],
        "callToAction": "Yuk, cobain sekarang!"
      }
    }
  }
}
```

### Endpoints Tambahan
```
GET /api/history     - Riwayat analisis lengkap
GET /api/stats       - Statistik server
DELETE /upload/:id   - Hapus file dan log
GET /health          - Health check
```

## 🚨 Troubleshooting Enhanced

### ❌ Error: Cannot find module 'ejs'
```bash
# Quick fix (Windows)
double-click "fix-dependencies.bat"

# Manual fix
npm install ejs@^3.1.9
```

### ❌ Error: Port 3000 already in use
```bash
# Windows
set PORT=3001 && npm start
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
export PORT=3001 && npm start
lsof -ti:3000 | xargs kill
```

### ❌ Upload Error / Photo Analysis Failed
```bash
# Check upload folder permissions
# Ensure file size < 5MB
# Verify image format (jpg, png, gif, webp, bmp)
```

## 🔮 Pengembangan Selanjutnya

### 🤖 Real AI Integration
- TensorFlow.js untuk computer vision
- Google Vision API integration
- Custom ML model training
- Real-time image processing

### 📱 Mobile App
- React Native / Flutter app
- Camera integration
- Real-time photo analysis
- Push notifications

### 🔗 Social Features
- User authentication
- Social sharing
- Community reviews
- Leaderboard system

### 💼 Business Features
- Merchant dashboard
- Inventory management
- Sales analytics
- Customer insights

## 📄 Lisensi

MIT License - bebas digunakan untuk pembelajaran dan pengembangan komersial.

---

## 🎉 Ready to Use!

**Upload foto soto Anda sekarang dan nikmati pengalaman analisis AI yang lengkap dengan:**
- ✅ Analisis kualitas foto real-time
- ✅ Rekomendasi merchant terpercaya
- ✅ Estimasi harga yang akurat
- ✅ Copywriting AI untuk marketing

**🚀 [Start Now: http://localhost:3000](http://localhost:3000)**
