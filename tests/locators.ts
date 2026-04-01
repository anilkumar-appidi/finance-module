import { Page } from '@playwright/test';

export const getInvoiceLocators = (page: Page) => ({
  // Table
  invoiceTable: page.getByRole('table', { name: 'Invoices pending approval' }),
  
  // Row Actions
  approveButton: (invoiceId: string) => page.getByTestId(`invoice-approve-${invoiceId}`),
  rejectButton: (invoiceId: string) => page.getByTestId(`invoice-reject-${invoiceId}`),
  refreshButton: (invoiceId: string) => page.getByTestId(`invoice-refresh-${invoiceId}`),
  
  // Confirmation Dialog
  confirmationDialog: page.getByRole('dialog'),
  dialogConfirmButton: page.getByTestId('invoice-dialog-confirm'),
  dialogCancelButton: page.getByRole('button', { name: 'Cancel' }),
  // Alternative for cancel using test-id if preferred:
  // dialogCancelButton: page.getByTestId('invoice-dialog-cancel'),
});
