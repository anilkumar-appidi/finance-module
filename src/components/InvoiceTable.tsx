import React, { useState } from 'react';
import { useInvoices } from '../hooks/useInvoices';
import { InvoiceRow } from './InvoiceRow';
import { ConfirmationDialog } from './ConfirmationDialog';
import { useA11y } from './A11yAnnouncer';
import { InvoiceStatus } from '../types/invoice';
import { useFocusReturn } from '../hooks/useFocusReturn';

export const InvoiceTable: React.FC = () => {
  const { invoices, updateInvoiceStatus, refreshInvoice } = useInvoices();
  const { announce } = useA11y();
  const { setTrigger, returnFocus } = useFocusReturn();

  const [activeConfirm, setActiveConfirm] = useState<{
    invoiceId: string;
    action: InvoiceStatus;
  } | null>(null);

  const handleActionRequest = (id: string, action: InvoiceStatus, triggerRef: HTMLElement) => {
    setTrigger(triggerRef);
    setActiveConfirm({ invoiceId: id, action });
  };

  const handleConfirm = async () => {
    if (!activeConfirm) return;
    
    const { invoiceId, action } = activeConfirm;

    setActiveConfirm(null);
    returnFocus();

    try {
      await updateInvoiceStatus(invoiceId, action);
      announce(`Invoice ${invoiceId} ${action.toLowerCase()}`);
    } catch (error) {
      announce(`Error: Invoice ${invoiceId} was modified by another user.`);
    }
  };

  const handleCancel = () => {
    setActiveConfirm(null);
    returnFocus();
  };

  const handleRefresh = (id: string) => {
    refreshInvoice(id);
    announce(`Invoice ${id} refreshed`);
  };

  return (
    <div>
      <table role="table" aria-label="Invoices pending approval">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Vendor</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              onAction={handleActionRequest}
              onRefresh={handleRefresh}
            />
          ))}
        </tbody>
      </table>

      <ConfirmationDialog
        isOpen={!!activeConfirm}
        title={`Confirm ${activeConfirm?.action}`}
        message={`Are you sure you want to ${activeConfirm?.action?.toLowerCase()} invoice ${activeConfirm?.invoiceId}?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmLabel={activeConfirm?.action === 'Approved' ? 'Approve' : 'Reject'}
      />
    </div>
  );
};
