
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
      const navbarHeight = 80; // Approximate height of the navbar + some offset

      const scrollY = window.scrollY;

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          // Check if the top of the section is within the viewport, considering navbar height
          // Or if the section is large, check if we are scrolled past its top but not yet past its bottom
          if (scrollY >= sectionTop - navbarHeight && scrollY < sectionTop + sectionHeight - navbarHeight) {
            current = `#${section.id}`;
            break;
          }
        }
      }
      
      // Fallback: if no section is "active" based on above,
      // check if we've scrolled past the top of any section.
      // This helps if sections are short or scrolling is fast.
      if (!current) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && scrollY >= section.offsetTop - navbarHeight) {
            current = `#${section.id}`;
            break;
          }
        }
      }

      // Default to #hero if at the top or no other section is active
      if (!current && sections.length > 0 && sections[0] && scrollY < sections[0].offsetTop - navbarHeight) {
        current = '#hero';
      } else if (!current && navLinks.length > 0) {
         // If still no current link and we are not at the very top, default to home.
        // This often happens when scrolling up quickly from the bottom.
        if (scrollY < (sections[0]?.offsetTop || 0) - navbarHeight) {
             current = navLinks[0].href;
        }
      }
      // Ensure current is always set if navlinks exist
      if(!current && navLinks.length > 0) {
        current = navLinks[0].href;
      }


      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
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
    // Return a placeholder or null to avoid layout shifts or rendering issues pre-mount
    // For a sticky navbar, it's often better to render its structure to reserve space
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 h-[100px] md:h-[120px]"> 
        {/* Placeholder height, adjust as needed based on final content height */}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center py-4">
        <Link
          href="#hero"
          className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
          onClick={() => setActiveLink('#hero')}
        >
          {portfolioOwner.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mt-4">
          {renderPillNavLinks(false)}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden overflow-x-auto scrollbar-hide whitespace-nowrap py-1 mt-4 w-full flex justify-center" tabIndex={0}>
          {renderPillNavLinks(true)}
        </div>
      </div>
    </header>
  );
}
