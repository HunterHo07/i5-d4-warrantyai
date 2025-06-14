import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateId(): string {
  // Use timestamp + counter for deterministic IDs
  const timestamp = Date.now().toString(36);
  const counter = (Math.floor(Date.now() / 1000) % 1000).toString(36);
  return `${timestamp}${counter}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Seeded random function for consistent results
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function getRandomElement<T>(array: T[], seed?: number): T {
  if (seed !== undefined) {
    return array[Math.floor(seededRandom(seed) * array.length)];
  }
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomNumber(min: number, max: number, seed?: number): number {
  if (seed !== undefined) {
    return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getTimeUntilExpiry(expiryDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  isExpired: boolean;
} {
  const now = new Date();
  const diff = expiryDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes, isExpired: false };
}

export function getWarrantyStatus(expiryDate: Date): 'active' | 'expiring' | 'expired' {
  const { days, isExpired } = getTimeUntilExpiry(expiryDate);
  
  if (isExpired) return 'expired';
  if (days <= 30) return 'expiring';
  return 'active';
}

export function generateWarrantyId(): string {
  const prefix = 'WTY';
  const timestamp = Date.now().toString(36);
  const counter = (Math.floor(Date.now() / 1000) % 10000).toString(36);
  return `${prefix}-${timestamp}-${counter}`.toUpperCase();
}

export function parseReceiptText(text: string): {
  productName?: string;
  brand?: string;
  price?: number;
  date?: Date;
  serialNumber?: string;
} {
  // Simulate AI parsing of receipt text
  const lines = text.split('\n').map(line => line.trim());
  
  // Extract price (look for currency symbols and numbers)
  const priceMatch = text.match(/\$(\d+\.?\d*)/);
  const price = priceMatch ? parseFloat(priceMatch[1]) : undefined;
  
  // Extract date (look for date patterns)
  const dateMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
  const date = dateMatch ? new Date(dateMatch[1]) : undefined;
  
  // Extract serial number (look for alphanumeric patterns)
  const serialMatch = text.match(/(?:S\/N|Serial|SN)[\s:]*([A-Z0-9]{6,})/i);
  const serialNumber = serialMatch ? serialMatch[1] : undefined;
  
  // Extract product name and brand (simplified logic)
  const productName = lines.find(line => 
    line.length > 5 && 
    !line.includes('$') && 
    !line.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/)
  );
  
  return {
    productName,
    price,
    date,
    serialNumber,
  };
}

export function calculateWarrantyValue(
  purchasePrice: number,
  warrantyLength: number,
  timeRemaining: number
): number {
  // Calculate remaining warranty value based on time left
  const timeRatio = timeRemaining / warrantyLength;
  return purchasePrice * timeRatio * 0.3; // Assume warranty covers 30% of purchase price
}

export function formatTimeRemaining(expiryDate: Date): string {
  const { days, hours, minutes, isExpired } = getTimeUntilExpiry(expiryDate);
  
  if (isExpired) return 'Expired';
  
  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''} remaining`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''} remaining`;
  } else {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} remaining`;
  }
}

export function getWarrantyColor(status: 'active' | 'expiring' | 'expired'): string {
  switch (status) {
    case 'active':
      return 'text-green-400';
    case 'expiring':
      return 'text-yellow-400';
    case 'expired':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}

export function smoothScrollTo(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
}
