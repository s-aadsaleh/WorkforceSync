import React from 'react';

interface PunchInButtonProps {
  isPunchedIn: boolean;
  onPunchIn: () => void;
}

const PunchInButton: React.FC<PunchInButtonProps> = ({ isPunchedIn, onPunchIn }) => {
  return (
    <div>
      <button onClick={onPunchIn}> Punch {isPunchedIn ? 'Out' : 'In'}</button>
    </div>
  );
};

export default PunchInButton;
