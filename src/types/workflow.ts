// Type definitions for Datatex NOW Workflow Simulation

export type WorkflowStepId = 
  | 'business-partner'
  | 'order-partner'
  | 'open-order'
  | 'order-evolution'
  | 'confirm-order'
  | 'stock-picking';

export type AppMode = 'landing' | 'sandbox' | 'presentation';

export interface WorkflowStep {
  id: WorkflowStepId;
  stepNumber: number;
  title: string;
  subtitle: string;
  code: string; // e.g. "BP", "OP", "120", "EVO", "001", "DOC 09/11"
  description: string;
  presentationScript?: {
    narrative: string;
    focusTargetSelector?: string;
    tips: string[];
  };
}

export interface BusinessPartnerData {
  bpCode: string;
  legalName: string;
  npwp: string;
  fiscalType: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface OrderPartnerData {
  opCode: string;
  bpCode: string;
  customerName: string;
  currency: string;
  orderAllowed: boolean;
  creditLimit: number;
  endCreditDate: string;
  paymentTerm: string;
}

export interface OpenOrderItem {
  design: string;
  chop: string;
  gsm: number;
  finish: string;
  width: number;
  uom: string;
  bookedQty: number;
  compiledItemCode: string;
}

export interface OpenOrderData {
  orderTemplate: '120';
  soNumber: string;
  customerCode: string;
  orderDate: string;
  targetDeliveryDate: string;
  items: OpenOrderItem[];
  status: 'OPEN' | 'PRE.USED' | 'CLOSED';
}

export interface EvolutionLine {
  prevLineId: string;
  itemCode: string;
  originalQty: number;
  evolvedQty: number;
  remainingQty: number;
  shadeCode: string;
  status: 'PRE.USED' | 'CLOSED';
}

export interface OrderEvolutionData {
  template: '001';
  evolutionMode: 'SAME_CUSTOMER' | 'CROSS_CUSTOMER';
  prevSoCode: string;
  newCustomerCode?: string;
  lines: EvolutionLine[];
}

export interface StockPickingData {
  soCode: string;
  warehouseCode: '311WFF01';
  allocatedRolls: number;
  totalYards: number;
  doc09Number: string; // Picking Creator
  doc11Number: string; // Picking Confirmation
  status: 'ALLOCATED' | 'PICKED' | 'CONFIRMED';
}
