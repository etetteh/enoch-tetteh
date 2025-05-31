
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
  const [chartColors, setChartColors] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const primary = computedStyle.getPropertyValue('--primary').trim();
      const accent = computedStyle.getPropertyValue('--accent').trim();
      
      setBasePrimaryColor(primary || '217 91% 60%');

      const fetchedChartColors = [];
      for (let i = 1; i <= 5; i++) { // Try to fetch up to 5 chart colors
        const color = computedStyle.getPropertyValue(`--chart-${i}`).trim();
        if (color) {
          fetchedChartColors.push(color);
        }
      }

      if (fetchedChartColors.length > 0) {
        setChartColors(fetchedChartColors);
      } else {
        // Fallback if no chart colors are found, use primary and accent
        setChartColors([primary || '217 91% 60%', accent || '174 100% 29%'].filter(Boolean));
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || chartColors.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const numParticles = 50; 
    const connectDistance = 120; 
    const particleSpeed = 0.3;

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
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const getHslString = (baseColorHsl: string, opacity: number) => {
        if (!baseColorHsl) return `hsla(0, 0%, 0%, ${opacity})`; // Fallback for safety
        const [h, s, l] = baseColorHsl.split(' ');
        return `hsla(${h}, ${s}, ${l}, ${opacity})`;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = getHslString(basePrimaryColor, 0.3); 
        ctx.fill();
      });

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
            
            const lineColor = chartColors[(i + j) % chartColors.length]; // Cycle through chart colors
            ctx.strokeStyle = getHslString(lineColor, opacity * 0.2); 
            ctx.lineWidth = 0.5; 
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    initParticles();
    draw();

    const handleResize = () => {
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
  }, [isMounted, basePrimaryColor, chartColors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
