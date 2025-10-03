export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export interface PortfolioItem {
  id: string;
  amount: number;
  buyPrice: number;
}

export interface AlertRule {
  id: string;
  coinId: string;
  targetPrice: number;
  direction: 'above' | 'below';
  active: boolean;
}
