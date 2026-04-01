import { Invoice } from '../types/invoice';

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-1024',
    vendor: 'Acme Corp',
    amount: 1500.0,
    date: '2026-03-28',
    status: 'Pending',
  },
  {
    id: 'INV-1025',
    vendor: 'Global Tech',
    amount: 3200.5,
    date: '2026-03-29',
    status: 'Pending',
  },
  {
    id: 'INV-1026',
    vendor: 'Stale State Inc', // We will use this to simulate a conflict
    amount: 450.0,
    date: '2026-03-30',
    status: 'Pending',
  },
  {
    id: 'INV-1027',
    vendor: 'Office Supplies Co',
    amount: 125.75,
    date: '2026-03-31',
    status: 'Pending',
  },
];
