import { verifyOTP } from "@/components/misc-components/totp";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { addAttendanceRecord, fetchAttendanceRecords, getEmpData } from "@/lib/appwrite/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  name: z.string(), // Add this line
  empID: z.string(), // Add this line
});

export default function AttendancePage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
      name: "", // Add default value for name
      empID: "", // Add default value for empID
    },
  });

  const [userOTP, setUserOTP] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const OTPVERIFICATIONLOG = userOTP + verificationResult;
    console.log(OTPVERIFICATIONLOG);
    setUserOTP(data.pin);
    const isOTPValid = handleVerifyOTP(data.pin);

    if (isOTPValid) {
      // Fetch employee data
      const employees = await getEmpData();

      // Check if the entered empID and name match the employee data
      const matchingEmployee = employees?.find(
        (emp) => emp.EmpID === data.empID && emp.EmpName === data.name
      );

      if (matchingEmployee) {
        // Fetch attendance records for the current day
        const attendanceRecords = await fetchAttendanceRecords();
        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = attendanceRecords?.filter(
          (record) =>
            record.empID === data.empID &&
            record.attendanceDateTime.split('T')[0] === today
        );

        if (todayAttendance && todayAttendance.length === 0) {
          // Call addAttendanceRecord with name and empID if no attendance record exists for today
          addAttendanceRecord(data.name, data.empID)
            .then(() => toast(`Attendance of ${data.name} for ${today} added to the record successfully.`))
            .catch((error) => toast("Error adding attendance record:", error));
        } else {
          toast(`${data.name}'s attendance has already been marked for today.`)
        }
      } else {
        toast("Employee ID or Full Name does not match the records.");
      }
    }
  };

  const handleVerifyOTP = (otp: string) => {
    const result = verifyOTP(otp);

    setVerificationResult(result ? 'OTP is valid!' : 'OTP is not valid!');
    return result;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col space-y-2">
        {/* <img src="/assets/images/final-logo.png" alt="logo" /> */}
  
        <div className="fixed top-4 right-4 md:top-8 md:right-8 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
          <Link
            to="/register"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "pb-4 md:pb-0" // Add padding-bottom on mobile
            )}
          >
            Register
          </Link>
          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "pb-4 md:pb-0" // Add padding-bottom on mobile
            )}
          >
            Login
          </Link>
        </div>
  
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center py-4">
              <div className="py-3" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Mark Attendance
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to mark today's attendance.
              </p>
            </div>
          <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Name</FormLabel> */}
                    <FormControl>
                      <Input type="text" placeholder="Your Full Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="empID"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Employee ID</FormLabel> */}
                    <FormControl>
                      <Input type="text" placeholder="Your Employee ID" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col items-center">
                      <FormLabel className="p-5">One-Time Password</FormLabel>
                      <FormControl>
                        <div className="flex justify-center">
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                    </div>
                    <FormDescription className="px-3 py-2 text-center text-sm text-muted-foreground">
                      Please enter the one-time password currently shown on the Admin's Dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
          <Toaster/>
          <p className="px-3 py-2 text-center text-sm text-muted-foreground">
                Pay attention to input as it's case-senstive.
          </p>
          <p className="px-3 py-2 text-center text-sm text-muted-foreground flex items-start justify-center">
            <TriangleAlert className=" icon-align-top" />
            Double marking attendance or marking other's attendance is strictly prohibited & punishable.
          </p>



          
        </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
