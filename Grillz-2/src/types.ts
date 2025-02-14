export interface ToothSelection {
  id: number;
  selected: boolean;
  color: GrillColor;
}

export interface CartItem {
  id: string;
  topTeeth: ToothSelection[];
  bottomTeeth: ToothSelection[];
  totalPrice: number;
}

export type GrillColor = 'silver' | 'gold9k' | 'gold18k';

export const PRICES: Record<GrillColor, number> = {
  silver: 50,
  gold9k: 200,
  gold18k: 400,
};

export const COLOR_NAMES: Record<GrillColor, string> = {
  silver: 'Silver',
  gold9k: '9K Gold',
  gold18k: '18K Gold',
};