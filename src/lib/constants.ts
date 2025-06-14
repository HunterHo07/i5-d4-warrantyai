// App Configuration
export const APP_CONFIG = {
  name: 'WarrantyAI',
  tagline: 'Never miss a warranty again',
  description: 'Smart AI assistant to track, manage, and remind users of all warranties, expiring services, and coverage.',
  url: 'https://warrantyai.com',
  email: 'hello@warrantyai.com',
  phone: '+1 (555) 123-4567',
  address: 'San Francisco, CA',
} as const;

// Navigation Links
export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/demo', label: 'Demo' },
  { href: '/why-us', label: 'Why Us' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/pitch-deck', label: 'Pitch Deck' },
] as const;

// Social Media Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/warrantyai',
  linkedin: 'https://linkedin.com/company/warrantyai',
  github: 'https://github.com/warrantyai',
  discord: 'https://discord.gg/warrantyai',
} as const;

// Warranty Categories
export const WARRANTY_CATEGORIES = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    color: '#00d4ff',
    examples: ['Smartphones', 'Laptops', 'TVs', 'Cameras', 'Gaming Consoles'],
  },
  {
    id: 'appliances',
    name: 'Home Appliances',
    icon: '🏠',
    color: '#8b5cf6',
    examples: ['Refrigerators', 'Washing Machines', 'Dishwashers', 'Microwaves', 'Air Conditioners'],
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: '🚗',
    color: '#00ff88',
    examples: ['Cars', 'Motorcycles', 'Bicycles', 'Boats', 'RVs'],
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: '🏡',
    color: '#ff0080',
    examples: ['HVAC Systems', 'Roofing', 'Windows', 'Plumbing', 'Electrical'],
  },
  {
    id: 'tools',
    name: 'Tools & Equipment',
    icon: '🔧',
    color: '#ffff00',
    examples: ['Power Tools', 'Lawn Equipment', 'Workshop Tools', 'Safety Equipment'],
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: '🪑',
    color: '#ff6b35',
    examples: ['Sofas', 'Mattresses', 'Office Chairs', 'Tables', 'Cabinets'],
  },
] as const;

// Pricing Plans
export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with warranty tracking',
    features: [
      'Up to 10 warranty items',
      'Manual upload only',
      'Basic reminders',
      'Mobile app access',
      'Email support',
    ],
    limitations: [
      'No auto-import',
      'No AR/3D features',
      'Limited storage',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: 'month',
    description: 'Advanced features for power users and families',
    features: [
      'Unlimited warranty items',
      'Auto-import from Gmail/receipts',
      'Advanced AI extraction',
      'AR/3D room inventory',
      'Smart reminders & alerts',
      'Claim assistance',
      'Priority support',
      'Export & backup',
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 29.99,
    period: 'month',
    description: 'Enterprise-grade solution for businesses',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'Custom integrations',
      'Advanced analytics',
      'Bulk import/export',
      'Dedicated support',
      'Custom branding',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
] as const;

// Feature Highlights
export const FEATURE_HIGHLIGHTS = [
  {
    id: 'ai-scanning',
    title: 'AI Receipt Scanning',
    description: 'Upload receipts, invoices, or photos and let AI extract all warranty information automatically.',
    icon: '🤖',
    color: '#00d4ff',
  },
  {
    id: 'smart-reminders',
    title: 'Smart Reminders',
    description: 'Never miss a warranty expiration or service date with intelligent notifications.',
    icon: '⏰',
    color: '#8b5cf6',
  },
  {
    id: 'ar-inventory',
    title: '3D/AR Inventory',
    description: 'Visualize your items in 3D space and track them room by room with AR technology.',
    icon: '🥽',
    color: '#00ff88',
  },
  {
    id: 'claim-assistant',
    title: 'Claim Assistant',
    description: 'Get step-by-step guidance for warranty claims with document generation and tracking.',
    icon: '📋',
    color: '#ff0080',
  },
  {
    id: 'multi-category',
    title: 'Multi-Category Support',
    description: 'Track everything from electronics to home appliances, vehicles, and even food freshness.',
    icon: '📦',
    color: '#ffff00',
  },
  {
    id: 'ownership-proof',
    title: 'Ownership Verification',
    description: 'Secure, privacy-first ownership proof system for authenticity and insurance claims.',
    icon: '🔐',
    color: '#ff6b35',
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Tech Professional',
    company: 'Google',
    avatar: '/avatars/sarah.jpg',
    content: 'WarrantyAI saved me hundreds of dollars by reminding me about my laptop warranty just before it expired. The AI scanning is incredibly accurate!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    role: 'Homeowner',
    company: 'Family of 4',
    avatar: '/avatars/mike.jpg',
    content: 'Managing warranties for all our appliances was a nightmare. Now everything is organized and I get reminders before anything expires.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lisa Thompson',
    role: 'Small Business Owner',
    company: 'Design Studio',
    avatar: '/avatars/lisa.jpg',
    content: 'The business plan is perfect for our agency. We track all our equipment warranties and never miss a service date anymore.',
    rating: 5,
  },
] as const;

// Statistics
export const STATISTICS = [
  {
    value: '70%',
    label: 'of consumers lose receipts',
    description: 'Within 6 months of purchase',
  },
  {
    value: '25+',
    label: 'items per household',
    description: 'With active warranties',
  },
  {
    value: '$2.9B',
    label: 'unclaimed warranty value',
    description: 'Annually in the US alone',
  },
  {
    value: '85%',
    label: 'of warranty claims',
    description: 'Are never filed due to lost docs',
  },
] as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Z-Index Layers
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
  },
  warranties: {
    list: '/api/warranties',
    create: '/api/warranties',
    update: '/api/warranties/:id',
    delete: '/api/warranties/:id',
    scan: '/api/warranties/scan',
  },
  users: {
    profile: '/api/users/profile',
    settings: '/api/users/settings',
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  warranties: 'warrantyai_warranties',
  settings: 'warrantyai_settings',
  onboarding: 'warrantyai_onboarding',
  theme: 'warrantyai_theme',
} as const;

// Demo Data Categories
export const DEMO_CATEGORIES = [
  'Electronics',
  'Home Appliances',
  'Vehicles',
  'Tools & Equipment',
  'Furniture',
  'Home & Garden',
] as const;

// Warranty Status Types
export const WARRANTY_STATUS = {
  ACTIVE: 'active',
  EXPIRING: 'expiring',
  EXPIRED: 'expired',
} as const;

// File Upload Limits
export const UPLOAD_LIMITS = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  maxFiles: 5,
} as const;
