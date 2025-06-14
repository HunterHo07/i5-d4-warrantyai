# WarrantyAI - Development Guide

## 🛠 Tech Stack & Architecture

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 3.4.1 (pinned version)
- **Animations**: GSAP with ScrollTrigger
- **3D Graphics**: Three.js for AR/3D features
- **UI Components**: Framer Motion, Lucide React
- **State Management**: React Context + Local Storage

### Development Environment
```bash
# Node.js version
node --version  # v18+ required

# Package manager
npm --version   # v9+ recommended

# Development server
npm run dev     # Runs on http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (pages)/           # Route groups
│   │   ├── demo/          # Demo page
│   │   ├── pitch-deck/    # Pitch deck page
│   │   ├── why-us/        # Why us page
│   │   ├── roadmap/       # Roadmap page
│   │   └── sign-up/       # Sign up page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── sections/         # Page sections
│   ├── effects/          # Animation effects
│   ├── simulation/       # Demo simulations
│   └── layout/           # Layout components
├── lib/                  # Utilities and helpers
│   ├── utils.ts          # General utilities
│   ├── animations.ts     # GSAP animations
│   ├── simulation.ts     # Demo data generation
│   └── constants.ts      # App constants
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── data/                 # Static data and mock data
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-50: #f0f9ff;
--primary-500: #0ea5e9;
--primary-900: #0c4a6e;

/* Neon Accents */
--neon-blue: #00d4ff;
--neon-purple: #8b5cf6;
--neon-green: #00ff88;
--neon-pink: #ff0080;
```

### Typography
- **Display Font**: Orbitron (futuristic headings)
- **Body Font**: Inter (readable content)
- **Mono Font**: JetBrains Mono (code/terminal)

### Animation Guidelines
- **Duration**: 0.3s for micro-interactions, 0.6s for page transitions
- **Easing**: `ease-out` for entrances, `ease-in` for exits
- **Performance**: Use `transform` and `opacity` for smooth animations

## 🚀 Development Workflow

### Getting Started
1. **Clone and Install**
   ```bash
   git clone <repository>
   cd i5-d4-warrantyai
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Create .env.local for environment variables
   cp .env.example .env.local
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: Automatic code formatting
- **Naming**: camelCase for variables, PascalCase for components

### Component Development
```typescript
// Example component structure
interface ComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  variant = 'primary',
  children
}) => {
  return (
    <div className={`component ${variant}`}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
```

## 🎭 Animation Implementation

### GSAP Setup
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Parallax animation example
gsap.to('.parallax-bg', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

### Effect Categories
1. **Scroll Effects**: Parallax, reveal animations, progress indicators
2. **Hover Effects**: 3D tilts, glow effects, scale transforms
3. **Loading Effects**: Skeleton screens, progress bars, fade-ins
4. **Interactive Effects**: Button animations, form feedback, cursor followers

## 🎮 Simulation Features

### Warranty Data Simulation
```typescript
interface WarrantyItem {
  id: string;
  name: string;
  brand: string;
  category: 'electronics' | 'appliance' | 'vehicle' | 'home';
  purchaseDate: Date;
  warrantyExpiry: Date;
  serialNumber: string;
  receiptImage?: string;
  status: 'active' | 'expiring' | 'expired';
}

// Generate mock warranty data
const generateWarrantyData = (): WarrantyItem[] => {
  // Implementation for realistic demo data
};
```

### Local Storage Management
```typescript
// Persistent demo state
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading localStorage:', error);
    }
  }, [key]);
  
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };
  
  return [storedValue, setValue] as const;
};
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### Mobile-First Approach
```css
/* Base styles for mobile */
.component {
  @apply text-sm p-4;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    @apply text-base p-6;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    @apply text-lg p-8;
  }
}
```

## 🔧 Build & Deployment

### Build Process
```bash
# Development build
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Performance Optimization
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Bundle Analysis**: `npm run analyze`
- **Lighthouse Scores**: Target 90+ for all metrics

### Deployment Checklist
- [ ] All animations work on mobile
- [ ] No console errors
- [ ] Lighthouse performance > 90
- [ ] All pages load correctly
- [ ] Demo simulations function properly
- [ ] Responsive design verified

## 🧪 Testing Strategy

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

test('renders component with title', () => {
  render(<Component title="Test Title" />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});
```

### Animation Testing
- Visual regression testing for animations
- Performance testing for smooth 60fps
- Cross-browser compatibility testing

## 📊 Analytics & Monitoring

### Key Metrics
- **Page Load Time**: < 2 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **User Engagement**: Time on page, scroll depth

### Error Monitoring
- Console error tracking
- Animation performance monitoring
- User interaction analytics

This development guide ensures consistent, high-quality code and optimal user experience across all devices and browsers.
