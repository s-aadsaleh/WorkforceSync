import MainHeaderFrame from "@/components/main-header-frame"

import { usePunchIn } from '../../components/punch-in';
import PunchInButton from '../../components/punch-in-button';
import ElapsedTimeDisplay from '../../components/elapsed-time';

export default function SettPage() {
    
  //Punch in  
  const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

    return(
        <MainHeaderFrame>
            <div>
                <h1>This is your page content</h1>
                <p>You can add any content you want here.</p>
            </div>
            <div>
            <h1>Your Page</h1>
      <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
      <p>{isPunchedIn ? 'You are punched in' : 'You are punched out'}</p>
      <ElapsedTimeDisplay elapsedTime={timeElapsed} />
            </div>
        </MainHeaderFrame>

    )
  }


