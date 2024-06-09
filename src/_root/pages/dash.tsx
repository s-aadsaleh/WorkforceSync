// import MainHeaderFrame from "@/components/main-header-frame"
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { usePunchIn } from '../../components/misc-components/punch-in';
// import PunchInButton from '../../components/misc-components/punch-in-button';
// import ElapsedTimeDisplay from '../../components/misc-components/elapsed-time';


// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } frdiv className=""@/components/ui/card"
// import { TimerIcon } from "lucide-react";


// export default function DashPage() {
    

//   //Navigation 
//     const navigate = useNavigate();
//     useEffect(() => {
//       if (
//         localStorage.getItem('cookieFallback') === '[]' ||
//         localStorage.getItem('cookieFallback') === null
//       ) {
//         navigate('/login');
//       } else {
//         navigate(window.location.pathname);
//       }
//     }, []);

//   //Weekday welcome message
//     const [dayOfWeek, setDayOfWeek] = useState('');
//     useEffect(() => {
//       // Get the current day of the week
//       console.log(dayOfWeek);
//       const currentDate = new Date();
//       const options = 'long'; // Specify 'long' directly as the value for the weekday option
//       const currentDayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: options });
//       setDayOfWeek(currentDayOfWeek);
//     }, []);
  
//   //Punch in  
//     const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

//     return(
//         <MainHeaderFrame>
//           {/* Row 1 */}
//             <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
//               <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 justify-between">
//                 {/* <p style={{ fontSize: '31px', whiteSpace: 'pre-line' }}>
//                   Welcome <strong>*user*</strong>,{'\n'}
//                   Have a great {dayOfWeek}!
//                 </p> */}
//                 <div className="grid auto-rows-max items-start gap-4 ">
//                   <Card className="flex flex-col">
//                     <CardHeader className="pb-2 flex  justify-between">
//                       <CardDescription className="flex gap-3">
//                         <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
//                       </CardDescription>
//                       <CardTitle className="text-4xl py-2 flex justify-between ">
//                         <ElapsedTimeDisplay elapsedTime={timeElapsed} />
//                         <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
//                       </CardTitle>
//                     </CardHeader>
//                   </Card>
//                   <Card className="flex flex-col">
//                     <CardHeader className="pb-2 flex  justify-between">
//                       <CardDescription className="flex gap-3">
//                         <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
//                       </CardDescription>
//                       <CardTitle className="text-4xl py-2 flex justify-between ">
//                         <ElapsedTimeDisplay elapsedTime={timeElapsed} />
//                         <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
//                       </CardTitle>
//                     </CardHeader>
//                   </Card>
//                 </div>
//               </div>
//             </div>
//             <div>
//               hello
//             </div>
//         </MainHeaderFrame>
//     )
//   }

