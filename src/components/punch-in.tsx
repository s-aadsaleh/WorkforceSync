import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PunchInContextType {
  isPunchedIn: boolean;
  togglePunchIn: () => void;
  timeElapsed: number;
}

const PunchInContext = createContext<PunchInContextType | undefined>(undefined);

export const usePunchIn = () => {
  const context = useContext(PunchInContext);
  if (!context) {
    throw new Error('usePunchIn must be used within a PunchInProvider');
  }
  return context;
};

interface PunchInProviderProps {
  children: ReactNode;
}

export const PunchInProvider: React.FC<PunchInProviderProps> = ({ children }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(() => {
    return parseInt(localStorage.getItem('elapsedTime') || '0', 10);
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPunchedIn) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => {
          const newTime = prevTime + 1;
          localStorage.setItem('elapsedTime', newTime.toString());
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPunchedIn]);

  const togglePunchIn = () => {
    setIsPunchedIn(prev => !prev);
  };

  return (
    <PunchInContext.Provider value={{ isPunchedIn, togglePunchIn, timeElapsed }}>
      {children}
    </PunchInContext.Provider>
  );
};
