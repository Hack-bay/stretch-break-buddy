
import { Voucher } from '../types/voucher';

export const availableVouchers: Voucher[] = [
  {
    id: 'kaffee-kuchen',
    title: 'Kaffee & Kuchen Genuss',
    description: '20% Rabatt auf eine Tasse Kaffee und ein Stück Kuchen in einem teilnehmenden Nürnberger Café.',
    pointCost: 150,
    terms: 'Gültig für 30 Tage nach Einlösung, nur bei teilnehmenden Partnern',
    category: 'food',
    validityDays: 30
  },
  {
    id: 'markt-gutschein',
    title: 'Frische vom Markt',
    description: '5€ Gutschein für deinen Einkauf ab 20€ auf dem Nürnberger Hauptmarkt (bei teilnehmenden Ständen).',
    pointCost: 200,
    terms: 'Gültig für 30 Tage nach Einlösung, nur bei teilnehmenden Ständen, Mindesteinkauf 20€',
    category: 'market',
    validityDays: 30
  },
  {
    id: 'drei-im-weckla',
    title: 'Nürnberger Spezialität',
    description: 'Eine kostenlose Portion "3 im Weckla" (Nürnberger Rostbratwürstchen im Brötchen) bei einem lokalen Imbiss.',
    pointCost: 120,
    terms: 'Gültig für 30 Tage nach Einlösung, nur bei teilnehmenden Partnern',
    category: 'specialty',
    validityDays: 30
  },
  {
    id: 'braukunst-rabatt',
    title: 'Lokale Braukunst',
    description: '10% Rabatt auf ein Getränk in einer traditionellen Nürnberger Hausbrauerei oder einem Biergarten.',
    pointCost: 100,
    terms: 'Gültig für 30 Tage nach Einlösung, nur bei teilnehmenden Partnern',
    category: 'drink',
    validityDays: 30
  }
];
