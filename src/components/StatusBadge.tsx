import React from 'react';
import { InvoiceStatus } from '../types/invoice';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getBadgeClass = () => {
    switch (status) {
      case 'Pending': return 'badge-pending';
      case 'Processing': return 'badge-processing';
      case 'Approved': return 'badge-approved';
      case 'Rejected': return 'badge-rejected';
      case 'Error': return 'badge-error';
      default: return 'badge-pending';
    }
  };

  return (
    <span className={`badge ${getBadgeClass()}`} data-testid={`status-${status.toLowerCase()}`}>
      <span className="visually-hidden">Status: </span>
      {status}
    </span>
  );
};
