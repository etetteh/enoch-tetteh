
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react'; 
import { portfolioOwner } from '@/lib/data'; 

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
  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    setIsMounted(true); 
    setOwnerName(portfolioOwner.name); 

    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      let current = '#hero'; // Default to hero if no other section is scrolled to
      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          // Adjust offset if navbar height is dynamic or for better active state triggering
          if (window.scrollY >= sectionTop - 80) { // 80px offset
            current = `#${section.id}`;
          }
        }
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const closeSheet = () => setIsSheetOpen(false);

  if (!isMounted) {
    return null; 
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-bold text-primary hover:text-primary/90 transition-colors" 
          onClick={() => { closeSheet(); setActiveLink('#hero');}}
        >
          {ownerName}
        </Link>

        <nav className="hidden md:flex items-center">
          <div className="bg-secondary rounded-full p-1 flex items-center space-x-1 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  activeLink === link.href 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-primary hover:bg-card' 
                }`}
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0">
              <SheetHeader className="p-6 border-b">
                <div className="flex items-center justify-between">
                   <Link 
                    href="/" 
                    className="text-lg font-bold text-primary"
                    onClick={() => { closeSheet(); setActiveLink('#hero');}}
                  >
                    {ownerName}
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                 <SheetTitle className="sr-only">Menu</SheetTitle> {/* Keep for accessibility, hide visually if logo serves as title */}
              </SheetHeader>
              
              <div className="p-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-base font-medium transition-colors hover:text-primary ${
                        activeLink === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                      }`}
                      onClick={() => { closeSheet(); setActiveLink(link.href); }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
