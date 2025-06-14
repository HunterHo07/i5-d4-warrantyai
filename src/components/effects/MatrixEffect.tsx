'use client';

import React, { useEffect, useRef, useState } from 'react';

// Seeded random function for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface MatrixEffectProps {
  className?: string;
  opacity?: number;
  speed?: number;
  fontSize?: number;
  color?: string;
}

const MatrixEffect: React.FC<MatrixEffectProps> = ({
  className = '',
  opacity = 0.1,
  speed = 50,
  fontSize = 14,
  color = '#00d4ff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isClient) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');

    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops with seeded random
    for (let i = 0; i < columns; i++) {
      drops[i] = seededRandom(i * 123) * canvas.height;
    }

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      ctx.globalAlpha = opacity;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(seededRandom(i * 456 + Date.now() * 0.001) * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && seededRandom(i * 789 + Date.now() * 0.001) > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationRef.current = setTimeout(() => {
        requestAnimationFrame(animate);
      }, speed);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [opacity, speed, fontSize, color, isClient]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  );
};

export default MatrixEffect;
