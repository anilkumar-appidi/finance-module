import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

describe('Invoice Approval App', () => {
  it('renders the invoice table with initial data', () => {
    render(<App />);
    expect(screen.getByText('Invoice Approvals')).toBeInDocument();
    expect(screen.getByTestId('row-INV-1024')).toBeInDocument();
    expect(screen.getByTestId('approve-INV-1024')).toBeInDocument();
  });

  it('handles the approval flow with confirmation and focus return', async () => {
    render(<App />);
    
    const approveBtn = screen.getByTestId('approve-INV-1024');
    approveBtn.focus();
    fireEvent.click(approveBtn);

    // Confirmation dialog should appear
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInDocument();
    expect(screen.getByText('Confirm Approved')).toBeInDocument();

    // Confirm the action
    const confirmBtn = screen.getByTestId('dialog-confirm');
    fireEvent.click(confirmBtn);

    // Dialog should close
    expect(screen.queryByRole('dialog')).not.toBeInDocument();

    // Focus should return to the trigger button
    expect(document.activeElement).toBe(approveBtn);

    // Status should change to Processing temporarily
    expect(screen.getByTestId('status-processing')).toBeInDocument();
    expect(approveBtn).toBeDisabled();

    // Wait for success state
    await waitFor(() => {
      const statusBadge = screen.getByTestId('status-approved');
      expect(statusBadge).toBeInDocument();
    }, { timeout: 1500 });
  });

  it('handles conflict errors and recovery', async () => {
    render(<App />);
    
    // INV-1026 is mocked to always fail
    const approveBtn = screen.getByTestId('approve-INV-1026');
    fireEvent.click(approveBtn);

    const confirmBtn = screen.getByTestId('dialog-confirm');
    fireEvent.click(confirmBtn);

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText('Modified by another user. Please refresh.')).toBeInDocument();
    }, { timeout: 1500 });

    // Refresh button should appear
    const refreshBtn = screen.getByTestId('refresh-INV-1026');
    expect(refreshBtn).toBeInDocument();

    // Click refresh to recover
    fireEvent.click(refreshBtn);

    // Should return to Pending
    await waitFor(() => {
      expect(screen.getByTestId('approve-INV-1026')).toBeInDocument();
      expect(screen.queryByText('Modified by another user. Please refresh.')).not.toBeInDocument();
    });
  });
});
