'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Scan, Bell, Eye, Plus, Filter, Search, Calendar, DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ProfessionalBackground from '@/components/effects/ProfessionalBackground';
import { WARRANTY_CATEGORIES } from '@/lib/constants';
import { generateId, getWarrantyStatus, formatTimeRemaining } from '@/lib/utils';

interface DemoWarranty {
  id: string;
  name: string;
  brand: string;
  category: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyExpiry: string;
  purchasePrice: number;
  retailer: string;
  status: 'active' | 'expiring' | 'expired';
  daysLeft: number;
  receiptImage?: string;
  productImage?: string;
}

const initialWarranties: DemoWarranty[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    category: 'Electronics',
    serialNumber: 'C02XK0AAJGH5',
    purchaseDate: '2023-01-15',
    warrantyExpiry: '2024-01-15',
    purchasePrice: 2499,
    retailer: 'Apple Store',
    status: 'expiring',
    daysLeft: 45,
    productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center',
  },
  {
    id: '2',
    name: 'Samsung 4K Smart TV',
    brand: 'Samsung',
    category: 'Electronics',
    serialNumber: 'UN55TU8000FXZA',
    purchaseDate: '2022-11-20',
    warrantyExpiry: '2024-11-20',
    purchasePrice: 899,
    retailer: 'Best Buy',
    status: 'active',
    daysLeft: 320,
    productImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&crop=center',
  },
  {
    id: '3',
    name: 'Whirlpool Refrigerator',
    brand: 'Whirlpool',
    category: 'Appliances',
    serialNumber: 'WRF535SWHZ00',
    purchaseDate: '2021-08-10',
    warrantyExpiry: '2026-08-10',
    purchasePrice: 1299,
    retailer: 'Home Depot',
    status: 'active',
    daysLeft: 890,
    productImage: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop&crop=center',
  },
  {
    id: '4',
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    category: 'Electronics',
    serialNumber: 'F2HN3LL/A',
    purchaseDate: '2022-09-20',
    warrantyExpiry: '2023-09-20',
    purchasePrice: 999,
    retailer: 'Apple Store',
    status: 'expired',
    daysLeft: -30,
    productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center',
  },
  {
    id: '5',
    name: 'Honda Civic',
    brand: 'Honda',
    category: 'Vehicles',
    serialNumber: '19XFC2F59ME000123',
    purchaseDate: '2021-03-15',
    warrantyExpiry: '2024-03-15',
    purchasePrice: 24000,
    retailer: 'Honda Dealership',
    status: 'active',
    daysLeft: 120,
    productImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&crop=center',
  },
  {
    id: '6',
    name: 'DeWalt Drill Set',
    brand: 'DeWalt',
    category: 'Tools',
    serialNumber: 'DCD771C2',
    purchaseDate: '2023-06-01',
    warrantyExpiry: '2026-06-01',
    purchasePrice: 199,
    retailer: 'Lowe\'s',
    status: 'active',
    daysLeft: 520,
    productImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop&crop=center',
  },
];

