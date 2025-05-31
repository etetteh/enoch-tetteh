
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster"
// import { Chatbot } from '@/components/Chatbot'; // Commented out for static export
import { ThemeProvider } from '@/components/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Enoch Tetteh | AI Engineer Portfolio | Seeking Roles at Google',
  description: 'Portfolio of Enoch Tetteh, an AI Engineer showcasing expertise in MLOps, Deep Learning, NLP, Computer Vision, and scalable AI solutions. Relevant for opportunities at Google.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen pb-24`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          {/* <Chatbot /> */} {/* Commented out for static export */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
