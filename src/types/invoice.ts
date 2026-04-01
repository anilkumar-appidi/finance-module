export type InvoiceStatus = 'Pending' | 'Processing' | 'Approved' | 'Rejected' | 'Error';

export interface Invoice {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
  errorMsg?: string;
}

export interface InvoiceAction {
  type: 'APPROVE' | 'REJECT' | 'PROCESSING' | 'ERROR' | 'RESET';
  payload?: {
    id: string;
    errorMsg?: string;
  };
}