export default function DemoPage() {
  const router = useRouter();
  const [warranties, setWarranties] = useState<DemoWarranty[]>(initialWarranties);
  const [filteredWarranties, setFilteredWarranties] = useState<DemoWarranty[]>(initialWarranties);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isScanning, setIsScanning] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    let filtered = warranties;

    if (searchTerm) {
      filtered = filtered.filter(warranty =>
        warranty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warranty.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(warranty => warranty.category.toLowerCase() === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(warranty => warranty.status === selectedStatus);
    }

    setFilteredWarranties(filtered);
  }, [warranties, searchTerm, selectedCategory, selectedStatus]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      
      // Simulate AI scanning
      setTimeout(() => {
        const newWarranty: DemoWarranty = {
          id: generateId(),
          name: 'Sony WH-1000XM4 Headphones',
          brand: 'Sony',
          category: 'Electronics',
          serialNumber: 'WH1000XM4/B',
          purchaseDate: '2023-12-01',
          warrantyExpiry: '2024-12-01',
          purchasePrice: 349,
          retailer: 'Amazon',
          status: 'active',
          daysLeft: 365,
          productImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop&crop=center',
        };
        
        setWarranties(prev => [newWarranty, ...prev]);
        setIsScanning(false);
      }, 3000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'expiring':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-400/30 bg-green-400/5';
      case 'expiring':
        return 'border-yellow-400/30 bg-yellow-400/5';
      case 'expired':
        return 'border-red-400/30 bg-red-400/5';
      default:
        return 'border-gray-400/30 bg-gray-400/5';
    }
  };

  const totalValue = warranties.reduce((sum, warranty) => sum + warranty.purchasePrice, 0);
  const activeCount = warranties.filter(w => w.status === 'active').length;
  const expiringCount = warranties.filter(w => w.status === 'expiring').length;
  const expiredCount = warranties.filter(w => w.status === 'expired').length;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <ProfessionalBackground
          variant="tech"
          className="py-16"
        >
          <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Interactive{' '}
                <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                  Demo
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Experience WarrantyAI's powerful features with real warranty data. 
                Upload receipts, track warranties, and see AI in action.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-black/50 border border-neon-blue/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-neon-blue mb-2">{warranties.length}</div>
                <div className="text-white font-semibold">Total Items</div>
                <div className="text-gray-400 text-sm">Tracked warranties</div>
              </div>
              
              <div className="bg-black/50 border border-green-400/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{activeCount}</div>
                <div className="text-white font-semibold">Active</div>
                <div className="text-gray-400 text-sm">Valid warranties</div>
              </div>
              
              <div className="bg-black/50 border border-yellow-400/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{expiringCount}</div>
                <div className="text-white font-semibold">Expiring Soon</div>
                <div className="text-gray-400 text-sm">Need attention</div>
              </div>
              
              <div className="bg-black/50 border border-neon-purple/20 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-neon-purple mb-2">${totalValue.toLocaleString()}</div>
                <div className="text-white font-semibold">Total Value</div>
                <div className="text-gray-400 text-sm">Protected assets</div>
              </div>
            </div>
          </div>
        </section>
        </ProfessionalBackground>

        {/* Main Demo Interface */}
        <ProfessionalBackground
          variant="minimal"
          className="py-12"
        >
          <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Upload Section */}
            <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-neon-blue" />
                Upload Receipt for AI Scanning
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <label className="block w-full">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-neon-blue/50 rounded-xl p-8 text-center cursor-pointer hover:border-neon-blue transition-colors duration-300">
                      {isScanning ? (
                        <div className="space-y-4">
                          <Scan className="w-12 h-12 text-neon-blue mx-auto animate-pulse" />
                          <div className="text-white font-semibold">AI Scanning in Progress...</div>
                          <div className="text-gray-400">Extracting warranty information</div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 text-neon-blue mx-auto" />
                          <div className="text-white font-semibold">Drop receipt here or click to upload</div>
                          <div className="text-gray-400">Supports JPG, PNG, PDF files</div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">What AI Can Extract:</h4>
                  <div className="space-y-3">
                    {[
                      'Product name and model',
                      'Brand and manufacturer',
                      'Purchase date and price',
                      'Serial numbers',
                      'Warranty period',
                      'Retailer information'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-black/50 border border-gray-700 rounded-2xl p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search warranties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {WARRANTY_CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expiring">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            {/* Warranties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWarranties.map((warranty) => (
                <div
                  key={warranty.id}
                  className={`rounded-xl border transition-all duration-300 hover:scale-105 overflow-hidden ${getStatusColor(warranty.status)}`}
                >
                  {/* Product Image */}
                  {warranty.productImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={warranty.productImage}
                        alt={warranty.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{warranty.name}</h4>
                        <p className="text-gray-400 text-sm">{warranty.brand} • {warranty.category}</p>
                      </div>
                      {getStatusIcon(warranty.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Serial:</span>
                        <span className="text-white font-mono">{warranty.serialNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Purchase:</span>
                        <span className="text-white">{warranty.purchaseDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Expires:</span>
                        <span className="text-white">{warranty.warrantyExpiry}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Value:</span>
                        <span className="text-white">${warranty.purchasePrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-600 pt-4">
                      <div className="text-sm">
                        {warranty.status === 'expired' ? (
                          <span className="text-red-400 font-semibold">Expired {Math.abs(warranty.daysLeft)} days ago</span>
                        ) : warranty.status === 'expiring' ? (
                          <span className="text-yellow-400 font-semibold">{warranty.daysLeft} days remaining</span>
                        ) : (
                          <span className="text-green-400 font-semibold">{warranty.daysLeft} days remaining</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredWarranties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">No warranties found matching your criteria</div>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        </ProfessionalBackground>

        {/* CTA Section */}
        <ProfessionalBackground
          variant="elegant"
          className="py-16"
        >
          <section className="py-16 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Manage Your Real Warranties?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              This demo shows just a fraction of WarrantyAI's capabilities. 
              Start your free trial to experience the full power of AI-driven warranty management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => router.push('/sign-up')}>
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push('/pitch-deck')}>
                View Pitch Deck
              </Button>
            </div>
          </div>
        </section>
        </ProfessionalBackground>
      </main>

      <Footer />
    </div>
  );
}
