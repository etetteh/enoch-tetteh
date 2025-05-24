
"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { portfolioOwner } from '@/lib/data';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from './ui/button';


const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#publications', label: 'Publications' },
  { href: '#resume-tailor', label: 'Resume Tailor' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      let current = '';
      let navbarHeight = 70; // Default offset
      if (headerRef.current) {
        navbarHeight = headerRef.current.offsetHeight + 20;
      }
      const scrollY = window.scrollY;

      for (const link of navLinks) {
        const id = link.href.substring(1);
        const section = id ? document.getElementById(id) : null;
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollY >= sectionTop - navbarHeight) {
            current = link.href; // Keep assigning as we scroll down
          } else {
            // If we scrolled up past the sectionTop, this section is no longer the 'current' one.
            // We break here, so 'current' remains the last valid section.
            // If it's the first section, and we are above it, it might become blank
            // but the fallback logic handles that.
            break;
          }
        }
      }
      
      // Fallback if no section is matched (e.g. top of page) or after scrolling past the last section
      if (!current && navLinks.length > 0) {
        if (scrollY < (document.getElementById(navLinks[0].href.substring(1))?.offsetTop || 0) - navbarHeight) {
             current = navLinks[0].href; // Default to first link if above all sections
        } else {
            // If scrolled past all sections, keep the last one active
            // This can happen if the footer is very tall or page is short
             const lastSectionId = navLinks[navLinks.length - 1].href.substring(1);
             const lastSection = document.getElementById(lastSectionId);
             if(lastSection && scrollY >= lastSection.offsetTop - navbarHeight) {
                current = navLinks[navLinks.length - 1].href;
             } else {
                // Default if still no match (should be rare)
                current = navLinks[0].href;
             }
        }
      }
       // Ensure if we are very near the top, the first link is active
      if (scrollY < navbarHeight && navLinks.length > 0) {
          current = navLinks[0].href;
      }


      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);


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
          onClick={(e) => {
            setActiveLink(link.href);
            // Optional: Smooth scroll for browsers that don't support scroll-behavior: smooth via CSS
            // const section = document.getElementById(link.href.substring(1));
            // if (section) {
            //   e.preventDefault();
            //   section.scrollIntoView({ behavior: 'smooth' });
            // }
          }}
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
    // Basic skeleton loader for navbar
    return (
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 h-[76px] md:h-[68px]">
        <div className="container py-4">
          {/* Desktop Skeleton */}
          <div className="hidden md:flex justify-between items-center">
            <div className="h-7 w-1/4 bg-muted rounded"></div> {/* Name */}
            <div className="h-9 w-1/2 bg-secondary rounded-full"></div> {/* Nav Pills */}
            <div className="h-9 w-9 bg-muted rounded-full"></div> {/* ThemeSwitcher */}
          </div>
          {/* Mobile Skeleton */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-3">
              <div className="h-7 w-1/3 bg-muted rounded"></div> {/* Name */}
              <div className="h-9 w-9 bg-muted rounded-full"></div> {/* ThemeSwitcher */}
            </div>
            <div className="h-9 w-full bg-secondary rounded-full mt-1"></div> {/* Mobile Pills */}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4">
        {/* Desktop Layout: Name - Nav Pills - ThemeSwitcher */}
        <div className="hidden md:flex justify-between items-center">
          <Link
            href="#hero"
            className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
            onClick={() => setActiveLink('#hero')}
          >
            {portfolioOwner.name}
          </Link>
          <nav>
            {renderPillNavLinks(false)}
          </nav>
          <ThemeSwitcher />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-3">
            <Link
              href="#hero"
              className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
              onClick={() => setActiveLink('#hero')}
            >
              {portfolioOwner.name}
            </Link>
            <ThemeSwitcher />
          </div>
          <div className="mt-1 w-full overflow-x-auto scrollbar-hide flex justify-start py-1" tabIndex={0}>
            {renderPillNavLinks(true)}
          </div>
        </div>
      </div>
    </header>
  );
}
