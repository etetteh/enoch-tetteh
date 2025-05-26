
"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { portfolioOwner } from '@/lib/data';
import { ThemeSwitcher } from './ThemeSwitcher';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#publications', label: 'Publications' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateActiveLink = () => {
      let current = '';
      const navbarHeight = headerRef.current ? headerRef.current.offsetHeight + 20 : 90; // Increased offset
      const scrollY = window.scrollY;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const id = link.href.substring(1);
        const section = id ? document.getElementById(id) : null;

        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollY >= sectionTop - navbarHeight) {
            current = link.href;
            break; 
          }
        }
      }
      
      if (!current && scrollY < navbarHeight && navLinks.length > 0 && navLinks[0]) {
        current = navLinks[0].href;
      }
      
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20 && navLinks.length > 0) {
         current = navLinks[navLinks.length - 1].href;
      }

      if (current && current !== activeLink) {
        setActiveLink(current);
      } else if (!current && navLinks.length > 0 && navLinks[0] && activeLink === '') {
         setActiveLink(navLinks[0].href);
      }
    };
    
    const debouncedHandleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        calculateActiveLink();
      }, 150); 
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    calculateActiveLink(); 

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMounted, activeLink]); 

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
          onClick={() => {
            setActiveLink(link.href); 
          }}
          className={cn(
            "block px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background",
            isMobile ? "whitespace-nowrap" : "",
            activeLink === link.href
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:bg-card hover:text-primary'
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  if (!isMounted) {
    return (
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 h-[76px] md:h-[68px]">
        <div className="container mx-auto py-4">
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
      <div className="container mx-auto py-4">
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
