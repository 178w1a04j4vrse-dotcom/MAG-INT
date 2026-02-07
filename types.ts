
export interface Material {
  id: string;
  name: string;
  length: number;
  width: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderId: string;
  clientName: string;
  materials: Material[];
  createdAt: string;
}

export interface PricingItem {
  id: string;
  materialName: string;
  length: number;
  width: number;
  quantity: number;
  price: number;
}

export interface BOMReportItem extends Material {
  unitPrice: number;
  totalRowPrice: number;
}

export interface BOMReport {
  orderId: string;
  clientName: string;
  items: BOMReportItem[];
  totalPrice: number;
}

export enum AppTab {
  ORDERS = 'orders',
  PRICING = 'pricing',
  BOM = 'bom',
  VIEW_ORDER = 'view_order'
}
