import React from 'react';
import { InvoiceTable } from './components/InvoiceTable';
import { A11yProvider } from './components/A11yAnnouncer';

const App: React.FC = () => {
  return (
    <A11yProvider>
      <main>
        <h1>Invoice Approvals</h1>
        <p>Review and approve or reject pending invoices.</p>
        <InvoiceTable />
      </main>
    </A11yProvider>
  );
};

export default App;
