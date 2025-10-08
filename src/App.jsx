import React, { useState, useRef, useEffect } from 'react';

// === HELPER COMPONENT TO LOAD EXTERNAL SCRIPTS ===
const ExternalScriptsLoader = () => {
  useEffect(() => {
    const scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"
    ];

    scripts.forEach(src => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      }
    });
  }, []);

  return null;
};

// === UTILITY HELPERS ===
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

const pcmToWav = (pcmData, sampleRate) => {
    const numChannels = 1;
    const bitsPerSample = 16;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcmData.byteLength;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    const pcm16 = new Int16Array(pcmData);
    for (let i = 0; i < pcm16.length; i++) {
        view.setInt16(44 + i * 2, pcm16[i], true);
    }

    return new Blob([view], { type: 'audio/wav' });
};

const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// === ICONS (Inline SVG) ===
const UploadCloudIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>;
const PackageCheckIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/><path d="M20 6 9 17l-5-5"/></svg>;
const DownloadIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const LoaderCircleIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
const AlertTriangleIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
const CopyIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const CheckIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const RotateCcwIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;


// === UI COMPONENTS ===
const Card = ({ children, className = '' }) => <div className={`bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-8 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`mb-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, icon, className = '' }) => <h2 className={`text-2xl font-semibold flex items-center text-gray-100 ${className}`}>{icon && <span className="text-3xl mr-3">{icon}</span>}{children}</h2>;
const CardContent = ({ children, className = '' }) => <div className={className}>{children}</div>;
const Button = ({ children, onClick, disabled = false, className = '' }) => <button onClick={onClick} disabled={disabled} className={`w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 ${className}`}>{children}</button>;
const Label = ({ children, htmlFor, className = '' }) => <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-300 mb-2 ${className}`}>{children}</label>;
const Input = (props) => <input {...props} className={`mt-1 block w-full rounded-md border-0 py-2 px-3 bg-gray-700 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-gray-400 ${props.className || ''}`} />;
const Textarea = (props) => <textarea {...props} className={`mt-1 block w-full rounded-md border-0 py-2.5 px-3 bg-gray-700 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-gray-400 ${props.className || ''}`} />;
const Select = ({ children, ...props }) => <select {...props} className={`mt-1 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 bg-gray-700 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${props.className || ''}`}>{children}</select>;
const Checkbox = ({ id, label, checked, onChange }) => <div className="flex items-center"><input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-blue-600 focus:ring-blue-600" /><label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-300">{label}</label></div>;
const ErrorMessage = ({ children }) => <div className="mt-4 flex items-center gap-2 text-sm text-red-400 bg-red-900/50 p-3 rounded-lg"><AlertTriangleIcon className="h-5 w-5 flex-shrink-0" />{children}</div>;

// === Photo Theme Data ===
const photoThemes = [
    { name: 'Studio Minimalis', emoji: '⚪' },
    { name: 'Cafe Estetik', emoji: '☕' },
    { name: 'Outdoor Ceria', emoji: '🌳' },
    { name: 'Urban Street', emoji: '🏙️' },
];

const initialState = {
    apiError: null,
    productName: '',
    productType: 'Kaos',
    uploadType: 'design', 
    designSize: 'medium', 
    productImage: null,
    productImageUrl: '',
    useReferenceFace: false,
    referenceFaceImage: null,
    referenceFaceImageUrl: '',
    selectedTheme: photoThemes[0].name,
    generatedImages: [],
    isGeneratingImages: false,
    productDescription: '',
    generatedText: null,
    isGeneratingText: false,
    sourceText: '',
    voiceStyle: 'Wanita Natural 🇮🇩',
    generatedScripts: null,
    isGeneratingScripts: false,
    isDownloading: false,
    zipSize: null,
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

export default function App() {
    const [state, setState] = useState(initialState);
    const { apiError, productName, productType, uploadType, designSize, productImage, productImageUrl, useReferenceFace, referenceFaceImage, referenceFaceImageUrl, selectedTheme, generatedImages, isGeneratingImages, productDescription, generatedText, isGeneratingText, sourceText, voiceStyle, generatedScripts, isGeneratingScripts, isDownloading, zipSize } = state;
    
    const [copiedText, setCopiedText] = useState(null);
    const textRef = useRef(null);
    const voiceRef = useRef(null);
    const downloadRef = useRef(null);

    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    useEffect(() => { generatedText && voiceRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [generatedText]);
    useEffect(() => { generatedScripts && downloadRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [generatedScripts]);
    useEffect(() => {
        if (generatedImages.length > 0 && generatedText && generatedScripts) {
            let totalBytes = 0;
            const textContent = `[Hook]\n${generatedText.hook}\n\n[Caption TikTok]\n${generatedText.caption}\n\n[Deskripsi Produk]\n${productDescription}\n\n[Call to Action]\n${generatedText.cta}`;
            totalBytes += new Blob([textContent]).size;
            totalBytes += new Blob([generatedScripts.voiceScript]).size;
            totalBytes += new Blob([generatedScripts.videoPrompt]).size;
            if (generatedScripts.audioWavBlob) { totalBytes += generatedScripts.audioWavBlob.size; }
            generatedImages.forEach(img => {
                const base64Data = img.url.split(',')[1];
                const padding = (base64Data.endsWith('==')) ? 2 : (base64Data.endsWith('=')) ? 1 : 0;
                totalBytes += (base64Data.length * 3 / 4) - padding;
            });
            updateState({ zipSize: formatBytes(totalBytes) });
        }
    }, [generatedImages, generatedText, generatedScripts]);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        const newState = { apiError: null };
        if (type === 'product') {
            newState.productImage = file;
            newState.productImageUrl = URL.createObjectURL(file);
        } else if (type === 'face') {
            newState.referenceFaceImage = file;
            newState.referenceFaceImageUrl = URL.createObjectURL(file);
        }
        updateState(newState);
    };

    const handleCopyText = (textToCopy, type) => navigator.clipboard.writeText(textToCopy).then(() => { setCopiedText(type); setTimeout(() => setCopiedText(null), 2000); });
    const handleStartOver = () => { setState(initialState); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const callGeminiApi = async (url, payload) => {
        const fullUrl = `${url}?key=${apiKey}`;
        const response = await fetch(fullUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`API error: ${response.status} - ${errorBody.error?.message || 'Unknown error'}`);
        }
        return await response.json();
    };
    
    const handleGenerateImages = async () => {
        if (!apiKey) { updateState({ apiError: "API Key belum diatur. Harap atur di Vercel." }); return; }
        updateState({ isGeneratingImages: true, apiError: null, generatedImages: [] });
        try {
            const faceInstruction = useReferenceFace ? `Wajah model harus sangat mirip dengan orang di foto referensi wajah.` : `Modelnya adalah orang Indonesia yang stylish dan fotogenik.`;
            let themeInstruction = '';
            switch (selectedTheme) {
                case 'Studio Minimalis': themeInstruction = 'Foto diambil di studio profesional dengan latar belakang putih atau abu-abu muda yang bersih. Pencahayaan lembut dan merata.'; break;
                case 'Cafe Estetik': themeInstruction = 'Foto diambil di kafe modern yang estetis dengan cahaya alami dari jendela. Suasananya hangat dan santai.'; break;
                case 'Outdoor Ceria': themeInstruction = 'Foto diambil di luar ruangan seperti taman atau kebun yang cerah. Suasananya ceria dan penuh warna.'; break;
                case 'Urban Street': themeInstruction = 'Ini adalah foto gaya jalanan yang keren, diambil di lingkungan perkotaan modern, misalnya di depan dinding bertekstur atau di jalanan kota.'; break;
            }

            let baseInstruction = '';
            if (uploadType === 'design') {
                let sizeInstruction = '';
                switch(designSize) {
                    case 'full': sizeInstruction = `Desain grafis dari gambar pertama diaplikasikan secara penuh menutupi seluruh bagian depan ${productType}.`; break;
                    case 'medium': sizeInstruction = `Desain grafis dari gambar pertama ditempatkan secara realistis di bagian tengah dada ${productType}.`; break;
                    case 'small': sizeInstruction = `Versi kecil dari desain grafis gambar pertama ditempatkan sebagai logo di dada kiri ${productType}.`; break;
                }
                baseInstruction = `Model sedang mengenakan ${productType}. ${sizeInstruction}`;
            } else {
                baseInstruction = `Model sedang mengenakan ${productType} yang sama persis seperti yang terlihat pada gambar produk yang diunggah.`;
            }
            
            const prompts = [
                `Foto medium shot. ${baseInstruction} ${faceInstruction} ${themeInstruction} Model tersenyum dan melihat ke arah kamera. Foto fashion berkualitas tinggi, rasio aspek 9:16.`,
                `Foto full body. ${baseInstruction} ${faceInstruction} ${themeInstruction} Model dalam pose yang santai dan alami. Foto fashion berkualitas tinggi, rasio aspek 9:16.`,
            ];

            const productImageBase64 = await toBase64(productImage);
            const faceImageBase64 = useReferenceFace ? await toBase64(referenceFaceImage) : null;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent`;
            const imagePromises = prompts.map(prompt => {
                const parts = [{ text: prompt }, { inlineData: { mimeType: productImage.type, data: productImageBase64 } }];
                if (useReferenceFace && faceImageBase64) { parts.push({ inlineData: { mimeType: referenceFaceImage.type, data: faceImageBase64 } }); }
                const payload = { generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: "9:16" } }, contents: [{ parts }] };
                return callGeminiApi(apiUrl, payload);
            });
            const imageResults = await Promise.all(imagePromises);
            const imageUrls = imageResults.map(result => `data:image/png;base64,${result.candidates[0].content.parts.find(p => p.inlineData).inlineData.data}`);
            updateState({ 
                generatedImages: imageUrls.map(url => ({ url })),
                productDescription: `Sebuah ${productType} "${productName}" dengan desain eksklusif, cocok untuk gaya ${selectedTheme}. Bahannya nyaman dan berkualitas tinggi.`
            });
             if (textRef.current) { textRef.current.scrollIntoView({ behavior: 'smooth' }); }
        } catch (error) {
            updateState({ apiError: `Gagal membuat gambar: ${error.message}` });
        } finally {
            updateState({ isGeneratingImages: false });
        }
    };
    
    const handleGenerateText = async () => {
        if (!apiKey) { updateState({ apiError: "API Key belum diatur." }); return; }
        updateState({ isGeneratingText: true, apiError: null });
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent`;
            const schema = { type: "OBJECT", properties: { hook: { type: "STRING" }, caption: { type: "STRING" }, cta: { type: "STRING" } }, required: ["hook", "caption", "cta"] };
            const systemPrompt = `You are an expert social media marketer for TikTok affiliate content in Indonesia. Your tone is casual, persuasive, and uses trendy Indonesian slang. Generate content based on the user's product description. The output must be in JSON format.`;
            const userPrompt = `Product description: "${productDescription || productName}". Generate a hook, a TikTok caption, and a strong call-to-action (CTA).`;
            const payload = { contents: [{ parts: [{ text: userPrompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json", responseSchema: schema } };
            const result = await callGeminiApi(apiUrl, payload);
            const data = JSON.parse(result.candidates[0].content.parts[0].text);
            updateState({ generatedText: data, sourceText: data.caption || '' });
        } catch (error) {
            updateState({ apiError: `Gagal membuat teks: ${error.message}` });
        } finally {
            updateState({ isGeneratingText: false });
        }
    };

    const handleGenerateScripts = async () => {
        if (!apiKey) { updateState({ apiError: "API Key belum diatur." }); return; }
        updateState({ isGeneratingScripts: true, apiError: null });
        try {
            const textApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent`;
            const scriptSchema = { type: "OBJECT", properties: { voiceScript: { type: "STRING" }, videoPrompt: { type: "STRING" }}, required: ["voiceScript", "videoPrompt"] };
            const scriptSystemPrompt = `You are a creative director for AI-generated TikTok ads. Your task is to create a prompt for an **image-to-video model**. The prompt **must start with the phrase "Gunakan salah satu foto yang dihasilkan sebagai referensi utama."**. Then, describe a short, 5-10 second video scene in Indonesian based on the provided ad copy and photo theme. The description should focus on **subtle movements** suitable for animating a still image, like a slight smile, a head turn, hair moving in a breeze, or background elements animating (e.g., coffee steam, city lights). Mention quick cuts and energetic transitions suitable for TikTok. The final output must be a JSON object containing this video prompt and a short voice-over script.`;
            const scriptUserPrompt = `Ad copy: "${sourceText}". Photo Theme: "${selectedTheme}".`;
            const scriptPayload = { contents: [{ parts: [{ text: scriptUserPrompt }] }], systemInstruction: { parts: [{ text: scriptSystemPrompt }] }, generationConfig: { responseMimeType: "application/json", responseSchema: scriptSchema } };
            const scriptResult = await callGeminiApi(textApiUrl, scriptPayload);
            const scriptsData = JSON.parse(scriptResult.candidates[0].content.parts[0].text);
            
            const ttsApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`;
            const voiceMap = { 'Wanita Natural 🇮🇩': { voiceName: 'Kore', promptDesc: 'cheerful natural' }, 'Pria Formal 🇮🇩': { voiceName: 'Charon', promptDesc: 'formal informative' }, 'Wanita Ceria 🇮🇩': { voiceName: 'Puck', promptDesc: 'energetic excited' } };
            const selectedVoice = voiceMap[voiceStyle];
            const ttsPayload = { contents: [{ parts: [{ text: `Say in a ${selectedVoice.promptDesc} Indonesian female voice: ${scriptsData.voiceScript}` }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice.voiceName } } } }, model: "gemini-2.5-flash-preview-tts" };
            const ttsResult = await callGeminiApi(ttsApiUrl, ttsPayload);
            const audioPart = ttsResult.candidates[0].content.parts[0];
            const sampleRate = parseInt(audioPart.inlineData.mimeType.match(/rate=(\d+)/)[1], 10);
            const pcmBuffer = base64ToArrayBuffer(audioPart.inlineData.data);
            const wavBlob = pcmToWav(pcmBuffer, sampleRate);
            updateState({ generatedScripts: { ...scriptsData, audioUrl: URL.createObjectURL(wavBlob), audioWavBlob: wavBlob } });
        } catch (error) {
            updateState({ apiError: `Gagal membuat suara: ${error.message}` });
        } finally {
            updateState({ isGeneratingScripts: false });
        }
    };
    
    const handleDownloadZip = async () => {
        if (typeof window.JSZip === 'undefined') { updateState({ apiError: "Pustaka download belum siap." }); return; }
        updateState({ isDownloading: true, apiError: null });
        try {
            const zip = new window.JSZip();
            generatedImages.forEach((img, i) => zip.file(`images/image_${i + 1}.png`, img.url.split(',')[1], { base64: true }));
            const textContent = `[Hook]\n${generatedText.hook}\n\n[Caption TikTok]\n${generatedText.caption}\n\n[Deskripsi Produk]\n${productDescription}\n\n[Call to Action]\n${generatedText.cta}`;
            zip.file('captions.txt', textContent);
            zip.file('voice-script.txt', generatedScripts.voiceScript);
            zip.file('video-prompt.txt', generatedScripts.videoPrompt);
            zip.file('audio/voice_over.wav', generatedScripts.audioWavBlob);
            const content = await zip.generateAsync({ type: "blob" });
            window.saveAs(content, "tiktok-affiliate-content.zip");
        } catch (error) {
            updateState({ apiError: "Gagal membuat file ZIP." });
        } finally {
            updateState({ isDownloading: false });
        }
    };

    const isGenerateButtonDisabled = isGeneratingImages || !productImage || !productName || (useReferenceFace && !referenceFaceImage);
    
    return (
        <div className="font-sans text-white bg-gray-900 min-h-screen">
            <ExternalScriptsLoader />
            <div className="container mx-auto max-w-4xl p-4 sm:p-8">
                <header className="text-center mb-10">
                   <div className="flex justify-center items-center mb-4 relative">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TikTok Affiliate Auto Content</h1>
                         <button onClick={handleStartOver} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 rounded-lg px-3 py-1.5"><RotateCcwIcon className="h-4 w-4" /><span>Mulai Ulang</span></button>
                   </div>
                    <p className="mt-2 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">Buat seluruh aset konten (gambar, caption, voice over) untuk produk TikTok Affiliate Anda secara otomatis dengan AI.</p>
                </header>

                <main className="space-y-8">
                    {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
                    <Card>
                        <CardHeader><CardTitle icon="🎨">1. Informasi & Foto Produk</CardTitle></CardHeader>
                        <CardContent>
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label htmlFor="product-name">Nama Produk/Desain</Label><Input id="product-name" type="text" value={productName} onChange={(e) => updateState({ productName: e.target.value })} placeholder="Contoh: Desain 'Cosmic Youth'" /></div>
                                        <div><Label htmlFor="product-type">Tipe Pakaian</Label><Select id="product-type" value={productType} onChange={(e) => updateState({ productType: e.target.value })}><option>Kaos</option><option>Hoodie</option><option>Jaket</option></Select></div>
                                    </div>
                                    <div>
                                        <Label>Jenis Upload</Label>
                                        <div className="flex rounded-lg bg-gray-700 p-1"><button onClick={() => updateState({ uploadType: 'design' })} className={`flex-1 p-2 text-sm rounded-md transition-colors ${uploadType === 'design' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'}`}>Gambar Desain</button><button onClick={() => updateState({ uploadType: 'product' })} className={`flex-1 p-2 text-sm rounded-md transition-colors ${uploadType === 'product' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'}`}>Produk Jadi</button></div>
                                    </div>
                                    {uploadType === 'design' && <div className="animate-fade-in"><Label>Ukuran Desain pada Mockup</Label><div className="flex rounded-lg bg-gray-700 p-1"><button onClick={() => updateState({ designSize: 'small' })} className={`flex-1 p-2 text-xs rounded-md transition-colors ${designSize === 'small' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'}`}>Small</button><button onClick={() => updateState({ designSize: 'medium' })} className={`flex-1 p-2 text-xs rounded-md transition-colors ${designSize === 'medium' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'}`}>Medium</button><button onClick={() => updateState({ designSize: 'full' })} className={`flex-1 p-2 text-xs rounded-md transition-colors ${designSize === 'full' ? 'bg-blue-600 text-white' : 'hover:bg-gray-600'}`}>Full</button></div></div>}
                                    <div>
                                        <Label>{uploadType === 'design' ? 'Upload Gambar Desain (PNG Latar Transparan)' : 'Upload Foto Produk Jadi'}</Label>
                                        <div className="mt-2 flex justify-center items-center rounded-lg border-2 border-dashed border-gray-600 px-6 py-10 bg-gray-900/50">{productImageUrl ? <img src={productImageUrl} alt="Pratinjau" className="max-h-32 rounded-lg" /> : <div className="text-center"><UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" /><label htmlFor="file-upload" className="relative cursor-pointer font-semibold text-blue-400 hover:text-blue-500"><span>Unggah file</span><input id="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'product')} accept="image/png, image/jpeg" /></label></div>}</div>
                                    </div>
                                    <div className="space-y-4 rounded-lg bg-gray-900/50 p-4 border border-gray-700">
                                      <Checkbox id="use-face" label="Gunakan Wajah Model Referensi (Opsional)" checked={useReferenceFace} onChange={(e) => updateState({ useReferenceFace: e.target.checked })} />
                                      {useReferenceFace && <div className="animate-fade-in"><Label htmlFor="face-upload">Upload Foto Wajah Model</Label><div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-600 px-6 py-10"><div className="text-center">{referenceFaceImageUrl ? <img src={referenceFaceImageUrl} alt="Pratinjau Wajah" className="max-h-32 rounded-lg" /> : <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" />}<label htmlFor="face-upload" className="relative cursor-pointer font-semibold text-blue-400 hover:text-blue-500 mt-4 block"><span>Unggah wajah</span><input id="face-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'face')} accept="image/*" /></label></div></div></div>}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 text-gray-200">Pilih Tema Latar</h3>
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        {photoThemes.map(theme => <button key={theme.name} onClick={() => updateState({ selectedTheme: theme.name })} className={`p-3 rounded-lg text-sm transition-all border-2 ${selectedTheme === theme.name ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 hover:bg-gray-600 border-gray-600'}`}>{theme.emoji} {theme.name}</button>)}
                                    </div>
                                    <Button onClick={handleGenerateImages} disabled={isGenerateButtonDisabled}>{isGeneratingImages ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Membuat Mockup...</> : 'Generate Foto Mockup'}</Button>
                                    <div className={`transition-opacity duration-500 ${generatedImages.length > 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                                        <h3 className="font-semibold text-lg mt-8 mb-4 text-gray-200">Hasil Foto Mockup (9:16)</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {generatedImages.map((img, i) => <div key={i} className="relative group"><img src={img.url} alt={`Mockup ${i}`} className="aspect-[9/16] bg-gray-700 rounded-lg object-cover w-full" /><div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => window.saveAs(img.url, `mockup-${i+1}.png`)} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-full"><DownloadIcon className="h-4 w-4" /><span>Unduh</span></button></div></div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div ref={textRef} className={`transition-opacity duration-500 ${generatedImages.length > 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden invisible'}`}><Card><CardHeader><CardTitle icon="📝">2. Teks & Caption</CardTitle></CardHeader><CardContent><div className="grid md:grid-cols-2 gap-8 items-start"><div className="space-y-4"><Textarea rows={4} value={productDescription} onChange={(e) => updateState({ productDescription: e.target.value })} placeholder="Jelaskan keunggulan produk di sini..." /><Button onClick={handleGenerateText} disabled={isGeneratingText}>{isGeneratingText ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Membuat Teks...</> : 'Generate Teks & Caption'}</Button></div>{generatedText && <div className="space-y-4 text-sm bg-gray-900/50 p-4 rounded-lg"><div className="flex justify-between items-start"><div className="flex-1 pr-2"><strong className="text-blue-400 block mb-1">Hook:</strong><p>{generatedText.hook}</p></div><button onClick={() => handleCopyText(generatedText.hook, 'Hook')} className="p-1.5 text-gray-400 hover:text-white">{copiedText === 'Hook' ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}</button></div><div className="flex justify-between items-start"><div className="flex-1 pr-2"><strong className="text-blue-400 block mb-1">Caption:</strong><p>{generatedText.caption}</p></div><button onClick={() => handleCopyText(generatedText.caption, 'Caption')} className="p-1.5 text-gray-400 hover:text-white">{copiedText === 'Caption' ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}</button></div><div className="flex justify-between items-start"><div className="flex-1 pr-2"><strong className="text-blue-400 block mb-1">CTA:</strong><p>{generatedText.cta}</p></div><button onClick={() => handleCopyText(generatedText.cta, 'CTA')} className="p-1.5 text-gray-400 hover:text-white">{copiedText === 'CTA' ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}</button></div></div>}</div></CardContent></Card></div>

                     <div ref={voiceRef} className={`transition-opacity duration-500 ${generatedText ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden invisible'}`}><Card><CardHeader><CardTitle icon="🎙️">3. Voice Over & Skrip</CardTitle></CardHeader><CardContent><div className="grid md:grid-cols-2 gap-8 items-start"><div className="space-y-4"><Textarea rows={4} value={sourceText} onChange={(e) => updateState({ sourceText: e.target.value })} placeholder="Teks sumber untuk suara..." /><Select value={voiceStyle} onChange={(e) => updateState({ voiceStyle: e.target.value })}><option>Wanita Natural 🇮🇩</option><option>Pria Formal 🇮🇩</option><option>Wanita Ceria 🇮🇩</option></Select><Button onClick={handleGenerateScripts} disabled={isGeneratingScripts || !sourceText}>{isGeneratingScripts ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Membuat Suara...</> : 'Generate Voice Over'}</Button></div>{generatedScripts && <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg"><div><Label>Hasil Suara AI</Label>{generatedScripts.audioUrl && <audio controls src={generatedScripts.audioUrl} className="w-full"></audio>}</div><div><Label className="flex justify-between items-center"><span>Prompt Video (untuk AI Image-to-Video)</span><button onClick={() => handleCopyText(generatedScripts.videoPrompt, 'prompt')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">{copiedText === 'prompt' ? <CheckIcon className="h-4 w-4 text-green-500"/> : <CopyIcon className="h-4 w-4"/>} Salin</button></Label><p className="font-mono text-xs text-gray-400 bg-black/30 p-2 rounded mt-1">{generatedScripts.videoPrompt}</p></div></div>}</div></CardContent></Card></div>

                    <div ref={downloadRef} className={`transition-opacity duration-500 ${generatedScripts ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden invisible'}`}><Card><CardHeader className="text-center"><CardTitle icon={<PackageCheckIcon className="h-8 w-8 text-green-400" />} className="justify-center text-3xl">4. Paket Konten Siap</CardTitle><p className="text-gray-400 mt-2">Unduh semua aset dalam satu file ZIP.</p></CardHeader><CardContent className="text-center"><div className="max-w-md mx-auto bg-gray-900/80 p-6 rounded-2xl"><div className="grid grid-cols-2 gap-4 text-left"><div className="font-semibold text-gray-300">Foto Produk AI:</div><div className="text-green-400">{generatedImages.length} file</div><div className="font-semibold text-gray-300">Teks Konten:</div><div className="text-green-400">1 file</div><div className="font-semibold text-gray-300">Skrip & Suara AI:</div><div className="text-green-400">2 file</div><div className="col-span-2 my-2 border-t border-gray-700"></div><div className="font-semibold text-gray-300">Ukuran Total:</div><div>{zipSize || 'Menghitung...'}</div></div></div><div className="mt-8 max-w-sm mx-auto"><Button onClick={handleDownloadZip} disabled={isDownloading}>{isDownloading ? <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" /> : <DownloadIcon className="h-5 w-5 mr-2" />}{isDownloading ? 'Menyiapkan file...' : `Download Semua File (.zip)`}</Button></div></CardContent></Card></div>
                </main>
            </div>
             {/* Simple animation styles */}
            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}


