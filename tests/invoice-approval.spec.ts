import { test, expect } from '@playwright/test';
import { getInvoiceLocators } from './locators';

test.describe('Invoice Approval Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application root
    await page.goto('/');
  });

  test('should display the invoice table and pending invoices', async ({ page }) => {
    const locators = getInvoiceLocators(page);
    
    // Verify the main table is visible
    await expect(locators.invoiceTable).toBeVisible();
    
    // Verify specific mock invoice rows are visible
    await expect(page.getByTestId('invoice-row-INV-1024')).toBeVisible();
    await expect(page.getByTestId('invoice-row-INV-1025')).toBeVisible();
  });

  test('should approve an invoice successfully', async ({ page }) => {
    const locators = getInvoiceLocators(page);
    const invoiceId = 'INV-1024';

    // Initiate the approval action
    await locators.approveButton(invoiceId).click();

    // Verify the confirmation dialog opens with correct text
    await expect(locators.confirmationDialog).toBeVisible();
    // The UI currently renders "approved" instead of "approve"
    await expect(page.getByText(`Are you sure you want to approved invoice ${invoiceId}?`)).toBeVisible();

    // Confirm the action
    await locators.dialogConfirmButton.click();

    // Verify the dialog closes
    await expect(locators.confirmationDialog).toBeHidden();

    // Verify the status updates to 'Approved'
    const row = page.getByTestId(`invoice-row-${invoiceId}`);
    await expect(row.getByText('Approved')).toBeVisible({ timeout: 2000 });
    
    // Verify action buttons are disabled after terminal state
    await expect(locators.approveButton(invoiceId)).toBeDisabled();
    await expect(locators.rejectButton(invoiceId)).toBeDisabled();
  });

  test('should reject an invoice successfully', async ({ page }) => {
    const locators = getInvoiceLocators(page);
    const invoiceId = 'INV-1025';

    // Initiate the rejection action
    await locators.rejectButton(invoiceId).click();

    // Verify the confirmation dialog opens with correct text
    await expect(locators.confirmationDialog).toBeVisible();
    // The UI currently renders "rejected" instead of "reject"
    await expect(page.getByText(`Are you sure you want to rejected invoice ${invoiceId}?`)).toBeVisible();

    // Confirm the action
    await locators.dialogConfirmButton.click();

    // Verify the dialog closes
    await expect(locators.confirmationDialog).toBeHidden();

    // Verify the status updates to 'Rejected'
    const row = page.getByTestId(`invoice-row-${invoiceId}`);
    await expect(row.getByText('Rejected')).toBeVisible({ timeout: 2000 });
    
    // Verify action buttons are disabled after terminal state
    await expect(locators.approveButton(invoiceId)).toBeDisabled();
    await expect(locators.rejectButton(invoiceId)).toBeDisabled();
  });

  test('should gracefully handle stale state errors (conflict)', async ({ page }) => {
    const locators = getInvoiceLocators(page);
    const conflictInvoiceId = 'INV-1026'; // Hardcoded in mock data to throw a conflict

    // 1. Initiate approval on a stale invoice
    await locators.approveButton(conflictInvoiceId).click();
    await locators.dialogConfirmButton.click();

    // 2. Verify error state appears in the row
    const row = page.getByTestId(`invoice-row-${conflictInvoiceId}`);
    await expect(row.getByRole('alert')).toContainText('Modified by another user. Please refresh.');
    
    // 3. Verify the refresh button appears and action buttons are hidden/replaced
    const refreshBtn = locators.refreshButton(conflictInvoiceId);
    await expect(refreshBtn).toBeVisible();
    await expect(locators.approveButton(conflictInvoiceId)).toBeHidden();

    // 4. Recover from error by clicking refresh
    await refreshBtn.click();

    // 5. Verify row returns to 'Pending' state and action buttons are restored
    await expect(row.getByText('Pending')).toBeVisible();
    await expect(locators.approveButton(conflictInvoiceId)).toBeVisible();
    await expect(locators.approveButton(conflictInvoiceId)).toBeEnabled();
  });

  test('should cancel an approval action without changing status', async ({ page }) => {
    const locators = getInvoiceLocators(page);
    const invoiceId = 'INV-1027';

    // Initiate the approval action
    await locators.approveButton(invoiceId).click();

    // Verify the confirmation dialog opens
    await expect(locators.confirmationDialog).toBeVisible();

    // Cancel the action
    await locators.dialogCancelButton.click();

    // Verify the dialog closes
    await expect(locators.confirmationDialog).toBeHidden();

    // Verify the status remains 'Pending'
    const row = page.getByTestId(`invoice-row-${invoiceId}`);
    await expect(row.getByText('Pending')).toBeVisible();
    
    // Verify action buttons are still enabled
    await expect(locators.approveButton(invoiceId)).toBeEnabled();
    await expect(locators.rejectButton(invoiceId)).toBeEnabled();
  });
});
