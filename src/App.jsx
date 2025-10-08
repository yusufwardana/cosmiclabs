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
const ClapperboardIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3L20.2 6Z"/><path d="m6.2 5.3 3.1 3.9"/><path d="m12.4 3.6 3.1 3.9"/><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z"/></svg>;


// === UI COMPONENTS ===
const Card = ({ children, className = '' }) => <div className={`bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-8 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`flex justify-between items-center mb-6 ${className}`}>{children}</div>;
const CardTitle = ({ children, icon, className = '' }) => <h2 className={`text-2xl font-semibold flex items-center text-gray-100 ${className}`}>{icon && <span className="text-3xl mr-3">{icon}</span>}{children}</h2>;
const CardContent = ({ children, className = '' }) => <div className={className}>{children}</div>;
const Button = ({ children, onClick, disabled = false, className = '' }) => <button onClick={onClick} disabled={disabled} className={`w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 ${className}`}>{children}</button>;
const Label = ({ children, htmlFor, className = '' }) => <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-300 mb-2 ${className}`}>{children}</label>;
const Input = (props) => <input {...props} className={`mt-1 block w-full rounded-md border-0 py-2 px-3 bg-gray-700 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-gray-400 ${props.className || ''}`} />;
const Textarea = (props) => <textarea {...props} className={`mt-1 block w-full rounded-md border-0 py-2.5 px-3 bg-gray-700 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 placeholder:text-gray-400 ${props.className || ''}`} />;
const Select = ({ children, ...props }) => <select {...props} className={`mt-1 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 bg-gray-700 text-white ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ${props.className || ''}`}>{children}</select>;
const Checkbox = ({ id, label, checked, onChange }) => <div className="flex items-center"><input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-blue-600 focus:ring-blue-600" /><label htmlFor={id} className="ml-3 block text-sm font-medium text-gray-300">{label}</label></div>;
const ErrorMessage = ({ children }) => <div className="my-4 flex items-center gap-2 text-sm text-red-400 bg-red-900/50 p-3 rounded-lg"><AlertTriangleIcon className="h-5 w-5 flex-shrink-0" />{children}</div>;

// === Photo Theme Data ===
const photoThemes = [ { name: 'Studio Minimalis', emoji: '⚪' }, { name: 'Cafe Estetik', emoji: '☕' }, { name: 'Outdoor Ceria', emoji: '🌳' }, { name: 'Urban Street', emoji: '🏙️' }];
const COOLDOWN_SECONDS = 30; // 30 second cooldown

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
    generatedVideoUrl: null,
    isGeneratingVideo: false,
    isDownloading: false,
    zipSize: null,
    credits: 20, // Starting credits
    countdown: 0,
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

