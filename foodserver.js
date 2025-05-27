// index.js
const express = require('express');
const path = require('path');
const OpenAI = require('openai'); // Library ini digunakan sebagai wrapper untuk DashScope

const app = express();
const port = process.env.PORT || 3000;

// --- KONFIGURASI PENTING ---
const DASH_SCOPE_API_KEY = process.env.DASH_SCOPE_API_KEY || "sk-f94bd895e4114205a4d589ef5d240864"; // <--- GANTI DENGAN API KEY ANDA YANG VALID
const API_CALL_TIMEOUT_MS = 120000; // Naikkan timeout untuk analisis gambar yang lebih kompleks (120 detik)
const ARTIFICIAL_DELAY_MS = 200;   // Jeda buatan minimal

// Model yang akan digunakan
const DEFAULT_TEXT_MODEL = "qwen-plus"; // Model untuk chat teks biasa
const FOOD_ANALYSIS_MODEL = "qwen-vl-max"; // Model multimodal yang kuat untuk analisis gambar, misal: qwen-vl-max atau qwen-vl-plus
                                          // Pastikan API Key Anda memiliki akses ke model ini.

// --- Validasi API Key ---
if (DASH_SCOPE_API_KEY === "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" || !DASH_SCOPE_API_KEY.startsWith("sk-")) {
    console.error("KESALAHAN FATAL: API Key DashScope tidak valid atau belum diatur!");
    console.error("Harap ganti 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' di index.js atau atur environment variable 'DASH_SCOPE_API_KEY'.");
    process.exit(1);
} else {
    console.log(`Menggunakan API Key DashScope yang dimulai dengan: ${DASH_SCOPE_API_KEY.substring(0, 8)}...`);
}

// Inisialisasi Klien OpenAI (untuk DashScope)
const openai = new OpenAI({
    apiKey: "sk-f94bd895e4114205a4d589ef5d240864",
    baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    timeout: API_CALL_TIMEOUT_MS,
});

