// Test suite for Soto Analyzer API endpoints
const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Mock app for testing
const app = require('./app');

describe('Soto Analyzer API Tests', () => {
    
    describe('GET /', () => {
        it('should return the main page', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
                
            expect(response.text).toContain('Upload Foto Soto');
        });
    });
    
    describe('GET /health', () => {
        it('should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);
                
            expect(response.body.status).toBe('OK');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('uptime');
        });
    });
    
    describe('POST /upload', () => {
        it('should upload and analyze image successfully', async () => {
            // Create a test image buffer
            const testImagePath = path.join(__dirname, 'test-image.jpg');
            
            // Skip if test image doesn't exist
            if (!fs.existsSync(testImagePath)) {
                console.log('⚠️  Test image not found, skipping upload test');
                return;
            }
            
            const response = await request(app)
                .post('/upload')
                .attach('sotoPhoto', testImagePath)
                .expect(200);
                
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('analysis');
            expect(response.body.data.analysis).toHaveProperty('type');
            expect(response.body.data.analysis).toHaveProperty('confidence');
        });
        
        it('should reject non-image files', async () => {
            const response = await request(app)
                .post('/upload')
                .attach('sotoPhoto', Buffer.from('test'), 'test.txt')
                .expect(400);
                
            expect(response.body.success).toBe(false);
        });
        
        it('should reject request without file', async () => {
            const response = await request(app)
                .post('/upload')
                .expect(400);
                
            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Tidak ada file');
        });
    });
    
    describe('GET /api/history', () => {
        it('should return analysis history', async () => {
            const response = await request(app)
                .get('/api/history')
                .expect(200);
                
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });
    
    describe('GET /api/stats', () => {
        it('should return server statistics', async () => {
            const response = await request(app)
                .get('/api/stats')
                .expect(200);
                
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('totalFiles');
            expect(response.body.data).toHaveProperty('totalSize');
            expect(response.body.data).toHaveProperty('analysisCount');
        });
    });
    
    describe('404 Handler', () => {
        it('should return 404 for non-existent routes', async () => {
            const response = await request(app)
                .get('/non-existent-route')
                .expect(404);
                
            expect(response.body.success).toBe(false);
        });
    });
});

// Helper function to create test image
function createTestImage() {
    const testImagePath = path.join(__dirname, 'test-image.jpg');
    
    // Create a minimal JPEG header for testing
    const jpegHeader = Buffer.from([
        0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46,
        0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
        0x00, 0x48, 0x00, 0x00, 0xFF, 0xD9
    ]);
    
    try {
        fs.writeFileSync(testImagePath, jpegHeader);
        console.log('✅ Test image created');
    } catch (error) {
        console.log('❌ Failed to create test image:', error.message);
    }
}

// Run this to create test image if needed
if (require.main === module) {
    createTestImage();
}

module.exports = { createTestImage };
