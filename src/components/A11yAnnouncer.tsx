import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface A11yContextType {
  announce: (message: string) => void;
}

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export const useA11y = () => {
  const context = useContext(A11yContext);
  if (!context) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
};

export const A11yProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');

  const announce = useCallback((newMessage: string) => {
    setMessage(newMessage);
    // Clear message after a short delay so the same message can be announced again if needed
    setTimeout(() => setMessage(''), 1000);
  }, []);

  return (
    <A11yContext.Provider value={{ announce }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
        data-testid="a11y-announcer"
      >
        {message}
      </div>
    </A11yContext.Provider>
  );
};
