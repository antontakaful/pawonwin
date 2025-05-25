# 🍜 Soto Analyzer - Enhanced AI Photo Analysis (Mockup Design)

Aplikasi web untuk menganalisis foto soto dan memberikan rekomendasi kualitas, harga, dan deskripsi secara otomatis dengan teknologi AI terdepan. **Layout telah diupdate sesuai mockup design yang diberikan.**

## 🎯 Fitur Sesuai Mockup Design

### 📸 1. Photo Analysis dengan Feedback
- ✅ **Tampilan foto yang diupload** dengan frame yang clean
- ✅ **Feedback box berwarna pink** sesuai mockup
- ✅ **Pesan feedback yang informatif** (blur, gelap, pencahayaan)
- ✅ **Styling yang konsisten** dengan design system

### 🍜 2. Grid 2x2 Recommendations
- ✅ **Layout grid 2x2** untuk rekomendasi foto soto
- ✅ **Card design yang clean** dengan placeholder image
- ✅ **Nama soto yang spesifik** (Soto Ayam Cerah, Soto Betawi Detail, etc.)
- ✅ **Responsive grid** yang adaptif di mobile

### 💰 3. Pricing Layout Sesuai Mockup
- ✅ **Background hijau** untuk section pricing
- ✅ **Format "Harga Termurah" dan "Harga Termahal"** 
- ✅ **Rekomendasi AI dengan highlight** di box terpisah
- ✅ **Typography yang sesuai** dengan hierarchy yang jelas

### ✨ 4. Clean Copywriting Section
- ✅ **Background biru** untuk section deskripsi
- ✅ **Selling points tanpa emoji** sesuai mockup
- ✅ **Action buttons "Simpan" dan "Bagikan"** 
- ✅ **Layout yang responsive** dan user-friendly

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

## 📊 Demo Results Sesuai Mockup

Setelah upload foto soto, aplikasi akan menampilkan layout yang persis seperti mockup:

### 1. 📸 Photo Analysis
```
Foto Soto Anda:
[Gambar foto yang diupload]

[Box Pink] Foto terlihat agak gelap dan sedikit blur 
di bagian topping. Coba ambil dengan pencahayaan 
lebih baik dan fokus yang tajam.
```

### 2. 🍜 Rekomendasi Grid 2x2
```
Rekomendasi Foto Soto (AI)

[🌟 Card 1]     [🌟 Card 2]
Soto Ayam Cerah   Soto Betawi Detail

[🌟 Card 3]     [🌟 Card 4] 
Soto Lamongan Top  Soto Babat Khas
```

### 3. 💰 Pricing Layout Hijau
```
Estimasi & Rekomendasi Harga

Harga Termurah:     Rp 12.000
Harga Termahal:     Rp 28.000

[Box Hijau Highlight]
Rekomendasi Harga AI:
Rp 18.500
```

### 4. ✨ Copywriting Section Biru
```
Deskripsi & Selling Points (AI)

Soto khas Nusantara dengan kuah kaldu ayam kampung 
yang medok, diracik dengan bumbu pilihan...

Selling Points Utama:
• Kuah Kaldu Premium: Dimasak berjam-jam untuk rasa maksimal
• Topping Melimpah: Isian lengkap dan tidak pelit
• 100% Halal: Diproses secara higienis dan halal
• Pilihan Pedas: Sambal racikan sendiri yang nendang

[Simpan Analisis] [Bagikan Hasil]
```

## 🎆 Preview Demo

**🔗 [Lihat Demo Layout: /mockup-demo.html](/mockup-demo.html)**

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
