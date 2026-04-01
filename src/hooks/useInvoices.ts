import { useState, useCallback } from 'react';
import { Invoice, InvoiceStatus } from '../types/invoice';
import { mockInvoices } from '../data/mockInvoices';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

  const updateInvoiceStatus = useCallback(
    async (id: string, newStatus: InvoiceStatus): Promise<void> => {
      // Optimistic update to processing
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === id ? { ...inv, status: 'Processing', errorMsg: undefined } : inv
        )
      );

      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulate conflict for testing (INV-1026 always fails)
      if (id === 'INV-1026' && newStatus !== 'Pending') {
        setInvoices((prev) =>
          prev.map((inv) =>
            inv.id === id
              ? {
                  ...inv,
                  status: 'Error',
                  errorMsg: 'Modified by another user. Please refresh.',
                }
              : inv
          )
        );
        throw new Error('Conflict');
      }

      // Success
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === id ? { ...inv, status: newStatus, errorMsg: undefined } : inv
        )
      );
    },
    []
  );

  const refreshInvoice = useCallback(async (id: string) => {
    // Simulate fetching fresh data
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'Pending', errorMsg: undefined } : inv
      )
    );
  }, []);

  return { invoices, updateInvoiceStatus, refreshInvoice };
};