export default function App() {
    const [state, setState] = useState(initialState);
    const { apiError, productName, productType, uploadType, designSize, productImage, productImageUrl, useReferenceFace, referenceFaceImage, referenceFaceImageUrl, selectedTheme, generatedImages, isGeneratingImages, productDescription, generatedText, isGeneratingText, sourceText, voiceStyle, generatedScripts, isGeneratingScripts, generatedVideoUrl, isGeneratingVideo, isDownloading, zipSize, credits, countdown } = state;
    
    const [copiedText, setCopiedText] = useState(null);
    const textRef = useRef(null);
    const voiceRef = useRef(null);
    const videoRef = useRef(null);
    const downloadRef = useRef(null);

    const updateState = (newState) => setState(prevState => ({ ...prevState, ...newState }));

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => updateState({ countdown: state.countdown - 1 }), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown, state.countdown]);

    useEffect(() => { generatedImages.length > 0 && textRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [generatedImages]);
    useEffect(() => { generatedText && voiceRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [generatedText]);
    useEffect(() => { generatedScripts && videoRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [generatedScripts]);
    useEffect(() => { generatedVideoUrl && downloadRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [generatedVideoUrl]);
    
    useEffect(() => {
        if (generatedImages.length > 0 && generatedText && generatedScripts) {
            // ... (ZIP size calculation remains the same)
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

    const canGenerate = (cost = 1) => {
        if (!apiKey) { updateState({ apiError: "API Key belum diatur. Harap atur di Vercel." }); return false; }
        if (credits < cost) { updateState({ apiError: "Maaf, kredit Anda tidak mencukupi." }); return false; }
        if (countdown > 0) { updateState({ apiError: `Harap tunggu ${countdown} detik sebelum mencoba lagi.` }); return false; }
        return true;
    };

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
        // ... (fungsi ini tetap sama)
    };
    
    const handleGenerateText = async () => {
        // ... (fungsi ini tetap sama)
    };

    const handleGenerateScripts = async () => {
        if (!canGenerate(2)) return;
        updateState({ isGeneratingScripts: true, apiError: null });
        try {
            const textApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent`;
            const scriptSchema = { type: "OBJECT", properties: { voiceScript: { type: "STRING" }, videoPrompt: { type: "STRING" }}, required: ["voiceScript", "videoPrompt"] };
            const scriptSystemPrompt = `You are a creative director for AI-generated TikTok ads. Your task is to create a prompt for an **image-to-video model**. The prompt **must start with the phrase "Using one of the generated photos as a keyframe reference,"**. Then, describe a short, 5-10 second video scene in English based on the provided ad copy and photo theme. The description should focus on **subtle movements** suitable for animating a still image, like a slight smile, a head turn, hair moving in a breeze, or background elements animating (e.g., coffee steam, city lights). Mention quick cuts and energetic transitions suitable for TikTok. The final output must be a JSON object containing this video prompt and a short voice-over script in Indonesian.`;
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
            updateState({ generatedScripts: { ...scriptsData, audioUrl: URL.createObjectURL(wavBlob), audioWavBlob: wavBlob }, credits: state.credits - 2, countdown: COOLDOWN_SECONDS });
        } catch (error) {
            updateState({ apiError: `Gagal membuat suara: ${error.message}` });
        } finally {
            updateState({ isGeneratingScripts: false });
        }
    };
    
    const handleGenerateVideo = async () => {
        if (!canGenerate(5)) return; // Video simulation costs 5 credits
        updateState({ isGeneratingVideo: true, apiError: null });
        try {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate 3 second generation time
            updateState({ 
                generatedVideoUrl: "placeholder", 
                credits: state.credits - 5,
                countdown: COOLDOWN_SECONDS
            });
        } catch (error) {
             updateState({ apiError: `Gagal simulasi video: ${error.message}` });
        } finally {
            updateState({ isGeneratingVideo: false });
        }
    };

    const handleDownloadZip = async () => {
       // ... (fungsi ini tetap sama)
    };
    
    // ... (sisa fungsi helper dan state)

    return (
        <div className="font-sans text-white bg-gray-900 min-h-screen">
            <ExternalScriptsLoader />
            <div className="container mx-auto max-w-5xl p-4 sm:p-8">
                <header className="text-center mb-10">
                    <div className="flex justify-between items-center mb-4 relative">
                        <div></div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Cosmiclab Studio
                        </h1>
                        <div className="text-right text-sm">
                            <div className="font-semibold text-gray-300">Sisa Kredit: <span className="text-green-400">{credits}</span></div>
                            {countdown > 0 && <div className="text-yellow-400">Cooldown: {countdown}s</div>}
                        </div>
                    </div>
                    <p className="mt-2 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">Buat seluruh aset konten (gambar, caption, voice over) untuk produk TikTok Affiliate Anda secara otomatis dengan AI.</p>
                </header>

                <main className="space-y-8">
                    {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
                    
                    {/* CARD 1: INFORMASI & FOTO */}
                    <Card>
                        {/* ... (Konten Card 1 tetap sama) ... */}
                    </Card>

                    {/* CARD 2: TEKS & CAPTION */}
                    <div ref={textRef} className={`transition-opacity duration-500 ${generatedImages.length > 0 ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden invisible'}`}>
                        {/* ... (Konten Card 2 tetap sama) ... */}
                    </div>

                    {/* CARD 3: VOICE OVER */}
                    <div ref={voiceRef} className={`transition-opacity duration-500 ${generatedText ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden invisible'}`}>
                        <Card>
                            <CardHeader>
                                <CardTitle icon="🎙️">3. Voice Over</CardTitle>
                                <button onClick={handleStartOver} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"><RotateCcwIcon className="h-4 w-4" /><span>Mulai Ulang</span></button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-8 items-start">
                                    <div className="space-y-4">
                                        <Textarea rows={4} value={sourceText} onChange={(e) => updateState({ sourceText: e.target.value })} placeholder="Teks sumber untuk suara..." />
                                        <Select value={voiceStyle} onChange={(e) => updateState({ voiceStyle: e.target.value })}>
                                            <option>Wanita Natural 🇮🇩</option>
                                            <option>Pria Formal 🇮🇩</option>
                                            <option>Wanita Ceria 🇮🇩</option>
                                        </Select>
                                        <Button onClick={handleGenerateScripts} disabled={isGeneratingScripts || !sourceText || countdown > 0 || credits < 2}>
                                            {isGeneratingScripts ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Membuat...</> : countdown > 0 ? `Tunggu ${countdown}s` : 'Generate Voice (-2 Kredit)'}
                                        </Button>
                                    </div>
                                    {generatedScripts && (
                                        <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg">
                                            <div>
                                                <Label>Hasil Suara AI</Label>
                                                {generatedScripts.audioUrl && <audio controls src={generatedScripts.audioUrl} className="w-full"></audio>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CARD 4: GENERATE VIDEO */}
                    <div ref={videoRef} className={`transition-opacity duration-500 ${generatedScripts ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden invisible'}`}>
                        <Card>
                             <CardHeader>
                                <CardTitle icon={<ClapperboardIcon className="h-6 w-6"/>}>4. Generate Video (Simulasi)</CardTitle>
                                <button onClick={handleStartOver} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"><RotateCcwIcon className="h-4 w-4" /><span>Mulai Ulang</span></button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-8 items-start">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="flex justify-between items-center">
                                                <span>Prompt Video (untuk AI Image-to-Video)</span>
                                                <button onClick={() => handleCopyText(generatedScripts.videoPrompt, 'prompt')} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                                                    {copiedText === 'prompt' ? <CheckIcon className="h-4 w-4 text-green-500"/> : <CopyIcon className="h-4 w-4"/>} Salin
                                                </button>
                                            </Label>
                                            <p className="font-mono text-xs text-gray-400 bg-black/30 p-3 rounded mt-1">{generatedScripts.videoPrompt}</p>
                                        </div>
                                        <Button onClick={handleGenerateVideo} disabled={isGeneratingVideo || countdown > 0 || credits < 5}>
                                            {isGeneratingVideo ? <><LoaderCircleIcon className="animate-spin h-5 w-5" /> Mensimulasikan...</> : countdown > 0 ? `Tunggu ${countdown}s` : 'Generate Video (-5 Kredit)'}
                                        </Button>
                                         <p className="text-xs text-gray-500 text-center">Fitur ini adalah simulasi. Salin prompt di atas dan gunakan pada platform AI image-to-video pilihan Anda.</p>
                                    </div>
                                    <div className="bg-gray-900/50 p-4 rounded-lg aspect-[9/16] flex items-center justify-center">
                                        {isGeneratingVideo ? (
                                            <div className="text-center text-gray-400">
                                                <LoaderCircleIcon className="animate-spin h-8 w-8 mx-auto mb-2" />
                                                <p>Mensimulasikan Video...</p>
                                            </div>
                                        ) : generatedVideoUrl ? (
                                             <div className="text-center text-gray-200 w-full h-full bg-black rounded-md flex flex-col items-center justify-center">
                                                <ClapperboardIcon className="h-16 w-16 text-green-500 mb-4"/>
                                                <p className="font-semibold">Simulasi Video Selesai!</p>
                                                <p className="text-sm text-gray-400 mt-2">Hasil video Anda akan muncul di sini.</p>
                                            </div>
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                <p>Hasil simulasi video akan muncul di sini</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CARD 5: DOWNLOAD */}
                    <div ref={downloadRef} className={`transition-opacity duration-500 ${generatedVideoUrl ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden invisible'}`}>
                        {/* ... (Konten Card Download tetap sama, hanya ganti judul jadi 5) ... */}
                         <Card><CardHeader><CardTitle icon={<PackageCheckIcon className="h-8 w-8 text-green-400" />} className="justify-center">5. Paket Konten Siap</CardTitle><button onClick={handleStartOver} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"><RotateCcwIcon className="h-4 w-4" /><span>Mulai Ulang</span></button></CardHeader><CardContent className="text-center"><p className="text-gray-400 mt-2 mb-6">Unduh semua aset dalam satu file ZIP.</p><div className="max-w-md mx-auto bg-gray-900/80 p-6 rounded-2xl"><div className="grid grid-cols-2 gap-4 text-left"><div className="font-semibold text-gray-300">Foto Produk AI:</div><div className="text-green-400">{generatedImages.length} file</div><div className="font-semibold text-gray-300">Teks Konten:</div><div className="text-green-400">1 file</div><div className="font-semibold text-gray-300">Skrip & Suara AI:</div><div className="text-green-400">2 file</div><div className="font-semibold text-gray-300">Video (Simulasi):</div><div className="text-green-400">1 file</div><div className="col-span-2 my-2 border-t border-gray-700"></div><div className="font-semibold text-gray-300">Ukuran Total:</div><div>{zipSize || 'Menghitung...'}</div></div></div><div className="mt-8 max-w-sm mx-auto"><Button onClick={handleDownloadZip} disabled={isDownloading}>{isDownloading ? <LoaderCircleIcon className="animate-spin h-5 w-5 mr-2" /> : <DownloadIcon className="h-5 w-5 mr-2" />}{isDownloading ? 'Menyiapkan file...' : `Download Semua File (.zip)`}</Button></div></CardContent></Card>
                    </div>
                </main>
                <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Made with ❤️ by Yusuf Wardana</p>
                </footer>
            </div>
             {/* Simple animation styles */}
            <style>{`
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}


