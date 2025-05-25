# PawonWin - AI Soto Photo Analyzer

Aplikasi web untuk menganalisis foto soto dan memberikan rekomendasi harga serta deskripsi otomatis menggunakan AI.

## Fitur

- Upload foto soto dengan drag & drop atau pilih file
- Analisis kualitas foto otomatis
- Rekomendasi harga berdasarkan AI
- Deskripsi produk dan selling points otomatis
- Rekomendasi foto soto yang lebih baik
- Simpan dan bagikan hasil analisis

## Instalasi

1. Clone repository atau copy folder pawonwin
2. Install dependencies:
```bash
npm install
```

3. Jalankan server:
```bash
npm start
```

4. Buka browser ke http://localhost:3000

## Struktur Folder

```
pawonwin/
├── server.js          # Backend server
├── package.json       # Dependencies
├── public/           
│   ├── index.html    # Frontend HTML
│   ├── style.css     # Styling
│   └── script.js     # Frontend logic
├── uploads/          # Uploaded images
└── recommendations/  # Sample recommendation images
```

## Teknologi

- **Backend**: Node.js, Express.js
- **File Upload**: Multer
- **Image Processing**: Sharp
- **Frontend**: Vanilla JavaScript, CSS3

## Pengembangan Lanjutan

Untuk implementasi AI yang sebenarnya, Anda dapat:

1. Integrasi dengan API AI (OpenAI, Google Vision, dll)
2. Tambahkan database untuk menyimpan analisis
3. Implementasi user authentication
4. Tambahkan fitur edit/update analisis
5. Export hasil ke PDF
6. Integrasi dengan e-commerce platform

## Catatan

- Pastikan folder `uploads` dan `recommendations` memiliki izin write
- Untuk production, gunakan cloud storage seperti AWS S3
- Implementasi rate limiting untuk mencegah abuse
- Tambahkan validasi dan sanitasi input yang lebih ketat
