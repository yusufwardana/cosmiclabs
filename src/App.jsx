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
const UploadCloudIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>;
const PackageCheckIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16h2a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/><path d="M20 6 9 17l-5-5"/></svg>;
const DownloadIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const LoaderCircleIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
const AlertTriangleIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
const CopyIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const CheckIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const RotateCcwIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;


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
    currentStep: 1,
    apiError: null,
    productName: '',
    productType: 'Kaos',
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
    const { currentStep, apiError, productName, productType, productImage, productImageUrl, useReferenceFace, referenceFaceImage, referenceFaceImageUrl, selectedTheme, generatedImages, isGeneratingImages, productDescription, generatedText, isGeneratingText, sourceText, voiceStyle, generatedScripts, isGeneratingScripts, isDownloading, zipSize } = state;
    
    const [copiedText, setCopiedText] = useState(null);
    const finalOutputRef = useRef(null);

    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    useEffect(() => {
        if (currentStep === 4 && generatedImages.length > 0 && generatedText && generatedScripts) {
            let totalBytes = 0;
            const textContent = `[Hook]\n${generatedText.hook}\n\n[Caption TikTok]\n${generatedText.caption}\n\n[Deskripsi Produk]\n${generatedText.description}\n\n[Call to Action]\n${generatedText.cta}`;
            totalBytes += new Blob([textContent]).size;
            totalBytes += new Blob([generatedScripts.voiceScript]).size;
            totalBytes += new Blob([generatedScripts.videoPrompt]).size;
            if (generatedScripts.audioWavBlob) {
                totalBytes += generatedScripts.audioWavBlob.size;
            }
            generatedImages.forEach(img => {
                const base64Data = img.url.split(',')[1];
                const padding = (base64Data.endsWith('==')) ? 2 : (base64Data.endsWith('=')) ? 1 : 0;
                totalBytes += (base64Data.length * 3 / 4) - padding;
            });
            updateState({ zipSize: formatBytes(totalBytes) });
        }
    }, [currentStep, generatedImages, generatedText, generatedScripts]);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
        const newState = { generatedImages: [], apiError: null };
        if (type === 'product') {
            newState.productImage = file;
            newState.productImageUrl = URL.createObjectURL(file);
        } else if (type === 'face') {
            newState.referenceFaceImage = file;
            newState.referenceFaceImageUrl = URL.createObjectURL(file);
        }
        updateState(newState);
    };

    const handleCopyText = (textToCopy, type) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopiedText(type);
            setTimeout(() => setCopiedText(null), 2000);
        });
    };
    
    const handleStartOver = () => {
        setState(initialState);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const callGeminiApi = async (url, payload, retries = 3, delay = 1000) => {
        const fullUrl = `${url}?key=${apiKey}`;
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(fullUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const errorBody = await response.json();
                    console.error("API Error Body:", errorBody);
                    throw new Error(`API error: ${response.status} ${response.statusText} - ${errorBody.error?.message || 'Unknown error'}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Attempt ${i + 1} failed:`, error);
                if (i === retries - 1) throw error;
                await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
            }
        }
    };
    
    const generateMockupPrompts = (theme, productType, withFace) => {
        const baseInstruction = `The model is wearing a ${productType} featuring the graphic design from the first uploaded image. The design should be placed realistically on the center chest of the garment.`;
        const faceInstruction = withFace ? `The model's face must closely resemble the person in the second uploaded reference image.` : `The model is a generic, stylish Indonesian person.`;
        let themeInstruction = '';
        switch (theme) {
            case 'Studio Minimalis':
                themeInstruction = 'The photo is a professional shot in a studio with a clean, minimalist light-colored background and soft, even lighting.';
                break;
            case 'Cafe Estetik':
                themeInstruction = 'The photo is taken in a modern, stylish cafe with natural window light and warm, cozy tones.';
                break;
            case 'Outdoor Ceria':
                themeInstruction = 'The photo is taken outdoors in a bright, sunny park or garden. The mood is happy and cheerful.';
                break;
            case 'Urban Street':
                themeInstruction = 'This is a cool street style photograph taken in a modern urban setting, like against a concrete wall or on a city street.';
                break;
        }
        return [
            `Medium shot. ${baseInstruction} ${faceInstruction} ${themeInstruction} The model is smiling and looking at the camera. High-quality fashion photograph, 9:16 portrait aspect ratio.`,
            `Full body shot. ${baseInstruction} ${faceInstruction} ${themeInstruction} The model is in a relaxed, natural pose. High-quality fashion photograph, 9:16 portrait aspect ratio.`,
            `Candid, angled shot. ${baseInstruction} ${faceInstruction} ${themeInstruction} The model is looking slightly away from the camera. High-quality fashion photograph, 9:16 portrait aspect ratio.`,
            `Close-up on the torso to clearly showcase the ${productType} and its design. ${baseInstruction} ${faceInstruction} ${themeInstruction} The lighting highlights the garment's texture. High-quality fashion photograph, 9:16 portrait aspect ratio.`
        ];
    };

    const handleGenerateImages = async () => {
        if (!apiKey) {
            updateState({ apiError: "API Key belum diatur. Silakan atur VITE_GEMINI_API_KEY di pengaturan Environment Variables Vercel." });
            return;
        }
        updateState({ isGeneratingImages: true, apiError: null, generatedImages: [] });

        try {
            const prompts = generateMockupPrompts(selectedTheme, productType, useReferenceFace);
            const productImageBase64 = await toBase64(productImage);
            const faceImageBase64 = useReferenceFace ? await toBase64(referenceFaceImage) : null;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent`;

            const imagePromises = prompts.map(prompt => {
                const parts = [
                    { text: prompt },
                    { inlineData: { mimeType: productImage.type, data: productImageBase64 } }
                ];
                if (useReferenceFace && faceImageBase64) {
                    parts.push({ inlineData: { mimeType: referenceFaceImage.type, data: faceImageBase64 } });
                }
                const payload = {
                    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: "9:16" } },
                    contents: [{ parts }]
                };
                return callGeminiApi(apiUrl, payload);
            });

            const imageResults = await Promise.all(imagePromises);

            const imageUrls = imageResults.map(result => {
                const candidate = result.candidates?.[0];
                if (candidate && candidate.content?.parts?.find(p => p.inlineData)) {
                    const part = candidate.content.parts.find(p => p.inlineData);
                    return `data:image/png;base64,${part.inlineData.data}`;
                }
                console.error("Invalid API response structure:", result);
                throw new Error("Gagal memproses respons gambar dari AI.");
            });
            updateState({ generatedImages: imageUrls.map(url => ({ url })) });
        } catch (error) {
            console.error("Error generating images:", error);
            updateState({ apiError: `Gagal membuat gambar: ${error.message}` });
        } finally {
            updateState({ isGeneratingImages: false });
        }
    };
    
     const handleGenerateText = async () => {
        if (!apiKey) {
            updateState({ apiError: "API Key belum diatur. Silakan atur VITE_GEMINI_API_KEY di Vercel." });
            return;
        }
        updateState({ isGeneratingText: true, apiError: null });
        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent`;
            const schema = {
                type: "OBJECT", properties: { hook: { type: "STRING" }, caption: { type: "STRING" }, description: { type: "STRING" }, cta: { type: "STRING" } },
                required: ["hook", "caption", "description", "cta"]
            };
            const systemPrompt = `You are an expert social media marketer for TikTok affiliate content in Indonesia. Your tone is casual, persuasive, and uses trendy Indonesian slang. Generate content based on the user's product description. The output must be in JSON format matching the provided schema.`;
            const userPrompt = `Product description: "${productDescription || productName}". Generate a hook, a TikTok caption, a detailed product description, and a strong call-to-action (CTA).`;
            const payload = {
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json", responseSchema: schema }
            };
            const result = await callGeminiApi(apiUrl, payload);
            const jsonText = result.candidates[0].content.parts[0].text;
            const data = JSON.parse(jsonText);
            updateState({ generatedText: data, sourceText: data.caption || '' });
        } catch (error) {
            console.error("Error generating text:", error);
            updateState({ apiError: `Gagal membuat teks: ${error.message}` });
        } finally {
            updateState({ isGeneratingText: false });
        }
    };

    const handleGenerateScripts = async () => {
        if (!apiKey) {
            updateState({ apiError: "API Key belum diatur. Silakan atur VITE_GEMINI_API_KEY di Vercel." });
            return;
        }
        updateState({ isGeneratingScripts: true, apiError: null });
        try {
            const textApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent`;
            const scriptSchema = {
                type: "OBJECT", properties: { voiceScript: { type: "STRING" }, videoPrompt: { type: "STRING" }},
                required: ["voiceScript", "videoPrompt"]
            };
            const scriptSystemPrompt = `You are a creative director for TikTok ads. Generate a short voice-over script and a detailed video prompt based on the ad copy and voice style. Output must be JSON.`;
            const scriptUserPrompt = `Ad copy: "${sourceText}". Voice style: "${voiceStyle}".`;
            const scriptPayload = {
                contents: [{ parts: [{ text: scriptUserPrompt }] }],
                systemInstruction: { parts: [{ text: scriptSystemPrompt }] },
                generationConfig: { responseMimeType: "application/json", responseSchema: scriptSchema }
            };
            const scriptResult = await callGeminiApi(textApiUrl, scriptPayload);
            const scriptsData = JSON.parse(scriptResult.candidates[0].content.parts[0].text);
            const ttsApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent`;
            const voiceMap = {
                'Wanita Natural 🇮🇩': { voiceName: 'Kore', promptDesc: 'cheerful and natural Indonesian woman' },
                'Pria Formal 🇮🇩': { voiceName: 'Charon', promptDesc: 'formal and informative Indonesian man' },
                'Wanita Ceria 🇮🇩': { voiceName: 'Puck', promptDesc: 'energetic and excited Indonesian woman' }
            };
            const selectedVoice = voiceMap[voiceStyle] || voiceMap['Wanita Natural 🇮🇩'];
            const ttsPayload = {
                contents: [{ parts: [{ text: `Say in the style of a ${selectedVoice.promptDesc}: ${scriptsData.voiceScript}` }] }],
                generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice.voiceName } } } },
                model: "gemini-2.5-flash-preview-tts"
            };
            const ttsResult = await callGeminiApi(ttsApiUrl, ttsPayload);
            const audioPart = ttsResult.candidates[0].content.parts[0];
            const audioBase64 = audioPart.inlineData.data;
            const mimeType = audioPart.inlineData.mimeType;
            const sampleRateMatch = mimeType.match(/rate=(\d+)/);
            const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1], 10) : 24000;
            const pcmBuffer = base64ToArrayBuffer(audioBase64);
            const wavBlob = pcmToWav(pcmBuffer, sampleRate);
            const audioUrl = URL.createObjectURL(wavBlob);
            updateState({
                generatedScripts: {
                    voiceScript: scriptsData.voiceScript,
                    videoPrompt: scriptsData.videoPrompt,
                    audioUrl: audioUrl,
                    audioWavBlob: wavBlob, 
                }
            });
        } catch (error) {
            console.error("Error generating scripts:", error);
            updateState({ apiError: `Gagal membuat suara & skrip: ${error.message}` });
        } finally {
            updateState({ isGeneratingScripts: false });
        }
    };
    
    const handleDownloadZip = async () => {
        if (typeof window.JSZip === 'undefined' || typeof window.saveAs === 'undefined') {
            updateState({ apiError: "Pustaka download belum siap. Coba lagi dalam beberapa detik." });
            return;
        }
        updateState({ isDownloading: true, apiError: null });
        try {
            const zip = new window.JSZip();
            generatedImages.forEach((img, i) => {
                const base64Data = img.url.split(',')[1];
                zip.file(`images/image_${i + 1}.png`, base64Data, { base64: true });
            });
            const textContent = `[Hook]\n${generatedText.hook}\n\n[Caption TikTok]\n${generatedText.caption}\n\n[Deskripsi Produk]\n${generatedText.description}\n\n[Call to Action]\n${generatedText.cta}`;
            zip.file('captions.txt', textContent);
            zip.file('voice-script.txt', generatedScripts.voiceScript);
            zip.file('video-prompt.txt', generatedScripts.videoPrompt);
            zip.file('audio/voice_over.wav', generatedScripts.audioWavBlob);
            const content = await zip.generateAsync({ type: "blob" });
            window.saveAs(content, "tiktok-affiliate-content.zip");
        } catch (error) {
            console.error("Error creating ZIP file:", error);
            updateState({ apiError: "Gagal membuat file ZIP." });
        } finally {
            updateState({ isDownloading: false });
        }
    };

    const isGenerateButtonDisabled = isGeneratingImages || !productImage || !productName || (useReferenceFace && !referenceFaceImage);
    
    // RENDER LOGIC
    return (
        <div className="font-sans text-white bg-gray-900 min-h-screen">
            <ExternalScriptsLoader />
            <div className="container mx-auto max-w-4xl p-4 sm:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        TikTok Affiliate Auto Content
                    </h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                        Buat konten promosi afiliasi TikTok (foto produk, deskripsi, caption, dan skrip video) secara otomatis dengan AI.
                    </p>
                </header>

                <main className="space-y-6">
                    {apiError && <ErrorMessage>{apiError}</ErrorMessage>}

                    {/* Step 1: Product Input */}
                    {currentStep === 1 && (
                        <Card>
                            <CardHeader>
                                <CardTitle icon="📦">Langkah 1: Informasi Produk</CardTitle>
                                <p className="text-gray-400 mt-2">Masukkan detail produk yang ingin Anda promosikan.</p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label htmlFor="productName">Nama Produk</Label>
                                    <Input id="productName" type="text" placeholder="Contoh: T-Shirt Oversize Katun Bambu" value={productName} onChange={(e) => updateState({ productName: e.target.value, apiError: null })} />
                                </div>
                                <div>
                                    <Label htmlFor="productType">Jenis Produk</Label>
                                    <Select id="productType" value={productType} onChange={(e) => updateState({ productType: e.target.value })}>
                                        <option>Kaos</option><option>Kemeja</option><option>Jaket</option><option>Celana</option><option>Sepatu</option><option>Aksesoris</option>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Foto Produk (Background Polos)</Label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 bg-gray-800/50">
                                        <div className="text-center">
                                            {productImageUrl ? <img src={productImageUrl} alt="Preview Produk" className="mx-auto h-40 w-40 object-contain rounded-lg" /> : <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" />}
                                            <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                                <label htmlFor="product-image-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-500"><span>Upload file</span><input id="product-image-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, 'product')} /></label>
                                                <p className="pl-1">atau drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF maksimal 10MB</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Checkbox id="use-reference-face" label="Gunakan Wajah Referensi (Opsional)" checked={useReferenceFace} onChange={(e) => updateState({ useReferenceFace: e.target.checked, referenceFaceImage: null, referenceFaceImageUrl: '' })} />
                                    {useReferenceFace && (
                                        <div className="mt-4 pl-7">
                                            <Label>Foto Wajah Referensi</Label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 bg-gray-800/50">
                                                <div className="text-center">
                                                    {referenceFaceImageUrl ? <img src={referenceFaceImageUrl} alt="Preview Wajah" className="mx-auto h-40 w-40 object-cover rounded-full" /> : <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" />}
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                                        <label htmlFor="face-image-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-500"><span>Upload file</span><input id="face-image-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, 'face')} /></label>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-500">Pastikan wajah terlihat jelas</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="pt-4">
                                    <Button onClick={() => updateState({ currentStep: 2 })} disabled={!productName || !productImage}>Lanjut ke Langkah 2</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Generate Images */}
                    {currentStep === 2 && (
                         <Card>
                            <CardHeader>
                                <CardTitle icon="🎨">Langkah 2: Buat Foto Produk</CardTitle>
                                <p className="text-gray-400 mt-2">Pilih tema foto dan biarkan AI membuat foto produk yang menarik.</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <Label>Pilih Tema Foto</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {photoThemes.map(theme => (
                                                <button key={theme.name} onClick={() => updateState({ selectedTheme: theme.name })} className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${selectedTheme === theme.name ? 'border-blue-500 bg-blue-900/50 ring-2 ring-blue-500' : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700'}`}>
                                                    <span className="text-3xl block mb-2">{theme.emoji}</span>
                                                    <span className="font-semibold">{theme.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button onClick={() => updateState({ currentStep: 1, generatedImages: [] })} className="bg-gray-600 hover:bg-gray-500">Kembali</Button>
                                        <Button onClick={handleGenerateImages} disabled={isGeneratingImages}>{isGeneratingImages && <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" />}{isGeneratingImages ? 'Membuat Foto...' : 'Buat Foto Sekarang!'}</Button>
                                    </div>
                                </div>

                                {generatedImages.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Hasil Foto:</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {generatedImages.map((image, index) => (
                                                <div key={index} className="relative group aspect-[9/16]">
                                                    <img src={image.url} alt={`Generated ${index + 1}`} className="rounded-lg object-cover w-full h-full" />
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <a href={image.url} download={`product_image_${index + 1}.png`} className="text-white p-2 rounded-full bg-blue-600 hover:bg-blue-500"><DownloadIcon className="h-6 w-6" /></a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 text-center"><Button onClick={() => updateState({ currentStep: 3 })}>Lanjut ke Langkah 3</Button></div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Generate Text & Voice */}
                    {currentStep === 3 && (
                        <Card>
                            <CardHeader>
                                <CardTitle icon="✍️">Langkah 3: Buat Teks & Suara</CardTitle>
                                <p className="text-gray-400 mt-2">Buat deskripsi produk, caption TikTok, dan skrip video dengan suara AI.</p>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="productDescription">Deskripsi Singkat Produk (Opsional)</Label>
                                            <Textarea id="productDescription" rows="4" placeholder="Contoh: Kaos bahan katun bambu, adem, anti-bakteri, cocok untuk iklim tropis." value={productDescription} onChange={(e) => updateState({ productDescription: e.target.value })} />
                                        </div>
                                        <Button onClick={handleGenerateText} disabled={isGeneratingText}>{isGeneratingText && <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" />}{isGeneratingText ? 'Membuat Teks...' : 'Buat Teks (Deskripsi & Caption)'}</Button>
                                         {generatedText && (<div className="space-y-4 mt-6 p-4 bg-gray-900 rounded-lg">
                                             <div><Label className="flex justify-between items-center"><span>Hook/Judul</span><button onClick={() => handleCopyText(generatedText.hook, 'hook')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">{copiedText === 'hook' ? <CheckIcon className="h-4 w-4 text-green-500"/> : <CopyIcon className="h-4 w-4"/>} Salin</button></Label><p className="text-sm p-3 bg-gray-800 rounded-md">{generatedText.hook}</p></div>
                                             <div><Label className="flex justify-between items-center"><span>Caption TikTok</span><button onClick={() => handleCopyText(generatedText.caption, 'caption')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">{copiedText === 'caption' ? <CheckIcon className="h-4 w-4 text-green-500"/> : <CopyIcon className="h-4 w-4"/>} Salin</button></Label><p className="text-sm p-3 bg-gray-800 rounded-md whitespace-pre-wrap">{generatedText.caption}</p></div>
                                         </div>)}
                                    </div>
                                    <div className="space-y-6">
                                        <div><Label htmlFor="sourceText">Teks untuk Video (Sumber Suara)</Label><Textarea id="sourceText" rows="4" placeholder="Masukkan teks yang ingin diubah menjadi suara di sini. Bisa dari deskripsi produk atau caption." value={sourceText} onChange={(e) => updateState({ sourceText: e.target.value })} /></div>
                                        <div><Label htmlFor="voiceStyle">Gaya Suara</Label><Select id="voiceStyle" value={voiceStyle} onChange={(e) => updateState({ voiceStyle: e.target.value })}><option>Wanita Natural 🇮🇩</option><option>Pria Formal 🇮🇩</option><option>Wanita Ceria 🇮🇩</option></Select></div>
                                        <Button onClick={handleGenerateScripts} disabled={isGeneratingScripts || !sourceText}>{isGeneratingScripts && <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" />}{isGeneratingScripts ? 'Membuat Skrip & Suara...' : 'Buat Skrip Video & Suara AI'}</Button>
                                        {generatedScripts && (<div className="space-y-4 mt-6 p-4 bg-gray-900 rounded-lg">
                                            <div><Label>Hasil Suara AI</Label>{generatedScripts.audioUrl && <audio controls src={generatedScripts.audioUrl} className="w-full"></audio>}</div>
                                            <div><Label className="flex justify-between items-center"><span>Skrip Video (Prompt untuk Editing)</span><button onClick={() => handleCopyText(generatedScripts.videoPrompt, 'prompt')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">{copiedText === 'prompt' ? <CheckIcon className="h-4 w-4 text-green-500"/> : <CopyIcon className="h-4 w-4"/>} Salin</button></Label><p className="text-sm p-3 bg-gray-800 rounded-md whitespace-pre-wrap">{generatedScripts.videoPrompt}</p></div>
                                        </div>)}
                                    </div>
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Button onClick={() => updateState({ currentStep: 2 })} className="bg-gray-600 hover:bg-gray-500">Kembali</Button>
                                    <Button onClick={() => updateState({ currentStep: 4 })} disabled={!generatedText || !generatedScripts}>Lanjut ke Langkah 4</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 4: Download */}
                    {currentStep === 4 && (
                        <Card ref={finalOutputRef}>
                            <CardHeader className="text-center">
                                <CardTitle icon={<PackageCheckIcon className="h-8 w-8 text-green-400" />} className="justify-center text-3xl">Konten Anda Siap!</CardTitle>
                                <p className="text-gray-400 mt-2">Semua file yang Anda butuhkan telah digabungkan dalam satu file zip.</p>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="max-w-md mx-auto bg-gray-900/80 p-6 rounded-2xl">
                                    <div className="grid grid-cols-2 gap-4 text-left">
                                        <div className="font-semibold text-gray-300">Foto Produk AI:</div><div className="text-green-400">{generatedImages.length} file</div>
                                        <div className="font-semibold text-gray-300">Teks Konten:</div><div className="text-green-400">1 file (Hook, Caption, dll)</div>
                                        <div className="font-semibold text-gray-300">Skrip & Suara AI:</div><div className="text-green-400">2 file (Teks & .wav)</div>
                                        <div className="col-span-2 my-2 border-t border-gray-700"></div>
                                        <div className="font-semibold text-gray-300">Ukuran Total:</div><div>{zipSize || 'Menghitung...'}</div>
                                    </div>
                                </div>
                                <div className="mt-8 max-w-sm mx-auto">
                                    <Button onClick={handleDownloadZip} disabled={isDownloading}>{isDownloading ? <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" /> : <DownloadIcon className="h-5 w-5 mr-2" />}{isDownloading ? 'Menyiapkan file...' : `Download Semua File (.zip)`}</Button>
                                </div>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                     <Button onClick={handleStartOver} className="bg-transparent border border-gray-600 hover:bg-gray-700 text-gray-300 w-auto px-6"><RotateCcwIcon className="h-4 w-4 mr-2"/>Mulai Lagi</Button>
                                    <Button onClick={() => updateState({ currentStep: 3 })} className="bg-gray-600 hover:bg-gray-500 w-auto px-6">Kembali</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </main>
            </div>
        </div>
    );
}


