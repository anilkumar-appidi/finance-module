# UX Acceptance Criteria: Invoice Approval Workflow

Based on the identified UX problems, here are the UX-focused acceptance criteria for the invoice approval workflow, categorized into Usability, Clarity, and Error Handling.

## 1. Usability & Accessibility (Focus Management & Navigation)

*   **Keyboard Navigation:** Users must be able to navigate the table efficiently without tabbing through every single action on every row (e.g., arrow key navigation for rows, contextual shortcuts).
*   **Screen Reader Context:** Action buttons (Approve/Reject) must announce their specific context to assistive technologies (e.g., "Approve Invoice #1042 from Vendor X").
*   **Focus Retention:** After an action is completed and the row state changes or disappears, keyboard focus must logically shift to the next available row or a predictable anchor point, never dropping to the start of the document.

## 2. Clarity & Context (Cognitive Load & Trust)

*   **Contextual Detail:** Users must be able to access deep context (line items, attachments) without a destructive context switch (e.g., via a slide-out panel or expandable row) that loses their place in the table.
*   **Concurrent State Visibility:** If an invoice's state changes due to another user's action, the UI must clearly indicate *who* made the change and *when*, rather than just silently updating the status chip.
*   **Action Weight:** The visual design and interaction model must clearly differentiate between low-risk actions (View) and high-risk compliance actions (Approve/Reject), adapting to bulk vs. single-item workflows.

## 3. Error Handling & Recovery (Anxiety & Reversibility)

*   **Immediate Recovery:** Users must have a clear, immediate mechanism to undo an accidental approval or rejection (e.g., an "Undo" toast with a timeout, or a grace period before final commit).
*   **Stale State Errors:** If a user attempts to act on an invoice that has just been modified by someone else, the system must gracefully block the action, explain the conflict, and refresh the specific row's state without losing the user's overall table position.
*   **Clear Escalation Paths:** If an action cannot be completed or reversed by the user, the UI must explicitly state the recovery path (e.g., "This action is final. Contact Finance Admin to override").
