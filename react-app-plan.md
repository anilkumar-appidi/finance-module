# React Invoice Approval App Implementation Plan

Based on the UX problem statement and acceptance criteria, we will build a React + TypeScript application that prioritizes keyboard navigation, accessibility, and robust error handling for compliance-sensitive workflows.

## Architecture & Tech Stack
- **Framework:** React 18 + TypeScript (Functional Components, Strict Mode).
- **State Management:** React Hooks (`useState`, `useReducer` for complex row state, `useContext` for global announcements).
- **Styling:** CSS Modules or plain CSS with CSS Variables (ensuring no color-only meaning).
- **Testing:** React Testing Library + Jest/Vitest (using `data-testid` for deterministic selectors).

## File Tree
```text
src/
├── types/
│   └── invoice.ts           # Strict type definitions for Invoice, Status, Errors
├── data/
│   └── mockInvoices.ts      # Initial mock data
├── hooks/
│   ├── useInvoices.ts       # Business logic, optimistic updates, conflict simulation
│   └── useFocusReturn.ts    # Utility for returning focus after modal close
├── components/
│   ├── A11yAnnouncer.tsx    # Global aria-live region for screen reader announcements
│   ├── ConfirmationDialog.tsx # Accessible modal trap for compliance confirmation
│   ├── InvoiceTable.tsx     # Main table container
│   ├── InvoiceRow.tsx       # Individual row with isolated state and actions
│   └── StatusBadge.tsx      # Visual status indicator with accessible text
├── App.tsx                  # Root assembly
└── App.test.tsx             # Integration tests covering the ACs
```

## Keyboard & A11y Mapping
- **Navigation:** Standard `Tab`/`Shift+Tab` through interactive elements. The table will use semantic `<th>` and `<td>`.
- **Action Labels:** Buttons will have `aria-label` like "Approve Invoice INV-1024 from Vendor X" to provide context without visual clutter.
- **Focus Management:** When a confirmation dialog opens, focus is trapped. When it closes (via action or `Escape`), focus is explicitly returned to the button that triggered it. If the row disappears (e.g., filtered out), focus moves to the next logical row.
- **Live Announcements:** An visually hidden `aria-live="polite"` region will announce "Invoice INV-1024 approved" or "Error: Invoice INV-1024 was modified by another user."

## Error & Concurrency Handling
- **Simulated API:** The `useInvoices` hook will simulate network latency. It will randomly (or deterministically via a specific ID) throw a `409 Conflict` to simulate a stale state (e.g., another user already approved it).
- **Recovery:** When a conflict occurs, the row enters an error state. The user is presented with a clear message ("Modified by another user") and a "Refresh Row" action.
- **Duplicate Prevention:** While in the `Processing` state, row action buttons are `disabled` and `aria-disabled="true"`.

## Requirement Traceability
| UX Problem / AC | Implementation Feature |
| :--- | :--- |
| Action Density / Cognitive Load | Clear visual hierarchy, semantic table, distinct primary/secondary buttons. |
| Compliance Anxiety | `ConfirmationDialog` before committing Approve/Reject. |
| Spatial Disorientation | Explicit focus return via `useFocusReturn` ref tracking. |
| Keyboard/Screen Reader Context | `aria-label` on actions including Invoice ID and Vendor. |
| Concurrent Modification | `409 Conflict` simulation, inline error messaging, "Refresh" recovery action. |
| Testability | `data-testid` on all interactive elements and state containers. |