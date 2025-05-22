"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, BrainCircuit } from 'lucide-react'; // Using BrainCircuit as a logo icon
import { portfolioOwner } from '@/lib/data'; // Assuming portfolioOwner.name is available

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#resume-tailor', label: 'Resume Tailor' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component has mounted, safe to use window
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      let current = '';
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 100) { // Adjusted offset for better accuracy
            current = `#${section.id}`;
          }
        }
      });
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial active link
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const closeSheet = () => setIsSheetOpen(false);

  if (!isMounted) {
    return null; // Or a loading skeleton for Navbar
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6" onClick={() => { closeSheet(); setActiveLink('#hero');}}>
          <BrainCircuit className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl">AISolutions</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeLink === link.href ? 'text-primary underline underline-offset-4' : 'text-muted-foreground'
              }`}
              onClick={() => setActiveLink(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
              <div className="flex justify-between items-center mb-6">
                <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
                  <BrainCircuit className="h-6 w-6 text-primary" />
                  <span className="font-bold">AISolutions</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={closeSheet}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      activeLink === link.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={() => { closeSheet(); setActiveLink(link.href); }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
