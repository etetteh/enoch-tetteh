'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function HeroNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [basePrimaryColor, setBasePrimaryColor] = useState('217 91% 60%'); // Default from globals.css
  const [baseAccentColor, setBaseAccentColor] = useState('174 100% 29%'); // Default from globals.css
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      setBasePrimaryColor(computedStyle.getPropertyValue('--primary').trim() || basePrimaryColor);
      setBaseAccentColor(computedStyle.getPropertyValue('--accent').trim() || baseAccentColor);
    }
  }, [basePrimaryColor, baseAccentColor]);

  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const numParticles = 50; // Adjust for density/performance
    const connectDistance = 120; // Max distance to draw a line
    const particleSpeed = 0.3; // Max speed of particles

    const initParticles = () => {
      particles = [];
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * particleSpeed * 2,
          vy: (Math.random() - 0.5) * particleSpeed * 2,
          radius: Math.random() * 1.5 + 0.5, // Particle dot size
        });
      }
    };

    const getHslString = (baseColorHsl: string, opacity: number) => {
        const [h, s, l] = baseColorHsl.split(' ');
        return `hsla(${h}, ${s}, ${l}, ${opacity})`;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks (bounce)
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = getHslString(basePrimaryColor, 0.3); // Subtle particle color
        ctx.fill();
      });

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            const opacity = 1 - distance / connectDistance;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Alternate line color for visual variety
            const lineColor = i % 2 === 0 ? basePrimaryColor : baseAccentColor;
            ctx.strokeStyle = getHslString(lineColor, opacity * 0.2); // Subtle line color
            ctx.lineWidth = 0.5; // Thin lines
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    const handleResize = () => {
      // Debounce resize or use a timeout to avoid performance issues
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      initParticles();
      draw();
    };
    
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    }

    window.addEventListener('resize', debouncedResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMounted, basePrimaryColor, baseAccentColor]); // Rerun on color change

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
