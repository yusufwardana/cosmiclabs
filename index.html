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

// === MAIN APP COMPONENT ===
export default function TikTokAffiliateAutoContentGenerator() {
    const [state, setState] = useState(initialState);
    const { currentStep, apiError, productName, productType, productImage, productImageUrl, useReferenceFace, referenceFaceImage, referenceFaceImageUrl, selectedTheme, generatedImages, isGeneratingImages, productDescription, generatedText, isGeneratingText, sourceText, voiceStyle, generatedScripts, isGeneratingScripts, isDownloading, zipSize } = state;
    
    const [copiedText, setCopiedText] = useState(null);
    const finalOutputRef = useRef(null);

    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    // Effect to calculate ZIP size when all assets are ready
    useEffect(() => {
        if (currentStep === 4 && generatedImages.length > 0 && generatedText && generatedScripts) {
            let totalBytes = 0;

            // Text files
            const textContent = `[Hook]\n${generatedText.hook}\n\n[Caption TikTok]\n${generatedText.caption}\n\n[Deskripsi Produk]\n${generatedText.description}\n\n[Call to Action]\n${generatedText.cta}`;
            totalBytes += new Blob([textContent]).size;
            totalBytes += new Blob([generatedScripts.voiceScript]).size;
            totalBytes += new Blob([generatedScripts.videoPrompt]).size;

            // Audio file
            if (generatedScripts.audioWavBlob) {
                totalBytes += generatedScripts.audioWavBlob.size;
            }

            // Image files
            generatedImages.forEach(img => {
                const base64Data = img.url.split(',')[1];
                const padding = (base64Data.endsWith('==')) ? 2 : (base64Data.endsWith('=')) ? 1 : 0;
                totalBytes += (base64Data.length * 3 / 4) - padding;
            });
            
            updateState({ zipSize: formatBytes(totalBytes) });
        }
    }, [currentStep, generatedImages, generatedText, generatedScripts]);

    // --- Helper Functions ---
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const newState = {
            generatedImages: [],
            apiError: null,
        };

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
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
    
    const handleStartOver = () => {
        setState(initialState);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- API Call Functions ---
    const callGeminiApi = async (url, payload, retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const errorBody = await response.json();
                    throw new Error(`API error: ${response.status} ${response.statusText} - ${errorBody.error?.message}`);
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
        if (!productImage || !productName) {
            updateState({ apiError: "Harap isi nama produk dan unggah gambar desain Anda." });
            return;
        }
        if (useReferenceFace && !referenceFaceImage) {
            updateState({ apiError: "Harap unggah gambar referensi wajah model." });
            return;
        }

        updateState({ isGeneratingImages: true, apiError: null, generatedImages: [] });
        const apiKey = "";

        try {
            const prompts = generateMockupPrompts(selectedTheme, productType, useReferenceFace);
            const productImageBase64 = await toBase64(productImage);
            const faceImageBase64 = useReferenceFace ? await toBase64(referenceFaceImage) : null;
            
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;

            const imagePromises = prompts.map(prompt => {
                const parts = [
                    { text: prompt },
                    { inlineData: { mimeType: productImage.type, data: productImageBase64 } }
                ];
                if (useReferenceFace && faceImageBase64) {
                    parts.push({ inlineData: { mimeType: referenceFaceImage.type, data: faceImageBase64 } });
                }

                const payload = {
                    generationConfig: {
                        responseModalities: ['IMAGE'],
                        imageConfig: { aspectRatio: "9:16" }
                    },
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
                throw new Error("Struktur respons API gambar tidak valid atau gambar tidak ditemukan.");
            });

            updateState({
                generatedImages: imageUrls.map(url => ({ url })),
                currentStep: 2,
                productDescription: `Sebuah ${productType} dengan nama "${productName}" dengan desain eksklusif, cocok untuk gaya ${selectedTheme}.`
            });

        } catch (error) {
            console.error("Error generating images:", error);
            updateState({ apiError: "Gagal membuat gambar mockup. Pastikan gambar desain jelas dan coba lagi." });
        } finally {
            updateState({ isGeneratingImages: false });
        }
    };
    
     const handleGenerateText = async () => {
        if (!productDescription) return;
        updateState({ isGeneratingText: true, apiError: null });
        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const schema = {
                type: "OBJECT",
                properties: { hook: { type: "STRING" }, caption: { type: "STRING" }, description: { type: "STRING" }, cta: { type: "STRING" } },
                required: ["hook", "caption", "description", "cta"]
            };

            const systemPrompt = `You are an expert social media marketer for TikTok affiliate content in Indonesia. Your tone is casual, persuasive, and uses trendy Indonesian slang. Generate content based on the user's product description. The output must be in JSON format matching the provided schema.`;
            const userPrompt = `Product description: "${productDescription}". Generate a hook, a TikTok caption, a detailed product description, and a strong call-to-action (CTA).`;

            const payload = {
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json", responseSchema: schema }
            };
            
            const result = await callGeminiApi(apiUrl, payload);
            const jsonText = result.candidates[0].content.parts[0].text;
            const data = JSON.parse(jsonText);

            updateState({ generatedText: data, sourceText: data.caption, currentStep: 3, });
        } catch (error) {
            console.error("Error generating text:", error);
            updateState({ apiError: "Gagal membuat teks. Coba ubah deskripsi Anda dan jalankan lagi." });
        } finally {
            updateState({ isGeneratingText: false });
        }
    };

    const handleGenerateScripts = async () => {
        if (!sourceText) return;
        updateState({ isGeneratingScripts: true, apiError: null });
        try {
            const apiKey = "";
            
            const textApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
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

            const ttsApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
            const voiceMap = {
                'Wanita Natural 🇮🇩': { voiceName: 'Kore', promptDesc: 'cheerful and natural Indonesian woman' },
                'Pria Enerjik 🇮🇩': { voiceName: 'Puck', promptDesc: 'energetic and excited Indonesian man' },
                'Soft Voice 🇮🇩': { voiceName: 'Leda', promptDesc: 'soft, calming, and gentle Indonesian woman (ASMR style)' }
            };
            const selectedVoice = voiceMap[voiceStyle] || voiceMap['Wanita Natural 🇮🇩'];

            const ttsPayload = {
                contents: [{ parts: [{ text: `Say in the style of a ${selectedVoice.promptDesc}: ${scriptsData.voiceScript}` }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice.voiceName } } }
                },
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
                },
                currentStep: 4,
            });

            setTimeout(() => finalOutputRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

        } catch (error) {
            console.error("Error generating scripts:", error);
            updateState({ apiError: "Gagal membuat audio & skrip. Silakan coba lagi." });
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

    return (
        <div className="font-sans text-white bg-gray-900 min-h-screen">
            <ExternalScriptsLoader />
            <div className="container mx-auto max-w-4xl p-4 sm:p-8">
                <header className="text-center mb-10">
                   <div className="flex justify-center items-center mb-4 relative">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            TikTok Affiliate Auto Content
                        </h1>
                         <button onClick={handleStartOver} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 rounded-lg px-3 py-1.5">
                            <RotateCcwIcon className="h-4 w-4" />
                            <span>Mulai Ulang</span>
                        </button>
                   </div>
                    <p className="mt-2 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                        Buat seluruh aset konten (gambar, caption, voice over) untuk produk TikTok Affiliate Anda secara otomatis dengan AI.
                    </p>
                </header>
                <main className="space-y-8">
                    {/* STEP 1 */}
                    <Card>
                        <CardHeader><CardTitle icon="🎨">Step 1: Desain & Mockup</CardTitle></CardHeader>
                        <CardContent>
                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="product-name">Nama Produk/Desain</Label>
                                            <Input id="product-name" type="text" value={productName} onChange={(e) => updateState({ productName: e.target.value })} placeholder="Contoh: Desain 'Cosmic Youth'" />
                                        </div>
                                        <div>
                                            <Label htmlFor="product-type">Tipe Pakaian</Label>
                                            <Select id="product-type" value={productType} onChange={(e) => updateState({ productType: e.target.value })}>
                                                <option>Kaos</option><option>Hoodie</option><option>Jaket</option><option>Kemeja</option>
                                            </Select>
                                        </div>
                                    </div>
                                    
                                     <div>
                                        <Label htmlFor="file-upload">Upload Gambar Desain</Label>
                                        <div className="mt-2 flex justify-center items-center rounded-lg border-2 border-dashed border-gray-600 px-6 py-10 hover:border-blue-500 transition-colors bg-gray-900/50">
                                            {productImageUrl ? <img src={productImageUrl} alt="Pratinjau Desain" className="max-h-32 rounded-lg" /> : <div className="text-center"><UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" /><label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-500"><span>Unggah file desain</span><input id="file-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'product')} accept="image/*" /></label></div>}
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Pilih Tema Latar</Label>
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            {photoThemes.map(theme => (
                                                <button key={theme.name} onClick={() => updateState({ selectedTheme: theme.name })} className={`p-3 rounded-lg text-sm transition-all border-2 ${selectedTheme === theme.name ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 hover:bg-gray-600 border-gray-600'}`}>
                                                    {theme.emoji} {theme.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4 rounded-lg bg-gray-900/50 p-4 border border-gray-700">
                                      <Checkbox id="use-face" label="Gunakan Wajah Model Referensi (Opsional)" checked={useReferenceFace} onChange={(e) => updateState({ useReferenceFace: e.target.checked })} />
                                      {useReferenceFace && (
                                        <div className="animate-fade-in">
                                          <Label htmlFor="face-upload">Upload Foto Wajah Model</Label>
                                          <div className="mt-2 flex justify-center items-center rounded-lg border-2 border-dashed border-gray-600 px-6 py-10 hover:border-blue-500 transition-colors">
                                              {referenceFaceImageUrl ? <img src={referenceFaceImageUrl} alt="Pratinjau Wajah" className="max-h-32 rounded-lg" /> : <div className="text-center"><UploadCloudIcon className="mx-auto h-12 w-12 text-gray-500" /><label htmlFor="face-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-500"><span>Unggah wajah</span><input id="face-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'face')} accept="image/*" /></label></div>}
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <Button onClick={handleGenerateImages} disabled={isGenerateButtonDisabled}>{isGeneratingImages ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Membuat Mockup...</> : 'Generate 4 Foto Mockup'}</Button>
                                    {apiError && currentStep === 1 && <ErrorMessage>{apiError}</ErrorMessage>}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-4 text-gray-200">Hasil Foto Mockup (9:16)</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {isGeneratingImages ? Array(4).fill(0).map((_, i) => <div key={i} className="aspect-[9/16] bg-gray-700 rounded-lg animate-pulse" />) : generatedImages.length > 0 ? generatedImages.map((img, i) => (
                                            <div key={i} className="relative group">
                                                <img src={img.url} alt={`Generated Mockup ${i}`} className="aspect-[9/16] bg-gray-700 rounded-lg object-cover w-full" />
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => window.saveAs(img.url, `mockup-${productName.replace(/\s+/g, '-').toLowerCase()}-${i+1}.png`)} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs px-3 py-1.5 rounded-full">
                                                        <DownloadIcon className="h-4 w-4" />
                                                        <span>Unduh</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )) : Array(4).fill(0).map((_, i) => <div key={i} className="aspect-[9/16] bg-gray-700/50 rounded-lg flex items-center justify-center p-2"><p className="text-xs text-center text-gray-500">Mockup {i+1}</p></div>)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* STEP 2 */}
                    {currentStep >= 2 && <div className="transition-opacity duration-500 animate-fade-in"><Card><CardHeader><CardTitle icon="📝">Step 2: Narasi & Deskripsi</CardTitle></CardHeader><CardContent><div className="grid lg:grid-cols-2 gap-8"><div className="space-y-4"><Label htmlFor="product-desc">Deskripsi Singkat Produk</Label><Textarea rows={5} id="product-desc" value={productDescription} onChange={(e) => updateState({ productDescription: e.target.value })} placeholder="Contoh: Kaos oversize bahan katun premium, adem, tidak mudah kusut, tersedia dalam 5 warna." /><Button onClick={handleGenerateText} disabled={isGeneratingText || !productDescription}>{isGeneratingText ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Generating...</> : 'Generate Caption & Deskripsi'}</Button>{apiError && currentStep === 2 && <ErrorMessage>{apiError}</ErrorMessage>}</div><div><h3 className="font-semibold text-lg mb-4 text-gray-200">Hasil Teks</h3>{isGeneratingText ? <div className="space-y-4"><div className="h-40 bg-gray-700 rounded-lg animate-pulse" /></div> : generatedText ? <div className="space-y-4 text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg"><div className="flex justify-between items-start"><div className="flex-1"><strong className="text-blue-400 block mb-1">Hook:</strong><p>{generatedText.hook}</p></div><button onClick={() => handleCopyText(generatedText.hook, 'Hook')} className="p-1.5 text-gray-400 hover:text-white">{copiedText === 'Hook' ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}</button></div><div className="flex justify-between items-start"><div className="flex-1"><strong className="text-blue-400 block mb-1">Caption:</strong><p>{generatedText.caption}</p></div><button onClick={() => handleCopyText(generatedText.caption, 'Caption')} className="p-1.5 text-gray-400 hover:text-white">{copiedText === 'Caption' ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}</button></div><div className="flex justify-between items-start"><div className="flex-1"><strong className="text-blue-400 block mb-1">CTA:</strong><p>{generatedText.cta}</p></div><button onClick={() => handleCopyText(generatedText.cta, 'CTA')} className="p-1.5 text-gray-400 hover:text-white">{copiedText === 'CTA' ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h-4 w-4" />}</button></div></div> : <div className="h-40 bg-gray-700/50 rounded-lg flex items-center justify-center"><p className="text-sm text-gray-500">Teks akan muncul di sini</p></div>}</div></div></CardContent></Card></div>}
                    
                    {/* STEP 3 */}
                    {currentStep >= 3 && <div className="transition-opacity duration-500 animate-fade-in"><Card><CardHeader><CardTitle icon="🎙️">Step 3: Voice Over & Video</CardTitle></CardHeader><CardContent><div className="grid lg:grid-cols-2 gap-8"><div className="space-y-4"><Label htmlFor="voice-style">Pilih Gaya Suara</Label><Select id="voice-style" value={voiceStyle} onChange={(e) => updateState({ voiceStyle: e.target.value })}><option>Wanita Natural 🇮🇩</option><option>Pria Enerjik 🇮🇩</option><option>Soft Voice 🇮🇩</option></Select><Button onClick={handleGenerateScripts} disabled={isGeneratingScripts || !sourceText}>{isGeneratingScripts ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Generating...</> : 'Generate Voice Over'}</Button>{apiError && currentStep === 3 && <ErrorMessage>{apiError}</ErrorMessage>}</div><div><h3 className="font-semibold text-lg mb-4 text-gray-200">Hasil Audio & Script</h3>{isGeneratingScripts ? <div className="h-32 bg-gray-700 rounded-lg animate-pulse" /> : generatedScripts ? <div className="space-y-4">{generatedScripts.audioUrl && <audio controls src={generatedScripts.audioUrl} className="w-full"></audio>}<div className="text-sm"><p className="font-semibold text-gray-200">Video Prompt (untuk AI Video):</p><p className="font-mono text-xs text-gray-400 bg-black/30 p-2 rounded mt-1">{generatedScripts.videoPrompt}</p></div></div> : <div className="h-32 bg-gray-700/50 rounded-lg flex items-center justify-center"><p className="text-sm text-gray-500">Audio & script akan muncul di sini</p></div>}</div></div></CardContent></Card></div>}
                    
                    {/* FINAL OUTPUT */}
                    {currentStep >= 4 && <div ref={finalOutputRef} className="transition-opacity duration-500 animate-fade-in"><Card><CardHeader><CardTitle icon={<PackageCheckIcon className="h-8 w-8 text-green-400" />}>Paket Konten Siap</CardTitle></CardHeader><CardContent className="text-center"><p className="text-gray-300 mb-6">Semua aset Anda telah berhasil dibuat. Unduh semuanya dalam satu file ZIP atau mulai lagi.</p><div className="flex flex-col sm:flex-row gap-4"><Button onClick={handleDownloadZip} disabled={isDownloading} className="bg-green-600 hover:bg-green-500 focus-visible:outline-green-600 disabled:opacity-50 flex-1">{isDownloading ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Mengemas file...</> : <><DownloadIcon className="h-5 w-5" /><span>Download Semua {zipSize && <span className="font-normal text-white/80">({zipSize})</span>}</span></>}</Button><button onClick={handleStartOver} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gray-600/50 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-all duration-200"><RotateCcwIcon className="h-5 w-5" /> Mulai Dari Awal</button></div>{apiError && currentStep === 4 && <ErrorMessage>{apiError}</ErrorMessage>}</CardContent></Card></div>}
                </main>
            </div>
            {/* Simple animation styles */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}


