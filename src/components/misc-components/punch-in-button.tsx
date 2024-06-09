import React from 'react';
import { Button } from '../ui/button';

interface PunchInButtonProps {
  isPunchedIn: boolean;
  onPunchIn: () => void;
}

                        {/* <Button variant="ghost" size="icon" onClick={fetchTasks}>
                            Next
                        </Button> */}

const PunchInButton: React.FC<PunchInButtonProps> = ({ isPunchedIn, onPunchIn }) => {
  return (
      <div className="flex justify-between pl-5">
        <Button className="p-4"onClick={onPunchIn}> Punch {isPunchedIn ? 'Out' : 'In'}</Button>
      </div>

  );
};

export default PunchInButton;