// Middleware
app.use(express.json({ limit: '15mb' })); // Tingkatkan batas payload untuk gambar base64 yang lebih besar
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint API untuk Chat
app.post('/api/chat', async (req, res) => {
    const userTextMessage = req.body.prompt; // Teks dari input pengguna
    const imageBase64 = req.body.image;   // Gambar dalam format base64 data URI

    if (!userTextMessage && !imageBase64) {
        return res.status(400).json({ error: "Prompt teks atau gambar harus disertakan." });
    }

    try {
        let messages = [];
        let modelToUse = DEFAULT_TEXT_MODEL;
        let isFoodAnalysisRequest = false;

        // Prompt sistem untuk analisis gambar makanan
        const foodAnalysisSystemPrompt = `You are an expert food photography and marketing analyst for Indonesian cuisine.
Analyze the uploaded image of food. Provide the following information STRICTLY in the JSON format specified below.
Do NOT include any text outside of the JSON object.

JSON Structure:
{
  "isFoodAnalysis": true,
  "foodName": "Nama Makanan (e.g., Soto Ayam)",
  "uploadedImageQualityFeedback": "Your brief feedback on the uploaded photo quality (e.g., 'Foto terlihat cukup jelas, namun pencahayaan bisa ditingkatkan di sisi kanan agar detail lebih keluar.')",
  "recommendedImages": [
    { "url": "https://placehold.co/300x200/EBF4FF/7F9CF5?text=Contoh+Foto+1", "caption": "Deskripsi singkat foto rekomendasi 1 (e.g., 'Close-up dengan garnish segar')" },
    { "url": "https://placehold.co/300x200/FEF2F2/F87171?text=Contoh+Foto+2", "caption": "Deskripsi singkat foto rekomendasi 2 (e.g., 'Angle dari atas menunjukkan semua komponen')" },
    { "url": "https://placehold.co/300x200/F0FFF4/68D391?text=Contoh+Foto+3", "caption": "Deskripsi singkat foto rekomendasi 3 (e.g., 'Foto dengan properti pendukung')" }
  ],
  "pricingInfo": {
    "estimation": { "min": 10000, "max": 25000 },
    "recommendation": { "price": 15000 }
  },
  "copywritingDescription": "Your compelling marketing description for this food item. Use markdown for **bold** and *italic* emphasis. (e.g., 'Sajikan kehangatan **Soto Ayam** spesial kami! Perpaduan kuah kaldu *gurih* yang meresap sempurna...')"
}

If the user provides an additional text prompt, consider it as a question or specific request related to this food analysis. Incorporate it into your analysis if relevant.
Example: if user says "Bagaimana agar foto soto ini lebih menarik?", focus your feedback and recommendations accordingly.
`;

        if (imageBase64) {
            modelToUse = FOOD_ANALYSIS_MODEL;
            isFoodAnalysisRequest = true; // Tandai sebagai permintaan analisis makanan

            let combinedUserContent = [];
            // Selalu sertakan prompt sistem untuk analisis gambar jika ada gambar
            // Gabungkan dengan teks dari pengguna jika ada
            let textForAI = foodAnalysisSystemPrompt;
            if (userTextMessage) {
                textForAI += `\n\nUser's additional question/request: "${userTextMessage}"`;
            }
            
            combinedUserContent.push({ type: "text", text: textForAI });
            combinedUserContent.push({
                type: "image_url",
                image_url: { url: imageBase64 }
            });
            
            messages.push({ role: "user", content: combinedUserContent });
            console.log(`Menggunakan model multimodal: ${modelToUse} untuk analisis gambar makanan.`);

        } else {
            // Hanya teks, chat biasa
            modelToUse = DEFAULT_TEXT_MODEL;
            messages.push({ role: "system", content: "You are a helpful general assistant." });
            messages.push({ role: "user", content: userTextMessage });
            console.log(`Menggunakan model teks: ${modelToUse} untuk chat biasa.`);
        }

        console.log(`Mengirim permintaan ke DashScope (model: ${modelToUse}, timeout: ${API_CALL_TIMEOUT_MS / 1000}s)...`);
        // Untuk debugging payload, hati-hati jika gambar besar:
        // console.log("Messages payload:", JSON.stringify(messages, null, 2));


        const completion = await openai.chat.completions.create({
            model: modelToUse,
            messages: messages,
            // Untuk beberapa model DashScope yang mendukung JSON output mode:
            // response_format: { type: "json_object" }, // Ini mungkin tidak didukung oleh semua model via compatible mode
        });

        console.log("Respon dari DashScope diterima.");
        // console.log("Raw completion choices:", JSON.stringify(completion.choices, null, 2));

        if (completion.choices && completion.choices.length > 0 && completion.choices[0].message) {
            let assistantResponseContent = completion.choices[0].message.content;
            let finalResponseObject = { role: "assistant", content: null };

            if (isFoodAnalysisRequest) {
                try {
                    // AI diharapkan mengembalikan string JSON. Kita coba parse.
                    // Membersihkan jika ada ```json ... ``` wrapper
                    const cleanedJsonResponse = assistantResponseContent.replace(/^```json\s*|```\s*$/g, '').trim();
                    const parsedJson = JSON.parse(cleanedJsonResponse);
                    
                    // Penting: Kirim kembali URL gambar yang diunggah agar frontend bisa menampilkannya di bagian analisis
                    parsedJson.uploadedImageUrl = imageBase64; 
                    finalResponseObject.content = parsedJson; // Kirim objek JSON yang sudah diparsing
                    console.log("Analisis makanan berhasil diparsing sebagai JSON.");
                } catch (parseError) {
                    console.error("Gagal mem-parsing respons AI sebagai JSON untuk analisis makanan:", parseError);
                    console.error("Respons mentah dari AI:", assistantResponseContent);
                    // Jika gagal parse, kirim sebagai teks biasa saja dengan pesan error
                    finalResponseObject.content = `Maaf, terjadi kesalahan saat memproses format analisis makanan dari AI. Respons mentah:\n${assistantResponseContent}`;
                }
            } else {
                // Chat biasa, responsnya adalah string
                finalResponseObject.content = assistantResponseContent;
            }

            if (ARTIFICIAL_DELAY_MS > 0) {
                console.log(`Menambahkan jeda buatan selama ${ARTIFICIAL_DELAY_MS / 1000} detik...`);
                await new Promise(resolve => setTimeout(resolve, ARTIFICIAL_DELAY_MS));
            }
            res.json({ response: finalResponseObject });

        } else {
            console.error("Struktur respons dari DashScope tidak sesuai harapan:", completion);
            res.status(500).json({ error: "Tidak ada respons valid dari model atau format respons tidak dikenali." });
        }

    } catch (error) {
        console.error("-----------------------------------------");
        console.error("Error saat memanggil API DashScope!");
        console.error("-----------------------------------------");
        console.error("Pesan Error:", error.message);
        if (error.status) console.error("Status HTTP:", error.status);
        if (error.code === 'ETIMEDOUT' || error.name === 'APITimeoutError') {
             console.error(`Permintaan ke DashScope melebihi batas waktu tunggu klien (${API_CALL_TIMEOUT_MS / 1000}s).`);
        }
        if (error.response && error.response.data) {
            console.error("Data Error dari Server:", JSON.stringify(error.response.data, null, 2));
        } else if (error.error) {
             console.error("Detail Error (dari OpenAI lib):", JSON.stringify(error.error, null, 2));
        }
        
        let clientErrorMessage = "Terjadi kesalahan saat menghubungi layanan AI.";
        // ... (kode error message handling lainnya tetap sama)
        if (error.status === 401) { clientErrorMessage = "Autentikasi gagal. Periksa API Key DashScope Anda."; }
        else if (error.code === 'ETIMEDOUT' || error.name === 'APITimeoutError') { clientErrorMessage = `Layanan AI tidak merespons dalam ${API_CALL_TIMEOUT_MS / 1000} detik. Coba lagi nanti.`; }
        else if (error.response && error.response.data && error.response.data.message) { clientErrorMessage = `Error dari server: ${error.response.data.message}`; }
        else if (error.error && error.error.message) { clientErrorMessage = `Error: ${error.error.message}`; }
        else if (error.message && error.message.includes("billing")) { clientErrorMessage = "Terjadi masalah dengan status tagihan akun Anda di Alibaba Cloud."; }

        res.status(error.status || 500).json({ error: clientErrorMessage });
    }
});

// Rute default untuk menyajikan halaman HTML utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    if (DASH_SCOPE_API_KEY !== "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && DASH_SCOPE_API_KEY.startsWith("sk-")) {
        console.log("API Key DashScope telah dimuat.");
        console.log(`Timeout panggilan API: ${API_CALL_TIMEOUT_MS / 1000}s. Model Teks: ${DEFAULT_TEXT_MODEL}, Model Analisis Makanan: ${FOOD_ANALYSIS_MODEL}`);
    }
});