// import MainHeaderFrame from "@/components/main-header-frame";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { usePunchIn } from '../../components/misc-components/punch-in';
// import PunchInButton from '../../components/misc-components/punch-in-button';
// import ElapsedTimeDisplay from '../../components/misc-components/elapsed-time';
// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { TimerIcon } from "lucide-react";
// import { TOTP } from "totp-generator";
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// export default function DashPage() {
//   // Navigation 
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (
//       localStorage.getItem('cookieFallback') === '[]' ||
//       localStorage.getItem('cookieFallback') === null
//     ) {
//       navigate('/login');
//     } else {
//       navigate(window.location.pathname);
//     }
//   }, []);

//   // Weekday welcome message
//   const [dayOfWeek, setDayOfWeek] = useState('');
//   useEffect(() => {
//     // Get the current day of the week
//     console.log(dayOfWeek);
//     const currentDate = new Date();
//     const options = 'long';
//     const currentDayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: options });
//     setDayOfWeek(currentDayOfWeek);
//   }, []);

//   // Punch in  
//   const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

//   // TOTP and Progress Circle
//   const [totp, setTotp] = useState('');
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const generateTotp = () => {
//       const { otp } = TOTP.generate("JBSWY3DPEHPK3PXP");
//       setTotp(otp);
//     };

//     generateTotp();
//     const interval = setInterval(() => {
//       generateTotp();
//       setProgress(0);
//     }, 30000);

//     const progressInterval = setInterval(() => {
//       setProgress(prev => (prev + 1) % 30);
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//       clearInterval(progressInterval);
//     };
//   }, []);

//   return (
//     <MainHeaderFrame>
//       {/* Row 1 */}
//       <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
//         <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 justify-between">
//           <div className="grid auto-rows-max items-start gap-4 ">
//             <Card className="flex flex-col">
//               <CardHeader className="pb-2 flex justify-between">
//                 <CardDescription className="flex gap-3">
//                   <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
//                 </CardDescription>
//                 <CardTitle className="text-4xl py-2 flex justify-between ">
//                   <ElapsedTimeDisplay elapsedTime={timeElapsed} />
//                   <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
//                 </CardTitle>
//               </CardHeader>
//             </Card>
//             <Card className="flex flex-col">
//               <CardHeader className="pb-2 flex justify-between">
//                 <CardDescription className="flex gap-3">
//                   <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
//                 </CardDescription>
//                 <CardTitle className="text-4xl py-2 flex justify-between items-center">
//                   <div>
//                     <div>{totp}</div>
//                     <CircularProgressbar
//                       value={(progress / 30) * 100}
//                       styles={buildStyles({
//                         pathColor: `rgba(62, 152, 199, ${progress / 30})`,
//                         trailColor: '#d6d6d6',
//                       })}
//                     />
//                   </div>
//                   <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
//                 </CardTitle>
//               </CardHeader>
//             </Card>
//           </div>
//         </div>
//       </div>
//       <div>
//         hello
//       </div>
//     </MainHeaderFrame>
//   );
// }
// import MainHeaderFrame from "@/components/main-header-frame";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { usePunchIn } from '../../components/misc-components/punch-in';
// import PunchInButton from '../../components/misc-components/punch-in-button';
// import ElapsedTimeDisplay from '../../components/misc-components/elapsed-time';
// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { ShieldCheck, TimerIcon } from "lucide-react";
// import { TOTP } from "totp-generator";
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// export default function DashPage() {
//   // Navigation
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (
//       localStorage.getItem('cookieFallback') === '[]' ||
//       localStorage.getItem('cookieFallback') === null
//     ) {
//       navigate('/login');
//     } else {
//       navigate(window.location.pathname);
//     }
//   }, []);

//   // Punch in
//   const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

//   // TOTP and Progress Circle
//   const [totp, setTotp] = useState('');
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const generateTotp = () => {
//       const { otp } = TOTP.generate("JBSWY3DPEHPK3PXP");
//       setTotp(otp);
//     };

//     generateTotp();

//     const interval = setInterval(() => {
//       generateTotp();
//       setProgress(0);
//     }, 30000);

//     const progressInterval = setInterval(() => {
//       setProgress(prev => (prev + 1) % 30);
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//       clearInterval(progressInterval);
//     };
//   }, []);

  

//   return (
//     <MainHeaderFrame>
//       {/* Row 1 */}
//       <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
//         <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:col-span-2">
//           <Card className="flex flex-col">
//             <CardHeader className="pb-2 flex justify-between">
//               <CardDescription className="flex gap-3">
//                 <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
//               </CardDescription>
//               <CardTitle className="text-4xl py-2 flex justify-between ">
//                 <div className="flex gap-2" style={{ minWidth: '200px', maxWidth: '200px' }}>
//                   <ElapsedTimeDisplay elapsedTime={timeElapsed} />
//                 </div>
//                 <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
//               </CardTitle>
//             </CardHeader>
//           </Card>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Card className="flex flex-col items-center">
//                   <CardHeader className="pb-2 flex justify-between">
//                     <CardDescription className="flex gap-3">
//                       <ShieldCheck /> TOTP for Attendance
//                     </CardDescription>
//                     <CardTitle className="text-4xl py-2 flex justify-between items-center gap-4">
//                       <div className="text-4xl font-bold" style={{ letterSpacing: '0.2rem' }}>{totp}</div>
//                       <div className="progress-bar-container">
//                         <CircularProgressbar
//                           value={(progress / 30) * 100}
//                           styles={buildStyles({
//                             pathColor: 'red', // Set pathColor to red
//                             trailColor: '#d6d6d6',
//                             strokeLinecap: 'butt',
//                           })}
//                           strokeWidth={5}
//                         />
//                       </div>
//                     </CardTitle>
//                   </CardHeader>
//                 </Card>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>TOTP is valid for 30 seconds.</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>
//       <div>
//         hello
//       </div>
//     </MainHeaderFrame>
//   );
  
// }
// import MainHeaderFrame from "@/components/main-header-frame";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { usePunchIn } from '../../components/misc-components/punch-in';
// import PunchInButton from '../../components/misc-components/punch-in-button';
// import ElapsedTimeDisplay from '../../components/misc-components/elapsed-time';
// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { ShieldCheck, TimerIcon } from "lucide-react";
// import { TOTP } from "totp-generator";
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp"
// import { toast } from "@/components/ui/use-toast"

// const FormSchema = z.object({
//   pin: z.string().min(6, {
//     message: "Your one-time password must be 6 characters.",
//   }),
// })

// export default function DashPage() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       pin: "",
//     },
//   })

//   // State to store user-provided OTP
//   const [userOTP, setUserOTP] = useState('');
//   // State to store verification result
//   const [verificationResult, setVerificationResult] = useState('');

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     // Update the userOTP state with the value from the form
//     setUserOTP(data.pin);
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//     // Call verifyOTP after setting the state
//     verifyOTP(data.pin);
//   }

//   // Function to verify the user-provided OTP
//   const verifyOTP = (otp) => {
//     console.log(otp)
//     // Generate the expected OTP using the current TOTP key
//     const expectedOTP = TOTP.generate("JBSWY3DPEHPK3PXP").otp;

//     // Compare the expected OTP with the user-provided OTP
//     if (otp === expectedOTP) {
//       setVerificationResult('OTP is valid!');
//     } else {
//       setVerificationResult('OTP is not valid!');
//     }
//   };

//   // Navigation
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (
//       localStorage.getItem('cookieFallback') === '[]' ||
//       localStorage.getItem('cookieFallback') === null
//     ) {
//       navigate('/login');
//     } else {
//       navigate(window.location.pathname);
//     }
//   }, []);

//   // Punch in
//   const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

//   // TOTP and Progress Circle
//   const [totp, setTotp] = useState('');
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const generateTotp = () => {
//       const { otp } = TOTP.generate("JBSWY3DPEHPK3PXP");
//       setTotp(otp);
//     };

//     generateTotp();

//     const interval = setInterval(() => {
//       generateTotp();
//       setProgress(0);
//     }, 30000);

//     const progressInterval = setInterval(() => {
//       setProgress(prev => (prev + 1) % 30);
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//       clearInterval(progressInterval);
//     };
//   }, []);

//    function generateKey() {
//     const secc = "my-name-key";
//     const currentHour = new Date().toISOString().substr(0, 13); // Get the current hour as a string
//     const randomFactor = Math.random().toString(36).substr(2); // Generate a random string
//     const combinedString = `${secc}-${currentHour}-${randomFactor}`;
//     console.log(combinedString);
//   }

//   return (
//     <MainHeaderFrame>
//       {/* Row 1 */}
//       <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
//         <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:col-span-2">
//           <Card className="flex flex-col">
//             <CardHeader className="pb-2 flex justify-between">
//               <CardDescription className="flex gap-3">
//                 <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
//               </CardDescription>
//               <CardTitle className="text-4xl py-2 flex justify-between ">
//                 <div className="flex gap-2" style={{ minWidth: '200px', maxWidth: '200px' }}>
//                   <ElapsedTimeDisplay elapsedTime={timeElapsed} />
//                 </div>
//                 <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
//               </CardTitle>
//             </CardHeader>
//           </Card>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Card className="flex flex-col items-center">
//                   <CardHeader className="pb-2 flex justify-between">
//                     <CardDescription className="flex gap-3">
//                       <ShieldCheck /> TOTP for Attendance
//                     </CardDescription>
//                     <CardTitle className="text-4xl py-2 flex justify-between items-center gap-4">
//                       <div className="text-4xl font-bold" style={{ letterSpacing: '0.2rem' }}>{totp}</div>
//                       <div className="progress-bar-container">
//                         <CircularProgressbar
//                           value={(progress / 30) * 100}
//                           styles={buildStyles({
//                             pathColor: 'red', // Set pathColor to red
//                             trailColor: '#d6d6d6',
//                             strokeLinecap: 'butt',
//                           })}
//                           strokeWidth={5}
//                         />
//                       </div>
//                     </CardTitle>
//                   </CardHeader>
//                 </Card>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>TOTP is valid for 30 seconds.</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//       </div>
//       {/* Input field and button for OTP verification */}
//       <div>
//         <input type="text" value={userOTP} onChange={(e) => setUserOTP(e.target.value)} />
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//             <FormField
//               control={form.control}
//               name="pin"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>One-Time Password</FormLabel>
//                   <FormControl>
//                     <InputOTP maxLength={6} {...field}>
//                       <InputOTPGroup>
//                         <InputOTPSlot index={0} />
//                         <InputOTPSlot index={1} />
//                         <InputOTPSlot index={2} />
//                         <InputOTPSlot index={3} />
//                         <InputOTPSlot index={4} />
//                         <InputOTPSlot index={5} />
//                       </InputOTPGroup>
//                     </InputOTP>
//                   </FormControl>
//                   <FormDescription>
//                     Please enter the one-time password sent to your phone.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit">Submit</Button>
//           </form>
//         </Form>
//         <button onClick={() => verifyOTP(userOTP)}>Verify OTP</button>
//         <Button onClick={() => generateKey()}>Verify OTP</Button>
//         <p>{verificationResult}</p>
//       </div>
//     </MainHeaderFrame>
//   );
// }
import MainHeaderFrame from "@/components/main-header-frame";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePunchIn } from '../../components/misc-components/punch-in';
import PunchInButton from '../../components/misc-components/punch-in-button';
import ElapsedTimeDisplay from '../../components/misc-components/elapsed-time';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldCheck, TimerIcon } from "lucide-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { TOTP } from "totp-generator";



export default function DashPage() {

  // Navigation
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

  // Punch in
  const { isPunchedIn, togglePunchIn, timeElapsed } = usePunchIn();

  // TOTP and Progress Circle
  const [totp, setTotp] = useState('');
  const [progress, setProgress] = useState(0);

  type Timeout = ReturnType<typeof setTimeout>;

  type IntervalRef = undefined | Timeout;
  
  useEffect(() => {
    const generateTotp = () => {
      const secretInput = import.meta.env.VITE_TOTP_SECRET;
      const { otp, expires } = TOTP.generate(secretInput);
      setTotp(otp);
  
      // Calculate the remaining time until the next OTP generation
      const remainingTime = expires - Date.now();
  
      // Clear the existing interval if it exists
      if (interval.current) {
        clearTimeout(interval.current);
      }
  
      // Set a new interval to generate the next OTP
      interval.current = setTimeout(() => {
        generateTotp();
        setProgress(0); // Reset progress when new OTP is generated
      }, remainingTime);
    };
  
    // Call generateTotp initially
    generateTotp();
  
    // Set up progress interval
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev + 1) % 30);
    }, 1000);
  
    // Clean up the intervals on component unmount
    return () => {
      if (interval.current) {
        clearTimeout(interval.current);
      }
      clearInterval(progressInterval);
    };
  }, []);
  
  const interval = useRef<IntervalRef>(undefined);

  return (
    <MainHeaderFrame>
      {/* Row 1 */}
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:col-span-2">
          <Card className="flex flex-col">
            <CardHeader className="pb-2 flex justify-between">
              <CardDescription className="flex gap-3">
                <TimerIcon /> {isPunchedIn ? 'Working' : 'On Break'}
              </CardDescription>
              <CardTitle className="text-4xl py-2 flex justify-between ">
                <div className="flex gap-2" style={{ minWidth: '200px', maxWidth: '200px' }}>
                  <ElapsedTimeDisplay elapsedTime={timeElapsed} />
                </div>
                <PunchInButton isPunchedIn={isPunchedIn} onPunchIn={togglePunchIn} />
              </CardTitle>
            </CardHeader>
          </Card>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="flex flex-col items-center">
                  <CardHeader className="pb-2 flex justify-between">
                    <CardDescription className="flex gap-3">
                      <ShieldCheck /> TOTP for Attendance
                    </CardDescription>
                    <CardTitle className="text-4xl py-2 flex justify-between items-center gap-4">
                      <div className="text-4xl font-bold" style={{ letterSpacing: '0.2rem' }}>{totp}</div>
                      <div className="progress-bar-container">
                        <CircularProgressbar
                          value={(progress / 30) * 100}
                          styles={buildStyles({
                            pathColor: 'red', // Set pathColor to red
                            trailColor: '#d6d6d6',
                            strokeLinecap: 'butt',
                          })}
                          strokeWidth={5}
                        />
                      </div>
                    </CardTitle>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>TOTP is valid for 30 seconds.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/* Input field and button for OTP verification */}

    </MainHeaderFrame>
  );
}