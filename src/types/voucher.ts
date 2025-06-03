
export interface Voucher {
  id: string;
  title: string;
  description: string;
  pointCost: number;
  terms: string;
  category: 'food' | 'drink' | 'market' | 'specialty';
  validityDays: number;
}

export interface ClaimedVoucher {
  id: string;
  voucherId: string;
  claimedAt: string;
  expiresAt: string;
  code: string;
  voucher: Voucher;
}
