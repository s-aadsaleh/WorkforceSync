import MainHeaderFrame from "@/components/main-header-frame"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePunchIn } from '../../components/punch-in';
import PunchInButton from '../../components/punch-in-button';
import ElapsedTimeDisplay from '../../components/elapsed-time';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TimerIcon } from "lucide-react";


export default function DashPage() {
    
  //Navigation 
    const navigate = useNavigate();
    useEffect(() => {
      if (
        localStorage.getItem('cookieFallback') === '[]' ||
        localStorage.getItem('cookieFallback') === null
      ) {
        navigate('/login');
      } else {
        navigate(window.location.pathname);
      }
    }, []);

  //Weekday welcome message
    const [dayOfWeek, setDayOfWeek] = useState('');
    useEffect(() => {
      // Get the current day of the week
      console.log(dayOfWeek);
      const currentDate = new Date();
      const options = 'long'; // Specify 'long' directly as the value for the weekday option
      const currentDayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: options });
      setDayOfWeek(currentDayOfWeek);
    }, []);
  
  //Punch in  
    const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

    return(
        <MainHeaderFrame>
          {/* Row 1 */}
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 justify-between">
                {/* <p style={{ fontSize: '31px', whiteSpace: 'pre-line' }}>
                  Welcome <strong>*user*</strong>,{'\n'}
                  Have a great {dayOfWeek}!
                </p> */}
                <div className="grid auto-rows-max items-start gap-4 ">
                  <Card className="flex flex-col">
                    <CardHeader className="pb-2 flex  justify-between">
                      <CardDescription className="flex gap-3">
                        <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
                      </CardDescription>
                      <CardTitle className="text-4xl py-2 flex justify-between ">
                        <ElapsedTimeDisplay elapsedTime={timeElapsed} />
                        <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
            <div>
              hello
            </div>
        </MainHeaderFrame>
    )
  }
