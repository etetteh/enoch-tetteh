
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
      // Adjusted navbarHeight to be more accurate for the layout.
      // This value might need tweaking based on the actual rendered height of the name + nav on different screens.
      const navbarHeight = document.querySelector('header')?.offsetHeight || 100; 

      const scrollY = window.scrollY;

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          // Check if the top of the section is within the viewport, considering the navbar height
          if (scrollY >= sectionTop - navbarHeight && scrollY < sectionTop + sectionHeight - navbarHeight) {
            current = `#${section.id}`;
            break;
          }
        }
      }
      
      // Fallback logic for when no section is perfectly matched
      if (!current) {
        // If above the first section, default to hero or the first link
        if (sections.length > 0 && sections[0] && scrollY < sections[0].offsetTop - navbarHeight) {
          current = navLinks[0].href;
        } else {
          // If scrolled past all sections (e.g., very bottom of page), keep the last active section
          // Or, if no section matched but not above first, try to find the closest one from bottom up
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && scrollY >= section.offsetTop - navbarHeight) {
              current = `#${section.id}`;
              break;
            }
          }
        }
      }
      
      // Final fallback if still no current link (e.g., page is too short, or error)
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
        isMobile ? "space-x-0.5" : "space-x-1" // Slightly less space for mobile pills
      )}
    >
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={() => setActiveLink(link.href)}
          className={cn(
            "block px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background",
            isMobile ? "whitespace-nowrap" : "", // Ensure mobile links don't wrap if space is tight before scrolling
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

  // Render a placeholder if not mounted to avoid layout shifts or hydration errors
  if (!isMounted) {
    // Approximate height to prevent layout shift. Adjust if necessary.
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 h-[100px] md:h-[120px]"> 
        {/* Simplified placeholder content */}
        <div className="container flex flex-col items-center py-4">
          <div className="text-xl font-bold text-primary mb-2 h-7"></div> {/* Placeholder for name */}
          <div className="h-9 w-3/4 bg-secondary rounded-full mt-2 hidden md:block"></div> {/* Placeholder for desktop nav */}
          <div className="h-9 w-full bg-secondary rounded-full mt-2 md:hidden"></div> {/* Placeholder for mobile nav */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center py-4">
        <Link
          href="#hero"
          className="text-xl font-bold text-primary hover:text-primary/90 transition-colors mb-2" // Added bottom margin
          onClick={() => setActiveLink('#hero')}
        >
          {portfolioOwner.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mt-2"> {/* Reduced top margin slightly */}
          {renderPillNavLinks(false)}
        </nav>

        {/* Mobile Navigation */}
        {/* w-full ensures the scroll container takes available width */}
        {/* justify-start aligns scrollable content to the left, essential for good UX when overflowing */}
        <div className="md:hidden mt-2 w-full overflow-x-auto scrollbar-hide flex justify-start py-1" tabIndex={0}>
          {renderPillNavLinks(true)}
        </div>
      </div>
    </header>
  );
}
