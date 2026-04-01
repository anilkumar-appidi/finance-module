import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Invoice Approval App', () => {
  it('renders the invoice table with initial data', () => {
    render(<App />);
    expect(screen.getByText('Invoice Approvals')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-row-INV-1024')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-approve-INV-1024')).toBeInTheDocument();
  });

  it('handles the approval flow with confirmation and focus return', async () => {
    render(<App />);
    
    const approveBtn = screen.getByTestId('invoice-approve-INV-1024');
    approveBtn.focus();
    fireEvent.click(approveBtn);

    // Confirmation dialog should appear
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Confirm Approved')).toBeInTheDocument();

    // Confirm the action
    const confirmBtn = screen.getByTestId('invoice-dialog-confirm');
    fireEvent.click(confirmBtn);

    // Dialog should close
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Focus should return to the trigger button
    expect(document.activeElement).toBe(approveBtn);

    // Status should change to Processing temporarily
    expect(screen.getByTestId('status-processing')).toBeInTheDocument();
    expect(approveBtn).toBeDisabled();

    // Wait for success state
    await waitFor(() => {
      const statusBadge = screen.getByTestId('status-approved');
      expect(statusBadge).toBeInTheDocument();
    }, { timeout: 1500 });
  });

  it('handles conflict errors and recovery', async () => {
    render(<App />);
    
    // INV-1026 is mocked to always fail
    const approveBtn = screen.getByTestId('invoice-approve-INV-1026');
    fireEvent.click(approveBtn);

    const confirmBtn = screen.getByTestId('invoice-dialog-confirm');
    fireEvent.click(confirmBtn);

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText('Modified by another user. Please refresh.')).toBeInTheDocument();
    }, { timeout: 1500 });

    // Refresh button should appear
    const refreshBtn = screen.getByTestId('invoice-refresh-INV-1026');
    expect(refreshBtn).toBeInTheDocument();

    // Click refresh to recover
    fireEvent.click(refreshBtn);

    // Should return to Pending
    await waitFor(() => {
      expect(screen.getByTestId('invoice-approve-INV-1026')).toBeInTheDocument();
      expect(screen.queryByText('Modified by another user. Please refresh.')).not.toBeInTheDocument();
    });
  });
});
