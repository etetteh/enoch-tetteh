
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
      let current = ''; 
      // Adjusted to find the section that is currently most visible or at the top
      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          // Check if section is within the top part of the viewport more generously
          if (window.scrollY >= sectionTop - 80 && window.scrollY < sectionTop + sectionHeight - 80) {
            current = `#${section.id}`;
            break; 
          }
        }
      }
       // If no section is prominently in view based on the above, fall back to the topmost one scrolled past
      if (!current) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && window.scrollY >= section.offsetTop - 80) {
            current = `#${section.id}`;
            break;
          }
        }
      }
      // Default to hero if nothing else is active
      if (!current && sections.length > 0 && sections[0] && window.scrollY < sections[0].offsetTop - 80) {
        current = '#hero';
      }


      setActiveLink(current || '#hero');
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
          href="#hero" // Changed from "/" to "#hero" to also set active link
          className="text-xl font-bold text-primary hover:text-primary/90 transition-colors" 
          onClick={() => { closeSheet(); setActiveLink('#hero');}}
        >
          {ownerName}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`pb-1 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeLink === link.href 
                  ? 'text-primary font-semibold border-b-2 border-primary' 
                  : 'text-muted-foreground hover:text-primary' 
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
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-0">
              <SheetHeader className="p-6 pb-4 border-b">
                <div className="flex items-center justify-between">
                   <Link 
                    href="#hero" 
                    className="text-lg font-bold text-primary"
                    onClick={() => { closeSheet(); setActiveLink('#hero');}}
                  >
                    {ownerName}
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetClose>
                </div>
                 <SheetTitle className="text-base font-medium text-muted-foreground pt-1">Menu</SheetTitle>
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
