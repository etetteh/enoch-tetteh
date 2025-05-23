
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
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
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const sections = navLinks.map(link => {
        const id = link.href.substring(1);
        return id ? document.getElementById(id) : null;
      });
      let current = '';
      const navbarElement = document.querySelector('header');
      const navbarHeight = navbarElement ? navbarElement.offsetHeight + 20 : 140; 

      const scrollY = window.scrollY;

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop - navbarHeight && scrollY < sectionTop + sectionHeight - navbarHeight) {
            current = `#${section.id}`;
            break;
          }
        }
      }
      
      if (!current) {
        if (sections.length > 0 && sections[0] && scrollY < sections[0].offsetTop - navbarHeight) {
          current = navLinks[0].href;
        } else {
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && scrollY >= section.offsetTop - navbarHeight) {
              current = `#${section.id}`;
              break;
            }
          }
        }
      }
      
      if (!current && navLinks.length > 0) {
        current = navLinks[0].href;
      }

      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const renderPillNavLinks = (isMobile: boolean) => (
    <div
      className={cn(
        "inline-flex bg-secondary rounded-full p-1 items-center shadow-sm",
        isMobile ? "space-x-0.5" : "space-x-1"
      )}
    >
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={() => setActiveLink(link.href)}
          className={cn(
            "block px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background",
            isMobile ? "whitespace-nowrap" : "", 
            activeLink === link.href
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:bg-background hover:text-primary'
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 h-[120px] md:h-[140px]"> 
        <div className="container py-4">
          <div className="h-7 w-1/4 bg-muted rounded mb-3"></div>
          <div className="h-9 w-3/4 bg-secondary rounded-full mt-1 hidden md:block mx-auto"></div>
          <div className="h-9 w-full bg-secondary rounded-full mt-1 md:hidden"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4"> 
        <div className="mb-3"> 
          <Link
            href="#hero"
            className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
            onClick={() => setActiveLink('#hero')}
          >
            {portfolioOwner.name}
          </Link>
        </div>

        <nav className="hidden md:flex justify-center mt-1"> 
          {renderPillNavLinks(false)}
        </nav>

        <div className="md:hidden mt-1 w-full overflow-x-auto scrollbar-hide flex justify-start py-1" tabIndex={0}>
          {renderPillNavLinks(true)}
        </div>
      </div>
    </header>
  );
}
