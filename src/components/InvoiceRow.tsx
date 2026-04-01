import React from 'react';
import { Invoice, InvoiceStatus } from '../types/invoice';
import { StatusBadge } from './StatusBadge';

interface InvoiceRowProps {
  invoice: Invoice;
  onAction: (id: string, action: InvoiceStatus, triggerRef: HTMLElement) => void;
  onRefresh: (id: string) => void;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, onAction, onRefresh }) => {
  const isProcessing = invoice.status === 'Processing';
  const isError = invoice.status === 'Error';
  const isTerminal = invoice.status === 'Approved' || invoice.status === 'Rejected';

  const handleApprove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onAction(invoice.id, 'Approved', e.currentTarget);
  };

  const handleReject = (e: React.MouseEvent<HTMLButtonElement>) => {
    onAction(invoice.id, 'Rejected', e.currentTarget);
  };

  const handleRefresh = () => {
    onRefresh(invoice.id);
    // Focus will stay on refresh button or move to next logical place if it disappears
    // In a full implementation, we might want to manage focus back to the approve button
  };

  return (
    <tr data-testid={`invoice-row-${invoice.id}`}>
      <td>{invoice.id}</td>
      <td>{invoice.vendor}</td>
      <td>${invoice.amount.toFixed(2)}</td>
      <td>{invoice.date}</td>
      <td>
        <StatusBadge status={invoice.status} />
      </td>
      <td>
        <div className="actions">
          {isError ? (
            <div className="error-state">
              <span className="error-message" role="alert">
                {invoice.errorMsg}
              </span>
              <button
                onClick={handleRefresh}
                className="btn-refresh"
                aria-label={`Refresh Invoice ${invoice.id} from ${invoice.vendor}`}
                data-testid={`invoice-refresh-${invoice.id}`}
              >
                Refresh Row
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleApprove}
                className="btn-approve"
                disabled={isProcessing || isTerminal}
                aria-disabled={isProcessing || isTerminal}
                aria-label={`Approve Invoice ${invoice.id} from ${invoice.vendor}`}
                data-testid={`invoice-approve-${invoice.id}`}
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="btn-reject"
                disabled={isProcessing || isTerminal}
                aria-disabled={isProcessing || isTerminal}
                aria-label={`Reject Invoice ${invoice.id} from ${invoice.vendor}`}
                data-testid={`invoice-reject-${invoice.id}`}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
