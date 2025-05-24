# Pwowin

Aplikasi web untuk menganalisis foto makanan dan memberikan rekomendasi kualitas, harga, dan deskripsi secara otomatis.

## Fitur

- ✅ Upload foto makanan dengan drag & drop atau klik
- ✅ Validasi file gambar dan ukuran maksimal 5MB
- ✅ Preview foto sebelum upload
- ✅ Analisis otomatis foto soto (simulasi AI)
- ✅ Rekomendasi kualitas, harga, dan deskripsi
- ✅ Interface responsif dan user-friendly
- ✅ Penyimpanan file di folder upload
- ✅ Riwayat analisis dengan localStorage dan server log
- ✅ Progress bar untuk upload
- ✅ PWA support untuk offline usage

## Teknologi

- **Backend**: Node.js + Express.js
- **Upload**: Multer
- **Template Engine**: EJS
- **Styling**: CSS3 dengan Flexbox/Grid + Custom animations
- **JavaScript**: Enhanced ES6+ dengan Class-based architecture
- **PWA**: Service Worker untuk offline support

## Quick Start (Windows)

### Metode 1: Automatic Setup
1. Double-click `fix-dependencies.bat` untuk install dependencies
2. Double-click `start.bat` untuk menjalankan server
3. Buka browser ke `http://localhost:3000`

### Metode 2: Manual Setup
1. Pastikan Node.js sudah terinstall
2. Buka Command Prompt/PowerShell di folder proyek
3. Jalankan perintah berikut:
   ```cmd
   npm install
   npm start
   ```

## Instalasi Manual

### Prerequisites
- Node.js (versi 14 atau lebih baru)
- npm (biasanya sudah include dengan Node.js)

### Langkah Instalasi

1. **Clone atau download proyek ini**
   ```bash
   # Jika menggunakan git
   git clone <repository-url>
   cd soto-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   Atau install satu per satu jika ada masalah:
   ```bash
   npm install express@^4.18.2
   npm install ejs@^3.1.9
   npm install multer@^1.4.5
   npm install uuid@^9.0.0
   npm install --save-dev nodemon@^3.0.1
   ```

3. **Jalankan aplikasi**
   ```bash
   # Production mode
   npm start
   
   # Development mode (dengan auto-reload)
   npm run dev
   ```

4. **Buka browser ke `http://localhost:3000`**

## Troubleshooting

### Error: Cannot find module 'ejs'
```bash
# Install EJS secara manual
npm install ejs@^3.1.9

# Atau jalankan script fix
# Windows:
fix-dependencies.bat

# Linux/Mac:
./fix-dependencies.sh
```

### Error: Port 3000 already in use
```bash
# Set custom port
set PORT=3001 && npm start

# Atau kill process yang menggunakan port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: Permission denied (Linux/Mac)
```bash
# Make scripts executable
chmod +x fix-dependencies.sh
chmod +x install.sh
```

## Struktur Proyek

```
soto-analyzer/
├── app.js              # File utama aplikasi
├── package.json        # Dependencies dan scripts
├── upload/             # Folder penyimpanan foto
├── public/             # Static files (jika diperlukan)
├── views/              # Template EJS
│   └── index.ejs       # Halaman utama
└── README.md           # Dokumentasi
```

## API Endpoints

### POST /upload
Upload foto soto untuk dianalisis.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file dengan key 'sotoPhoto'

**Response:**
```json
{
  "success": true,
  "message": "Foto berhasil diupload dan dianalisis!",
  "data": {
    "filename": "uuid-filename.jpg",
    "originalName": "soto.jpg",
    "size": 1234567,
    "analysis": {
      "type": "Soto Ayam",
      "quality": "Premium",
      "price": "Rp 15.000 - 20.000",
      "description": "...",
      "confidence": 85,
      "uploadTime": "25/5/2025 10:30:15"
    }
  }
}
```

### GET /upload/:filename
Mengakses foto yang sudah diupload.

### GET /history
Melihat riwayat file yang diupload.

## Validasi File

- Format yang diterima: semua format gambar (jpg, png, gif, webp, etc.)
- Ukuran maksimal: 5MB
- File disimpan dengan nama unik menggunakan UUID

## Database Soto

Aplikasi menggunakan database soto sederhana yang berisi:
- Soto Ayam
- Soto Betawi  
- Soto Lamongan
- Soto Kudus

Setiap jenis soto memiliki informasi kualitas, harga, dan deskripsi.

## Simulasi AI

Saat ini aplikasi menggunakan simulasi analisis foto dengan:
- Random selection dari database soto
- Confidence score 70-100%
- Timestamp upload

Untuk implementasi produksi, bisa diganti dengan:
- TensorFlow.js
- Google Vision API
- Custom ML model
- Integrasi dengan cloud AI services

## Pengembangan Lebih Lanjut

1. **Machine Learning**: Implementasi model AI sesungguhnya
2. **Database**: Gunakan MongoDB/PostgreSQL untuk data persisten
3. **Authentication**: Sistem login dan user management  
4. **History**: Simpan riwayat analisis per user
5. **Rating**: Sistem rating dan feedback
6. **Export**: Export hasil analisis ke PDF/Excel
7. **Batch Upload**: Upload multiple files sekaligus

## Troubleshooting

### Error "File terlalu besar"
- Pastikan ukuran file tidak melebihi 5MB
- Kompres foto sebelum upload

### Error "File harus berupa gambar"  
- Pastikan file yang diupload adalah format gambar
- Format yang didukung: jpg, png, gif, webp, dll

### Foto tidak muncul
- Periksa apakah folder `upload` sudah dibuat
- Pastikan permission folder upload sudah benar

## Lisensi

MIT License - bebas digunakan untuk pembelajaran dan pengembangan.
