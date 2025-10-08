"use client";

import React, { useState, useEffect } from "react";

const ExternalScriptsLoader = () => {
  useEffect(() => {
    const scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js",
    ];
    scripts.forEach((src) => {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      document.body.appendChild(s);
    });
  }, []);
  return null;
};

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const handleGenerateText = async () => {
    setLoading(true);
    setResults("");

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      const data = await response.json();
      const output =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Gagal menghasilkan output.";
      setResults(output);
    } catch (err) {
      setResults("Terjadi kesalahan saat generate konten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <ExternalScriptsLoader />
      <h1 className="text-3xl font-bold text-center mb-6">
        🪐 CosmicLabs AI Studio
      </h1>
      <textarea
        className="mb-4"
        rows="5"
        placeholder="Masukkan ide atau deskripsi konten TikTok kamu..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button onClick={handleGenerateText} disabled={loading}>
        {loading ? "Generating..." : "Generate Konten"}
      </button>
      {results && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 whitespace-pre-line">
          {results}
        </div>
      )}
    </main>
  );
}