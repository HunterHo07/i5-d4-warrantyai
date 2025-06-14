'use client';

import React, { useEffect, useRef, useState } from 'react';

// Seeded random function for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface AnimatedCanvasProps {
  className?: string;
  type?: 'neural' | 'particles' | 'waves' | 'constellation';
  color?: string;
  opacity?: number;
  speed?: number;
}

const AnimatedCanvas: React.FC<AnimatedCanvasProps> = ({
  className = '',
  type = 'neural',
  color = '#00d4ff',
  opacity = 0.3,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isClient) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural Network Animation
    const neuralNetwork = () => {
      const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
      const nodeCount = 50;

      // Initialize nodes with fixed positions to avoid hydration issues
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: ((i * 37) % canvas.width),
          y: ((i * 53) % canvas.height),
          vx: (((i * 17) % 100) - 50) * 0.04 * speed,
          vy: (((i * 23) % 100) - 50) * 0.04 * speed,
        });
      }

      const animate = () => {
        ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        // Update and draw nodes
        nodes.forEach((node, i) => {
          node.x += node.vx;
          node.y += node.vy;

          // Bounce off edges
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

          // Draw node
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fill();

          // Draw connections
          nodes.slice(i + 1).forEach(otherNode => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
            );

            if (distance < 100) {
              ctx.globalAlpha = opacity * (1 - distance / 100);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          });
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Particle System Animation
    const particleSystem = () => {
      const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];

      const animate = () => {
        ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add new particles with fixed timing
        if (particles.length < 20 && Math.floor(Date.now() / 200) % 5 === 0) {
          const time = Date.now();
          particles.push({
            x: ((time * 0.1) % canvas.width),
            y: canvas.height,
            vx: (((time * 0.01) % 100) - 50) * 0.08 * speed,
            vy: -((time * 0.001) % 3) * speed,
            life: 1,
          });
        }

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life -= 0.01;

          if (particle.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = opacity * particle.life;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3 * particle.life, 0, Math.PI * 2);
          ctx.fill();
        }

        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Wave Animation
    const waveAnimation = () => {
      let time = 0;

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 2;

        // Draw multiple waves
        for (let wave = 0; wave < 3; wave++) {
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 5) {
            const y = canvas.height / 2 + 
              Math.sin((x * 0.01) + (time * 0.02 * speed) + (wave * Math.PI / 3)) * 50 +
              Math.sin((x * 0.005) + (time * 0.01 * speed) + (wave * Math.PI / 2)) * 30;
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }

        time++;
        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Constellation Animation
    const constellationAnimation = () => {
      const stars: Array<{ x: number; y: number; size: number; twinkle: number }> = [];
      const starCount = 100;

      // Initialize stars with fixed positions
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: ((i * 73) % canvas.width),
          y: ((i * 97) % canvas.height),
          size: ((i * 13) % 30) / 10 + 1,
          twinkle: ((i * 19) % 628) / 100,
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = color;

        stars.forEach(star => {
          star.twinkle += 0.05 * speed;
          const alpha = (Math.sin(star.twinkle) + 1) / 2;
          
          ctx.globalAlpha = opacity * alpha;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw constellation lines
          stars.forEach(otherStar => {
            const distance = Math.sqrt(
              Math.pow(star.x - otherStar.x, 2) + Math.pow(star.y - otherStar.y, 2)
            );

            if (distance < 150 && ((star.x + otherStar.y) % 1000) < 1) {
              ctx.globalAlpha = opacity * 0.3;
              ctx.strokeStyle = color;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(star.x, star.y);
              ctx.lineTo(otherStar.x, otherStar.y);
              ctx.stroke();
            }
          });
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    };

    // Start the appropriate animation
    switch (type) {
      case 'neural':
        neuralNetwork();
        break;
      case 'particles':
        particleSystem();
        break;
      case 'waves':
        waveAnimation();
        break;
      case 'constellation':
        constellationAnimation();
        break;
      default:
        neuralNetwork();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [type, color, opacity, speed, isClient]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

export default AnimatedCanvas;
