// Enhanced server with additional routes and middleware
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Middleware
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.set('view engine', 'ejs');
app.set('views', './views');

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Enhanced Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './upload';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    // Allowed image types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File harus berupa gambar (JPEG, PNG, GIF, WebP, BMP)!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1
    }
});

// Enhanced soto database
const sotoDatabase = [
    {
        type: 'Soto Ayam',
        quality: 'Premium',
        price: 'Rp 15.000 - 20.000',
        description: 'Soto ayam dengan kuah bening yang gurih, daging ayam empuk, dan bumbu rempah yang kaya. Dilengkapi dengan nasi putih, kerupuk, dan sambal.',
        ingredients: ['Ayam kampung', 'Kunyit', 'Jahe', 'Serai', 'Daun jeruk'],
        region: 'Jawa Tengah'
    },
    {
        type: 'Soto Betawi',
        quality: 'Premium',
        price: 'Rp 18.000 - 25.000',
        description: 'Soto khas Betawi dengan kuah santan yang creamy, daging sapi dan jeroan, serta rempah-rempah khas. Disajikan dengan ketupat dan kerupuk.',
        ingredients: ['Daging sapi', 'Jeroan', 'Santan', 'Kentang', 'Tomat'],
        region: 'Jakarta'
    },
    {
        type: 'Soto Lamongan',
        quality: 'Standard',
        price: 'Rp 12.000 - 18.000',
        description: 'Soto ayam khas Lamongan dengan kuah kuning yang segar, ayam kampung, dan koya (kerupuk yang dihaluskan). Rasanya unik dan menyegarkan.',
        ingredients: ['Ayam kampung', 'Koya', 'Kacang kedelai', 'Kluwek', 'Tempe'],
        region: 'Jawa Timur'
    },
    {
        type: 'Soto Kudus',
        quality: 'Premium',
        price: 'Rp 16.000 - 22.000',
        description: 'Soto ayam khas Kudus dengan kuah bening yang jernih, daging ayam yang lembut, dan bumbu yang pas. Disajikan dengan nasi dan kerupuk.',
        ingredients: ['Ayam', 'Tauge', 'Seledri', 'Bawang goreng', 'Kerupuk'],
        region: 'Jawa Tengah'
    },
    {
        type: 'Soto Banjar',
        quality: 'Standard',
        price: 'Rp 14.000 - 19.000',
        description: 'Soto khas Kalimantan Selatan dengan daging ayam, perkedel kentang, dan kuah yang gurih. Memiliki cita rasa yang khas.',
        ingredients: ['Ayam', 'Perkedel kentang', 'Ketupat', 'Bawang goreng'],
        region: 'Kalimantan Selatan'
    },
    {
        type: 'Soto Madura',
        quality: 'Premium',
        price: 'Rp 17.000 - 23.000',
        description: 'Soto ayam khas Madura dengan kuah kuning yang kental, daging ayam yang empuk, dan bumbu rempah yang kuat.',
        ingredients: ['Ayam', 'Kunyit', 'Kemiri', 'Petai cina', 'Tauge'],
        region: 'Jawa Timur'
    }
];

// Fungsi untuk menganalisis foto soto (simulasi AI)
function analyzeSotoPhoto(filename) {
    // Simulasi analisis foto - dalam praktik nyata, gunakan AI/ML
    const randomIndex = Math.floor(Math.random() * sotoDatabase.length);
    const sotoData = sotoDatabase[randomIndex];
    
    // Simulasi confidence score berdasarkan "kualitas" foto
    const confidence = Math.floor(Math.random() * 25) + 75; // 75-100%
    
    return {
        ...sotoData,
        confidence: confidence,
        filename: filename,
        uploadTime: new Date().toLocaleString('id-ID'),
        imageUrl: `/upload/${filename}`
    };
}

// Fungsi untuk menyimpan log analisis
function saveAnalysisLog(analysisData) {
    const logFile = './upload/analysis_log.json';
    let logs = [];
    
    try {
        if (fs.existsSync(logFile)) {
            const logData = fs.readFileSync(logFile, 'utf8');
            logs = JSON.parse(logData);
        }
    } catch (error) {
        console.log('Creating new log file...');
    }
    
    logs.unshift({
        ...analysisData,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 entries
    logs = logs.slice(0, 100);
    
    try {
        fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Error saving log:', error);
    }
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('sotoPhoto'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'Tidak ada file yang diupload!' 
            });
        }

        // Analisis foto soto
        const analysis = analyzeSotoPhoto(req.file.filename);
        
        // Simpan log analisis
        saveAnalysisLog({
            filename: req.file.filename,
            originalName: req.file.originalname,
            fileSize: req.file.size,
            analysis: analysis
        });
        
        res.json({
            success: true,
            message: 'Foto berhasil diupload dan dianalisis!',
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                uploadTime: new Date().toISOString(),
                analysis: analysis
            }
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan saat mengupload file!' 
        });
    }
});

// Route untuk menampilkan gambar yang diupload
app.get('/upload/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'upload', filename);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ 
            success: false, 
            message: 'Gambar tidak ditemukan!' 
        });
    }
});

// Route untuk melihat riwayat upload dari server
app.get('/api/history', (req, res) => {
    const logFile = './upload/analysis_log.json';
    
    try {
        if (fs.existsSync(logFile)) {
            const logData = fs.readFileSync(logFile, 'utf8');
            const logs = JSON.parse(logData);
            res.json({ success: true, data: logs });
        } else {
            res.json({ success: true, data: [] });
        }
    } catch (error) {
        console.error('Error reading log file:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Tidak dapat memuat riwayat!' 
        });
    }
});

// Route untuk menghapus file
app.delete('/upload/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'upload', filename);
    
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ 
                success: true, 
                message: 'File berhasil dihapus!' 
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'File tidak ditemukan!' 
            });
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Gagal menghapus file!' 
        });
    }
});

// Route untuk statistik
app.get('/api/stats', (req, res) => {
    const uploadDir = './upload';
    const logFile = './upload/analysis_log.json';
    
    try {
        let totalFiles = 0;
        let totalSize = 0;
        let analysisCount = 0;
        
        if (fs.existsSync(uploadDir)) {
            const files = fs.readdirSync(uploadDir).filter(file => 
                file !== '.gitkeep' && file !== 'analysis_log.json'
            );
            totalFiles = files.length;
            
            files.forEach(file => {
                const filePath = path.join(uploadDir, file);
                const stats = fs.statSync(filePath);
                totalSize += stats.size;
            });
        }
        
        if (fs.existsSync(logFile)) {
            const logData = fs.readFileSync(logFile, 'utf8');
            const logs = JSON.parse(logData);
            analysisCount = logs.length;
        }
        
        res.json({
            success: true,
            data: {
                totalFiles,
                totalSize,
                analysisCount,
                formattedSize: formatFileSize(totalSize)
            }
        });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Gagal mengambil statistik!' 
        });
    }
});

// Utility function untuk format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error.message);
    
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File terlalu besar! Maksimal 5MB.'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Hanya boleh upload 1 file!'
            });
        }
    }
    
    res.status(500).json({
        success: false,
        message: error.message || 'Terjadi kesalahan server!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan!'
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`🍜 Soto Analyzer Server running on http://localhost:${PORT}`);
    console.log(`📂 Upload folder: ${path.resolve('./upload')}`);
    console.log(`🕐 Started at: ${new Date().toLocaleString('id-ID')}`);
});
