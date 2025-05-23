
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    setIsMounted(true);
    setOwnerName(portfolioOwner.name);

    const handleScroll = () => {
      const sections = navLinks.map(link => {
        const id = link.href.substring(1);
        return id ? document.getElementById(id) : null;
      });
      let current = '';
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const navbarHeight = 80; // Approximate height of the navbar + some offset

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          // Check if section is within the top part of the viewport more generously
          if (scrollY >= sectionTop - navbarHeight && scrollY < sectionTop + sectionHeight - navbarHeight) {
            current = `#${section.id}`;
            break;
          }
        }
      }
       // If no section is prominently in view based on the above, fall back to the topmost one scrolled past
      if (!current) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && scrollY >= section.offsetTop - navbarHeight) {
            current = `#${section.id}`;
            break;
          }
        }
      }
      // Default to hero if nothing else is active or if scrolled to the very top
      if (!current || (sections.length > 0 && sections[0] && scrollY < sections[0].offsetTop - navbarHeight)) {
        current = '#hero';
      }

      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (!isMounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="#hero"
          className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
          onClick={() => { closeMobileMenu(); setActiveLink('#hero');}}
        >
          {ownerName}
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md ${
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
          <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link
                  href="#hero"
                  className="w-full"
                  onClick={() => { closeMobileMenu(); setActiveLink('#hero');}}
                >
                  {ownerName}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild className="focus:bg-accent focus:text-accent-foreground">
                  <Link
                    href={link.href}
                    className={`w-full ${activeLink === link.href ? 'font-semibold text-primary' : 'text-foreground'}`}
                    onClick={() => { closeMobileMenu(); setActiveLink(link.href); }}
                  >
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
