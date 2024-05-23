import React from 'react';
import { Button } from './ui/button';

interface PunchInButtonProps {
  isPunchedIn: boolean;
  onPunchIn: () => void;
}

                        {/* <Button variant="ghost" size="icon" onClick={fetchTasks}>
                            Next
                        </Button> */}

const PunchInButton: React.FC<PunchInButtonProps> = ({ isPunchedIn, onPunchIn }) => {
  return (

      <Button onClick={onPunchIn}> Punch {isPunchedIn ? 'Out' : 'In'}</Button>

  );
};

export default PunchInButton;
