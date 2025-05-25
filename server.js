const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/recommendations', express.static('recommendations'));

// Ensure directories exist
['uploads', 'recommendations'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'soto-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Analyze image quality
async function analyzeImageQuality(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    const stats = await sharp(imagePath).stats();
    
    let quality = 'good';
    let issues = [];
    
    // Check brightness
    const meanBrightness = stats.channels.reduce((sum, channel) => sum + channel.mean, 0) / stats.channels.length;
    if (meanBrightness < 50) {
      quality = 'poor';
      issues.push('gelap');
    }
    
    // Check sharpness (simplified)
    if (metadata.density && metadata.density < 72) {
      quality = 'poor';
      issues.push('blur');
    }
    
    return {
      quality,
      issues,
      recommendation: issues.length > 0 
        ? `Foto terlihat agak ${issues.join(' dan ')} di bagian topping. Coba ambil dengan pencahayaan lebih baik dan fokus yang tajam.`
        : 'Foto sudah cukup baik untuk analisis.'
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    return {
      quality: 'unknown',
      issues: [],
      recommendation: 'Tidak dapat menganalisis kualitas foto.'
    };
  }
}

// Generate AI recommendations (mock implementation)
function generateRecommendations() {
  const priceMin = 12000;
  const priceMax = 28000;
  const recommendedPrice = 18500;
  
  const descriptions = [
    {
      main: "Soto khas Nusantara dengan kuah kaldu ayam kampung yang medok, diracik dengan bumbu pilihan. Dilengkapi suwiran ayam, telur rebus, soun lembut, irisan kol segar, dan perasan jeruk nipis yang menyegarkan.",
      sellingPoints: [
        { title: "Kuah Kaldu Premium", desc: "Dimasak berjam-jam untuk rasa maksimal." },
        { title: "Topping Melimpah", desc: "Isian lengkap dan tidak pelit." },
        { title: "100% Halal", desc: "Diproses secara higienis dan halal." },
        { title: "Pilihan Pedas", desc: "Sambal racikan sendiri yang nendang." }
      ]
    }
  ];
  
  const photoRecommendations = [
    { name: "Soto Ayam Cerah", image: "/recommendations/soto1.jpg" },
    { name: "Soto Betawi Detail", image: "/recommendations/soto2.jpg" },
    { name: "Soto Lamongan Top", image: "/recommendations/soto3.jpg" },
    { name: "Soto Babat Khas", image: "/recommendations/soto4.jpg" }
  ];
  
  const selectedDesc = descriptions[0];
  
  return {
    pricing: {
      min: priceMin,
      max: priceMax,
      recommended: recommendedPrice
    },
    description: selectedDesc.main,
    sellingPoints: selectedDesc.sellingPoints,
    photoRecommendations: photoRecommendations
  };
}

// Routes
app.post('/api/upload', upload.single('soto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageQuality = await analyzeImageQuality(req.file.path);
    const recommendations = generateRecommendations();
    
    res.json({
      success: true,
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size
      },
      analysis: {
        quality: imageQuality,
        recommendations: recommendations
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to process image',
      message: error.message 
    });
  }
});

app.get('/api/saved-analysis', (req, res) => {
  // Mock saved analyses
  res.json({
    analyses: [
      {
        id: 1,
        date: new Date().toISOString(),
        image: '/uploads/sample1.jpg',
        price: 18500,
        description: 'Soto Ayam Kampung Special'
      }
    ]
  });
});

// Error handling
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 10MB allowed.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
