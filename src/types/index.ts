// Core Types
export interface WarrantyItem {
  id: string;
  name: string;
  brand?: string;
  model?: string;
  category: WarrantyCategory;
  serialNumber?: string;
  purchaseDate: Date;
  warrantyExpiry: Date;
  purchasePrice?: number;
  retailer?: string;
  receiptImage?: string;
  warrantyDocument?: string;
  status: WarrantyStatus;
  notes?: string;
  tags?: string[];
  location?: ItemLocation;
  createdAt: Date;
  updatedAt: Date;
}

export type WarrantyCategory = 
  | 'electronics'
  | 'appliances'
  | 'vehicles'
  | 'home'
  | 'tools'
  | 'furniture';

export type WarrantyStatus = 'active' | 'expiring' | 'expired';

export interface ItemLocation {
  room?: string;
  position?: {
    x: number;
    y: number;
    z: number;
  };
  description?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: UserPlan;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

export type UserPlan = 'free' | 'pro' | 'business';

export interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  display: DisplaySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  reminderDays: number[];
  quietHours: {
    start: string;
    end: string;
  };
}

export interface PrivacySettings {
  shareData: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface DisplaySettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// Animation Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  repeat?: number;
  yoyo?: boolean;
}

export interface ParallaxConfig {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  trigger?: string;
  start?: string;
  end?: string;
}

export interface ScrollTriggerConfig {
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  snap?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  plan: UserPlan;
  agreeToTerms: boolean;
}

export interface WarrantyForm {
  name: string;
  brand?: string;
  model?: string;
  category: WarrantyCategory;
  serialNumber?: string;
  purchaseDate: string;
  warrantyExpiry: string;
  purchasePrice?: number;
  retailer?: string;
  notes?: string;
  receiptImage?: File;
}

// Simulation Types
export interface SimulationData {
  warranties: WarrantyItem[];
  categories: CategoryStats[];
  totalValue: number;
  expiringCount: number;
  activeCount: number;
  expiredCount: number;
}

export interface CategoryStats {
  category: WarrantyCategory;
  count: number;
  value: number;
  expiringCount: number;
}

// Receipt Scanning Types
export interface ReceiptScanResult {
  confidence: number;
  extractedData: {
    productName?: string;
    brand?: string;
    model?: string;
    price?: number;
    date?: Date;
    retailer?: string;
    serialNumber?: string;
  };
  rawText: string;
  boundingBoxes?: BoundingBox[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  confidence: number;
}

// 3D/AR Types
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

export interface Scale3D {
  x: number;
  y: number;
  z: number;
}

export interface Object3D {
  id: string;
  name: string;
  position: Position3D;
  rotation: Rotation3D;
  scale: Scale3D;
  model?: string;
  texture?: string;
  warrantyId?: string;
}

export interface Room3D {
  id: string;
  name: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  objects: Object3D[];
  environment?: string;
}

// Navigation Types
export interface NavigationItem {
  href: string;
  label: string;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  neon: {
    blue: string;
    purple: string;
    green: string;
    pink: string;
    yellow: string;
  };
}

// Event Types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// React Component Types
export type ComponentWithChildren<P = {}> = React.FC<P & { children: React.ReactNode }>;
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;
