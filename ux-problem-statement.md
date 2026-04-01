# UX Problem Analysis: Invoice Approval Workflow

## 1. Cognitive Load from Action Density
A table is a scanning interface, not a decision interface. When every row carries multiple consequential actions (view, approve, reject), users face repeated micro-decisions across a high-density surface. The problem is not "where is the button" — it is that the table format forces users to re-establish context for each row before they can act with confidence. This compounds fatigue across large invoice volumes.

## 2. Compliance Anxiety and Action Irreversibility
Finance approvals are not equal to generic confirmations. Users likely carry a mental burden about the downstream consequences of each action — chargebacks, audit trails, vendor relationships, budget impacts. The UX problem here is that the interface may not reflect the **weight of the decision**, leaving users uncertain about whether their action is final, reversible, or escalatable. This creates hesitation that no button style can fix.

## 3. Spatial Disorientation After State Changes
When a user approves or rejects a row and the status updates in real-time, their visual and keyboard focus context is disrupted. The problem is not "how to animate the status chip" — it is that users lose their **place in a workflow**. After acting on row 7, do they know where to go next? Has the table reordered? Has the row disappeared? This is especially acute for keyboard-only users.

## 4. Focus Management Complexity for Keyboard and Assistive Technology Users
Multiple interactive elements per row create an exponentially large tab stop surface. A keyboard user navigating a 50-row table with 3 actions per row faces 150+ tab stops before reaching anything else on the page. The underlying problem is that **the linear nature of keyboard navigation conflicts with the two-dimensional structure of a data table**. Screen reader users face an additional problem: action labels like "Approve" repeated across every row are indistinguishable without rich context, making it impossible to confirm which invoice is being acted upon.

## 5. Concurrent Modification and Stale State
Finance workflows often involve multiple approvers. A user may be reviewing invoice #1042 while a colleague approves it simultaneously. The UX problem is the absence of a shared mental model around **who else is acting, and whether the current state is trustworthy**. Real-time status feedback solves the symptom, not the problem — users need to understand *why* a status changed, not just *that* it changed.

## 6. Context Collapse Inside the Table
Tables compress information. To make a compliant approval decision, a user likely needs details that cannot fit in a row — line items, attached documents, payment terms, vendor history. The problem is a **forced context switch**: users must navigate away to gather enough information to act, then return to the table. Every context switch risks lost position, lost state, and decision fatigue. The workflow is fragmented by the interface structure itself.

## 7. Tension Between Efficiency and Compliance Safeguards
Experienced users processing high volumes of invoices need speed. Compliance requires deliberate, auditable actions. These two needs are in fundamental conflict. The UX problem is not "should we add a confirmation dialog" — it is that the interface has no mechanism to **adapt its interaction model to the user's role, volume, or risk tolerance**. A single interaction pattern cannot serve both a junior reviewer processing 5 invoices and a finance manager bulk-processing 200.

## 8. Error Recovery Path is Undefined
What happens when a user rejects the wrong invoice? In a compliance-sensitive workflow, the consequences of an erroneous action may be significant. The UX problem is that users have no mental model of the **recovery path** — is the action reversible? Who can override it? How quickly? Without clarity here, users slow down on every action as a defensive behavior, which is a systemic efficiency problem.

## 9. Automated Testing Requirements May Conflict with Natural Interaction Design
The requirement to support automated testing can subtly shape interface decisions in ways that harm real users — overly rigid component structures, simplified state models, or reduced interaction richness. The underlying problem is that **testability and usability can pull in opposite directions** if not explicitly reconciled as equal design constraints from the start.

## Summary of Core Tensions

| Tension | Left Force | Right Force |
|---|---|---|
| Speed vs. safety | Efficient bulk processing | Compliance-sensitive deliberation |
| Density vs. clarity | All actions visible at once | Cognitive and visual overload |
| Keyboard linearity vs. 2D tables | Accessible navigation | Complex multi-action rows |
| Real-time feedback vs. trust | Up-to-date status | Confusion over who caused the change |
| Context compression vs. decision quality | Table row brevity | Need for detail before acting |
