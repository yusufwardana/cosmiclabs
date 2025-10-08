import "./../styles/globals.css";

export const metadata = {
  title: "CosmicLabs AI Studio",
  description: "Generate AI-powered TikTok content automatically with CosmicLabs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-gray-800">{children}</body>
    </html>
  );
}