# Invoice Approval App

A highly accessible, keyboard-first React application for a compliance-sensitive finance workflow. Built to address specific UX problems like action density, compliance anxiety, spatial disorientation, and concurrency conflicts.

## Architecture & Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** React Hooks (`useState`, `useCallback`, Context API for A11y)
- **Styling:** Plain CSS with CSS Variables (ensuring no color-only meaning)
- **Testing:** Vitest + React Testing Library

## File Tree

```text
src/
├── types/
│   └── invoice.ts           # Strict type definitions
├── data/
│   └── mockInvoices.ts      # Initial mock data
├── hooks/
│   ├── useInvoices.ts       # Business logic & conflict simulation
│   └── useFocusReturn.ts    # Utility for returning focus after modal close
├── components/
│   ├── A11yAnnouncer.tsx    # Global aria-live region
│   ├── ConfirmationDialog.tsx # Accessible modal trap
│   ├── InvoiceTable.tsx     # Main table container
│   ├── InvoiceRow.tsx       # Individual row with isolated state
│   └── StatusBadge.tsx      # Visual status indicator
├── App.tsx                  # Root assembly
├── App.test.tsx             # Integration tests
├── index.css                # Global styles
└── main.tsx                 # Entry point
```

## Keyboard Map & Accessibility

- **`Tab` / `Shift+Tab`:** Navigate through interactive elements. The table structure uses semantic `<th>` and `<td>` for screen reader parsing.
- **`Enter` / `Space`:** Trigger actions (Approve, Reject, Refresh, Confirm, Cancel).
- **`Escape`:** Close the confirmation dialog and return focus to the trigger button.
- **Focus Trap:** When the confirmation dialog is open, focus is trapped within the dialog to prevent users from interacting with the background table.
- **Focus Return:** Upon closing the dialog (via action or cancellation), focus is explicitly returned to the button that triggered it, solving spatial disorientation.
- **Screen Reader Context:** Action buttons use `aria-label` (e.g., "Approve Invoice INV-1024 from Acme Corp") to provide context without visual clutter.
- **Live Announcements:** An `aria-live="polite"` region announces state changes (e.g., "Invoice INV-1024 approved" or "Error: Invoice INV-1024 was modified by another user").

## Error & Concurrency Handling

- **Simulated API:** The `useInvoices` hook simulates network latency and concurrency conflicts.
- **Conflict Detection:** Approving or rejecting `INV-1026` will deterministically throw a simulated `409 Conflict` error, mimicking a stale state where another user modified the row.
- **Recovery Path:** When a conflict occurs, the row enters an error state, displaying a clear inline message ("Modified by another user. Please refresh.") and providing a "Refresh Row" action to recover.
- **Duplicate Prevention:** While an action is processing, the row's buttons are disabled (`disabled` and `aria-disabled="true"`), and the status temporarily changes to "Processing".

## Requirement Traceability

| UX Problem / AC | Implementation Feature |
| :--- | :--- |
| Action Density / Cognitive Load | Clear visual hierarchy, semantic table, distinct primary/secondary buttons. |
| Compliance Anxiety | `ConfirmationDialog` before committing Approve/Reject. |
| Spatial Disorientation | Explicit focus return via `useFocusReturn` ref tracking. |
| Keyboard/Screen Reader Context | `aria-label` on actions including Invoice ID and Vendor. |
| Concurrent Modification | `409 Conflict` simulation, inline error messaging, "Refresh" recovery action. |
| Testability | `data-testid` on all interactive elements and state containers. |

## Run Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Run Tests:**
   ```bash
   npm run test
   ```
