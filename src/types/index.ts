export interface User {
  id: string;
  email: string;
  subscription_tier: 'free' | 'amethyst' | 'sapphire' | 'emerald' | 'ruby';
  created_at: string;
  updated_at: string;
}

export interface PricingTier {
  name: string;
  price: string | number;
  period: 'month' | 'year';
  description: string;
  features: string[];
  color: string;
  discount?: number;
  popular?: boolean;
}

export interface NavItem {
  name: string;
  href: string;
  children?: {
    name: string;
    description: string;
    href: string;
    icon: string;
  }[];
}
