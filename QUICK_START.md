# 🍜 PAWONWIN - QUICK START GUIDE

## Untuk menjalankan aplikasi ini dengan cepat:

### WINDOWS USERS:
1. **Double-click `fix-dependencies.bat`** - Install semua dependencies yang diperlukan
2. **Double-click `start.bat`** - Jalankan server
3. **Buka browser ke `http://localhost:3000`**

### LINUX/MAC USERS:
```bash
# Make scripts executable
chmod +x fix-dependencies.sh
chmod +x install.sh

# Install dependencies
./fix-dependencies.sh

# Start server
npm start
```

### MANUAL INSTALLATION:
```bash
# Install dependencies
npm install express ejs multer uuid
npm install --save-dev nodemon

# Start server
npm start
```

## ❌ Error yang Umum Terjadi:

**Error: Cannot find module 'ejs'**
- Solusi: Jalankan `fix-dependencies.bat` atau `npm install ejs`

**Error: Port 3000 in use**
- Solusi: Tutup aplikasi lain yang menggunakan port 3000
- Atau ubah port: `set PORT=3001 && npm start`

**Error: ENOENT upload folder**
- Solusi: Folder upload akan dibuat otomatis saat server start

## 🌐 Setelah server berjalan:
- Buka browser ke: `http://localhost:3000`
- Upload foto soto (.jpg, .png, .gif, .webp)
- Maksimal ukuran file: 5MB
- Lihat hasil analisis otomatis

## 📁 File Structure:
```
soto-analyzer/
├── app.js              # Main server file
├── package.json        # Dependencies
├── start.bat          # Quick start (Windows)
├── fix-dependencies.bat # Fix install issues
├── upload/            # Uploaded photos folder
├── views/index.ejs    # Main HTML template
└── public/            # CSS, JS, PWA files
```

## 🔧 Features:
- ✅ Drag & drop upload
- ✅ Image preview
- ✅ AI simulation analysis
- ✅ Progress bar
- ✅ Upload history
- ✅ Responsive design
- ✅ PWA support
- ✅ Offline capability

Happy cooking! 🍜✨
